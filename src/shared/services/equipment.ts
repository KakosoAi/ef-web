import { Equipment, EquipmentFilters, SearchParams, SearchResult } from '@/shared/types';

// Mock data service - replace with actual API calls later
export class EquipmentService {
  static async getEquipment(_id: number): Promise<Equipment | null> {
    // TODO: Replace with actual API call
    // return await fetch(`/api/equipment/${id}`).then(res => res.json());
    return null;
  }

  static async getFeaturedEquipment(_limit: number = 6): Promise<Equipment[]> {
    // TODO: Replace with actual API call
    // return await fetch(`/api/equipment/featured?limit=${limit}`).then(res => res.json());
    return [];
  }

  static async searchEquipment(_params: SearchParams): Promise<SearchResult> {
    // TODO: Replace with actual API call
    // const query = new URLSearchParams(params as Record<string, string>);
    // return await fetch(`/api/equipment/search?${query}`).then(res => res.json());
    return {
      equipment: [],
      total: 0,
      page: 1,
      limit: 10,
      hasMore: false,
    };
  }

  static async getEquipmentByCategory(_category: string, _limit?: number): Promise<Equipment[]> {
    // TODO: Replace with actual API call
    return [];
  }

  static async getEquipmentFilters(): Promise<EquipmentFilters> {
    // TODO: Replace with actual API call
    return {
      category: '',
      priceRange: [0, 1000000],
      yearRange: [2000, 2024],
      location: '',
      condition: '',
      dealer: '',
    };
  }
}

export default EquipmentService;
