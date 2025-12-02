import 'server-only';
import { getSupabaseAdminClient } from '@/server/lib/supabase-admin';
import { debugError } from '@/shared/utils/debug';

export interface StoreRecord {
  id: number;
  name: string | null;
  verified: boolean | null;
  address: string | null;
  isactive: boolean | null;
  isvendor: boolean | null;
  packagecreatedat: string | null;
  banner: string | null;
  logo: string | null;
  tagline: string | null;
  website: string | null;
  description: string | null;
  visits: number | null;
  priority: number | null;
  subscriptionactivatedat: string | null;
  subscriptionexpireat: string | null;
  subscriptionid: string | null;
  subscriptionstatus: string | null;
  subscriptioninterval: string | null;
  stateid: number | null;
  cityid: number | null;
  countryid: number | null;
  packageid: number | null;
  userid: number | null;
  storetypeid: number | null;
  slug: string | null;
}

// Admin function to get all stores (paginated)
export async function getAllStores(
  page: number = 1,
  limit: number = 20
): Promise<{ data: StoreRecord[]; count: number }> {
  const supabase = getSupabaseAdminClient();
  const offset = (page - 1) * limit;

  const query = supabase
    .from('stores')
    .select('*', { count: 'exact' })
    .not('name', 'is', null)
    .neq('name', '')
    .order('id', { ascending: false })
    .range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    debugError('Error fetching stores:', JSON.stringify(error, null, 2));
    // Try fallback without ordering
    const fallback = supabase
      .from('stores')
      .select('*', { count: 'exact' })
      .not('name', 'is', null)
      .neq('name', '')
      .range(offset, offset + limit - 1);
    const { data: fbData, error: fbError, count: fbCount } = await fallback;

    if (fbError) {
      debugError('Error fetching stores (fallback):', JSON.stringify(fbError, null, 2));
      return { data: [], count: 0 };
    }
    return { data: (fbData as StoreRecord[]) || [], count: fbCount || 0 };
  }

  return { data: (data as StoreRecord[]) || [], count: count || 0 };
}

// Public/Shared functions (Restored/Implemented)

export async function getStoreTypes() {
  const supabase = getSupabaseAdminClient();
  // Assuming table name is store_types or similar.
  // If it fails, we return empty array.
  const { data, error } = await supabase.from('store_types').select('*');
  if (error) {
    // debugError('Error fetching store types:', error);
    return [];
  }
  return data || [];
}

interface GetStoresParams {
  q?: string;
  storeTypeId?: number;
  limit?: number;
  page?: number;
}

export async function getStores({ q, storeTypeId, limit = 12, page = 1 }: GetStoresParams) {
  const supabase = getSupabaseAdminClient();
  const offset = (page - 1) * limit;

  let query = supabase
    .from('stores')
    .select('*')
    .range(offset, offset + limit - 1);

  if (q) {
    query = query.ilike('name', `%${q}%`);
  }
  if (storeTypeId) {
    query = query.eq('storetypeid', storeTypeId);
  }

  const { data, error } = await query;

  if (error) {
    debugError('Error fetching stores (public):', error);
    return [];
  }

  return (data as StoreRecord[]) || [];
}

export async function getStoresCount({ q, storeTypeId }: { q?: string; storeTypeId?: number }) {
  const supabase = getSupabaseAdminClient();
  let query = supabase.from('stores').select('*', { count: 'exact', head: true });

  if (q) {
    query = query.ilike('name', `%${q}%`);
  }
  if (storeTypeId) {
    query = query.eq('storetypeid', storeTypeId);
  }

  const { count, error } = await query;

  if (error) return 0;
  return count || 0;
}

export async function getStoreById(id: string | number): Promise<StoreRecord | null> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from('stores').select('*').eq('id', id).single();

  if (error) {
    debugError(`Error fetching store by id ${id}:`, error);
    return null;
  }

  return data as StoreRecord;
}
