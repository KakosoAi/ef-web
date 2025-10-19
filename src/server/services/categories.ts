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
  name: string;
  image: string; // resolved public path
}

// Fallback categories when Supabase is unavailable or empty
const defaultCategories: CategoryWithImage[] = [
  { name: 'Excavators', image: '/assets/categories/excavators.png' },
  { name: 'Cranes', image: '/assets/categories/cranes.png' },
  { name: 'Wheel Loaders', image: '/assets/categories/wheel-loaders.png' },
  { name: 'Bulldozers', image: '/assets/categories/dozers.png' },
  { name: 'Forklifts', image: '/assets/categories/forklifts.png' },
  { name: 'Compactors', image: '/assets/categories/compactors.png' },
  { name: 'Crushers', image: '/assets/categories/crushers.png' },
  { name: 'Aerial Platforms', image: '/assets/categories/ariel-platforms.png' },
  { name: 'Skid Steers', image: '/assets/categories/skid-steers.png' },
  { name: 'Backhoe Loaders', image: '/assets/categories/backhoe-loaders.png' },
  { name: 'Motor Graders', image: '/assets/categories/motor-graders.png' },
  { name: 'Boom Loader', image: '/assets/categories/boom-loader.png' },
  { name: 'Generators', image: '/assets/categories/generators.png' },
  { name: 'Compressors', image: '/assets/categories/compressors.png' },
  { name: 'Container Stackers', image: '/assets/categories/container-stackers.png' },
  { name: 'Trailers', image: '/assets/categories/trailers.png' },
  { name: 'Trucks', image: '/assets/categories/trucks.png' },
  { name: 'Vehicle Buses', image: '/assets/categories/vehicle-buses.png' },
  { name: 'Other Equipments', image: '/assets/categories/other-equipments.png' },
];

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
      return defaultCategories;
    }

    const records = (data ?? []) as CategoryRecord[];
    if (!records.length) return defaultCategories;
    return records.map(rec => ({ name: rec.name, image: `/assets/categories/${rec.icon}` }));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Supabase client unavailable, using default categories');
    return defaultCategories;
  }
}

export const getCategoriesCached = unstable_cache(getCategories, ['categories'], {
  revalidate: 300,
  tags: ['categories'],
});
