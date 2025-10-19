import { Equipment, EquipmentFilters, SearchParams, SearchResult } from '@/shared/types';
import {
  SearchQueryParams,
  SearchResponse,
  SearchResultItem,
  RelatedItemsResponse,
} from '@/shared/types/search';
import { debugError } from '@/shared/utils/debug';

// Equipment service using the new search API
export class EquipmentService {
  static async getEquipment(id: number): Promise<Equipment | null> {
    try {
      // Use the search API to find a specific equipment by ID
      const response = await fetch(`/api/search?searchText=&page=1&limit=1&equipmentId=${id}`);

      if (!response.ok) {
        throw new Error(`Equipment fetch failed: ${response.statusText}`);
      }

      const data: SearchResponse = await response.json();

      if (data.items && data.items.length > 0) {
        return this.mapSearchItemToEquipment(data.items[0]);
      }

      return null;
    } catch (error) {
      debugError('Error fetching equipment:', error);
      return null;
    }
  }

  static async getFeaturedEquipment(limit: number = 6): Promise<Equipment[]> {
    try {
      // Fetch featured equipment using the search API
      const response = await fetch(`/api/search?isFeatured=true&page=1&limit=${limit}&sort=recent`);

      if (!response.ok) {
        throw new Error(`Featured equipment fetch failed: ${response.statusText}`);
      }

      const data: SearchResponse = await response.json();

      return data.items?.map(item => this.mapSearchItemToEquipment(item)) || [];
    } catch (error) {
      debugError('Error fetching featured equipment:', error);
      return [];
    }
  }

  static async searchEquipment(params: SearchParams): Promise<SearchResult> {
    try {
      // Map legacy SearchParams to new SearchQueryParams
      const searchParams: SearchQueryParams = {
        searchText: params.q || '',
        page: params.page || 1,
        limit: params.limit || 10,
        sort: 'recent',
        // Map additional filters if they exist in params
        ...(params.category && { categoryId: parseInt(params.category) }),
        ...(params.location && { cityId: parseInt(params.location) }),
        ...(params.condition && { conditionId: parseInt(params.condition) }),
      };

      const queryString = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryString.append(key, String(value));
        }
      });

      const response = await fetch(`/api/search?${queryString.toString()}`);

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data: SearchResponse = await response.json();

      return {
        equipment: data.items.map(this.mapSearchItemToEquipment),
        total: data.pagination.total || 0,
        page: data.pagination.page || 1,
        limit: data.pagination.limit || 10,
        hasMore: data.pagination.hasNext || false,
      };
    } catch (error) {
      debugError('Error searching equipment:', error);
      return {
        equipment: [],
        total: 0,
        page: 1,
        limit: 10,
        hasMore: false,
      };
    }
  }

  static async getEquipmentByCategory(category: string, limit?: number): Promise<Equipment[]> {
    try {
      const response = await fetch(
        `/api/search?categoryId=${encodeURIComponent(category)}&page=1&limit=${limit || 20}&sort=recent`
      );

      if (!response.ok) {
        throw new Error(`Category equipment fetch failed: ${response.statusText}`);
      }

      const data: SearchResponse = await response.json();

      return data.items?.map(item => this.mapSearchItemToEquipment(item)) || [];
    } catch (error) {
      debugError('Error fetching equipment by category:', error);
      return [];
    }
  }

  static async getRelatedEquipment(
    itemId: string,
    type: 'category' | 'brand' | 'location' | 'similar' = 'similar',
    limit: number = 5
  ): Promise<Equipment[]> {
    try {
      const response = await fetch(
        `/api/search/related?itemId=${itemId}&type=${type}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`Related equipment fetch failed: ${response.statusText}`);
      }

      const data: RelatedItemsResponse = await response.json();

      return data.items?.map(item => this.mapSearchItemToEquipment(item)) || [];
    } catch (error) {
      debugError('Error fetching related equipment:', error);
      return [];
    }
  }

  static async getEquipmentFilters(): Promise<EquipmentFilters> {
    // This would typically come from a separate filters endpoint
    // For now, return default values that match the search API capabilities
    return {
      category: '',
      priceRange: [0, 10000000], // 10M AED max
      yearRange: [1990, new Date().getFullYear()],
      location: '',
      condition: '',
      dealer: '',
    };
  }

  // Helper method to map SearchResultItem to Equipment
  private static mapSearchItemToEquipment(item: SearchResultItem): Equipment {
    return {
      id: item.id,
      title: item.title,
      year: item.year || 0,
      hours: (item.hours || 0).toString(),
      price: item.price || 0,
      priceType: 'For Sale' as 'For Sale' | 'For Rent',
      location:
        `${item.location?.city || ''} ${item.location?.state || ''} ${item.location?.country || ''}`.trim() ||
        'Unknown',
      dealer: item.owner?.name || 'Unknown Dealer',
      verified: false,
      rating: 0,
      reviewCount: 0,
      image: item.images?.[0]?.url || '',
      images: item.images?.map(img => img.url) || [],
      features: [],
      condition: item.condition || 'Unknown',
      category: item.category?.name || '',
      subcategories: item.subCategory ? [item.subCategory.name] : [],
      description: item.description || '',
      specifications: [],
      brand: item.brand?.name || 'Unknown',
      model: item.model || '',
      originalPrice: null,
      contactPerson: item.owner?.name || 'Contact Dealer',
      phone: '',
      email: '',
      whatsapp: '',
    };
  }
}

export default EquipmentService;
