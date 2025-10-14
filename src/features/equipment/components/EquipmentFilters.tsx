'use client';

import { useState } from 'react';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Badge } from '@/shared/ui/badge';
import { Separator } from '@/shared/ui/separator';

interface FilterSection {
  id: string;
  title: string;
  isExpanded: boolean;
}

interface EquipmentFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  selectedCondition: string;
  onConditionChange: (condition: string) => void;
  selectedPriceRange: string;
  onPriceRangeChange: (range: string) => void;
  selectedYear: string;
  onYearChange: (year: string) => void;
  onClearFilters: () => void;
  resultsCount: number;
}

export default function EquipmentFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  selectedCondition,
  onConditionChange,
  selectedPriceRange,
  onPriceRangeChange,
  selectedYear,
  onYearChange,
  onClearFilters,
  resultsCount,
}: EquipmentFiltersProps) {
  const [filterSections, setFilterSections] = useState<FilterSection[]>([
    { id: 'category', title: 'Category', isExpanded: true },
    { id: 'location', title: 'Location', isExpanded: true },
    { id: 'condition', title: 'Condition', isExpanded: true },
    { id: 'price', title: 'Price Range', isExpanded: false },
    { id: 'year', title: 'Year', isExpanded: false },
  ]);

  const toggleSection = (sectionId: string) => {
    setFilterSections(prev =>
      prev.map(section =>
        section.id === sectionId ? { ...section, isExpanded: !section.isExpanded } : section
      )
    );
  };

  const categories = [
    'All Categories',
    'Excavators',
    'Wheel Loaders',
    'Cranes',
    'Bulldozers',
    'Backhoe Loaders',
    'Skid Steers',
    'Compactors',
    'Generators',
  ];

  const locations = [
    'All Locations',
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Ajman',
    'Ras Al Khaimah',
    'Fujairah',
    'Umm Al Quwain',
  ];

  const conditions = ['All Conditions', 'New', 'Excellent', 'Good', 'Fair'];

  const priceRanges = [
    'All Prices',
    'Under AED 50,000',
    'AED 50,000 - 100,000',
    'AED 100,000 - 250,000',
    'AED 250,000 - 500,000',
    'Over AED 500,000',
  ];

  const years = [
    'All Years',
    '2024',
    '2023',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    'Before 2018',
  ];

  const hasActiveFilters =
    selectedCategory !== 'All Categories' ||
    selectedLocation !== 'All Locations' ||
    selectedCondition !== 'All Conditions' ||
    selectedPriceRange !== 'All Prices' ||
    selectedYear !== 'All Years' ||
    searchQuery.length > 0;

  return (
    <div className='w-80 bg-card border-r border-border h-full overflow-y-auto'>
      <div className='p-6'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-2'>
            <Filter className='h-5 w-5 text-muted-foreground' />
            <h2 className='text-lg font-semibold text-foreground'>Filters</h2>
          </div>
          {hasActiveFilters && (
            <Button
              variant='ghost'
              size='sm'
              onClick={onClearFilters}
              className='text-muted-foreground hover:text-foreground'
            >
              <X className='h-4 w-4 mr-1' />
              Clear
            </Button>
          )}
        </div>

        {/* Search */}
        <div className='mb-6'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
            <Input
              placeholder='Search equipment...'
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className='pl-10'
            />
          </div>
        </div>

        {/* Results Count */}
        <div className='mb-6 p-3 bg-muted/50 rounded-lg'>
          <p className='text-sm text-muted-foreground'>
            <span className='font-semibold text-foreground'>{resultsCount}</span> results found
          </p>
        </div>

        {/* Filter Sections */}
        <div className='space-y-6'>
          {/* Category Filter */}
          <div>
            <button
              onClick={() => toggleSection('category')}
              className='flex items-center justify-between w-full mb-3 text-left'
            >
              <h3 className='font-medium text-foreground'>Category</h3>
              {filterSections.find(s => s.id === 'category')?.isExpanded ? (
                <ChevronUp className='h-4 w-4 text-muted-foreground' />
              ) : (
                <ChevronDown className='h-4 w-4 text-muted-foreground' />
              )}
            </button>
            {filterSections.find(s => s.id === 'category')?.isExpanded && (
              <div className='space-y-2'>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Location Filter */}
          <div>
            <button
              onClick={() => toggleSection('location')}
              className='flex items-center justify-between w-full mb-3 text-left'
            >
              <h3 className='font-medium text-foreground'>Location</h3>
              {filterSections.find(s => s.id === 'location')?.isExpanded ? (
                <ChevronUp className='h-4 w-4 text-muted-foreground' />
              ) : (
                <ChevronDown className='h-4 w-4 text-muted-foreground' />
              )}
            </button>
            {filterSections.find(s => s.id === 'location')?.isExpanded && (
              <div className='space-y-2'>
                {locations.map(location => (
                  <button
                    key={location}
                    onClick={() => onLocationChange(location)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedLocation === location
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Condition Filter */}
          <div>
            <button
              onClick={() => toggleSection('condition')}
              className='flex items-center justify-between w-full mb-3 text-left'
            >
              <h3 className='font-medium text-foreground'>Condition</h3>
              {filterSections.find(s => s.id === 'condition')?.isExpanded ? (
                <ChevronUp className='h-4 w-4 text-muted-foreground' />
              ) : (
                <ChevronDown className='h-4 w-4 text-muted-foreground' />
              )}
            </button>
            {filterSections.find(s => s.id === 'condition')?.isExpanded && (
              <div className='space-y-2'>
                {conditions.map(condition => (
                  <button
                    key={condition}
                    onClick={() => onConditionChange(condition)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCondition === condition
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Price Range Filter */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className='flex items-center justify-between w-full mb-3 text-left'
            >
              <h3 className='font-medium text-foreground'>Price Range</h3>
              {filterSections.find(s => s.id === 'price')?.isExpanded ? (
                <ChevronUp className='h-4 w-4 text-muted-foreground' />
              ) : (
                <ChevronDown className='h-4 w-4 text-muted-foreground' />
              )}
            </button>
            {filterSections.find(s => s.id === 'price')?.isExpanded && (
              <div className='space-y-2'>
                {priceRanges.map(range => (
                  <button
                    key={range}
                    onClick={() => onPriceRangeChange(range)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedPriceRange === range
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Year Filter */}
          <div>
            <button
              onClick={() => toggleSection('year')}
              className='flex items-center justify-between w-full mb-3 text-left'
            >
              <h3 className='font-medium text-foreground'>Year</h3>
              {filterSections.find(s => s.id === 'year')?.isExpanded ? (
                <ChevronUp className='h-4 w-4 text-muted-foreground' />
              ) : (
                <ChevronDown className='h-4 w-4 text-muted-foreground' />
              )}
            </button>
            {filterSections.find(s => s.id === 'year')?.isExpanded && (
              <div className='space-y-2'>
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => onYearChange(year)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedYear === year
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className='mt-6 pt-6 border-t border-border'>
            <h4 className='text-sm font-medium text-foreground mb-3'>Active Filters</h4>
            <div className='flex flex-wrap gap-2'>
              {searchQuery && (
                <Badge variant='secondary' className='text-xs'>
                  Search: {searchQuery}
                  <button
                    onClick={() => onSearchChange('')}
                    className='ml-1 hover:text-destructive'
                  >
                    <X className='h-3 w-3' />
                  </button>
                </Badge>
              )}
              {selectedCategory !== 'All Categories' && (
                <Badge variant='secondary' className='text-xs'>
                  {selectedCategory}
                  <button
                    onClick={() => onCategoryChange('All Categories')}
                    className='ml-1 hover:text-destructive'
                  >
                    <X className='h-3 w-3' />
                  </button>
                </Badge>
              )}
              {selectedLocation !== 'All Locations' && (
                <Badge variant='secondary' className='text-xs'>
                  {selectedLocation}
                  <button
                    onClick={() => onLocationChange('All Locations')}
                    className='ml-1 hover:text-destructive'
                  >
                    <X className='h-3 w-3' />
                  </button>
                </Badge>
              )}
              {selectedCondition !== 'All Conditions' && (
                <Badge variant='secondary' className='text-xs'>
                  {selectedCondition}
                  <button
                    onClick={() => onConditionChange('All Conditions')}
                    className='ml-1 hover:text-destructive'
                  >
                    <X className='h-3 w-3' />
                  </button>
                </Badge>
              )}
              {selectedPriceRange !== 'All Prices' && (
                <Badge variant='secondary' className='text-xs'>
                  {selectedPriceRange}
                  <button
                    onClick={() => onPriceRangeChange('All Prices')}
                    className='ml-1 hover:text-destructive'
                  >
                    <X className='h-3 w-3' />
                  </button>
                </Badge>
              )}
              {selectedYear !== 'All Years' && (
                <Badge variant='secondary' className='text-xs'>
                  {selectedYear}
                  <button
                    onClick={() => onYearChange('All Years')}
                    className='ml-1 hover:text-destructive'
                  >
                    <X className='h-3 w-3' />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
