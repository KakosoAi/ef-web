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
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <div className='bg-card border-b border-border'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <h1 className='text-3xl font-bold text-foreground'>{getTypeTitle()}</h1>
          <p className='text-muted-foreground mt-2'>{getTypeDescription()}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex gap-8'>
          {/* Left Sidebar - Filters */}
          <div className='w-80 flex-shrink-0'>
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

          {/* Main Content Area */}
          <div className='flex-1'>
            {/* Results Header */}
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-4'>
                <span className='text-sm text-muted-foreground'>
                  {filteredEquipment.length} results found
                </span>
              </div>

              <div className='flex items-center gap-4'>
                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className='w-48'>
                    <SelectValue placeholder='Sort by' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='relevance'>Sort by Relevance</SelectItem>
                    <SelectItem value='price-low'>Price: Low to High</SelectItem>
                    <SelectItem value='price-high'>Price: High to Low</SelectItem>
                    <SelectItem value='newest'>Newest First</SelectItem>
                    <SelectItem value='rating'>Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className='flex border border-border rounded-lg'>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size='sm'
                    onClick={() => setViewMode('grid')}
                    className='rounded-r-none'
                  >
                    <Grid3X3 className='h-4 w-4' />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size='sm'
                    onClick={() => setViewMode('list')}
                    className='rounded-l-none'
                  >
                    <List className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>

            {/* Equipment Grid/List */}
            {filteredEquipment.length === 0 ? (
              <div className='text-center py-12'>
                <p className='text-muted-foreground mb-4'>
                  No equipment found matching your criteria.
                </p>
                <Button onClick={handleClearFilters} variant='outline'>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredEquipment.map(equipment => (
                  <div
                    key={equipment.id}
                    className='card-featured cursor-pointer group'
                    onClick={() => handleEquipmentClick(equipment)}
                  >
                    {/* Image Container */}
                    <div className='relative aspect-[4/3] overflow-hidden rounded-t-lg'>
                      <Image
                        src={equipment.image}
                        alt={equipment.title}
                        width={400}
                        height={300}
                        className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                      />

                      {/* Overlay Controls */}
                      <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300'>
                        <div className='absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <Button
                            size='sm'
                            variant='secondary'
                            className='h-8 w-8 p-0 bg-white/90 hover:bg-white'
                            onClick={e => {
                              e.stopPropagation();
                              // Handle favorite
                            }}
                          >
                            <Heart className='h-4 w-4' />
                          </Button>
                          <Button
                            size='sm'
                            variant='secondary'
                            className='h-8 w-8 p-0 bg-white/90 hover:bg-white'
                            onClick={e => {
                              e.stopPropagation();
                              // Handle contact
                            }}
                          >
                            <Phone className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className='absolute top-3 left-3 flex flex-col gap-2'>
                        {equipment.isVerified && (
                          <Badge variant='secondary' className='bg-green-500 text-white'>
                            <Shield className='h-3 w-3 mr-1' />
                            Verified
                          </Badge>
                        )}
                        <Badge variant='secondary' className='bg-primary text-primary-foreground'>
                          {equipment.condition}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className='p-4'>
                      <div className='flex items-start justify-between mb-2'>
                        <h3 className='font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors'>
                          {equipment.title}
                        </h3>
                        <span className='text-lg font-bold text-primary ml-2'>
                          {equipment.price}
                        </span>
                      </div>

                      {/* Key Details */}
                      <div className='space-y-1 mb-3'>
                        <div className='flex items-center justify-between text-sm text-muted-foreground'>
                          <span>{equipment.year}</span>
                          <span className='flex items-center'>
                            <MapPin className='h-3 w-3 mr-1' />
                            {equipment.location}
                          </span>
                        </div>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                          <span className='flex items-center gap-1'>
                            <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                            {equipment.rating.toFixed(1)}
                          </span>
                          <span>•</span>
                          <span className='flex items-center gap-1'>
                            <Eye className='h-3 w-3' />
                            {equipment.views}
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button
                        className='w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors'
                        variant='outline'
                      >
                        View Details
                        <ArrowRight className='ml-2 h-4 w-4' />
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
