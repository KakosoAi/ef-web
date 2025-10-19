import { NextRequest, NextResponse } from 'next/server';
import { searchService } from '@/server/services/search';
import type { ApiResponse, RelatedItemsResponse } from '@/shared/types/search';

/**
 * Related items API endpoint for ads_with_all_joins
 * GET /api/search/related?itemId=123&type=category&limit=10
 *
 * Returns items related to a specific ad based on:
 * - category: Same category
 * - brand: Same brand
 * - location: Same location (country/state)
 * - similar: Same category and brand (default)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse required parameters
    const itemIdParam = searchParams.get('itemId');
    if (!itemIdParam) {
      const errorResponse: ApiResponse<RelatedItemsResponse> = {
        success: false,
        error: {
          error: 'MISSING_ITEM_ID',
          message: 'itemId parameter is required',
          statusCode: 400,
        },
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const itemId = parseInt(itemIdParam);
    if (isNaN(itemId) || itemId <= 0) {
      const errorResponse: ApiResponse<RelatedItemsResponse> = {
        success: false,
        error: {
          error: 'INVALID_ITEM_ID',
          message: 'itemId must be a valid positive integer',
          statusCode: 400,
        },
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Parse optional parameters
    const relationType =
      (searchParams.get('type') as 'category' | 'brand' | 'location' | 'similar') || 'similar';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;

    // Validate relation type
    const validTypes = ['category', 'brand', 'location', 'similar'];
    if (!validTypes.includes(relationType)) {
      const errorResponse: ApiResponse<RelatedItemsResponse> = {
        success: false,
        error: {
          error: 'INVALID_RELATION_TYPE',
          message: `Relation type must be one of: ${validTypes.join(', ')}`,
          statusCode: 400,
        },
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Validate limit
    const validatedLimit = Math.min(Math.max(limit, 1), 50); // Between 1 and 50

    // Execute related items query
    const relatedResult = await searchService.getRelatedItems(itemId, relationType, validatedLimit);

    const response: ApiResponse<RelatedItemsResponse> = {
      success: true,
      data: relatedResult,
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=900',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Related items API error:', error);

    const errorResponse: ApiResponse<RelatedItemsResponse> = {
      success: false,
      error: {
        error: 'RELATED_ITEMS_ERROR',
        message: 'An error occurred while fetching related items. Please try again.',
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
