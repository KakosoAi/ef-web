'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { EquipmentAd, equipmentCategories, priceRanges } from '@/shared/data/mockEquipmentData';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent } from '@/shared/ui/card';
import {
  Search,
  MapPin,
  Star,
  Shield,
  Clock,
  Filter,
  ChevronDown,
  Heart,
  Share2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

interface EquipmentListProps {
  equipment: EquipmentAd[];
  selectedEquipment: EquipmentAd | null;
  onEquipmentClick: (equipment: EquipmentAd) => void;
  onFilterChange: (filteredEquipment: EquipmentAd[]) => void;
  className?: string;
}

export default function EquipmentList({
  equipment,
  selectedEquipment,
  onEquipmentClick,
  onFilterChange,
  className = '',
}: EquipmentListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');

  // Use ref to store the callback to avoid dependency issues
  const onFilterChangeRef = useRef(onFilterChange);
  onFilterChangeRef.current = onFilterChange;

  // Filter equipment based on search and filters using useMemo
  const filteredEquipment = useMemo(() => {
    return equipment.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All Categories' || item.category === selectedCategory;

      const matchesPrice = (() => {
        if (selectedPriceRange === 'All Prices') return true;
        const price = parseInt(item.price.replace(/[$,]/g, ''));
        switch (selectedPriceRange) {
          case 'Under $50,000':
            return price < 50000;
          case '$50,000 - $100,000':
            return price >= 50000 && price <= 100000;
          case '$100,000 - $150,000':
            return price >= 100000 && price <= 150000;
          case 'Over $150,000':
            return price > 150000;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [equipment, searchTerm, selectedCategory, selectedPriceRange]);

  // Update parent component when filters change
  useEffect(() => {
    onFilterChangeRef.current(filteredEquipment);
  }, [filteredEquipment]);

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Search and Filters Header */}
      <div className='p-4 border-b bg-white'>
        <div className='space-y-3'>
          {/* Search Input */}
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <Input
              placeholder='Search equipment, location, or description...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>

          {/* Filter Dropdowns */}
          <div className='flex gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='flex-1'>
                  <Filter className='w-4 h-4 mr-2' />
                  {selectedCategory}
                  <ChevronDown className='w-4 h-4 ml-auto' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className='w-48'>
                {equipmentCategories.map(category => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 'bg-blue-50' : ''}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='flex-1'>
                  {selectedPriceRange}
                  <ChevronDown className='w-4 h-4 ml-auto' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-48'>
                {priceRanges.map(range => (
                  <DropdownMenuItem
                    key={range}
                    onClick={() => setSelectedPriceRange(range)}
                    className={selectedPriceRange === range ? 'bg-blue-50' : ''}
                  >
                    {range}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Results Count */}
          <div className='text-sm text-gray-600'>{filteredEquipment.length} equipment found</div>
        </div>
      </div>

      {/* Equipment List */}
      <div className='flex-1 overflow-y-auto'>
        <div className='p-4 space-y-4'>
          {filteredEquipment.map(item => (
            <Card
              key={item.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedEquipment?.id === item.id
                  ? 'ring-2 ring-blue-500 shadow-md'
                  : 'hover:shadow-sm'
              }`}
              onClick={() => onEquipmentClick(item)}
            >
              <CardContent className='p-4'>
                <div className='space-y-3'>
                  {/* Header */}
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <h3 className='font-semibold text-gray-900 leading-tight'>{item.title}</h3>
                      <div className='flex items-center gap-2 mt-1'>
                        <Badge variant='secondary' className='text-xs'>
                          {item.category}
                        </Badge>
                        <Badge
                          variant={item.condition === 'New' ? 'default' : 'outline'}
                          className='text-xs'
                        >
                          {item.condition}
                        </Badge>
                      </div>
                    </div>
                    <div className='flex items-center gap-1 ml-2'>
                      <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                        <Heart className='w-4 h-4' />
                      </Button>
                      <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                        <Share2 className='w-4 h-4' />
                      </Button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className='text-2xl font-bold text-blue-600'>{item.price}</div>

                  {/* Location */}
                  <div className='flex items-center text-sm text-gray-600'>
                    <MapPin className='w-4 h-4 mr-1 flex-shrink-0' />
                    <span className='truncate'>
                      {item.location.address}, {item.location.city}
                    </span>
                  </div>

                  {/* Seller Info */}
                  <div className='flex items-center justify-between text-sm'>
                    <div className='flex items-center'>
                      <Star className='w-4 h-4 mr-1 text-yellow-400 fill-current' />
                      <span className='font-medium'>{item.seller.rating}</span>
                      <span className='text-gray-500 ml-1'>• {item.seller.name}</span>
                      {item.seller.verified && <Shield className='w-4 h-4 ml-1 text-green-500' />}
                    </div>
                  </div>

                  {/* Specifications */}
                  {item.specifications.year && (
                    <div className='flex items-center text-sm text-gray-600'>
                      <Clock className='w-4 h-4 mr-1' />
                      <span>
                        {item.specifications.year} {item.specifications.brand}{' '}
                        {item.specifications.model}
                        {item.specifications.hours && ` • ${item.specifications.hours} hours`}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <p className='text-sm text-gray-700 line-clamp-2'>{item.description}</p>

                  {/* Action Buttons */}
                  <div className='flex gap-2 pt-2'>
                    <Button size='sm' className='flex-1'>
                      View Details
                    </Button>
                    <Button variant='outline' size='sm' className='flex-1'>
                      Contact Seller
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredEquipment.length === 0 && (
            <div className='text-center py-8'>
              <div className='text-gray-500 mb-2'>No equipment found</div>
              <div className='text-sm text-gray-400'>Try adjusting your search or filters</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
