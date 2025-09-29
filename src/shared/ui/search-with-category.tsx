'use client';

import { useId, useState } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Search, Sparkles, Zap } from 'lucide-react';

export default function SearchWithCategory() {
  const id = useId();
  const [isAiMode, setIsAiMode] = useState(false);

  return (
    <div className='mx-auto max-w-4xl'>
      <div
        className={`relative transition-all duration-500 ease-in-out ${
          isAiMode ? 'transform scale-105' : ''
        }`}
      >
        <div
          className={`flex rounded-lg overflow-hidden transition-all duration-500 ${
            isAiMode
              ? 'shadow-2xl bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50 border-2 border-gradient-to-r from-purple-200 via-blue-200 to-cyan-200'
              : 'shadow-lg bg-white border border-gray-300'
          }`}
        >
          {/* AI Toggle Button */}
          <Button
            onClick={() => setIsAiMode(!isAiMode)}
            className={`h-12 rounded-none px-4 text-sm font-semibold border-0 transition-all duration-500 ${
              isAiMode
                ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white shadow-lg'
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
                  ? 'bg-transparent placeholder:text-purple-400 text-gray-800'
                  : 'bg-white placeholder:text-gray-400 text-gray-700'
              }`}
            />
            {isAiMode && (
              <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-100/20 via-blue-100/20 to-cyan-100/20 animate-pulse'></div>
              </div>
            )}
          </div>

          {/* Search button */}
          <Button
            type='submit'
            className={`h-12 rounded-none px-6 text-sm font-semibold border-0 transition-all duration-500 ${
              isAiMode
                ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white shadow-lg'
                : 'bg-gray-900 hover:bg-gray-800 text-white'
            }`}
          >
            <Search className='h-4 w-4 mr-2' />
            {isAiMode ? 'Ask AI' : 'Search'}
          </Button>
        </div>

        {/* AI Mode Indicator */}
        {isAiMode && (
          <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-xs text-purple-600 font-medium animate-fade-in'>
            <Sparkles className='h-3 w-3 animate-pulse' />
            <span>AI-powered search activated</span>
            <Sparkles className='h-3 w-3 animate-pulse' />
          </div>
        )}
      </div>
    </div>
  );
}
