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
    <section className='relative min-h-[50vh] md:min-h-[55vh] flex items-center justify-center overflow-hidden'>
      {/* Static Background */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: 'url(/assets/hero-equipment.jpg)' }}
      />

      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60'></div>

      {/* Content */}
      <div className='relative z-10 container mx-auto px-6 md:px-8 py-8 md:py-12 lg:py-16'>
        <div className='max-w-3xl mx-auto text-center'>
          {/* Hero Heading */}
          <div className='animate-fade-in-up mb-12 md:mb-16'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 md:mb-8 leading-tight text-white drop-shadow-2xl'>
              <span className='drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]'>Middle East&apos;s</span>{' '}
              <span className='text-yellow-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]'>#1</span>
              <span className='block text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]'>
                Equipment Marketplace
              </span>
            </h1>
          </div>

          {/* Search Section */}
          <div className='search-hero max-w-5xl mx-auto animate-scale-in'>
            {/* Buy/Rent/Tools Toggle */}
            <div className='flex justify-center mb-8 md:mb-10'>
              <div className='relative bg-white/95 backdrop-blur-sm rounded-full p-1.5 shadow-xl border border-gray-200'>
                {/* Sliding Background */}
                <div
                  className={`absolute top-1.5 bottom-1.5 w-[calc(33.333%-3px)] bg-gray-900 rounded-full shadow-lg transition-all duration-500 ease-out ${
                    searchType === 'buy'
                      ? 'left-1.5'
                      : searchType === 'rent'
                        ? 'left-[calc(33.333%+1.5px)]'
                        : 'left-[calc(66.666%+1.5px)]'
                  }`}
                />

                {/* Buttons */}
                <div className='relative flex'>
                  <button
                    onClick={() => setSearchType('buy')}
                    className={`relative z-10 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-500 ease-out ${
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
                    className={`relative z-10 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-500 ease-out ${
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
                    className={`relative z-10 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-500 ease-out ${
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
