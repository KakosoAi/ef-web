import { getSupabaseServerClient } from '@/shared/lib/supabaseServer';

export interface CategoryRecord {
  id: number;
  name: string;
  icon: string; // png file name located under public/assets/categories
}

export interface CategoryWithImage {
  name: string;
  image: string; // resolved public path
}

/**
 * Fetch categories from Supabase in a server-safe way.
 * Only uses the anon key and expects RLS to allow public read for categories.
 */
export async function getCategories(): Promise<CategoryWithImage[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, icon')
    .order('name', { ascending: true });

  if (error) {
    // Log server-side errors; do not leak detailed info to clients
    console.error('Supabase categories error:', error.message);
    return [];
  }

  const records = (data ?? []) as CategoryRecord[];
  return records.map(rec => ({ name: rec.name, image: `/assets/categories/${rec.icon}` }));
}
