'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Grid3X3, List, Heart, Phone, ArrowRight, Shield, MapPin, Star, Eye } from 'lucide-react';
import { equipmentData } from '@/shared/data/equipmentData';
import { createSlug } from '@/shared/utils/urlHelpers';
import EquipmentFilters from '@/features/equipment/components/EquipmentFilters';

interface Equipment {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  location: string;
  category: string;
  condition: string;
  image: string;
  rating: number;
  views: number;
  isVerified: boolean;
  type: 'sale' | 'rent' | 'tools';
}

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

  // Convert equipment data to match our interface
  const convertedEquipment: Equipment[] = equipmentData.map(item => ({
    id: item.id,
    title: item.title,
    brand: item.specifications.brand || 'Unknown',
    model: item.specifications.model || 'Unknown',
    year: parseInt(item.specifications.year || '2020'),
    price: item.price,
    location: item.location.city,
    category: item.category,
    condition: item.condition,
    image: item.images[0] || '/assets/equipment/cat-320d-excavator-1.jpg',
    rating: 4.5 + Math.random() * 0.5, // Mock rating
    views: Math.floor(Math.random() * 2000) + 100,
    isVerified: item.seller.verified,
    type: type === 'buy' ? 'sale' : (type as 'rent' | 'tools'),
  }));

  // Filter equipment based on type and search params
  const filteredEquipment = convertedEquipment.filter(equipment => {
    // Filter by type
    if (type === 'buy' && equipment.type !== 'sale') return false;
    if (type === 'rent' && equipment.type !== 'rent') return false;
    if (type === 'tools' && equipment.type !== 'tools') return false;

    // Filter by search query
    if (
      searchQuery &&
      !equipment.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !equipment.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !equipment.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (
      selectedCategory !== 'All Categories' &&
      equipment.category.toLowerCase() !== selectedCategory.toLowerCase()
    ) {
      return false;
    }

    // Filter by location
    if (
      selectedLocation !== 'All Locations' &&
      equipment.location.toLowerCase() !== selectedLocation.toLowerCase()
    ) {
      return false;
    }

    // Filter by condition
    if (
      selectedCondition !== 'All Conditions' &&
      equipment.condition.toLowerCase() !== selectedCondition.toLowerCase()
    ) {
      return false;
    }

    // Filter by price range
    if (selectedPriceRange !== 'All Prices') {
      const price = parseFloat(equipment.price.replace(/[^0-9.]/g, ''));
      switch (selectedPriceRange) {
        case 'Under AED 50,000':
          if (price >= 50000) return false;
          break;
        case 'AED 50,000 - 100,000':
          if (price < 50000 || price > 100000) return false;
          break;
        case 'AED 100,000 - 250,000':
          if (price < 100000 || price > 250000) return false;
          break;
        case 'AED 250,000 - 500,000':
          if (price < 250000 || price > 500000) return false;
          break;
        case 'Over AED 500,000':
          if (price <= 500000) return false;
          break;
      }
    }

    // Filter by year
    if (selectedYear !== 'All Years') {
      if (selectedYear === 'Before 2018') {
        if (equipment.year >= 2018) return false;
      } else if (equipment.year.toString() !== selectedYear) {
        return false;
      }
    }

    return true;
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory !== 'All Categories') params.set('category', selectedCategory);
    if (selectedLocation !== 'All Locations') params.set('location', selectedLocation);

    const queryString = params.toString();
    router.push(`/equipments/${type}${queryString ? `?${queryString}` : ''}`);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedLocation('All Locations');
    setSelectedCondition('All Conditions');
    setSelectedPriceRange('All Prices');
    setSelectedYear('All Years');
    handleSearch();
  };

  const handleEquipmentClick = (equipment: Equipment) => {
    const slug = createSlug(equipment.title);
    const equipmentType = equipment.type === 'sale' ? 'buy' : equipment.type;
    router.push(`/products/${equipmentType}/${slug}/${equipment.id}`);
  };

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
                  resultsCount={filteredEquipment.length}
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
                  resultsCount={filteredEquipment.length}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className='flex-1 min-w-0 relative z-30'>
            {/* Mobile Filter Toggle Button */}
            <div className='lg:hidden mb-6'>
              <Button
                variant='outline'
                className='bg-white/90 backdrop-blur-sm border-gray-200 shadow-md rounded-lg px-4 py-2'
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
                Filters ({filteredEquipment.length} results)
              </Button>
            </div>

            {/* Results Header */}
            <div className='flex items-center justify-between mb-8'>
              <div className='flex items-center gap-4'>
                <span className='text-lg font-medium text-gray-700'>
                  {filteredEquipment.length} results found
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
            {filteredEquipment.length === 0 ? (
              <div className='text-center py-16'>
                <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg shadow-gray-300/20 p-12 border border-white/40'>
                  <p className='text-gray-600 mb-6 text-base'>
                    No equipment found matching your criteria.
                  </p>
                  <Button
                    onClick={handleClearFilters}
                    variant='outline'
                    className='bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 hover:from-orange-600 hover:to-amber-600 shadow-lg px-6 py-2'
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-6'
                }
              >
                {filteredEquipment.map(equipment => (
                  <div
                    key={equipment.id}
                    className='bg-white rounded-2xl shadow-lg shadow-gray-200/60 border border-gray-100 cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/40 hover:scale-[1.03] hover:-translate-y-2 overflow-hidden'
                    onClick={() => handleEquipmentClick(equipment)}
                  >
                    {/* Image Container */}
                    <div className='relative aspect-[4/3] overflow-hidden'>
                      <Image
                        src={equipment.image}
                        alt={equipment.title}
                        width={320}
                        height={240}
                        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                      />

                      {/* Modern Compact Badges - Top Left */}
                      <div className='absolute top-2 left-2 flex flex-col gap-1'>
                        <div className='bg-orange-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium shadow-sm w-fit'>
                          Rent
                        </div>
                        {equipment.isVerified && (
                          <div className='bg-green-500/90 backdrop-blur-sm text-white p-1 rounded-md shadow-sm flex items-center justify-center w-fit'>
                            <Shield className='h-3 w-3' />
                          </div>
                        )}
                      </div>

                      {/* Condition Badge - Top Right */}
                      <div className='absolute top-2 right-2'>
                        <div className='bg-blue-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium shadow-sm'>
                          {equipment.condition}
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
                            window.open(`/ai-map-search?equipment=${equipment.id}`, '_blank');
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
                    <div className='p-4'>
                      {/* Title */}
                      <h3 className='font-medium text-base text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300 line-clamp-1'>
                        {equipment.title}
                      </h3>

                      {/* Price */}
                      <div className='mb-3'>
                        <span className='text-lg font-semibold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent'>
                          {equipment.price}
                        </span>
                      </div>

                      {/* Details Row - Simplified */}
                      <div className='flex items-center justify-between text-sm text-gray-600 mb-3'>
                        <span className='font-normal'>{equipment.year}</span>
                        <span className='flex items-center font-normal'>
                          <MapPin className='h-3 w-3 mr-1 text-orange-500' />
                          {equipment.location}
                        </span>
                      </div>

                      {/* Action Button */}
                      <Button
                        className='w-full bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-normal transition-all duration-300 group-hover:border-orange-500 group-hover:text-orange-600 rounded-lg py-2'
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
          </div>
        </div>
      </div>
    </div>
  );
}
