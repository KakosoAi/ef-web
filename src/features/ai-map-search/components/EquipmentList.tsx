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
      {/* Search and Filters */}
      <div className='p-3 border-b border-gray-200 bg-white'>
        <div className='space-y-2'>
          {/* Search Input */}
          <div className='relative'>
            <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <Input
              placeholder='Search equipment...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='pl-8 h-8 text-sm border-gray-300 focus:border-orange-400 focus:ring-orange-200'
            />
          </div>

          {/* Filter Dropdowns */}
          <div className='flex gap-1.5'>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className='flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-md bg-white focus:border-orange-400 focus:ring-1 focus:ring-orange-100'
            >
              <option value='All Categories'>All</option>
              {equipmentCategories
                .filter(cat => cat !== 'All Categories')
                .map(category => (
                  <option key={category} value={category}>
                    🚜 {category}
                  </option>
                ))}
            </select>

            <select
              value={selectedPriceRange}
              onChange={e => setSelectedPriceRange(e.target.value)}
              className='flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-md bg-white focus:border-orange-400 focus:ring-1 focus:ring-orange-100'
            >
              <option value='All Prices'>Price</option>
              {priceRanges
                .filter(range => range !== 'All Prices')
                .map(range => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
            </select>
          </div>

          {/* Results Count */}
          <div className='text-xs text-gray-500 font-medium'>{filteredEquipment.length} found</div>
        </div>
      </div>

      {/* Equipment List */}
      <div className='flex-1 overflow-y-auto'>
        <div className='p-3 space-y-2'>
          {/* Ad Space - Top */}
          <div className='relative w-full h-16 mb-3 overflow-hidden rounded-lg shadow-md bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300'>
            <div className='flex items-center justify-center h-full px-4'>
              <div className='text-center'>
                <div className='text-sm font-semibold text-gray-800'>🚜 Equipment Finance</div>
                <div className='text-xs text-gray-600'>Get approved in 24hrs</div>
              </div>
            </div>
          </div>

          {filteredEquipment.slice(0, 1).map(item => (
            <Card
              key={item.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedEquipment?.id === item.id ? 'ring-1 ring-blue-400 shadow-md' : ''
              } overflow-hidden bg-white mb-1`}
              onClick={() => onEquipmentClick(item)}
            >
              <CardContent className='p-0'>
                <div className='flex h-20'>
                  {/* Compact Equipment Image */}
                  <div className='w-20 h-20 bg-gray-100 flex items-center justify-center relative'>
                    <div className='text-2xl'>
                      {item.category === 'Excavators' && '🚜'}
                      {item.category === 'Bulldozers' && '🚛'}
                      {item.category === 'Cranes' && '🏗️'}
                      {item.category === 'Loaders' && '🚚'}
                      {!['Excavators', 'Bulldozers', 'Cranes', 'Loaders'].includes(item.category) &&
                        '⚙️'}
                    </div>
                    {/* Condition Badge */}
                    <div className='absolute top-1 left-1'>
                      <Badge
                        variant={item.condition === 'New' ? 'default' : 'secondary'}
                        className='text-xs px-1 py-0 h-4'
                      >
                        {item.condition}
                      </Badge>
                    </div>
                  </div>

                  {/* Compact Content */}
                  <div className='flex-1 p-2 flex flex-col justify-between'>
                    {/* Title and Price Row */}
                    <div className='flex items-start justify-between'>
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-semibold text-sm leading-tight truncate text-gray-900'>
                          {item.title}
                        </h3>
                        <div className='flex items-center gap-1 mt-0.5'>
                          <MapPin className='w-3 h-3 text-gray-400' />
                          <span className='text-xs text-gray-500 truncate'>
                            {item.location.city}
                          </span>
                        </div>
                      </div>
                      <div className='text-right ml-2'>
                        <div className='text-sm font-bold text-primary'>{item.price}</div>
                      </div>
                    </div>

                    {/* Bottom Row - Rating and Contact */}
                    <div className='flex items-center justify-between mt-1'>
                      <div className='flex items-center gap-1'>
                        <Star className='w-3 h-3 text-yellow-500 fill-current' />
                        <span className='text-xs font-medium'>{item.seller.rating}</span>
                        {item.seller.verified && <Shield className='w-3 h-3 text-green-500 ml-1' />}
                      </div>
                      <Button
                        size='sm'
                        className='h-6 px-2 bg-black hover:bg-gray-800 text-white text-xs'
                        onClick={e => e.stopPropagation()}
                      >
                        📞
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Ad Space - Middle */}
          <div className='relative w-full h-16 my-3 overflow-hidden rounded-lg shadow-md bg-gradient-to-r from-orange-100 to-orange-200 border border-orange-300'>
            <div className='flex items-center justify-center h-full px-4'>
              <div className='text-center'>
                <div className='text-sm font-semibold text-gray-800'>⚙️ Parts & Service</div>
                <div className='text-xs text-gray-600'>Genuine parts available</div>
              </div>
            </div>
          </div>

          {/* Show one more equipment item */}
          {filteredEquipment.slice(1, 2).map(item => (
            <Card
              key={item.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedEquipment?.id === item.id ? 'ring-1 ring-orange-400 shadow-md' : ''
              } overflow-hidden bg-white mb-1`}
              onClick={() => onEquipmentClick(item)}
            >
              <CardContent className='p-0'>
                <div className='flex h-20'>
                  {/* Compact Equipment Image */}
                  <div className='w-20 h-20 bg-gray-100 flex items-center justify-center relative'>
                    <div className='text-2xl'>
                      {item.category === 'Excavators' && '🚜'}
                      {item.category === 'Bulldozers' && '🚛'}
                      {item.category === 'Cranes' && '🏗️'}
                      {item.category === 'Loaders' && '🚚'}
                      {!['Excavators', 'Bulldozers', 'Cranes', 'Loaders'].includes(item.category) &&
                        '⚙️'}
                    </div>
                    {/* Condition Badge */}
                    <div className='absolute top-1 left-1'>
                      <Badge
                        variant={item.condition === 'New' ? 'default' : 'secondary'}
                        className='text-xs px-1 py-0 h-4'
                      >
                        {item.condition}
                      </Badge>
                    </div>
                  </div>

                  {/* Compact Content */}
                  <div className='flex-1 p-2 flex flex-col justify-between'>
                    {/* Title and Price Row */}
                    <div className='flex items-start justify-between'>
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-semibold text-sm leading-tight truncate text-gray-900'>
                          {item.title}
                        </h3>
                        <div className='flex items-center gap-1 mt-0.5'>
                          <MapPin className='w-3 h-3 text-gray-400' />
                          <span className='text-xs text-gray-500 truncate'>
                            {item.location.city}
                          </span>
                        </div>
                      </div>
                      <div className='text-right ml-2'>
                        <div className='text-sm font-bold text-primary'>{item.price}</div>
                      </div>
                    </div>

                    {/* Bottom Row - Rating and Contact */}
                    <div className='flex items-center justify-between mt-1'>
                      <div className='flex items-center gap-1'>
                        <Star className='w-3 h-3 text-yellow-500 fill-current' />
                        <span className='text-xs font-medium'>{item.seller.rating}</span>
                        {item.seller.verified && <Shield className='w-3 h-3 text-green-500 ml-1' />}
                      </div>
                      <Button
                        size='sm'
                        className='h-6 px-2 bg-black hover:bg-gray-800 text-white text-xs'
                        onClick={e => e.stopPropagation()}
                      >
                        📞
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Ad Space - Bottom */}
          <div className='relative w-full h-16 mt-3 overflow-hidden rounded-lg shadow-md bg-gradient-to-r from-black to-gray-800 border border-gray-600'>
            <div className='flex items-center justify-center h-full px-4'>
              <div className='text-center'>
                <div className='text-sm font-semibold text-white'>🏗️ Equipment Insurance</div>
                <div className='text-xs text-gray-300'>Protect your investment</div>
              </div>
            </div>
          </div>

          {filteredEquipment.length === 0 && (
            <div className='text-center py-8'>
              <div className='text-gray-500 mb-2'>No equipment found</div>
              <div className='text-sm text-gray-400'>Try adjusting your search or filters</div>
            </div>
          )}

          {/* Extra padding to ensure bottom ad is fully visible */}
          <div className='h-4'></div>
        </div>
      </div>
    </div>
  );
}
