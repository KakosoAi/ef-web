'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Search, MapPin } from 'lucide-react';
import { equipmentCategories } from '@/shared/constants';

const Hero = memo(() => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('buy'); // 'buy' or 'rent'
  const router = useRouter();

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    params.set('type', searchType === 'buy' ? 'sale' : 'rent');
    router.push(`/search?${params.toString()}`);
  }, [searchQuery, searchType, router]);

  const equipmentTypes = useMemo(() => equipmentCategories, []);

  return (
    <section className='relative min-h-[50vh] flex items-center justify-center overflow-hidden'>
      {/* Background Image with Blur */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-110'
        style={{ backgroundImage: `url(/assets/hero-equipment.jpg)` }}
      >
      </div>
      
      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50'></div>

      {/* Content */}
      <div className='relative z-10 container mx-auto px-4 py-12'>
        <div className='max-w-2xl mx-auto text-center'>
          {/* Hero Heading */}
          <div className='animate-fade-in-up'>
            <h1 className='text-3xl md:text-5xl font-display font-bold mb-4 leading-tight text-white drop-shadow-lg'>
              Middle East's <span className='text-yellow-400'>#1</span>
              <span className='block text-white'>Equipment Marketplace</span>
            </h1>
            <p className='text-base md:text-lg text-gray-200 mb-6 max-w-xl mx-auto drop-shadow-md'>
              Premium construction equipment marketplace
            </p>
          </div>

          {/* Search Section */}
          <div className='search-hero max-w-3xl mx-auto animate-scale-in'>
            {/* Buy/Rent Toggle */}
            <div className='flex justify-center mb-4'>
              <div className='bg-white/95 backdrop-blur-sm rounded-full p-1 shadow-xl border border-gray-200'>
                <button
                  onClick={() => setSearchType('buy')}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    searchType === 'buy'
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Buy Equipment
                </button>
                <button
                  onClick={() => setSearchType('rent')}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    searchType === 'rent'
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Rent Equipment
                </button>
              </div>
            </div>

            <div className='flex gap-3 mb-6'>
              {/* Search Input */}
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
                <Input
                  placeholder='Search for equipment, brand, or model...'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='pl-10 h-12 text-base border-gray-300 bg-white/95 backdrop-blur-sm text-gray-900 placeholder:text-gray-500 shadow-lg focus:shadow-xl transition-all duration-300'
                />
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                className='h-12 px-6 text-base font-semibold bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg'
              >
                <Search className='h-4 w-4 mr-2' />
                Search
              </Button>
            </div>


          </div>
 
        </div>
      </div>

 
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
