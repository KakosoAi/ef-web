'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Search, Sparkles, Zap, Loader2 } from 'lucide-react';
import { createSlug } from '@/shared/utils/urlHelpers';

type SearchFilters = {
  priceMin?: number;
  priceMax?: number;
  cityId?: number;
  conditionId?: number;
  categoryId?: number;
};

interface SearchWithCategoryProps {
  onSearch?: (query: string, searchType: string, filters?: SearchFilters) => void;
  websiteMode?: 'general' | 'agricultural';
}

export default function SearchWithCategory({
  onSearch,
  websiteMode = 'general',
}: SearchWithCategoryProps) {
  const id = useId();
  const router = useRouter();
  const [isAiMode, setIsAiMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('buy'); // 'buy', 'rent', or 'tools'
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(false);

  // Mode-specific styling
  const modeStyles = {
    general: {
      aiBackground:
        'bg-gradient-to-r from-blue-50 via-indigo-50 to-violet-50 border-2 border-blue-300',
      aiButton:
        'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 hover:from-blue-700 hover:via-blue-600 hover:to-blue-500',
      aiText: 'text-blue-700',
      aiPlaceholder: 'placeholder:text-blue-400',
      aiGlow: 'ai-glow',
    },
    agricultural: {
      aiBackground:
        'bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-2 border-green-300',
      aiButton:
        'bg-gradient-to-r from-green-600 via-green-500 to-green-400 hover:from-green-700 hover:via-green-600 hover:to-green-500',
      aiText: 'text-green-700',
      aiPlaceholder: 'placeholder:text-green-400',
      aiGlow: 'agricultural-glow',
    },
  };

  const currentMode = modeStyles[websiteMode];

  const enhanceSearchWithAI = async () => {
    if (!searchQuery.trim()) return;

    setIsEnhancing(true);
    try {
      const response = await fetch('/api/ai/enhance-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery.trim(),
          searchType,
          websiteMode,
        }),
      });

      const result = await response.json();

      if (result.success && result.enhancedQuery) {
        // Update the search query with the enhanced version
        setSearchQuery(result.enhancedQuery);
        setIsEnhanced(true);

        // Convert AI filters to search parameters
        const aiFilters: Partial<{
          minPrice: number;
          maxPrice: number;
          location: string;
          condition: string;
          category: string;
        }> = result.filters || {};
        const searchFilters: SearchFilters = {};

        // Map AI filter data to search parameters
        if (aiFilters.minPrice) searchFilters.priceMin = aiFilters.minPrice;
        if (aiFilters.maxPrice) searchFilters.priceMax = aiFilters.maxPrice;
        if (aiFilters.location) {
          // Map location names to IDs (simplified mapping for now)
          const locationMap: { [key: string]: number } = {
            Dubai: 1,
            'Abu Dhabi': 2,
            Sharjah: 3,
            Ajman: 4,
            'Ras Al Khaimah': 5,
            Fujairah: 6,
            'Umm Al Quwain': 7,
          };
          if (locationMap[aiFilters.location]) {
            searchFilters.cityId = locationMap[aiFilters.location];
          }
        }
        if (aiFilters.condition) {
          // Map condition names to IDs (simplified mapping for now)
          const conditionMap: { [key: string]: number } = {
            New: 1,
            Excellent: 2,
            Good: 3,
            Fair: 4,
          };
          if (conditionMap[aiFilters.condition]) {
            searchFilters.conditionId = conditionMap[aiFilters.condition];
          }
        }
        if (aiFilters.category) {
          // Map category names to IDs (simplified mapping for now)
          const categoryMap: { [key: string]: number } = {
            Excavators: 1,
            'Wheel Loaders': 2,
            Cranes: 3,
            Bulldozers: 4,
            'Backhoe Loaders': 5,
            'Skid Steers': 6,
            Compactors: 7,
            Generators: 8,
          };
          if (categoryMap[aiFilters.category]) {
            searchFilters.categoryId = categoryMap[aiFilters.category];
          }
        }

        // Automatically search with the enhanced query and filters
        setTimeout(() => {
          handleSearch(result.enhancedQuery, searchFilters);
        }, 500);
      } else {
        // If enhancement fails, proceed with original query
        handleSearch();
      }
    } catch (error: unknown) {
      // If enhancement fails, proceed with original query
      handleSearch();
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSearch = (queryOverride?: string, filtersOverride?: SearchFilters) => {
    const finalQuery = queryOverride || searchQuery;
    if (onSearch) {
      onSearch(finalQuery, searchType, filtersOverride);
    } else {
      const slug = finalQuery ? createSlug(finalQuery) : '';
      let targetPath = `/equipments/${searchType || 'rent'}${slug ? `/${slug}` : ''}`;

      // Add filter parameters to URL if they exist
      if (filtersOverride && Object.keys(filtersOverride).length > 0) {
        const params = new URLSearchParams();
        if (finalQuery) params.set('q', finalQuery);

        // Add filter parameters
        (
          Object.entries(filtersOverride) as [keyof SearchFilters, number | string | undefined][]
        ).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            params.set(String(key), String(value));
          }
        });

        // Mark that filters came from AI enhancement
        params.set('ai', '1');

        targetPath += `?${params.toString()}`;
      }

      router.push(targetPath);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (isAiMode && searchQuery.trim()) {
        // In AI mode, enhance first then search
        enhanceSearchWithAI();
      } else {
        // Normal search
        handleSearch();
      }
    }
  };

  return (
    <div className='max-w-4xl mb-4 transition-all duration-500'>
      <div
        className={`relative transition-all duration-500 ease-in-out bg-[#f4f4f5]/95 border border-white/30 p-3 rounded-[24px] shadow-xl ${
          isAiMode ? 'transform scale-105' : ''
        }`}
      >
        {/* Equipment Type Tabs */}
        <div className='flex items-center gap-2 mb-3 px-1'>
          {[
            {
              key: 'buy',
              label: 'Buy',
            },
            {
              key: 'rent',
              label: 'Rent',
            },
            {
              key: 'tools',
              label: 'Tools',
            },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSearchType(tab.key)}
              className={`px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                searchType === tab.key
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className='relative'>
          {/* AI Toggle Button - Integrated inside Input */}
          <div className='absolute left-2 top-1/2 -translate-y-1/2 z-10'>
            <Button
              variant='ghost'
              onClick={() => {
                if (isAiMode && searchQuery.trim()) {
                  enhanceSearchWithAI();
                } else {
                  setIsAiMode(!isAiMode);
                }
              }}
              disabled={isEnhancing}
              className={`h-10 w-10 rounded-full p-0 hover:bg-gray-100 ${
                isAiMode ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              {isEnhancing ? (
                <Loader2 className='h-5 w-5 animate-spin' />
              ) : isAiMode ? (
                <Zap className='h-5 w-5 animate-pulse' />
              ) : (
                <Sparkles className='h-5 w-5' />
              )}
            </Button>
          </div>

          {/* Search input */}
          <div className='relative w-full'>
            <Input
              id={id}
              type='text'
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setIsEnhanced(false);
              }}
              onKeyPress={handleKeyPress}
              placeholder={
                isAiMode
                  ? websiteMode === 'agricultural'
                    ? 'Ask AI: "Find tractors under $80k"...'
                    : 'Ask AI: "Find excavators under $50k"...'
                  : `Search ${
                      searchType === 'buy'
                        ? websiteMode === 'agricultural'
                          ? 'machinery to buy'
                          : 'equipment to buy'
                        : searchType === 'rent'
                          ? websiteMode === 'agricultural'
                            ? 'machinery to rent'
                            : 'equipment to rent'
                          : websiteMode === 'agricultural'
                            ? 'farm tools to rent'
                            : 'tools to rent'
                    }...`
              }
              className={`h-14 w-full rounded-full border-0 shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0 font-normal pl-12 pr-14 transition-all duration-500 text-base ${
                isAiMode
                  ? `bg-white ${currentMode.aiPlaceholder} text-gray-800 ring-2 ring-blue-200`
                  : 'bg-white placeholder:text-gray-400 text-gray-700'
              }`}
            />

            {/* Search button */}
            <div className='absolute right-2 top-1/2 -translate-y-1/2'>
              <Button
                type='submit'
                onClick={() => {
                  if (isAiMode && searchQuery.trim()) {
                    enhanceSearchWithAI();
                  } else {
                    handleSearch();
                  }
                }}
                disabled={isEnhancing}
                className={`h-10 w-10 rounded-full p-0 shadow-sm transition-all duration-300 ${
                  isAiMode
                    ? `${currentMode.aiButton} text-white shadow-lg`
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                <Search className='h-5 w-5' />
              </Button>
            </div>
          </div>

          {/* Enhanced query indicator */}
          {isEnhanced && (
            <div className='absolute -bottom-8 left-4 flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm'>
              <Sparkles className='h-3 w-3' />
              AI Enhanced Search Active
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
