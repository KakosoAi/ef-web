// Import Equipment type first
import type { Equipment } from '@/shared/types/equipment';

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
