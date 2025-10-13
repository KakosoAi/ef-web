'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Search, Sparkles, Zap } from 'lucide-react';

interface SearchWithCategoryProps {
  onSearch?: (query: string, searchType: string) => void;
}

export default function SearchWithCategory({ onSearch }: SearchWithCategoryProps) {
  const id = useId();
  const router = useRouter();
  const [isAiMode, setIsAiMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('buy'); // 'buy', 'rent', or 'tools'

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery, searchType);
    } else {
      // Use clean URL structure
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);

      // Route to clean URLs based on search type
      let route = '';
      if (searchType === 'buy') {
        route = '/equipments/buy';
      } else if (searchType === 'rent') {
        route = '/equipments/rent';
      } else if (searchType === 'tools') {
        route = '/equipments/tools';
        params.set('category', 'tools');
      }

      const queryString = params.toString();
      router.push(`${route}${queryString ? `?${queryString}` : ''}`);
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
              ? 'bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-2 border-b-0 border-orange-300'
              : 'bg-gray-50 border border-b-0 border-gray-300'
          }`}
        >
          {[
            { key: 'buy', label: 'Buy Equipment' },
            { key: 'rent', label: 'Rent Equipment' },
            { key: 'tools', label: 'Rent Tools' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSearchType(tab.key)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-300 ${
                searchType === tab.key
                  ? isAiMode
                    ? 'bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-white shadow-md'
                    : 'bg-white text-gray-900 shadow-sm border-b-2 border-blue-500'
                  : isAiMode
                    ? 'text-orange-700 hover:bg-orange-100/50'
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
              ? 'ai-glow shadow-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-2 border-t-0 border-orange-300'
              : 'shadow-lg bg-white border border-t-0 border-gray-300'
          }`}
        >
          {/* AI Toggle Button */}
          <Button
            onClick={() => setIsAiMode(!isAiMode)}
            className={`h-12 rounded-none px-4 text-sm font-semibold border-0 transition-all duration-500 ${
              isAiMode
                ? 'bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 hover:from-orange-700 hover:via-orange-600 hover:to-orange-500 text-white shadow-lg'
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
                  ? 'Ask AI: "Find excavators under $50k" or "Best cranes for construction"...'
                  : `Search ${searchType === 'buy' ? 'equipment to buy' : searchType === 'rent' ? 'equipment to rent' : 'tools to rent'}...`
              }
              className={`h-12 w-full rounded-none text-sm border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 font-normal px-4 transition-all duration-500 ${
                isAiMode
                  ? 'bg-transparent placeholder:text-orange-400 text-gray-800'
                  : 'bg-white placeholder:text-gray-400 text-gray-700'
              }`}
            />
            {isAiMode && (
              <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-100/20 via-amber-100/20 to-yellow-100/20 animate-pulse'></div>
              </div>
            )}
          </div>

          {/* Search button */}
          <Button
            type='submit'
            onClick={handleSearch}
            className={`h-12 rounded-none px-6 text-sm font-semibold border-0 transition-all duration-500 ${
              isAiMode
                ? 'bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 hover:from-orange-700 hover:via-orange-600 hover:to-orange-500 text-white shadow-lg'
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
