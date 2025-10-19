// Import Equipment type first
import type { Equipment } from '@/shared/types/equipment';

// Legacy search interfaces (keeping for backward compatibility)
export interface SearchParams {
  q?: string;
  location?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  condition?: string;
  dealer?: string;
  page?: number;
  limit?: number;
}

export interface SearchFilters {
  categories: string[];
  locations: string[];
  conditions: string[];
  dealers: string[];
  priceRange: [number, number];
  yearRange: [number, number];
}

export interface SearchResult {
  equipment: Equipment[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface SearchFormData {
  query: string;
  location: string;
  category?: string;
}

// ===== NEW COMPREHENSIVE SEARCH API TYPES =====

export interface SearchQueryParams {
  // Pagination & Sorting
  page?: number;
  limit?: number;
  sort?: 'recent' | 'older' | 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc';
  orderBy?: 'asc' | 'desc';

  // Search
  searchText?: string;

  // Category Filters
  categoryId?: number;
  subCategoryId?: number;
  typeId?: number;

  // Attribute Filters
  brandId?: number;
  statusId?: number;
  conditionId?: number;

  // Location Filters
  countryId?: number;
  stateId?: number;
  cityId?: number;

  // Status & Visibility
  isActive?: string; // 'true' | 'false'
  isPublished?: string; // 'true' | 'false'
  isFeatured?: string; // 'true' | 'false'

  // Price Range (for equipment)
  priceMin?: number;
  priceMax?: number;

  // Year Range (for equipment)
  yearMin?: number;
  yearMax?: number;
}

// Related data interfaces
export interface CategoryInfo {
  id: number;
  name: string;
}

export interface SubCategoryInfo {
  id: number;
  name: string;
}

export interface TypeInfo {
  id: number;
  name: string;
}

export interface BrandInfo {
  id: number;
  name: string;
}

export interface StatusInfo {
  id: number;
  name: string;
}

export interface LocationInfo {
  country?: string;
  state?: string;
  city?: string;
}

export interface ImageInfo {
  url: string;
  isDefault: boolean;
}

export interface OwnerInfo {
  id: number;
  name: string;
}

// Main search result item interface
export interface SearchResultItem {
  // Core Fields
  id: number;
  title: string;
  slug: string;
  description: string;
  price?: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  priority: number; // ranking score

  // Related Data (via joins/includes)
  category?: CategoryInfo;
  subCategory?: SubCategoryInfo;
  type?: TypeInfo;
  brand?: BrandInfo;
  status?: StatusInfo;
  location?: LocationInfo;
  images?: ImageInfo[];
  owner?: OwnerInfo;

  // Equipment-specific fields (optional)
  year?: number;
  condition?: string;
  hours?: number;
  model?: string;
}

// Search response interface
export interface SearchResponse {
  items: SearchResultItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    appliedFilters: Partial<SearchQueryParams>;
    availableFilters: AvailableFilters;
  };
}

// Count response interface
export interface CountResponse {
  total: number;
  filters: Partial<SearchQueryParams>;
}

// Related items response interface
export interface RelatedItemsResponse {
  items: SearchResultItem[];
  total: number;
  relationType: 'category' | 'brand' | 'location' | 'similar';
}

// Available filters for the search
export interface AvailableFilters {
  categories: CategoryInfo[];
  subCategories: SubCategoryInfo[];
  types: TypeInfo[];
  brands: BrandInfo[];
  statuses: StatusInfo[];
  countries: { id: number; name: string }[];
  states: { id: number; name: string; countryId: number }[];
  cities: { id: number; name: string; stateId: number }[];
  priceRange: {
    min: number;
    max: number;
  };
  yearRange: {
    min: number;
    max: number;
  };
}

// Database query builder interface (for internal use)
export interface SearchQueryBuilder {
  baseQuery: string;
  whereConditions: string[];
  joinConditions: string[];
  orderByClause: string;
  limitClause: string;
  offsetClause: string;
  parameters: Record<string, string | number | boolean>;
}

// Error response interface
export interface SearchErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

// API Response wrapper
export type ApiResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: SearchErrorResponse;
    };
