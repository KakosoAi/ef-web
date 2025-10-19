import { getSupabaseServerClient } from '@/server/lib/supabase';
import { debug, debugError } from '@/shared/utils/debug';
import type {
  SearchQueryParams,
  SearchResponse,
  CountResponse,
  RelatedItemsResponse,
  SearchResultItem,
  AvailableFilters,
  SearchQueryBuilder,
} from '@/shared/types/search';

/**
 * Comprehensive search service for ads_with_all_joins
 * Handles advanced filtering, pagination, and full-text search
 */
type QueryError = { message?: string; details?: string; hint?: string; code?: string };

type AdsViewRow = {
  id: number;
  title?: string;
  description?: string | null;
  price?: number | string | null;
  createdat?: string;
  created_at?: string;
  updatedat?: string | null;
  updated_at?: string | null;
  isactive?: boolean | string;
  is_active?: boolean;
  isfeatured?: boolean | string;
  is_featured?: boolean;
  published?: boolean | string;
  is_published?: boolean;
  priority?: number | null;
  category_id?: number;
  category_name?: string;
  subcategory_id?: number;
  subcategory_name?: string;
  adtype_id?: number;
  adtype_name?: string;
  brand_id?: number;
  brand_name?: string;
  status_id?: number;
  status_name?: string;
  country_name?: string;
  state_name?: string;
  city_name?: string;
  file_name?: string;
  file_isdefault?: boolean;
  store_userid?: number;
  store_name?: string;
  year?: number | string | null;
  year_name?: string | number | null;
  yearid?: number | string | null;
  hoursorkilometer?: number | string | null;
  condition_name?: string;
  model_name?: string;
};

interface HasFilterMethods {
  or: (condition: string) => this;
  eq: (column: string, value: string | number | boolean) => this;
  gte: (column: string, value: number | string) => this;
  lte: (column: string, value: number | string) => this;
}

export class SearchService {
  private supabase = getSupabaseServerClient();

  /**
   * Main search method with comprehensive filtering and pagination
   */
  /* deprecated: replaced by new search implementation below */
  async searchDeprecated(params: SearchQueryParams): Promise<SearchResponse> {
    return this.search(params);
  }

  /**
   * Get count of search results
   */
  /* deprecated: replaced by new count implementation below */
  async getSearchCountDeprecated(params: SearchQueryParams): Promise<number> {
    return this.getSearchCount(params);
  }

  /**
   * Get count endpoint response
   */
  /* deprecated: replaced by new count endpoint implementation below */
  async countDeprecated(params: SearchQueryParams): Promise<CountResponse> {
    return this.count(params);
  }

  /**
   * Get related items based on an item ID
   */
  async getRelatedItems(
    itemId: number,
    relationType: 'category' | 'brand' | 'location' | 'similar' = 'similar',
    limit: number = 10
  ): Promise<RelatedItemsResponse> {
    try {
      // First, get the reference item to determine what to match against
      const { data: referenceItem, error: refError } = await this.supabase
        .from('ads_with_all_joins')
        .select('category_id, brand_id, country_id, state_id, city_id')
        .eq('id', itemId)
        .single();

      if (refError || !referenceItem) {
        return { items: [], total: 0, relationType };
      }

      // Build match conditions based on relation type
      let matchConditions: Record<string, string | number | boolean> = {};

      switch (relationType) {
        case 'category':
          matchConditions = { category_id: referenceItem.category_id };
          break;
        case 'brand':
          matchConditions = { brand_id: referenceItem.brand_id };
          break;
        case 'location':
          matchConditions = {
            country_id: referenceItem.country_id,
            state_id: referenceItem.state_id,
          };
          break;
        case 'similar':
        default:
          // For similar, match category and brand if available
          matchConditions = {
            category_id: referenceItem.category_id,
          };
          if (referenceItem.brand_id) {
            matchConditions.brand_id = referenceItem.brand_id;
          }
          break;
      }

      const { data: items, error } = await this.supabase
        .from('ads_with_all_joins')
        .select(
          `
          id,
          title,
          slug,
          description,
          price,
          created_at,
          updated_at,
          is_active,
          is_featured,
          is_published,
          priority,
          category:categories(id, name),
          brand:brands(id, name),
          images:ad_images(url, is_default)
        `
        )
        .match(matchConditions)
        .neq('id', itemId) // Exclude the reference item itself
        .eq('is_active', true)
        .eq('is_published', true)
        .order('is_featured,created_at', { ascending: false })
        .limit(limit);

      if (error) {
        debugError('Related items query error:', error);
        return { items: [], total: 0, relationType };
      }

      const relatedItems: SearchResultItem[] = (items || []).map(
        (item: {
          id: number;
          title?: string;
          slug?: string;
          description?: string | null;
          price?: number | null;
          created_at?: string;
          updated_at?: string | null;
          is_active?: boolean;
          is_featured?: boolean;
          is_published?: boolean;
          priority?: number | null;
          category?: { id: number; name: string } | { id: number; name: string }[] | null;
          brand?: { id: number; name: string } | { id: number; name: string }[] | null;
          images?: { url: string; is_default: boolean }[] | null;
        }) => {
          const categoryVal = Array.isArray(item.category)
            ? (item.category[0] ?? undefined)
            : (item.category ?? undefined);
          const brandVal = Array.isArray(item.brand)
            ? (item.brand[0] ?? undefined)
            : (item.brand ?? undefined);
          return {
            id: item.id,
            title: item.title || '',
            slug: item.slug || '',
            description: item.description || '',
            price: item.price ?? undefined,
            createdAt: item.created_at || '',
            updatedAt: item.updated_at || '',
            isActive: !!item.is_active,
            isFeatured: !!item.is_featured,
            isPublished: !!item.is_published,
            priority: item.priority || 0,
            category: categoryVal,
            brand: brandVal,
            images: (item.images || []).map((img: { url: string; is_default: boolean }) => ({
              url: img.url,
              isDefault: img.is_default,
            })),
          };
        }
      );

      return {
        items: relatedItems,
        total: relatedItems.length,
        relationType,
      };
    } catch (error) {
      debugError('Related items service error:', error);
      return { items: [], total: 0, relationType };
    }
  }

  /**
   * Build where conditions for the search query
   */
  private buildWhereConditions(
    params: SearchQueryParams
  ): Record<string, string | number | boolean> {
    const conditions: Record<string, string | number | boolean> = {};

    // Category filters
    if (params.categoryId) conditions.category_id = params.categoryId;
    if (params.subCategoryId) conditions.sub_category_id = params.subCategoryId;
    if (params.typeId) conditions.type_id = params.typeId;

    // Attribute filters
    if (params.brandId) conditions.brand_id = params.brandId;
    if (params.statusId) conditions.status_id = params.statusId;
    if (params.conditionId) conditions.condition_id = params.conditionId;

    // Location filters
    if (params.countryId) conditions.country_id = params.countryId;
    if (params.stateId) conditions.state_id = params.stateId;
    if (params.cityId) conditions.city_id = params.cityId;

    // Status & Visibility filters
    if (params.isActive !== undefined) {
      conditions.is_active = params.isActive === 'true';
    }
    if (params.isPublished !== undefined) {
      conditions.is_published = params.isPublished === 'true';
    }
    if (params.isFeatured !== undefined) {
      conditions.is_featured = params.isFeatured === 'true';
    }

    return conditions;
  }

  /**
   * Build search query with text search and range filters
   */
  private buildSearchQuery(params: SearchQueryParams): SearchQueryBuilder {
    const baseQuery = 'ads_with_all_joins';
    const whereConditions: string[] = [];
    const joinConditions: string[] = [];
    const parameters: Record<string, string | number | boolean> = {};

    // Full-text search
    if (params.searchText) {
      whereConditions.push(
        `(title.ilike.%${params.searchText}% OR description.ilike.%${params.searchText}%)`
      );
    }

    // Price range filters
    if (params.priceMin !== undefined) {
      whereConditions.push(`price.gte.${params.priceMin}`);
    }
    if (params.priceMax !== undefined) {
      whereConditions.push(`price.lte.${params.priceMax}`);
    }

    // Year range filters
    if (params.yearMin !== undefined) {
      whereConditions.push(`year.gte.${params.yearMin}`);
    }
    if (params.yearMax !== undefined) {
      whereConditions.push(`year.lte.${params.yearMax}`);
    }

    const oc = this.getOrderByClause(params);
    return {
      baseQuery,
      whereConditions,
      joinConditions,
      orderByClause: `order.${oc.column}.${oc.ascending ? 'asc' : 'desc'}`,
      limitClause: `limit.${params.limit || 20}`,
      offsetClause: `offset.${((params.page || 1) - 1) * (params.limit || 20)}`,
      parameters,
    };
  }

  /**
   * Get order by clause based on sort parameter
   */
  private getOrderByClause(params: SearchQueryParams): { column: string; ascending: boolean } {
    const { sort } = params;

    switch (sort) {
      case 'older':
        return { column: 'createdat', ascending: true };
      case 'name_asc':
        return { column: 'title', ascending: true };
      case 'name_desc':
        return { column: 'title', ascending: false };
      case 'price_asc':
        return { column: 'price', ascending: true };
      case 'price_desc':
        return { column: 'price', ascending: false };
      case 'recent':
      default:
        return { column: 'createdat', ascending: false };
    }
  }

  // deprecated overload: use getOrderByClause(params: SearchQueryParams) below
  private getOrderByClauseLegacy(
    sort?: string,
    orderBy?: string
  ): { column: string; ascending: boolean } {
    if (orderBy) {
      return { column: orderBy, ascending: true };
    }
    return this.getOrderByClause({ sort } as SearchQueryParams);
  }

  // Map a view row to SearchResultItem
  private mapSearchItemFromRow(row: AdsViewRow): SearchResultItem {
    const title: string = row.title || '';
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const year =
      typeof row.year === 'number'
        ? row.year
        : row.year
          ? parseInt(String(row.year), 10)
          : row.year_name
            ? parseInt(String(row.year_name), 10)
            : row.yearid
              ? parseInt(String(row.yearid), 10)
              : undefined;

    const hours =
      row.hoursorkilometer !== undefined && row.hoursorkilometer !== null
        ? Number(row.hoursorkilometer)
        : undefined;

    const images = row.file_name
      ? [{ url: row.file_name as string, isDefault: !!row.file_isdefault }]
      : [];

    return {
      id: row.id,
      title,
      slug,
      description: row.description || '',
      price: row.price !== null && row.price !== undefined ? Number(row.price) : undefined,
      createdAt: row.createdat || row.created_at || '',
      updatedAt: row.updatedat || row.updated_at || '',
      isActive: !!(row.isactive ?? row.is_active),
      isFeatured: !!(row.isfeatured ?? row.is_featured),
      isPublished: !!(row.published ?? row.is_published),
      priority: typeof row.priority === 'number' ? row.priority : 0,
      category:
        row.category_id && row.category_name
          ? { id: row.category_id, name: row.category_name }
          : undefined,
      subCategory:
        row.subcategory_id && row.subcategory_name
          ? { id: row.subcategory_id, name: row.subcategory_name }
          : undefined,
      type:
        row.adtype_id && row.adtype_name ? { id: row.adtype_id, name: row.adtype_name } : undefined,
      brand:
        row.brand_id && row.brand_name ? { id: row.brand_id, name: row.brand_name } : undefined,
      status:
        row.status_id && row.status_name ? { id: row.status_id, name: row.status_name } : undefined,
      location: {
        country: row.country_name || undefined,
        state: row.state_name || undefined,
        city: row.city_name || undefined,
      },
      images,
      owner:
        row.store_userid && row.store_name
          ? { id: row.store_userid, name: row.store_name }
          : undefined,
      year,
      condition: row.condition_name || undefined,
      hours,
      model: row.model_name || undefined,
    };
  }

  // Map filters to the ads_with_all_joins view and apply text/price/year conditions
  private applyFilters<T extends HasFilterMethods>(query: T, params: SearchQueryParams): T {
    const {
      searchText,
      categoryId,
      subCategoryId,
      typeId,
      brandId,
      statusId,
      conditionId,
      countryId,
      stateId,
      cityId,
      isActive,
      isPublished,
      isFeatured,
      priceMin,
      priceMax,
      yearMin,
      yearMax,
    } = params;

    // Text search across title and description
    const text = (searchText || '').trim();
    if (text) {
      // Use OR for title/description to match partial text
      query = query.or(`title.ilike.%${text}%,description.ilike.%${text}%`);
    }

    // Category/type/brand filters (align to view columns)
    if (categoryId) query = query.eq('category_id', categoryId);
    if (subCategoryId) query = query.eq('subcategory_id', subCategoryId);
    if (typeId) query = query.eq('adtype_id', typeId);
    if (brandId) query = query.eq('brand_id', brandId);

    // Status/condition filters (IDs if available in view)
    if (statusId) query = query.eq('status_id', statusId);
    if (conditionId) query = query.eq('condition_id', conditionId);

    // Location filters (IDs expected on view)
    if (countryId) query = query.eq('country_id', countryId);
    if (stateId) query = query.eq('state_id', stateId);
    if (cityId) query = query.eq('city_id', cityId);

    // Visibility flags (map camel to view columns without underscores)
    if (isActive !== undefined) query = query.eq('isactive', isActive === 'true');
    if (isPublished !== undefined) query = query.eq('published', isPublished === 'true');
    if (isFeatured !== undefined) query = query.eq('isfeatured', isFeatured === 'true');

    // Range filters
    if (priceMin !== undefined) query = query.gte('price', Number(priceMin));
    if (priceMax !== undefined) query = query.lte('price', Number(priceMax));
    // Use year_name (varchar) for year range filtering
    if (yearMin !== undefined) query = query.gte('year_name', String(yearMin));
    if (yearMax !== undefined) query = query.lte('year_name', String(yearMax));

    return query;
  }

  async search(params: SearchQueryParams): Promise<SearchResponse> {
    const { page = 1, limit = 20 } = params;
    const offset = (page - 1) * limit;

    const orderClause = this.getOrderByClause(params);
    debug('Search query executed with order clause:', orderClause);

    let baseQuery = this.supabase
      .from('ads_with_all_joins')
      .select('*')
      .order(orderClause.column, { ascending: orderClause.ascending })
      .range(offset, offset + limit - 1);

    // Apply filters consistently
    baseQuery = this.applyFilters(baseQuery, params);

    const { data, error } = await baseQuery;
    if (error) {
      const err = error as QueryError;
      debugError('Search query error:', {
        message: err.message,
        details: err.details,
        hint: err.hint,
        code: err.code,
      });
      return {
        items: [],
        pagination: { page, limit, total: 0, totalPages: 0, hasNext: false, hasPrev: false },
        filters: {
          appliedFilters: params,
          availableFilters: {
            categories: [],
            subCategories: [],
            types: [],
            brands: [],
            statuses: [],
            countries: [],
            states: [],
            cities: [],
            priceRange: { min: 0, max: 1000000 },
            yearRange: { min: 1990, max: new Date().getFullYear() },
          },
        },
      };
    }

    const items = (data || []).map((row: AdsViewRow) => this.mapSearchItemFromRow(row));
    const total = await this.getSearchCount(params);

    const totalPages = Math.ceil(total / limit);
    const hasNext = page * limit < total;
    const hasPrev = page > 1;

    return {
      items,
      pagination: { page, limit, total, totalPages, hasNext, hasPrev },
      filters: {
        appliedFilters: params,
        availableFilters: {
          categories: [],
          subCategories: [],
          types: [],
          brands: [],
          statuses: [],
          countries: [],
          states: [],
          cities: [],
          priceRange: { min: 0, max: 1000000 },
          yearRange: { min: 1990, max: new Date().getFullYear() },
        },
      },
    };
  }

  private async getSearchCount(params: SearchQueryParams): Promise<number> {
    try {
      let countQuery = this.supabase
        .from('ads_with_all_joins')
        // Using head: false to avoid edge cases with OR filters on views
        .select('id', { count: 'exact' });

      countQuery = this.applyFilters(countQuery, params);

      const { count, error } = await countQuery;
      if (error) {
        const err = error as QueryError;
        debugError('Count query error:', {
          message: err.message,
          details: err.details,
          hint: err.hint,
          code: err.code,
        });
        return 0;
      }

      return count || 0;
    } catch (e: unknown) {
      const err = e as { message?: string; stack?: string };
      debugError('Count query exception:', {
        message: err?.message,
        stack: err?.stack,
      });
      return 0;
    }
  }

  async count(params: SearchQueryParams): Promise<CountResponse> {
    const total = await this.getSearchCount(params);
    return { total, filters: params };
  }

  /**
   * Get available filters for the search
   */
  private async getAvailableFilters(): Promise<AvailableFilters> {
    try {
      // Get all available filter options
      const [
        categories,
        subCategories,
        types,
        brands,
        statuses,
        countries,
        states,
        cities,
        priceRange,
        yearRange,
      ] = await Promise.all([
        this.supabase.from('categories').select('id, name').eq('is_visible', true).order('name'),
        this.supabase.from('sub_categories').select('id, name').order('name'),
        this.supabase.from('types').select('id, name').order('name'),
        this.supabase.from('brands').select('id, name').order('name'),
        this.supabase.from('statuses').select('id, name').order('name'),
        this.supabase.from('countries').select('id, name').order('name'),
        this.supabase.from('states').select('id, name, country_id').order('name'),
        this.supabase.from('cities').select('id, name, state_id').order('name'),
        this.supabase.from('ads_with_all_joins').select('price').not('price', 'is', null),
        this.supabase.from('ads_with_all_joins').select('year_name').not('year_name', 'is', null),
      ]);

      // Calculate price range
      const pricesRaw = priceRange.data?.map((item: { price?: number | null }) => item.price) ?? [];
      const prices = pricesRaw.filter((p): p is number => typeof p === 'number');
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
      const maxPrice = prices.length > 0 ? Math.max(...prices) : 1000000;

      // Calculate year range
      const years =
        (yearRange.data
          ?.map((item: { year_name?: string | null }) => {
            const y = parseInt(String(item.year_name), 10);
            return Number.isFinite(y) ? y : undefined;
          })
          .filter((y: number | undefined) => y !== undefined) as number[]) || [];
      const minYear = years.length > 0 ? Math.min(...years) : 1990;
      const maxYear = years.length > 0 ? Math.max(...years) : new Date().getFullYear();

      return {
        categories: categories.data || [],
        subCategories: subCategories.data || [],
        types: types.data || [],
        brands: brands.data || [],
        statuses: statuses.data || [],
        countries: countries.data || [],
        states:
          states.data?.map((item: { id: number; name: string; country_id: number }) => ({
            id: item.id,
            name: item.name,
            countryId: item.country_id,
          })) || [],
        cities:
          cities.data?.map((item: { id: number; name: string; state_id: number }) => ({
            id: item.id,
            name: item.name,
            stateId: item.state_id,
          })) || [],
        priceRange: { min: minPrice, max: maxPrice },
        yearRange: { min: minYear, max: maxYear },
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching available filters:', error);
      return {
        categories: [],
        subCategories: [],
        types: [],
        brands: [],
        statuses: [],
        countries: [],
        states: [],
        cities: [],
        priceRange: { min: 0, max: 1000000 },
        yearRange: { min: 1990, max: new Date().getFullYear() },
      };
    }
  }

  /**
   * Create empty response for error cases
   */
  private createEmptyResponse(params: SearchQueryParams): SearchResponse {
    return {
      items: [],
      pagination: {
        page: params.page || 1,
        limit: params.limit || 20,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      },
      filters: {
        appliedFilters: params,
        availableFilters: {
          categories: [],
          subCategories: [],
          types: [],
          brands: [],
          statuses: [],
          countries: [],
          states: [],
          cities: [],
          priceRange: { min: 0, max: 1000000 },
          yearRange: { min: 1990, max: new Date().getFullYear() },
        },
      },
    };
  }
}

// Export singleton instance
export const searchService = new SearchService();
