'use client';

import { useId, useState } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Search, Sparkles, Zap } from 'lucide-react';

export default function SearchWithCategory() {
  const id = useId();
  const [isAiMode, setIsAiMode] = useState(false);

  return (
    <div className='mx-auto max-w-4xl mb-4 transition-all duration-500'>
      <div
        className={`relative transition-all duration-500 ease-in-out ${
          isAiMode ? 'transform scale-105' : ''
        }`}
      >
        <div
          className={`flex rounded-lg overflow-hidden transition-all duration-500 ${
            isAiMode
              ? 'ai-glow shadow-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-300'
              : 'shadow-lg bg-white border border-gray-300'
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
              placeholder={
                isAiMode
                  ? 'Ask AI: "Find excavators under $50k" or "Best cranes for construction"...'
                  : 'Search equipment, brand, or model...'
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
