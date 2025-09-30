'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { EquipmentAd, mockEquipmentData } from '@/shared/data/mockEquipmentData';
import EquipmentList from './EquipmentList';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Badge } from '@/shared/ui/badge';
import { Bot, Sparkles, Search, MapPin, Filter, Maximize2, Minimize2, Menu, X } from 'lucide-react';

// Dynamically import the map component to avoid SSR issues
const EquipmentMap = dynamic(() => import('./EquipmentMap'), {
  ssr: false,
  loading: () => (
    <div className='h-full w-full bg-gray-100 rounded-lg flex items-center justify-center'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2'></div>
        <div className='text-sm text-gray-600'>Loading map...</div>
      </div>
    </div>
  ),
});

export default function AIMapSearchPage() {
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentAd | null>(null);
  const [filteredEquipment, setFilteredEquipment] = useState<EquipmentAd[]>(mockEquipmentData);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [aiSearchQuery, setAiSearchQuery] = useState('');

  // Handle equipment selection from list
  const handleEquipmentClick = useCallback((equipment: EquipmentAd) => {
    setSelectedEquipment(equipment);
    // Close mobile menu when equipment is selected
    setIsMobileMenuOpen(false);
  }, []);

  // Handle marker click from map
  const handleMarkerClick = useCallback((equipment: EquipmentAd) => {
    setSelectedEquipment(equipment);
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((filtered: EquipmentAd[]) => {
    setFilteredEquipment(filtered);
    // Reset selection if current selection is not in filtered results
    setSelectedEquipment(current => {
      if (current && !filtered.find(item => item.id === current.id)) {
        return null;
      }
      return current;
    });
  }, []);

  // Handle AI search
  const handleAiSearch = () => {
    // TODO: Implement AI search functionality
    // AI search logic will be implemented here
  };

  return (
    <div className='h-screen flex flex-col bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b shadow-sm z-10'>
        <div className='px-4 py-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <div className='flex items-center space-x-2'>
                <Bot className='w-6 h-6 text-blue-600' />
                <Sparkles className='w-5 h-5 text-orange-500' />
              </div>
              <div>
                <h1 className='text-xl font-bold text-gray-900'>AI Map Search</h1>
                <p className='text-sm text-gray-600'>
                  Find equipment with intelligent location mapping
                </p>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <Button
              variant='ghost'
              size='sm'
              className='md:hidden'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
            </Button>

            {/* Desktop controls */}
            <div className='hidden md:flex items-center space-x-2'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsMapFullscreen(!isMapFullscreen)}
              >
                {isMapFullscreen ? (
                  <Minimize2 className='w-4 h-4' />
                ) : (
                  <Maximize2 className='w-4 h-4' />
                )}
                {isMapFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
              </Button>
            </div>
          </div>

          {/* AI Search Bar */}
          <div className='mt-3'>
            <div className='relative max-w-2xl'>
              <div className='absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1'>
                <Bot className='w-4 h-4 text-blue-600' />
                <Sparkles className='w-3 h-3 text-orange-500' />
              </div>
              <Input
                placeholder="Ask AI: 'Find excavators near construction sites' or 'Show wheel loaders under $100k'"
                value={aiSearchQuery}
                onChange={e => setAiSearchQuery(e.target.value)}
                className='pl-12 pr-20 py-2 text-sm'
                onKeyPress={e => e.key === 'Enter' && handleAiSearch()}
              />
              <Button
                size='sm'
                className='absolute right-1 top-1/2 transform -translate-y-1/2'
                onClick={handleAiSearch}
              >
                <Search className='w-4 h-4 mr-1' />
                Search
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className='mt-3 flex items-center space-x-4 text-sm text-gray-600'>
            <div className='flex items-center'>
              <MapPin className='w-4 h-4 mr-1' />
              {filteredEquipment.length} locations
            </div>
            <Badge variant='secondary' className='text-xs'>
              NYC Metro Area
            </Badge>
            {selectedEquipment && (
              <Badge variant='default' className='text-xs'>
                Selected: {selectedEquipment.title}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex overflow-hidden'>
        {/* Equipment List Panel */}
        <div
          className={`
          ${isMapFullscreen ? 'hidden' : 'flex'}
          ${isMobileMenuOpen ? 'absolute inset-0 z-20 bg-white' : 'relative'}
          md:relative md:flex
          w-full md:w-96 lg:w-[28rem]
          flex-col
          border-r bg-white
        `}
        >
          <EquipmentList
            equipment={mockEquipmentData}
            selectedEquipment={selectedEquipment}
            onEquipmentClick={handleEquipmentClick}
            onFilterChange={handleFilterChange}
            className='h-full'
          />
        </div>

        {/* Map Panel */}
        <div
          className={`
          flex-1 relative
          ${isMobileMenuOpen ? 'hidden md:flex' : 'flex'}
        `}
        >
          <EquipmentMap
            equipment={filteredEquipment}
            selectedEquipment={selectedEquipment}
            onMarkerClick={handleMarkerClick}
            className='h-full w-full'
          />

          {/* Mobile Map Controls */}
          <div className='absolute top-4 right-4 md:hidden z-[1000]'>
            <div className='flex flex-col space-y-2'>
              <Button
                size='sm'
                variant='secondary'
                className='bg-white shadow-lg'
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Filter className='w-4 h-4 mr-1' />
                Filters
              </Button>
              <Button
                size='sm'
                variant='secondary'
                className='bg-white shadow-lg'
                onClick={() => setIsMapFullscreen(!isMapFullscreen)}
              >
                {isMapFullscreen ? (
                  <Minimize2 className='w-4 h-4' />
                ) : (
                  <Maximize2 className='w-4 h-4' />
                )}
              </Button>
            </div>
          </div>

          {/* Selected Equipment Info (Mobile) */}
          {selectedEquipment && !isMobileMenuOpen && (
            <div className='absolute bottom-4 left-4 right-4 md:hidden z-[1000]'>
              <div className='bg-white rounded-lg shadow-lg p-4'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <h3 className='font-semibold text-sm'>{selectedEquipment.title}</h3>
                    <div className='text-lg font-bold text-blue-600 mt-1'>
                      {selectedEquipment.price}
                    </div>
                    <div className='text-xs text-gray-600 mt-1'>
                      {selectedEquipment.location.city}
                    </div>
                  </div>
                  <Button size='sm' className='ml-2'>
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
