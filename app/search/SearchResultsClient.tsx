'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Badge } from '@/shared/ui/badge';
import { Search, Filter, MapPin, Star, Grid3X3, List } from 'lucide-react';

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
  type: 'sale' | 'rent';
}

const mockEquipment: Equipment[] = [
  {
    id: '1',
    title: 'CAT 320D Excavator',
    brand: 'Caterpillar',
    model: '320D',
    year: 2019,
    price: 'AED 185,000',
    location: 'Dubai',
    category: 'Excavators',
    condition: 'Excellent',
    image: '/assets/equipment/cat-320d-excavator-1.jpg',
    rating: 4.8,
    views: 1250,
    isVerified: true,
    type: 'sale',
  },
  {
    id: '2',
    title: 'Liebherr LTM 1060-3.1 Crane',
    brand: 'Liebherr',
    model: 'LTM 1060-3.1',
    year: 2020,
    price: 'AED 850/day',
    location: 'Abu Dhabi',
    category: 'Cranes',
    condition: 'Like New',
    image: '/assets/equipment/liebherr-crane.jpg',
    rating: 4.9,
    views: 890,
    isVerified: true,
    type: 'rent',
  },
  {
    id: '3',
    title: 'CAT Bulldozer D6T',
    brand: 'Caterpillar',
    model: 'D6T',
    year: 2018,
    price: 'AED 320,000',
    location: 'Sharjah',
    category: 'Bulldozers',
    condition: 'Good',
    image: '/assets/equipment/cat-bulldozer.jpg',
    rating: 4.6,
    views: 675,
    isVerified: true,
    type: 'sale',
  },
  {
    id: '4',
    title: 'CAT Wheel Loader 950M',
    brand: 'Caterpillar',
    model: '950M',
    year: 2020,
    price: 'AED 450,000',
    location: 'Dubai',
    category: 'Wheel Loaders',
    condition: 'Excellent',
    image: '/assets/equipment/cat-wheel-loader.jpg',
    rating: 4.7,
    views: 892,
    isVerified: true,
    type: 'sale',
  },
  {
    id: '5',
    title: 'Dump Truck Mercedes Actros',
    brand: 'Mercedes',
    model: 'Actros 4141',
    year: 2019,
    price: 'AED 285,000',
    location: 'Abu Dhabi',
    category: 'Dump Trucks',
    condition: 'Good',
    image: '/assets/equipment/dump-truck.jpg',
    rating: 4.5,
    views: 543,
    isVerified: false,
    type: 'sale',
  },
  {
    id: '6',
    title: 'Scissor Lift JLG 2646ES',
    brand: 'JLG',
    model: '2646ES',
    year: 2021,
    price: 'AED 120/day',
    location: 'Dubai',
    category: 'Aerial Lifts',
    condition: 'Like New',
    image: '/assets/equipment/scissor-lift.jpg',
    rating: 4.8,
    views: 234,
    isVerified: true,
    type: 'rent',
  },
  {
    id: '7',
    title: 'CAT 320D Excavator (Used)',
    brand: 'Caterpillar',
    model: '320D',
    year: 2017,
    price: 'AED 165,000',
    location: 'Ajman',
    category: 'Excavators',
    condition: 'Good',
    image: '/assets/equipment/cat-320d-excavator-2.jpg',
    rating: 4.4,
    views: 456,
    isVerified: true,
    type: 'sale',
  },
  {
    id: '8',
    title: 'CAT 320D Excavator (Premium)',
    brand: 'Caterpillar',
    model: '320D',
    year: 2022,
    price: 'AED 220,000',
    location: 'Dubai',
    category: 'Excavators',
    condition: 'Like New',
    image: '/assets/equipment/cat-320d-excavator-3.jpg',
    rating: 4.9,
    views: 1123,
    isVerified: true,
    type: 'sale',
  },
];

export default function SearchResultsClient() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>(mockEquipment);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || '';
    setSearchTerm(query);

    let filtered = mockEquipment;

    // Filter by search query
    if (query) {
      filtered = filtered.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.brand.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by type
    if (type) {
      if (type === 'sale') {
        filtered = filtered.filter(item => item.type === 'sale');
      } else if (type === 'rent') {
        filtered = filtered.filter(item => item.type === 'rent');
      } else if (type === 'tools') {
        // For tools, we can filter by category or add a tools-specific filter
        filtered = filtered.filter(
          item =>
            item.category.toLowerCase().includes('tool') ||
            item.category.toLowerCase().includes('lift') ||
            item.type === 'rent'
        );
      }
    }

    setFilteredEquipment(filtered);
  }, [searchParams]);

  // Handle real-time search input changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);

    let filtered = mockEquipment;
    const type = searchParams.get('type') || '';

    // Filter by search query
    if (value) {
      filtered = filtered.filter(
        item =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.brand.toLowerCase().includes(value.toLowerCase()) ||
          item.category.toLowerCase().includes(value.toLowerCase())
      );
    }

    // Filter by type
    if (type) {
      if (type === 'sale') {
        filtered = filtered.filter(item => item.type === 'sale');
      } else if (type === 'rent') {
        filtered = filtered.filter(item => item.type === 'rent');
      } else if (type === 'tools') {
        filtered = filtered.filter(
          item =>
            item.category.toLowerCase().includes('tool') ||
            item.category.toLowerCase().includes('lift') ||
            item.type === 'rent'
        );
      }
    }

    setFilteredEquipment(filtered);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-4'>Search Results</h1>
        <div className='flex flex-col md:flex-row gap-4 mb-6'>
          <div className='flex-1'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
              <Input
                placeholder='Search equipment...'
                value={searchTerm}
                onChange={e => handleSearchChange(e.target.value)}
                className='pl-10'
              />
            </div>
          </div>
          <Button variant='outline' className='flex items-center gap-2'>
            <Filter className='h-4 w-4' />
            Filters
          </Button>
          <div className='flex items-center gap-2'>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size='sm'
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className='h-4 w-4' />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size='sm'
              onClick={() => setViewMode('list')}
            >
              <List className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
      >
        {filteredEquipment.map(equipment => (
          <div
            key={equipment.id}
            className='card-featured group cursor-pointer'
            onClick={() => {
              const slug = equipment.title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
              const type = equipment.type === 'sale' ? 'buy' : 'rent';
              window.location.href = `/products/${type}/${slug}/${equipment.id}`;
            }}
          >
            <div className='relative overflow-hidden rounded-lg'>
              <Image
                src={equipment.image}
                alt={equipment.title}
                className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
                width={400}
                height={192}
              />

              {/* Overlay Controls */}
              <div className='absolute top-3 left-3 right-3 flex justify-between items-start'>
                <div className='flex flex-col gap-2'>
                  <Badge
                    className='bg-black/80 text-white border-0 hover:bg-black/90'
                    variant={equipment.type === 'sale' ? 'default' : 'secondary'}
                  >
                    {equipment.type === 'sale' ? 'For Sale' : 'For Rent'}
                  </Badge>
                  {equipment.isVerified && (
                    <Badge className='bg-green-600/90 text-white border-0 hover:bg-green-700/90'>
                      Verified
                    </Badge>
                  )}
                </div>
                <div className='flex gap-2'>
                  <button className='p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors'>
                    <Star className='w-4 h-4 text-gray-600' />
                  </button>
                </div>
              </div>

              {/* Condition Badge */}
              <div className='absolute bottom-3 left-3'>
                <Badge className='bg-white/90 text-gray-800 border-0 hover:bg-white'>
                  {equipment.condition}
                </Badge>
              </div>
            </div>

            <div className='p-4'>
              <h3 className='font-semibold text-lg mb-2'>{equipment.title}</h3>
              <p className='text-muted-foreground mb-2'>
                {equipment.brand} • {equipment.model} • {equipment.year}
              </p>
              <div className='flex items-center gap-2 mb-2'>
                <MapPin className='h-4 w-4 text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>{equipment.location}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='font-bold text-lg text-primary'>{equipment.price}</span>
                <div className='flex items-center gap-1'>
                  <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                  <span className='text-sm'>{equipment.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
