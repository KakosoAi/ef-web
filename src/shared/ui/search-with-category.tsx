'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Search, Sparkles, Zap } from 'lucide-react';

interface SearchWithCategoryProps {
  onSearch?: (query: string, searchType: string) => void;
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

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery, searchType);
    } else {
      // Use the unified search page with proper parameters
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (searchType) params.set('type', searchType);

      const queryString = params.toString();
      router.push(`/search${queryString ? `?${queryString}` : ''}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
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
            onClick={() => setIsAiMode(!isAiMode)}
            className={`h-12 rounded-none px-4 text-sm font-semibold border-0 transition-all duration-500 ${
              isAiMode
                ? `${currentMode.aiButton} text-white shadow-lg`
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-r border-gray-300'
            }`}
          >
            {isAiMode ? (
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
              onChange={e => setSearchQuery(e.target.value)}
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
            onClick={handleSearch}
            className={`h-12 rounded-none px-6 text-sm font-semibold border-0 transition-all duration-500 ${
              isAiMode
                ? `${currentMode.aiButton} text-white shadow-lg`
                : 'bg-gray-900 hover:bg-gray-800 text-white'
            }`}
          >
            <Search className='h-4 w-4 mr-2' />
            {isAiMode ? 'Ask AI' : 'Search'}
          </Button>
        </div>
      </div>
    </div>
  );
}
