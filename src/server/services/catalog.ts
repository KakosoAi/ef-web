import 'server-only';
import { getSupabaseAdminClient } from '@/server/lib/supabase-admin';
import { debugError } from '@/shared/utils/debug';

// --- Types ---

export interface CategoryRecord {
  id: number;
  name: string;
  icon?: string | null;
  isfooter?: boolean | null;
}

export interface SubCategoryRecord {
  id: number;
  name: string;
  categoryid: number;
  category?: CategoryRecord; // Joined
}

export interface BrandRecord {
  id: number;
  name: string;
  icon?: string | null;
  isfooter?: boolean | null;
}

export interface ModelRecord {
  id: number;
  name: string;
  brandid: number;
  brand?: BrandRecord; // Joined
}

export interface EngineRecord {
  id: number;
  name: string;
}

// --- Categories ---

export async function getCategories(page = 1, limit = 20, query = '') {
  const supabase = getSupabaseAdminClient();
  const offset = (page - 1) * limit;

  let dbQuery = supabase
    .from('categories')
    .select('*', { count: 'exact' })
    .order('id', { ascending: false })
    .range(offset, offset + limit - 1);

  if (query) {
    dbQuery = dbQuery.ilike('name', `%${query}%`);
  }

  const { data, error, count } = await dbQuery;

  if (error) {
    debugError('Error fetching categories:', error);
    return { data: [], count: 0 };
  }

  return { data: (data as CategoryRecord[]) || [], count: count || 0 };
}

export async function getCategoryById(id: number) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from('categories').select('*').eq('id', id).single();

  if (error) {
    debugError(`Error fetching category ${id}:`, error);
    return null;
  }
  return data as CategoryRecord;
}

export async function createCategory(data: Partial<CategoryRecord>) {
  const supabase = getSupabaseAdminClient();
  const { data: newRecord, error } = await supabase
    .from('categories')
    .insert(data)
    .select()
    .single();
  if (error) throw error;
  return newRecord;
}

export async function updateCategory(id: number, data: Partial<CategoryRecord>) {
  const supabase = getSupabaseAdminClient();
  const { data: updatedRecord, error } = await supabase
    .from('categories')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return updatedRecord;
}

export async function deleteCategory(id: number) {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// --- SubCategories ---

export async function getSubCategories(page = 1, limit = 20, query = '') {
  const supabase = getSupabaseAdminClient();
  const offset = (page - 1) * limit;

  let dbQuery = supabase
    .from('subcategories')
    .select('*, category:categories(name)', { count: 'exact' })
    .order('id', { ascending: false })
    .range(offset, offset + limit - 1);

  if (query) {
    dbQuery = dbQuery.ilike('name', `%${query}%`);
  }

  const { data, error, count } = await dbQuery;

  if (error) {
    debugError('Error fetching subcategories:', error);
    return { data: [], count: 0 };
  }

  // Transform joined data if necessary, or just rely on frontend to handle it
  // Supabase returns nested objects for joins
  return { data: (data as any[]) || [], count: count || 0 };
}

export async function getSubCategoryById(id: number) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from('subcategories').select('*').eq('id', id).single();
  if (error) return null;
  return data as SubCategoryRecord;
}

export async function createSubCategory(data: Partial<SubCategoryRecord>) {
  const supabase = getSupabaseAdminClient();
  const { data: newRecord, error } = await supabase
    .from('subcategories')
    .insert(data)
    .select()
    .single();
  if (error) throw error;
  return newRecord;
}

export async function updateSubCategory(id: number, data: Partial<SubCategoryRecord>) {
  const supabase = getSupabaseAdminClient();
  const { data: updatedRecord, error } = await supabase
    .from('subcategories')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return updatedRecord;
}

export async function deleteSubCategory(id: number) {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from('subcategories').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// --- Brands ---

export async function getBrands(page = 1, limit = 20, query = '') {
  const supabase = getSupabaseAdminClient();
  const offset = (page - 1) * limit;

  let dbQuery = supabase
    .from('brands')
    .select('*', { count: 'exact' })
    .order('id', { ascending: false })
    .range(offset, offset + limit - 1);

  if (query) {
    dbQuery = dbQuery.ilike('name', `%${query}%`);
  }

  const { data, error, count } = await dbQuery;

  if (error) {
    debugError('Error fetching brands:', error);
    return { data: [], count: 0 };
  }

  return { data: (data as BrandRecord[]) || [], count: count || 0 };
}

export async function getBrandById(id: number) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from('brands').select('*').eq('id', id).single();
  if (error) return null;
  return data as BrandRecord;
}

export async function createBrand(data: Partial<BrandRecord>) {
  const supabase = getSupabaseAdminClient();
  const { data: newRecord, error } = await supabase.from('brands').insert(data).select().single();
  if (error) throw error;
  return newRecord;
}

export async function updateBrand(id: number, data: Partial<BrandRecord>) {
  const supabase = getSupabaseAdminClient();
  const { data: updatedRecord, error } = await supabase
    .from('brands')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return updatedRecord;
}

export async function deleteBrand(id: number) {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from('brands').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// --- Models ---

export async function getModels(page = 1, limit = 20, query = '') {
  const supabase = getSupabaseAdminClient();
  const offset = (page - 1) * limit;

  let dbQuery = supabase
    .from('models')
    .select('*, brand:brands(name)', { count: 'exact' })
    .order('id', { ascending: false })
    .range(offset, offset + limit - 1);

  if (query) {
    dbQuery = dbQuery.ilike('name', `%${query}%`);
  }

  const { data, error, count } = await dbQuery;

  if (error) {
    debugError('Error fetching models:', error);
    return { data: [], count: 0 };
  }

  return { data: (data as any[]) || [], count: count || 0 };
}

export async function getModelById(id: number) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from('models').select('*').eq('id', id).single();
  if (error) return null;
  return data as ModelRecord;
}

export async function createModel(data: Partial<ModelRecord>) {
  const supabase = getSupabaseAdminClient();
  const { data: newRecord, error } = await supabase.from('models').insert(data).select().single();
  if (error) throw error;
  return newRecord;
}

export async function updateModel(id: number, data: Partial<ModelRecord>) {
  const supabase = getSupabaseAdminClient();
  const { data: updatedRecord, error } = await supabase
    .from('models')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return updatedRecord;
}

export async function deleteModel(id: number) {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from('models').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// --- Engines ---

export async function getEngines(page = 1, limit = 20, query = '') {
  const supabase = getSupabaseAdminClient();
  const offset = (page - 1) * limit;

  let dbQuery = supabase
    .from('engines')
    .select('*', { count: 'exact' })
    .order('id', { ascending: false })
    .range(offset, offset + limit - 1);

  if (query) {
    dbQuery = dbQuery.ilike('name', `%${query}%`);
  }

  const { data, error, count } = await dbQuery;

  if (error) {
    debugError('Error fetching engines:', error);
    return { data: [], count: 0 };
  }

  return { data: (data as EngineRecord[]) || [], count: count || 0 };
}

export async function getEngineById(id: number) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from('engines').select('*').eq('id', id).single();
  if (error) return null;
  return data as EngineRecord;
}

export async function createEngine(data: Partial<EngineRecord>) {
  const supabase = getSupabaseAdminClient();
  const { data: newRecord, error } = await supabase.from('engines').insert(data).select().single();
  if (error) throw error;
  return newRecord;
}

export async function updateEngine(id: number, data: Partial<EngineRecord>) {
  const supabase = getSupabaseAdminClient();
  const { data: updatedRecord, error } = await supabase
    .from('engines')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return updatedRecord;
}

export async function deleteEngine(id: number) {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from('engines').delete().eq('id', id);
  if (error) throw error;
  return true;
}
