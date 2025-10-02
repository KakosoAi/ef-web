'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Search, MapPin } from 'lucide-react';
import { equipmentCategories } from '@/shared/constants';
import SearchWithCategory from '@/shared/ui/search-with-category';

const Hero = memo(() => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('buy'); // 'buy', 'rent', or 'tools'
  const router = useRouter();

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (searchType === 'buy') {
      params.set('type', 'sale');
    } else if (searchType === 'rent') {
      params.set('type', 'rent');
    } else if (searchType === 'tools') {
      params.set('type', 'tools');
      params.set('category', 'tools');
    }
    router.push(`/search?${params.toString()}`);
  }, [searchQuery, searchType, router]);

  const equipmentTypes = useMemo(() => equipmentCategories, []);

  return (
    <section className='relative min-h-[60vh] flex items-center justify-center overflow-hidden'>
      {/* Static Background */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: 'url(/assets/hero-equipment.jpg)' }}
      />

      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60'></div>

      {/* Content */}
      <div className='relative z-10 container mx-auto px-4 py-12'>
        <div className='max-w-2xl mx-auto text-center'>
          {/* Hero Heading */}
          <div className='animate-fade-in-up'>
            <h1 className='text-3xl md:text-5xl font-display font-bold mb-4 leading-tight text-white drop-shadow-2xl'>
              <span className='drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]'>Middle East&apos;s</span>{' '}
              <span className='text-yellow-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]'>#1</span>
              <span className='block text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]'>
                Equipment Marketplace
              </span>
            </h1>
            <p className='text-base md:text-lg text-gray-100 mb-6 max-w-xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium'>
              Premium construction equipment marketplace
            </p>
          </div>

          {/* Search Section */}
          <div className='search-hero max-w-4xl mx-auto animate-scale-in'>
            {/* Buy/Rent/Tools Toggle */}
            <div className='flex justify-center mb-6'>
              <div className='relative bg-white/95 backdrop-blur-sm rounded-full p-1 shadow-xl border border-gray-200'>
                {/* Sliding Background */}
                <div
                  className={`absolute top-1 bottom-1 w-[calc(33.333%-2px)] bg-gray-900 rounded-full shadow-lg transition-all duration-500 ease-out ${
                    searchType === 'buy'
                      ? 'left-1'
                      : searchType === 'rent'
                        ? 'left-[calc(33.333%+1px)]'
                        : 'left-[calc(66.666%+1px)]'
                  }`}
                />

                {/* Buttons */}
                <div className='relative flex'>
                  <button
                    onClick={() => setSearchType('buy')}
                    className={`relative z-10 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-out ${
                      searchType === 'buy'
                        ? 'text-white transform scale-105'
                        : 'text-gray-700 hover:text-gray-900 hover:scale-102'
                    }`}
                  >
                    <span
                      className={`transition-all duration-300 ${searchType === 'buy' ? 'drop-shadow-sm' : ''}`}
                    >
                      Buy Equipment
                    </span>
                  </button>
                  <button
                    onClick={() => setSearchType('rent')}
                    className={`relative z-10 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-out ${
                      searchType === 'rent'
                        ? 'text-white transform scale-105'
                        : 'text-gray-700 hover:text-gray-900 hover:scale-102'
                    }`}
                  >
                    <span
                      className={`transition-all duration-300 ${searchType === 'rent' ? 'drop-shadow-sm' : ''}`}
                    >
                      Rent Equipment
                    </span>
                  </button>
                  <button
                    onClick={() => setSearchType('tools')}
                    className={`relative z-10 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-out ${
                      searchType === 'tools'
                        ? 'text-white transform scale-105'
                        : 'text-gray-700 hover:text-gray-900 hover:scale-102'
                    }`}
                  >
                    <span
                      className={`transition-all duration-300 ${searchType === 'tools' ? 'drop-shadow-sm' : ''}`}
                    >
                      Rent Tools
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* New Vertical Search Component */}
            <SearchWithCategory />
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
