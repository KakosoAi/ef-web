'use client';

import { useState, useCallback, useMemo } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Checkbox } from '@/shared/ui/checkbox';
import { Slider } from '@/shared/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Separator } from '@/shared/ui/separator';
import {
  Search,
  Filter,
  X,
  MapPin,
  Calendar,
  DollarSign,
  Settings,
  Truck,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { equipmentCategories } from '@/shared/constants';
import { useWebsiteMode } from '@/shared/contexts/website-mode-context';

interface FilterSection {
  id: string;
  title: string;
  isExpanded: boolean;
}

interface EquipmentFiltersValues {
  category: string;
  location: string;
  condition: string;
  priceRange: string;
  year: string;
  query: string;
}

interface EquipmentFiltersProps {
  onFiltersChange?: (filters: EquipmentFiltersValues) => void;
  websiteMode?: 'general' | 'agricultural';
  resultsCount?: number;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  selectedLocation?: string;
  onLocationChange?: (location: string) => void;
  selectedCondition?: string;
  onConditionChange?: (condition: string) => void;
  selectedPriceRange?: string;
  onPriceRangeChange?: (priceRange: string) => void;
  selectedYear?: string;
  onYearChange?: (year: string) => void;
  onClearFilters?: () => void;
}

export default function EquipmentFilters({
  onFiltersChange,
  websiteMode: propWebsiteMode,
  resultsCount = 0,
  searchQuery: propSearchQuery,
  onSearchChange: propOnSearchChange,
  selectedCategory: propSelectedCategory,
  onCategoryChange: propOnCategoryChange,
  selectedLocation: propSelectedLocation,
  onLocationChange: propOnLocationChange,
  selectedCondition: propSelectedCondition,
  onConditionChange: propOnConditionChange,
  selectedPriceRange: propSelectedPriceRange,
  onPriceRangeChange: propOnPriceRangeChange,
  selectedYear: propSelectedYear,
  onYearChange: propOnYearChange,
  onClearFilters: propOnClearFilters,
}: EquipmentFiltersProps) {
  const { websiteMode: contextWebsiteMode } = useWebsiteMode();
  const websiteMode = propWebsiteMode || contextWebsiteMode;
  const [filterSections, setFilterSections] = useState<FilterSection[]>([
    { id: 'category', title: 'Category', isExpanded: true },
    { id: 'location', title: 'Location', isExpanded: true },
    { id: 'condition', title: 'Condition', isExpanded: true },
    { id: 'price', title: 'Price Range', isExpanded: false },
    { id: 'year', title: 'Year', isExpanded: false },
  ]);

  // Filter state variables - use props if provided, otherwise use internal state
  const [internalSelectedCategory, setInternalSelectedCategory] = useState('All Categories');
  const [internalSelectedLocation, setInternalSelectedLocation] = useState('All Locations');
  const [internalSelectedCondition, setInternalSelectedCondition] = useState('All Conditions');
  const [internalSelectedPriceRange, setInternalSelectedPriceRange] = useState('All Prices');
  const [internalSelectedYear, setInternalSelectedYear] = useState('All Years');
  const [internalSearchQuery, setInternalSearchQuery] = useState('');

  // Use props if provided, otherwise use internal state
  const selectedCategory = propSelectedCategory ?? internalSelectedCategory;
  const selectedLocation = propSelectedLocation ?? internalSelectedLocation;
  const selectedCondition = propSelectedCondition ?? internalSelectedCondition;
  const selectedPriceRange = propSelectedPriceRange ?? internalSelectedPriceRange;
  const selectedYear = propSelectedYear ?? internalSelectedYear;
  const searchQuery = propSearchQuery ?? internalSearchQuery;

  const toggleSection = (sectionId: string) => {
    setFilterSections(prev =>
      prev.map(section =>
        section.id === sectionId ? { ...section, isExpanded: !section.isExpanded } : section
      )
    );
  };

  const onClearFilters = useCallback(() => {
    if (propOnClearFilters) {
      propOnClearFilters();
    } else {
      setInternalSelectedCategory('All Categories');
      setInternalSelectedLocation('All Locations');
      setInternalSelectedCondition('All Conditions');
      setInternalSelectedPriceRange('All Prices');
      setInternalSelectedYear('All Years');
      setInternalSearchQuery('');
    }
  }, [propOnClearFilters]);

  // Handler functions for filter changes - use props if provided, otherwise use internal handlers
  const onSearchChange = useCallback(
    (value: string) => {
      if (propOnSearchChange) {
        propOnSearchChange(value);
      } else {
        setInternalSearchQuery(value);
      }
    },
    [propOnSearchChange]
  );

  const onCategoryChange = useCallback(
    (category: string) => {
      if (propOnCategoryChange) {
        propOnCategoryChange(category);
      } else {
        setInternalSelectedCategory(category);
      }
    },
    [propOnCategoryChange]
  );

  const onLocationChange = useCallback(
    (location: string) => {
      if (propOnLocationChange) {
        propOnLocationChange(location);
      } else {
        setInternalSelectedLocation(location);
      }
    },
    [propOnLocationChange]
  );

  const onConditionChange = useCallback(
    (condition: string) => {
      if (propOnConditionChange) {
        propOnConditionChange(condition);
      } else {
        setInternalSelectedCondition(condition);
      }
    },
    [propOnConditionChange]
  );

  const onPriceRangeChange = useCallback(
    (priceRange: string) => {
      if (propOnPriceRangeChange) {
        propOnPriceRangeChange(priceRange);
      } else {
        setInternalSelectedPriceRange(priceRange);
      }
    },
    [propOnPriceRangeChange]
  );

  const onYearChange = useCallback(
    (year: string) => {
      if (propOnYearChange) {
        propOnYearChange(year);
      } else {
        setInternalSelectedYear(year);
      }
    },
    [propOnYearChange]
  );

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
    <div className='w-full bg-white/95 backdrop-blur-sm h-full'>
      <div className='p-6 space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Filter className='h-5 w-5 text-muted-foreground' />
            <h2 className='text-lg font-medium text-foreground tracking-wide'>Filters</h2>
          </div>
          {hasActiveFilters && (
            <Button
              variant='ghost'
              size='sm'
              onClick={onClearFilters}
              className='text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide'
            >
              <X className='h-4 w-4 mr-1' />
              Clear
            </Button>
          )}
        </div>

        {/* Search */}
        <div>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
            <Input
              placeholder='Search equipment...'
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className={`pl-10 rounded-xl border-gray-200/60 transition-colors duration-300 tracking-wide ${
                websiteMode === 'agricultural'
                  ? 'focus:border-green-300'
                  : 'focus:border-orange-300'
              }`}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className='p-3 bg-gray-50/60 rounded-xl border border-gray-100/50'>
          <p className='text-sm text-muted-foreground tracking-wide leading-relaxed'>
            <span className='font-medium text-foreground'>{resultsCount}</span> results found
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
