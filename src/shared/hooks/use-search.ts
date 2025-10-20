'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import {
  SearchQueryParams,
  SearchResponse,
  CountResponse,
  RelatedItemsResponse,
} from '@/shared/types/search';
import { debug, debugError } from '@/shared/utils/debug';

// Query key factories
const searchKeys = {
  all: ['search'] as const,
  searches: () => [...searchKeys.all, 'searches'] as const,
  search: (params: SearchQueryParams) => [...searchKeys.searches(), params] as const,
  count: (params: Omit<SearchQueryParams, 'page' | 'limit'>) =>
    [...searchKeys.all, 'count', params] as const,
  related: (itemId: string, type: string, limit: number) =>
    [...searchKeys.all, 'related', itemId, type, limit] as const,
};

// API functions
async function fetchSearch(params: SearchQueryParams): Promise<SearchResponse> {
  const searchParams = new URLSearchParams();

  // Add all non-empty parameters to the URL
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  debug('fetchSearch called with params:', params);
  debug('fetchSearch URL:', `/api/search?${searchParams.toString()}`);

  try {
    const response = await fetch(`/api/search?${searchParams.toString()}`);
    debug('fetchSearch response status:', response.status, response.statusText);

    if (!response.ok) {
      debugError('fetchSearch failed:', response.statusText);
      throw new Error(`Search failed: ${response.statusText}`);
    }

    const apiResponse = await response.json();
    debug('fetchSearch raw API response:', apiResponse);
    debug('fetchSearch API response type:', typeof apiResponse);
    debug('fetchSearch API response success:', apiResponse.success);

    // Handle the ApiResponse wrapper
    if (apiResponse.success) {
      debug('fetchSearch returning data:', apiResponse.data);
      debug('fetchSearch data type:', typeof apiResponse.data);
      debug('fetchSearch data structure:', Object.keys(apiResponse.data || {}));
      return apiResponse.data;
    } else {
      debugError('fetchSearch API error:', apiResponse.error);
      throw new Error(apiResponse.error?.message || 'Search failed');
    }
  } catch (error) {
    debug('fetchSearch caught error:', error);
    throw error;
  }
}

async function fetchSearchCount(
  params: Omit<SearchQueryParams, 'page' | 'limit'>
): Promise<CountResponse> {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  debug('fetchSearchCount called with params:', params);
  debug('fetchSearchCount URL:', `/api/search/count?${searchParams.toString()}`);

  try {
    const response = await fetch(`/api/search/count?${searchParams.toString()}`);
    debug('fetchSearchCount response status:', response.status, response.statusText);

    if (!response.ok) {
      debugError('fetchSearchCount failed:', response.statusText);
      throw new Error(`Count fetch failed: ${response.statusText}`);
    }

    const apiResponse = await response.json();
    debug('fetchSearchCount raw API response:', apiResponse);
    debug('fetchSearchCount API response success:', apiResponse.success);

    if (apiResponse.success) {
      debug('fetchSearchCount returning data:', apiResponse.data);
      return apiResponse.data as CountResponse;
    } else {
      debugError('fetchSearchCount API error:', apiResponse.error);
      throw new Error(apiResponse.error?.message || 'Count fetch failed');
    }
  } catch (error) {
    debug('fetchSearchCount caught error:', error);
    throw error;
  }
}

async function fetchRelatedItems(
  itemId: string,
  type: string,
  limit: number = 5
): Promise<RelatedItemsResponse> {
  const searchParams = new URLSearchParams({
    itemId,
    type,
    limit: String(limit),
  });

  const response = await fetch(`/api/search/related?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error(`Related items fetch failed: ${response.statusText}`);
  }

  return response.json();
}

// Main search hook
export function useSearch(params: SearchQueryParams, enabled: boolean = true) {
  const queryKey = useMemo(() => searchKeys.search(params), [params]);

  return useQuery({
    queryKey,
    queryFn: () => fetchSearch(params),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Search count hook
export function useSearchCount(
  params: Omit<SearchQueryParams, 'page' | 'limit'>,
  enabled: boolean = true
) {
  const queryKey = useMemo(() => searchKeys.count(params), [params]);

  return useQuery({
    queryKey,
    queryFn: () => fetchSearchCount(params),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Related items hook
export function useRelatedItems(
  itemId: string,
  type: string,
  limit: number = 5,
  enabled: boolean = true
) {
  const queryKey = useMemo(() => searchKeys.related(itemId, type, limit), [itemId, type, limit]);

  return useQuery({
    queryKey,
    queryFn: () => fetchRelatedItems(itemId, type, limit),
    enabled: enabled && !!itemId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Search utilities hook
export function useSearchUtils() {
  const queryClient = useQueryClient();

  const invalidateSearch = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: searchKeys.searches() });
  }, [queryClient]);

  const invalidateCount = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [...searchKeys.all, 'count'] });
  }, [queryClient]);

  const invalidateRelated = useCallback(
    (itemId?: string) => {
      if (itemId) {
        queryClient.invalidateQueries({
          queryKey: [...searchKeys.all, 'related', itemId],
          exact: false,
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [...searchKeys.all, 'related'],
          exact: false,
        });
      }
    },
    [queryClient]
  );

  const prefetchSearch = useCallback(
    (params: SearchQueryParams) => {
      queryClient.prefetchQuery({
        queryKey: searchKeys.search(params),
        queryFn: () => fetchSearch(params),
        staleTime: 5 * 60 * 1000,
      });
    },
    [queryClient]
  );

  const setSearchData = useCallback(
    (params: SearchQueryParams, data: SearchResponse) => {
      queryClient.setQueryData(searchKeys.search(params), data);
    },
    [queryClient]
  );

  return {
    invalidateSearch,
    invalidateCount,
    invalidateRelated,
    prefetchSearch,
    setSearchData,
  };
}

// Search parameters builder hook
export function useSearchParams() {
  const buildSearchParams = useCallback(
    (
      searchText?: string,
      filters?: {
        categoryId?: number;
        subCategoryId?: number;
        typeId?: number;
        type?: string;
        brandId?: number;
        statusId?: number;
        conditionId?: number;
        countryId?: number;
        stateId?: number;
        cityId?: number;
        isActive?: string;
        isPublished?: string;
        isFeatured?: string;
        priceMin?: number;
        priceMax?: number;
        yearMin?: number;
        yearMax?: number;
      },
      pagination?: {
        page?: number;
        limit?: number;
      },
      sorting?: {
        sort?: 'recent' | 'older' | 'name_asc' | 'name_desc';
        orderBy?: string;
      }
    ): SearchQueryParams => {
      return {
        searchText,
        ...filters,
        page: pagination?.page || 1,
        limit: pagination?.limit || 20,
        sort: sorting?.sort || 'recent',
        orderBy: sorting?.orderBy as 'asc' | 'desc' | undefined,
      };
    },
    []
  );

  return { buildSearchParams };
}
