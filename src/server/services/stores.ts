import 'server-only';
import { getSupabaseServerClient } from '@/server/lib/supabase';
import type {
  StoreRecord,
  StoreTypeRecord,
  StoreListItem,
  StoreDetail,
} from '@/shared/types/store';

export async function getStoreTypes(): Promise<StoreTypeRecord[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('storetypes')
    .select('id, name')
    .order('name', { ascending: true });
  if (error) return [];
  return (data ?? []) as StoreTypeRecord[];
}

export async function getStores(params?: {
  q?: string;
  storeTypeId?: number;
  limit?: number;
  page?: number;
}): Promise<StoreListItem[]> {
  const supabase = getSupabaseServerClient();
  let query = supabase
    .from('stores')
    .select('id, name, slug, verified, logo, banner, tagline, visits')
    .eq('isactive', true)
    .order('priority', { ascending: false })
    .order('visits', { ascending: false })
    .order('name', { ascending: true });

  if (params?.storeTypeId) {
    query = query.eq('storetypeid', params.storeTypeId);
  }
  if (params?.q) {
    query = query.ilike('name', `%${params.q}%`);
  }
  if (params?.limit && params?.page && params.page > 0) {
    const limit = params.limit;
    const offset = (params.page - 1) * limit;
    query = query.range(offset, offset + limit - 1);
  } else if (params?.limit) {
    query = query.limit(params.limit);
  }

  const { data, error } = await query;
  if (error) return [];
  const records = (data ?? []) as StoreRecord[];
  return records
    .filter(r => r.name && r.slug)
    .map(r => ({
      id: r.id,
      name: r.name as string,
      slug: r.slug as string,
      tagline: r.tagline ?? undefined,
      verified: r.verified ?? undefined,
      logo: r.logo ?? undefined,
      banner: r.banner ?? undefined,
      visits: r.visits ?? undefined,
    }));
}

export async function getStoresCount(params?: {
  q?: string;
  storeTypeId?: number;
}): Promise<number> {
  const supabase = getSupabaseServerClient();
  let query = supabase
    .from('stores')
    .select('id', { count: 'exact', head: true })
    .eq('isactive', true);

  if (params?.storeTypeId) {
    query = query.eq('storetypeid', params.storeTypeId);
  }
  if (params?.q) {
    query = query.ilike('name', `%${params.q}%`);
  }

  const { count, error } = await query;
  if (error || typeof count !== 'number') return 0;
  return count;
}

export async function getStoreById(id: number): Promise<StoreDetail | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('stores')
    .select(
      'id, name, slug, verified, logo, banner, tagline, website, description, address, isactive, isvendor, storetypeid'
    )
    .eq('id', id)
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  const r = data as StoreRecord;
  return {
    id: r.id,
    name: (r.name ?? '') as string,
    slug: (r.slug ?? '') as string,
    verified: r.verified ?? undefined,
    logo: r.logo ?? undefined,
    banner: r.banner ?? undefined,
    tagline: r.tagline ?? undefined,
    website: r.website ?? undefined,
    description: r.description ?? undefined,
    address: r.address ?? undefined,
    isActive: r.isactive ?? undefined ?? undefined,
    isVendor: r.isvendor ?? undefined,
    storeType: null,
  };
}
