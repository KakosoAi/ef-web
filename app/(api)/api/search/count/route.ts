import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { searchService } from '@/server/services/search';
import type { SearchQueryParams, ApiResponse, CountResponse } from '@/shared/types/search';

/**
 * Search count API endpoint for ads_with_all_joins
 * GET /api/search/count
 *
 * Returns the total count of search results without fetching the actual data
 * Useful for pagination and showing total results count
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters (same as main search endpoint)
    const queryParams: SearchQueryParams = {
      // Search
      searchText: searchParams.get('searchText') || undefined,

      // Category Filters
      categoryId: searchParams.get('categoryId')
        ? parseInt(searchParams.get('categoryId')!)
        : undefined,
      subCategoryId: searchParams.get('subCategoryId')
        ? parseInt(searchParams.get('subCategoryId')!)
        : undefined,
      typeId: searchParams.get('typeId') ? parseInt(searchParams.get('typeId')!) : undefined,
      // String type mapping (rent/buy/tools)
      type: searchParams.get('type') || undefined,

      // Attribute Filters
      brandId: searchParams.get('brandId') ? parseInt(searchParams.get('brandId')!) : undefined,
      statusId: searchParams.get('statusId') ? parseInt(searchParams.get('statusId')!) : undefined,
      conditionId: searchParams.get('conditionId')
        ? parseInt(searchParams.get('conditionId')!)
        : undefined,

      // Location Filters
      countryId: searchParams.get('countryId')
        ? parseInt(searchParams.get('countryId')!)
        : undefined,
      stateId: searchParams.get('stateId') ? parseInt(searchParams.get('stateId')!) : undefined,
      cityId: searchParams.get('cityId') ? parseInt(searchParams.get('cityId')!) : undefined,

      // Status & Visibility
      isActive: searchParams.get('isActive') || undefined,
      isPublished: searchParams.get('isPublished') || undefined,
      isFeatured: searchParams.get('isFeatured') || undefined,

      // Price Range
      priceMin: searchParams.get('priceMin')
        ? parseFloat(searchParams.get('priceMin')!)
        : undefined,
      priceMax: searchParams.get('priceMax')
        ? parseFloat(searchParams.get('priceMax')!)
        : undefined,

      // Year Range
      yearMin: searchParams.get('yearMin') ? parseInt(searchParams.get('yearMin')!) : undefined,
      yearMax: searchParams.get('yearMax') ? parseInt(searchParams.get('yearMax')!) : undefined,
    };

    // Execute count query (cached per params)
    const cacheKey = ['search-count', JSON.stringify(queryParams)];
    const getCachedCount = unstable_cache(() => searchService.count(queryParams), cacheKey, {
      revalidate: 120,
      tags: ['search-count'],
    });
    const countResult = await getCachedCount();

    const response: ApiResponse<CountResponse> = {
      success: true,
      data: countResult,
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Search count API error:', error);

    const errorResponse: ApiResponse<CountResponse> = {
      success: false,
      error: {
        error: 'COUNT_ERROR',
        message: 'An error occurred while counting search results. Please try again.',
        statusCode: 500,
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * Handle OPTIONS request for CORS
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
