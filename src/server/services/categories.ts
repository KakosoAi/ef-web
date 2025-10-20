import 'server-only';
import { getSupabaseServerClient } from '@server/lib/supabase';
import { unstable_cache } from 'next/cache';

export interface CategoryRecord {
  id: number;
  name: string;
  icon: string; // png file name located under public/assets/categories
  visible: boolean; // whether the category should be displayed
}

export interface CategoryWithImage {
  id: number;
  name: string;
  image: string; // resolved public path
}

/**
 * Fetch categories from Supabase in a server-safe way.
 * Only uses the anon key and expects RLS to allow public read for categories.
 */
export async function getCategories(): Promise<CategoryWithImage[]> {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, icon, visible')
      .eq('visible', true)
      .order('name', { ascending: true });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Supabase categories error:', error.message);
      return [];
    }

    const records = (data ?? []) as CategoryRecord[];
    if (!records.length) return [];
    return records.map(rec => ({
      id: rec.id,
      name: rec.name,
      image: `/assets/categories/${rec.icon}`,
    }));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Supabase client unavailable');
    return [];
  }
}

export const getCategoriesCached = unstable_cache(getCategories, ['categories'], {
  revalidate: 300,
  tags: ['categories'],
});
