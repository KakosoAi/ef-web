import { NextRequest, NextResponse } from 'next/server';
import { searchService } from '@/server/services/search';
import type { SearchQueryParams, ApiResponse, SearchResponse } from '@/shared/types/search';

/**
 * Main search API endpoint for ads_with_all_joins
 * GET /api/search
 *
 * Supports comprehensive filtering, pagination, and full-text search
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const queryParams: SearchQueryParams = {
      // Pagination & Sorting
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
      sort: (searchParams.get('sort') as SearchQueryParams['sort']) || 'recent',
      orderBy: searchParams.get('orderBy') as 'asc' | 'desc' | undefined,

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

    // Validate pagination parameters
    if (queryParams.page && queryParams.page < 1) {
      queryParams.page = 1;
    }
    if (queryParams.limit && (queryParams.limit < 1 || queryParams.limit > 100)) {
      queryParams.limit = 20; // Default limit with max cap of 100
    }

    // Execute search
    const searchResult = await searchService.search(queryParams);

    const response: ApiResponse<SearchResponse> = {
      success: true,
      data: searchResult,
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Search API error:', error);

    const errorResponse: ApiResponse<SearchResponse> = {
      success: false,
      error: {
        error: 'SEARCH_ERROR',
        message: 'An error occurred while searching. Please try again.',
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
