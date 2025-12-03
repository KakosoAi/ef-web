'use server';

import { revalidatePath } from 'next/cache';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  CategoryRecord,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  SubCategoryRecord,
  createBrand,
  updateBrand,
  deleteBrand,
  BrandRecord,
  createModel,
  updateModel,
  deleteModel,
  ModelRecord,
  createEngine,
  updateEngine,
  deleteEngine,
  EngineRecord,
} from '@/server/services/catalog';

// --- Categories ---

export async function createCategoryAction(data: Partial<CategoryRecord>) {
  try {
    const result = await createCategory(data);
    revalidatePath('/admin/catalog/categories');
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCategoryAction(id: number, data: Partial<CategoryRecord>) {
  try {
    const result = await updateCategory(id, data);
    revalidatePath('/admin/catalog/categories');
    revalidatePath(`/admin/catalog/categories/${id}`);
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategoryAction(id: number) {
  try {
    await deleteCategory(id);
    revalidatePath('/admin/catalog/categories');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- SubCategories ---

export async function createSubCategoryAction(data: Partial<SubCategoryRecord>) {
  try {
    const result = await createSubCategory(data);
    revalidatePath('/admin/catalog/sub-categories');
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateSubCategoryAction(id: number, data: Partial<SubCategoryRecord>) {
  try {
    const result = await updateSubCategory(id, data);
    revalidatePath('/admin/catalog/sub-categories');
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteSubCategoryAction(id: number) {
  try {
    await deleteSubCategory(id);
    revalidatePath('/admin/catalog/sub-categories');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- Brands ---

export async function createBrandAction(data: Partial<BrandRecord>) {
  try {
    const result = await createBrand(data);
    revalidatePath('/admin/catalog/brands');
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateBrandAction(id: number, data: Partial<BrandRecord>) {
  try {
    const result = await updateBrand(id, data);
    revalidatePath('/admin/catalog/brands');
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteBrandAction(id: number) {
  try {
    await deleteBrand(id);
    revalidatePath('/admin/catalog/brands');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- Models ---

export async function createModelAction(data: Partial<ModelRecord>) {
  try {
    const result = await createModel(data);
    revalidatePath('/admin/catalog/models');
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateModelAction(id: number, data: Partial<ModelRecord>) {
  try {
    const result = await updateModel(id, data);
    revalidatePath('/admin/catalog/models');
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteModelAction(id: number) {
  try {
    await deleteModel(id);
    revalidatePath('/admin/catalog/models');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- Engines ---

export async function createEngineAction(data: Partial<EngineRecord>) {
  try {
    const result = await createEngine(data);
    revalidatePath('/admin/catalog/engines');
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateEngineAction(id: number, data: Partial<EngineRecord>) {
  try {
    const result = await updateEngine(id, data);
    revalidatePath('/admin/catalog/engines');
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteEngineAction(id: number) {
  try {
    await deleteEngine(id);
    revalidatePath('/admin/catalog/engines');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
