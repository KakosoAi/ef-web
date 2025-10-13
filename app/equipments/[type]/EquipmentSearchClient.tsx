'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, Filter, Grid, List, MapPin, Star, Eye, Shield } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent } from '@/shared/ui/card';
import { equipmentData } from '@/shared/data/equipmentData';
import { createSlug } from '@/shared/utils/urlHelpers';

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
  const [selectedCategory, setSelectedCategory] = useState(searchParams.category || 'all');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.location || 'all');
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
      selectedCategory !== 'all' &&
      equipment.category.toLowerCase() !== selectedCategory.toLowerCase()
    ) {
      return false;
    }

    // Filter by location
    if (
      selectedLocation !== 'all' &&
      equipment.location.toLowerCase() !== selectedLocation.toLowerCase()
    ) {
      return false;
    }

    return true;
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedLocation !== 'all') params.set('location', selectedLocation);

    const queryString = params.toString();
    router.push(`/equipments/${type}${queryString ? `?${queryString}` : ''}`);
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
    <div className='container mx-auto px-4 py-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>{getTypeTitle()}</h1>
        <p className='text-gray-600 mb-6'>{getTypeDescription()}</p>

        {/* Search and Filters */}
        <div className='bg-white rounded-lg shadow-sm border p-6 mb-6'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-4'>
            <div className='md:col-span-2'>
              <Input
                placeholder={`Search ${type === 'buy' ? 'equipment for sale' : type === 'rent' ? 'equipment for rent' : 'tools'}...`}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='w-full'
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder='All Categories' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Categories</SelectItem>
                <SelectItem value='excavators'>Excavators</SelectItem>
                <SelectItem value='wheel loaders'>Wheel Loaders</SelectItem>
                <SelectItem value='cranes'>Cranes</SelectItem>
                <SelectItem value='bulldozers'>Bulldozers</SelectItem>
                <SelectItem value='backhoe loaders'>Backhoe Loaders</SelectItem>
                <SelectItem value='skid steers'>Skid Steers</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder='All Locations' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Locations</SelectItem>
                <SelectItem value='dubai'>Dubai</SelectItem>
                <SelectItem value='abu dhabi'>Abu Dhabi</SelectItem>
                <SelectItem value='sharjah'>Sharjah</SelectItem>
                <SelectItem value='ajman'>Ajman</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSearch} className='w-full md:w-auto'>
            <Search className='h-4 w-4 mr-2' />
            Search
          </Button>
        </div>

        {/* Results Header */}
        <div className='flex justify-between items-center mb-6'>
          <div>
            <p className='text-gray-600'>
              Showing {filteredEquipment.length} results
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
          <div className='flex items-center gap-4'>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className='w-40'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='relevance'>Relevance</SelectItem>
                <SelectItem value='price-low'>Price: Low to High</SelectItem>
                <SelectItem value='price-high'>Price: High to Low</SelectItem>
                <SelectItem value='newest'>Newest First</SelectItem>
                <SelectItem value='rating'>Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            <div className='flex border rounded-lg'>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size='sm'
                onClick={() => setViewMode('grid')}
              >
                <Grid className='h-4 w-4' />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size='sm'
                onClick={() => setViewMode('list')}
              >
                <List className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredEquipment.length === 0 ? (
        <div className='text-center py-12'>
          <div className='text-gray-500 mb-4'>No equipment found matching your criteria</div>
          <Button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLocation('all');
              handleSearch();
            }}
          >
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
            <Card
              key={equipment.id}
              className='cursor-pointer hover:shadow-lg transition-shadow'
              onClick={() => handleEquipmentClick(equipment)}
            >
              <CardContent className='p-0'>
                <div className='relative'>
                  <Image
                    src={equipment.image}
                    alt={equipment.title}
                    width={400}
                    height={192}
                    className='w-full h-48 object-cover rounded-t-lg'
                  />
                  {equipment.isVerified && (
                    <Badge className='absolute top-2 right-2 bg-green-500'>
                      <Shield className='h-3 w-3 mr-1' />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className='p-4'>
                  <h3 className='font-semibold text-lg mb-2'>{equipment.title}</h3>
                  <p className='text-2xl font-bold text-blue-600 mb-2'>{equipment.price}</p>
                  <div className='flex items-center gap-4 text-sm text-gray-600 mb-2'>
                    <span className='flex items-center'>
                      <MapPin className='h-4 w-4 mr-1' />
                      {equipment.location}
                    </span>
                    <span className='flex items-center'>
                      <Star className='h-4 w-4 mr-1 fill-yellow-400 text-yellow-400' />
                      {equipment.rating.toFixed(1)}
                    </span>
                    <span className='flex items-center'>
                      <Eye className='h-4 w-4 mr-1' />
                      {equipment.views}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <Badge variant='secondary'>{equipment.category}</Badge>
                    <span className='text-sm text-gray-500'>
                      {equipment.year} • {equipment.condition}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
