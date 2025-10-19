'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Skeleton } from '@/shared/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import {
  Grid3X3,
  List,
  Heart,
  Phone,
  ArrowRight,
  Shield,
  MapPin,
  Star,
  Eye,
  Search,
  Filter,
} from 'lucide-react';
import { useSearch } from '@/shared/hooks/use-search';
import { SearchQueryParams } from '@/shared/types/search';
import { createSlug } from '@/shared/utils/urlHelpers';
import EquipmentFilters from '@/features/equipment/components/EquipmentFilters';

interface EquipmentSearchClientProps {
  type: string;
  searchParams: {
    q?: string;
    category?: string;
    location?: string;
    priceMin?: string;
    priceMax?: string;
    page?: string;
  };
}

export default function EquipmentSearchClient({ type, searchParams }: EquipmentSearchClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParams.q || '');
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.category || 'All Categories'
  );
  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.location || 'All Locations'
  );
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.page || '1'));

  // Build search filters - convert to proper SearchQueryParams format
  const searchFilters: SearchQueryParams = {
    searchText: searchQuery,
    // Remove the 'type' field as it's not part of SearchQueryParams
    // TODO: Map type to appropriate categoryId or typeId
    page: currentPage,
    limit: 20,
    sort: getSortValue(sortBy),
    priceMin: searchParams.priceMin ? parseFloat(searchParams.priceMin) : undefined,
    priceMax: searchParams.priceMax ? parseFloat(searchParams.priceMax) : undefined,
    // TODO: Convert string filters to IDs when we have the mapping
    // categoryId: selectedCategory !== 'All Categories' ? getCategoryId(selectedCategory) : undefined,
    // cityId: selectedLocation !== 'All Locations' ? getCityId(selectedLocation) : undefined,
    // conditionId: selectedCondition !== 'All Conditions' ? getConditionId(selectedCondition) : undefined,
  };

  // Helper function to map sort values
  function getSortValue(
    sortBy: string
  ): 'recent' | 'older' | 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' {
    switch (sortBy) {
      case 'relevance':
        return 'recent';
      case 'price-low':
        return 'price_asc';
      case 'price-high':
        return 'price_desc';
      case 'year-new':
        return 'recent'; // Newest first is similar to recent
      case 'year-old':
        return 'older'; // Oldest first
      default:
        return 'recent';
    }
  }

  // Use the search hook
  const { data: searchResults, isLoading, error } = useSearch(searchFilters);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory !== 'All Categories') params.set('category', selectedCategory);
    if (selectedLocation !== 'All Locations') params.set('location', selectedLocation);
    if (searchParams.priceMin) params.set('priceMin', searchParams.priceMin);
    if (searchParams.priceMax) params.set('priceMax', searchParams.priceMax);
    if (currentPage > 1) params.set('page', currentPage.toString());

    const newUrl = `/equipments/${type}${params.toString() ? `?${params.toString()}` : ''}`;
    router.replace(newUrl, { scroll: false });
  }, [
    searchQuery,
    selectedCategory,
    selectedLocation,
    currentPage,
    type,
    router,
    searchParams.priceMin,
    searchParams.priceMax,
  ]);

  // Handle equipment click
  type ClickItem = { id: number; title: string; priceType?: string };
  const handleEquipmentClick = (equipment: ClickItem) => {
    const slug = equipment.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const equipmentType = equipment.priceType === 'For Rent' ? 'rent' : 'buy';
    router.push(`/equipments/${equipmentType}/${slug}/${equipment.id}`);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedLocation('All Locations');
    setSelectedCondition('All Conditions');
    setSelectedPriceRange('All Prices');
    setSelectedYear('All Years');
    setCurrentPage(1);
  };

  // Get equipment data from search results
  const equipment = searchResults?.items || [];
  const totalResults = searchResults?.pagination?.total || 0;
  const hasMore = searchResults?.pagination?.hasNext || false;

  const getTypeTitle = () => {
    switch (type) {
      case 'rent':
        return 'Equipment for Rent';
      case 'buy':
        return 'Equipment for Sale';
      case 'tools':
        return 'Tools for Rent';
      default:
        return 'Equipment Search';
    }
  };

  const getTypeDescription = () => {
    switch (type) {
      case 'rent':
        return 'Find heavy equipment available for rent in the Middle East';
      case 'buy':
        return 'Browse heavy equipment for sale from verified dealers';
      case 'tools':
        return 'Rent construction tools and specialized equipment';
      default:
        return 'Search for equipment and tools';
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30'>
      {/* Main Content */}
      <div className='max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-10'>
        <div className='flex gap-8 lg:gap-10'>
          {/* Left Sidebar - Filters */}
          <div className='hidden lg:block w-80 flex-shrink-0'>
            <div className='sticky top-8 z-20'>
              <div className='backdrop-blur-xl bg-white/90 border border-white/30 rounded-2xl shadow-xl shadow-gray-300/30 p-0 overflow-hidden'>
                <EquipmentFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  selectedLocation={selectedLocation}
                  onLocationChange={setSelectedLocation}
                  selectedCondition={selectedCondition}
                  onConditionChange={setSelectedCondition}
                  selectedPriceRange={selectedPriceRange}
                  onPriceRangeChange={setSelectedPriceRange}
                  selectedYear={selectedYear}
                  onYearChange={setSelectedYear}
                  resultsCount={totalResults}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>
          </div>

          {/* Mobile Filter Drawer/Overlay - Hidden by default, shown on mobile */}
          <div
            className='lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden'
            id='mobile-filter-overlay'
          >
            <div
              className='absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform -translate-x-full transition-transform duration-300'
              id='mobile-filter-drawer'
            >
              <div className='p-6 h-full overflow-y-auto'>
                <div className='flex items-center justify-end mb-6'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 w-8 p-0'
                    onClick={() => {
                      const overlay = document.getElementById('mobile-filter-overlay');
                      const drawer = document.getElementById('mobile-filter-drawer');
                      if (overlay && drawer) {
                        drawer.classList.add('-translate-x-full');
                        setTimeout(() => overlay.classList.add('hidden'), 300);
                      }
                    }}
                  >
                    ×
                  </Button>
                </div>
                <EquipmentFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  selectedLocation={selectedLocation}
                  onLocationChange={setSelectedLocation}
                  selectedCondition={selectedCondition}
                  onConditionChange={setSelectedCondition}
                  selectedPriceRange={selectedPriceRange}
                  onPriceRangeChange={setSelectedPriceRange}
                  selectedYear={selectedYear}
                  onYearChange={setSelectedYear}
                  resultsCount={totalResults}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className='flex-1 min-w-0 relative z-30 bg-gradient-to-br from-gray-50/30 via-white to-gray-50/20 min-h-screen'>
            {/* Mobile Filter Toggle Button */}
            <div className='lg:hidden mb-6'>
              <Button
                variant='outline'
                className='w-full bg-white/90 backdrop-blur-sm border-gray-200/60 text-gray-700 hover:bg-white hover:border-orange-200 transition-all duration-300 rounded-xl py-3 tracking-wide'
                onClick={() => {
                  const overlay = document.getElementById('mobile-filter-overlay');
                  const drawer = document.getElementById('mobile-filter-drawer');
                  if (overlay && drawer) {
                    overlay.classList.remove('hidden');
                    setTimeout(() => drawer.classList.remove('-translate-x-full'), 10);
                  }
                }}
              >
                <Grid3X3 className='h-4 w-4 mr-2' />
                Filters ({searchResults?.items?.length || 0} results)
              </Button>
            </div>

            {/* Results Header */}
            <div className='flex items-center justify-between mb-8'>
              <div className='flex items-center gap-4'>
                <span className='text-lg font-medium text-gray-700'>
                  {isLoading ? 'Loading...' : `${totalResults} results found`}
                </span>
              </div>

              <div className='flex items-center gap-4'>
                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className='w-48 h-10 bg-white/90 backdrop-blur-sm border-gray-200 shadow-md rounded-lg'>
                    <SelectValue placeholder='Sort by' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='relevance'>Most Relevant</SelectItem>
                    <SelectItem value='price-low'>Price: Low to High</SelectItem>
                    <SelectItem value='price-high'>Price: High to Low</SelectItem>
                    <SelectItem value='year-new'>Year: Newest First</SelectItem>
                    <SelectItem value='year-old'>Year: Oldest First</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className='flex items-center bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-1 shadow-md'>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size='sm'
                    onClick={() => setViewMode('grid')}
                    className={`h-8 px-3 rounded-md ${viewMode === 'grid' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <Grid3X3 className='h-4 w-4' />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size='sm'
                    onClick={() => setViewMode('list')}
                    className={`h-8 px-3 rounded-md ${viewMode === 'list' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <List className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>

            {/* Equipment Grid/List */}
            {isLoading ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8'>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className='bg-white rounded-2xl overflow-hidden shadow-lg'>
                    <Skeleton className='aspect-[4/3] w-full' />
                    <div className='p-6 space-y-4'>
                      <Skeleton className='h-4 w-3/4' />
                      <Skeleton className='h-6 w-1/2' />
                      <div className='flex justify-between'>
                        <Skeleton className='h-4 w-16' />
                        <Skeleton className='h-4 w-20' />
                      </div>
                      <Skeleton className='h-10 w-full' />
                    </div>
                  </div>
                ))}
              </div>
            ) : equipment.length === 0 ? (
              <div className='text-center py-16'>
                <div className='mx-auto w-24 h-24 bg-gray-100/60 rounded-full flex items-center justify-center mb-6'>
                  <Search className='h-8 w-8 text-gray-400' />
                </div>
                <h3 className='text-lg font-medium text-gray-900 mb-2 tracking-wide'>
                  No equipment found
                </h3>
                <p className='text-gray-500 max-w-md mx-auto leading-relaxed tracking-wide mb-6'>
                  Try adjusting your filters or search terms to find what you&apos;re looking for.
                </p>
                <Button
                  onClick={handleClearFilters}
                  variant='outline'
                  className='bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 hover:from-orange-600 hover:to-amber-600 shadow-lg px-6 py-2'
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 auto-rows-fr'
                    : 'space-y-6'
                }
              >
                {equipment.map(item => (
                  <div
                    key={item.id}
                    className='group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border-0 ring-1 ring-gray-100/50 hover:ring-gray-200/80 cursor-pointer hover:scale-[1.02] hover:-translate-y-1 transform-gpu'
                    onClick={() => handleEquipmentClick(item)}
                  >
                    {/* Image Container */}
                    <div className='relative aspect-[4/3] overflow-hidden'>
                      <Image
                        src={item.images?.[0]?.url || '/placeholder.svg'}
                        alt={item.title}
                        width={320}
                        height={240}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out'
                      />

                      {/* Modern Compact Badges - Top Left */}
                      <div className='absolute top-2 left-2 flex flex-col gap-1'>
                        <div className='bg-orange-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium shadow-sm w-fit'>
                          Rent
                        </div>
                        {item.isFeatured && (
                          <div className='bg-green-500/90 backdrop-blur-sm text-white p-1 rounded-md shadow-sm flex items-center justify-center w-fit'>
                            <Shield className='h-3 w-3' />
                          </div>
                        )}
                      </div>

                      {/* Condition Badge - Top Right */}
                      <div className='absolute top-2 right-2'>
                        <div className='bg-blue-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium shadow-sm'>
                          {item.condition || 'Good'}
                        </div>
                      </div>

                      {/* AI Map Icon - Bottom Right Corner */}
                      <div className='absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                        <Button
                          size='sm'
                          variant='secondary'
                          className='h-7 w-7 p-0 bg-blue-500/90 hover:bg-blue-600 text-white border-0 rounded-full shadow-lg backdrop-blur-sm'
                          onClick={e => {
                            e.stopPropagation();
                            // Navigate to AI map page for this equipment
                            window.open(`/ai-map-search?equipment=${item.id}`, '_blank');
                          }}
                          title='View on AI Map'
                        >
                          <MapPin className='h-3 w-3' />
                        </Button>
                      </div>

                      {/* Overlay Controls - Hidden by default, shown on hover */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300'>
                        <div className='absolute bottom-2 left-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
                          <Button
                            size='sm'
                            variant='secondary'
                            className='h-7 w-7 p-0 bg-white/95 hover:bg-white backdrop-blur-sm shadow-lg border-0 rounded-full'
                            onClick={e => {
                              e.stopPropagation();
                              // Handle favorite
                            }}
                          >
                            <Heart className='h-3 w-3 text-gray-700' />
                          </Button>
                          <Button
                            size='sm'
                            variant='secondary'
                            className='h-7 w-7 p-0 bg-white/95 hover:bg-white backdrop-blur-sm shadow-lg border-0 rounded-full'
                            onClick={e => {
                              e.stopPropagation();
                              // Handle contact
                            }}
                          >
                            <Phone className='h-3 w-3 text-gray-700' />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className='p-6 space-y-4'>
                      {/* Title */}
                      <h3 className='font-medium text-base text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-500 line-clamp-1 tracking-wide leading-relaxed'>
                        {item.title}
                      </h3>

                      {/* Price */}
                      <div className='mb-4'>
                        <span className='text-lg font-semibold bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 bg-clip-text text-transparent tracking-wide'>
                          {item.price}
                        </span>
                      </div>

                      {/* Details Row - Simplified */}
                      <div className='flex items-center justify-between text-sm text-gray-500 mb-4 tracking-wide'>
                        <span className='font-normal leading-relaxed'>{item.year || 'N/A'}</span>
                        <span className='flex items-center font-normal leading-relaxed'>
                          <MapPin className='h-3 w-3 mr-1.5 text-orange-500' />
                          {item.location?.city ||
                            item.location?.state ||
                            item.location?.country ||
                            'Location not specified'}
                        </span>
                      </div>

                      {/* Action Button */}
                      <Button
                        className='w-full bg-gray-50/80 border border-gray-200/60 text-gray-600 hover:bg-white hover:border-orange-200 font-normal transition-all duration-500 group-hover:border-orange-300 group-hover:text-orange-600 rounded-xl py-2.5 tracking-wide backdrop-blur-sm'
                        variant='outline'
                      >
                        View Details
                        <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && equipment.length > 0 && (
              <div className='flex justify-center items-center gap-4 mt-12'>
                <Button
                  variant='outline'
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className='bg-white/90 backdrop-blur-sm border-gray-200'
                >
                  Previous
                </Button>

                <div className='flex items-center gap-2'>
                  {Array.from({ length: Math.min(5, Math.ceil(totalResults / 20)) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                            : 'bg-white/90 backdrop-blur-sm border-gray-200'
                        }`}
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant='outline'
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!hasMore}
                  className='bg-white/90 backdrop-blur-sm border-gray-200'
                >
                  Next
                </Button>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className='text-center py-16'>
                <div className='mx-auto w-24 h-24 bg-red-100/60 rounded-full flex items-center justify-center mb-6'>
                  <Search className='h-8 w-8 text-red-400' />
                </div>
                <h3 className='text-lg font-medium text-gray-900 mb-2 tracking-wide'>
                  Error loading equipment
                </h3>
                <p className='text-gray-600 mb-6 tracking-wide'>
                  There was an error loading the equipment. Please try again.
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  className='bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-3 rounded-xl font-medium tracking-wide'
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
