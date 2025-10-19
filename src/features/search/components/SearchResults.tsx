'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Skeleton } from '@/shared/ui/skeleton';
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Star,
  Verified,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';
import Image from 'next/image';
import {
  useSearch,
  useSearchCount,
  useSearchParams as useSearchParamsBuilder,
} from '@/shared/hooks/use-search';
import { SearchQueryParams } from '@/shared/types/search';
import EquipmentFilters from '@/features/equipment/components/EquipmentFilters';
import { useWebsiteMode } from '@/shared/contexts/website-mode-context';
import { debug } from '@/shared/utils/debug';

interface SearchResultsProps {
  initialQuery?: string;
  initialFilters?: Partial<SearchQueryParams>;
  showFilters?: boolean;
  websiteMode?: 'general' | 'agricultural';
}

export default function SearchResults({
  initialQuery = '',
  initialFilters = {},
  showFilters = true,
  websiteMode: propWebsiteMode,
}: SearchResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { websiteMode: contextWebsiteMode } = useWebsiteMode();
  const websiteMode = propWebsiteMode || contextWebsiteMode;
  const { buildSearchParams } = useSearchParamsBuilder();

  // State for search parameters
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<Partial<SearchQueryParams>>(initialFilters);
  const [showFiltersPanel, setShowFiltersPanel] = useState(showFilters);

  debug('Component render - searchQuery:', searchQuery);

  // Initialize search query from URL params on mount
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    if (urlQuery && urlQuery !== searchQuery) {
      debug('Updating search query from URL:', urlQuery);
      setSearchQuery(urlQuery);
    }
  }, [searchParams, searchQuery]);

  // Build search parameters
  const searchApiParams = useMemo(
    () =>
      buildSearchParams(
        searchQuery,
        {
          categoryId: filters.categoryId,
          subCategoryId: filters.subCategoryId,
          brandId: filters.brandId,
          conditionId: filters.conditionId,
          countryId: filters.countryId,
          stateId: filters.stateId,
          cityId: filters.cityId,
          isActive: filters.isActive,
          isPublished: filters.isPublished,
          isFeatured: filters.isFeatured,
          priceMin: filters.priceMin,
          priceMax: filters.priceMax,
          yearMin: filters.yearMin,
          yearMax: filters.yearMax,
        },
        { page: currentPage, limit: 20 },
        { sort: (filters.sort as 'recent' | 'older' | 'name_asc' | 'name_desc') || 'recent' }
      ),
    [searchQuery, filters, currentPage, buildSearchParams]
  );

  // Fetch search results and count
  const {
    data: searchResults,
    isLoading,
    error,
    isSuccess,
    isError,
    isFetching,
    dataUpdatedAt,
  } = useSearch(searchApiParams);

  const { data: countData } = useSearchCount({
    searchText: searchQuery,
    categoryId: filters.categoryId,
    subCategoryId: filters.subCategoryId,
    brandId: filters.brandId,
    conditionId: filters.conditionId,
    countryId: filters.countryId,
    stateId: filters.stateId,
    cityId: filters.cityId,
    isActive: filters.isActive,
    isPublished: filters.isPublished,
    isFeatured: filters.isFeatured,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    yearMin: filters.yearMin,
    yearMax: filters.yearMax,
  });

  // Debug logging
  debug('Component render - searchQuery:', searchQuery);
  debug('SearchResults Debug:', {
    searchQuery,
    searchApiParams,
    searchResults,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    dataUpdatedAt: dataUpdatedAt ? new Date(dataUpdatedAt).toISOString() : null,
    error,
    countData,
  });

  // Update URL parameters when search changes
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.set('q', searchQuery);
    if (filters.categoryId) params.set('category', filters.categoryId.toString());
    if (filters.brandId) params.set('brand', filters.brandId.toString());
    if (filters.conditionId) params.set('condition', filters.conditionId.toString());
    if (filters.cityId) params.set('location', filters.cityId.toString());
    if (currentPage > 1) params.set('page', currentPage.toString());
    if (websiteMode === 'agricultural') params.set('mode', 'agricultural');

    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [searchQuery, filters, currentPage, websiteMode]);

  // Handle filter changes
  const handleFiltersChange = (newFilters: {
    category?: string;
    location?: string;
    condition?: string;
    priceRange?: string;
    year?: string;
    query?: string;
  }) => {
    // Convert string filter values to appropriate types for the API
    const convertedFilters: Partial<SearchQueryParams> = {};

    if (newFilters.category && newFilters.category !== 'All Categories') {
      // For now, we'll use the category name as-is since we don't have a mapping
      // In a real implementation, you'd map category names to IDs
      convertedFilters.categoryId = undefined; // TODO: Map category name to ID
    }

    if (newFilters.location && newFilters.location !== 'All Locations') {
      // For now, we'll use the location name as-is since we don't have a mapping
      // In a real implementation, you'd map location names to IDs
      convertedFilters.cityId = undefined; // TODO: Map location name to ID
    }

    if (newFilters.condition && newFilters.condition !== 'All Conditions') {
      // For now, we'll use the condition name as-is since we don't have a mapping
      // In a real implementation, you'd map condition names to IDs
      convertedFilters.conditionId = undefined; // TODO: Map condition name to ID
    }

    setFilters(prev => ({ ...prev, ...convertedFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lightweight type for equipment click handling
  type ClickableEquipment = { id: number; title: string; priceType?: string };

  const handleEquipmentClick = (equipment: ClickableEquipment) => {
    const slug = equipment.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const type = equipment.priceType === 'For Rent' ? 'rent' : 'buy';
    router.push(`/equipments/${type}/${slug}/${equipment.id}`);
  };

  const totalPages = Math.ceil((countData?.total ?? searchResults?.items?.length ?? 0) / 20);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-6'>
        <div className='flex gap-6'>
          {/* Filters Sidebar */}
          {showFiltersPanel && (
            <div className='w-80 flex-shrink-0'>
              <div className='sticky top-6'>
                <EquipmentFilters
                  onFiltersChange={handleFiltersChange}
                  websiteMode={websiteMode}
                  resultsCount={countData?.total ?? searchResults?.items?.length ?? 0}
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
                  selectedCategory='All Categories' // TODO: Map categoryId back to category name
                  onCategoryChange={(category: string) => handleFiltersChange({ category })}
                  selectedLocation='All Locations' // TODO: Map cityId back to location name
                  onLocationChange={(location: string) => handleFiltersChange({ location })}
                  selectedCondition='All Conditions' // TODO: Map conditionId back to condition name
                  onConditionChange={(condition: string) => handleFiltersChange({ condition })}
                  selectedPriceRange='All Prices'
                  onPriceRangeChange={(priceRange: string) => handleFiltersChange({ priceRange })}
                  selectedYear='All Years'
                  onYearChange={(year: string) => handleFiltersChange({ year })}
                  onClearFilters={() => {
                    setFilters({});
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className='flex-1'>
            {/* Header */}
            <div className='flex items-center justify-between mb-6'>
              <div>
                <h1 className='text-2xl font-bold text-gray-900'>
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'Equipment Search'}
                </h1>
                <p className='text-gray-600 mt-1'>
                  {isLoading
                    ? 'Loading...'
                    : `${countData?.total ?? searchResults?.items?.length ?? 0} results found`}
                </p>
              </div>

              {!showFiltersPanel && (
                <Button
                  variant='outline'
                  onClick={() => setShowFiltersPanel(true)}
                  className='flex items-center gap-2'
                >
                  <Filter className='h-4 w-4' />
                  Show Filters
                </Button>
              )}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className='overflow-hidden'>
                    <Skeleton className='h-48 w-full' />
                    <CardContent className='p-4'>
                      <Skeleton className='h-4 w-3/4 mb-2' />
                      <Skeleton className='h-4 w-1/2 mb-2' />
                      <Skeleton className='h-4 w-2/3' />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className='text-center py-12'>
                <div className='text-red-500 mb-4'>
                  <Search className='h-12 w-12 mx-auto mb-4 opacity-50' />
                  <h3 className='text-lg font-semibold'>Search Error</h3>
                  <p className='text-gray-600'>
                    There was an error loading the search results. Please try again.
                  </p>
                </div>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            )}

            {/* No Results */}
            {!isLoading &&
              !error &&
              (!searchResults?.items || searchResults.items.length === 0) && (
                <div className='text-center py-12'>
                  <Search className='h-12 w-12 mx-auto mb-4 text-gray-400' />
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>No results found</h3>
                  <p className='text-gray-600 mb-4'>
                    Try adjusting your search terms or filters to find what you&apos;re looking for.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({});
                      setCurrentPage(1);
                    }}
                  >
                    Clear Search
                  </Button>
                </div>
              )}

            {/* Results Grid */}
            {!isLoading && !error && searchResults?.items && searchResults.items.length > 0 && (
              <>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
                  {searchResults.items.map(item => (
                    <Card
                      key={item.id}
                      className='overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group'
                      onClick={() => handleEquipmentClick(item)}
                    >
                      {/* Image */}
                      <div className='relative h-48 bg-gray-200'>
                        {item.images && item.images.length > 0 ? (
                          <Image
                            src={item.images[0].url}
                            alt={item.title}
                            fill
                            className='object-cover group-hover:scale-105 transition-transform duration-300'
                          />
                        ) : (
                          <Image
                            src={'/placeholder.svg'}
                            alt={item.title}
                            fill
                            className='object-cover opacity-70'
                          />
                        )}

                        {/* Badges */}
                        <div className='absolute top-3 left-3 flex gap-2'>
                          {item.isFeatured && (
                            <Badge className='bg-yellow-500 text-white'>Featured</Badge>
                          )}
                          {item.owner && (
                            <div className='flex items-center gap-2'>
                              <span className='font-medium'>{item.owner.name}</span>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className='absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                          <Button size='sm' variant='secondary' className='h-8 w-8 p-0'>
                            <Heart className='h-4 w-4' />
                          </Button>
                          <Button size='sm' variant='secondary' className='h-8 w-8 p-0'>
                            <Eye className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>

                      <CardContent className='p-4'>
                        {/* Title and Price */}
                        <div className='mb-3'>
                          <h3 className='font-semibold text-gray-900 line-clamp-2 mb-1'>
                            {item.title}
                          </h3>
                          <div className='flex items-center justify-between'>
                            <span className='text-lg font-bold text-primary'>
                              {item.price
                                ? `AED ${item.price.toLocaleString()}`
                                : 'Price on request'}
                            </span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className='space-y-2 text-sm text-gray-600'>
                          <div className='flex items-center gap-2'>
                            <Calendar className='h-4 w-4' />
                            <span>{item.year}</span>
                            {item.hours && (
                              <>
                                <Clock className='h-4 w-4 ml-2' />
                                <span>{item.hours} hrs</span>
                              </>
                            )}
                          </div>

                          <div className='flex items-center gap-2'>
                            <MapPin className='h-4 w-4' />
                            <span>
                              {item.location?.city ||
                                item.location?.state ||
                                item.location?.country ||
                                'Location not specified'}
                            </span>
                          </div>

                          {item.owner && (
                            <div className='flex items-center gap-2'>
                              <span className='font-medium'>{item.owner.name}</span>
                            </div>
                          )}
                        </div>

                        {/* Equipment Details */}
                        <div className='mt-3 space-y-1 text-sm text-muted-foreground'>
                          {item.year && (
                            <div className='flex items-center gap-1'>
                              <Calendar className='h-3 w-3' />
                              <span>{item.year}</span>
                            </div>
                          )}
                          {item.hours && (
                            <div className='flex items-center gap-1'>
                              <Clock className='h-3 w-3' />
                              <span>{item.hours} hours</span>
                            </div>
                          )}
                          {item.condition && (
                            <div className='flex items-center gap-1'>
                              <span>Condition: {item.condition}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className='flex items-center justify-center gap-2'>
                    <Button
                      variant='outline'
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className='flex items-center gap-2'
                    >
                      <ChevronLeft className='h-4 w-4' />
                      Previous
                    </Button>

                    <div className='flex items-center gap-1'>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            onClick={() => handlePageChange(page)}
                            className='w-10 h-10 p-0'
                          >
                            {page}
                          </Button>
                        );
                      })}

                      {totalPages > 5 && (
                        <>
                          <span className='px-2'>...</span>
                          <Button
                            variant={currentPage === totalPages ? 'default' : 'outline'}
                            onClick={() => handlePageChange(totalPages)}
                            className='w-10 h-10 p-0'
                          >
                            {totalPages}
                          </Button>
                        </>
                      )}
                    </div>

                    <Button
                      variant='outline'
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className='flex items-center gap-2'
                    >
                      Next
                      <ChevronRight className='h-4 w-4' />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
