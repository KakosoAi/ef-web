import 'server-only';
import { getSupabaseServerClient } from '@/server/lib/supabase';
import { unstable_cache } from 'next/cache';
import { debugError } from '@/shared/utils/debug';

export interface AdRecord {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  price: number | null;
  created_at?: string;
  createdat?: string;
  updated_at?: string | null;
  updatedat?: string | null;
  is_active?: boolean;
  isactive?: boolean;
  is_featured?: boolean;
  isfeatured?: boolean;
  is_published?: boolean;
  published?: boolean;
  category_name: string | null;
  brand_name: string | null;
  country_name: string | null;
  city_name: string | null;
  store_name: string | null;
  store_userid: number | null;
  file_name: string | null; // Thumbnail
}

export async function getAllAds(
  page: number = 1,
  limit: number = 20
): Promise<{ data: AdRecord[]; count: number }> {
  const supabase = getSupabaseServerClient();
  const offset = (page - 1) * limit;

  const query = supabase
    .from('ads_with_all_joins')
    .select('*', { count: 'exact' })
    .order('createdat', { ascending: false })
    .range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    debugError('Error fetching ads:', error);
    return { data: [], count: 0 };
  }

  return { data: (data as AdRecord[]) || [], count: count || 0 };
}
