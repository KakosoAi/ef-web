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
        'bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-300',
      aiButton:
        'bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 hover:from-orange-700 hover:via-orange-600 hover:to-orange-500',
      aiText: 'text-orange-700',
      aiPlaceholder: 'placeholder:text-orange-400',
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
    <div className='mx-auto max-w-4xl mb-4 transition-all duration-500'>
      <div
        className={`relative transition-all duration-500 ease-in-out ${
          isAiMode ? 'transform scale-105' : ''
        }`}
      >
        {/* Equipment Type Tabs */}
        <div
          className={`flex rounded-t-lg overflow-hidden transition-all duration-500 ${
            isAiMode
              ? `${currentMode.aiBackground}`
              : 'bg-gray-50 border border-b-0 border-gray-300'
          }`}
        >
          {[
            {
              key: 'buy',
              label: websiteMode === 'agricultural' ? 'Buy Machinery' : 'Buy Equipment',
            },
            {
              key: 'rent',
              label: websiteMode === 'agricultural' ? 'Rent Machinery' : 'Rent Equipment',
            },
            {
              key: 'tools',
              label: websiteMode === 'agricultural' ? 'Rent Farm Tools' : 'Rent Tools',
            },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSearchType(tab.key)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-300 ${
                searchType === tab.key
                  ? isAiMode
                    ? `${currentMode.aiButton} text-white shadow-md`
                    : 'bg-white text-gray-900 shadow-sm border-b-2 border-blue-500'
                  : isAiMode
                    ? `${currentMode.aiText} hover:bg-opacity-50`
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className={`flex rounded-b-lg overflow-hidden transition-all duration-500 ${
            isAiMode
              ? `${currentMode.aiGlow} shadow-2xl ${currentMode.aiBackground}`
              : 'shadow-lg bg-white border border-t-0 border-gray-300'
          }`}
        >
          {/* AI Toggle Button */}
          <Button
            onClick={() => {
              if (isAiMode && searchQuery.trim()) {
                // If AI mode is active and there's a query, enhance it
                enhanceSearchWithAI();
              } else {
                // Otherwise, just toggle AI mode
                setIsAiMode(!isAiMode);
              }
            }}
            disabled={isEnhancing}
            className={`h-12 rounded-none px-4 text-sm font-semibold border-0 transition-all duration-500 ${
              isAiMode
                ? `${currentMode.aiButton} text-white shadow-lg`
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-r border-gray-300'
            }`}
          >
            {isEnhancing ? (
              <>
                <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                AI
              </>
            ) : isAiMode ? (
              <>
                <Zap className='h-4 w-4 mr-2 animate-pulse' />
                AI
              </>
            ) : (
              <>
                <Sparkles className='h-4 w-4 mr-2' />
                AI
              </>
            )}
          </Button>

          {/* Search input */}
          <div className='flex-1 relative'>
            <Input
              id={id}
              type='text'
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setIsEnhanced(false); // Reset enhanced state when user types
              }}
              onKeyPress={handleKeyPress}
              placeholder={
                isAiMode
                  ? websiteMode === 'agricultural'
                    ? 'Ask AI: "Find tractors under $80k" or "Best harvesters for wheat farming"...'
                    : 'Ask AI: "Find excavators under $50k" or "Best cranes for construction"...'
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
              className={`h-12 w-full rounded-none text-sm border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 font-normal px-4 transition-all duration-500 ${
                isAiMode
                  ? `bg-transparent ${currentMode.aiPlaceholder} text-gray-800`
                  : 'bg-white placeholder:text-gray-400 text-gray-700'
              }`}
            />
            {/* Enhanced query indicator */}
            {isEnhanced && (
              <div className='absolute top-2 right-2 flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium'>
                <Sparkles className='h-3 w-3' />
                AI Enhanced
              </div>
            )}
            {isAiMode && (
              <div className='absolute inset-0 pointer-events-none'>
                <div
                  className={`absolute top-0 left-0 w-full h-full ${
                    websiteMode === 'agricultural'
                      ? 'bg-gradient-to-r from-green-100/20 via-emerald-100/20 to-teal-100/20'
                      : 'bg-gradient-to-r from-orange-100/20 via-amber-100/20 to-yellow-100/20'
                  } animate-pulse`}
                ></div>
              </div>
            )}
          </div>

          {/* Search button */}
          <Button
            type='submit'
            onClick={() => {
              if (isAiMode && searchQuery.trim()) {
                // In AI mode, enhance first then search
                enhanceSearchWithAI();
              } else {
                // Normal search
                handleSearch();
              }
            }}
            disabled={isEnhancing}
            className={`h-12 rounded-none px-6 text-sm font-semibold border-0 transition-all duration-500 ${
              isAiMode
                ? `${currentMode.aiButton} text-white shadow-lg`
                : 'bg-gray-900 hover:bg-gray-800 text-white'
            }`}
          >
            {isEnhancing ? (
              <>
                <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                Enhancing...
              </>
            ) : (
              <>
                <Search className='h-4 w-4 mr-2' />
                {isAiMode ? 'Ask AI' : 'Search'}
              </>
            )}
          </Button>

          {/* Enhanced query search button */}
          {isEnhanced && (
            <Button
              onClick={() => handleSearch()}
              className='h-12 rounded-none px-4 text-sm font-semibold border-0 bg-green-600 hover:bg-green-700 text-white shadow-lg transition-all duration-300'
            >
              <Search className='h-4 w-4 mr-2' />
              Search Enhanced
            </Button>
          )}
        </div>

        {/* Suggestion chips removed per request */}
      </div>
    </div>
  );
}
