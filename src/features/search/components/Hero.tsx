'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Search, MapPin, Filter, Truck, Settings, Building2 } from 'lucide-react';
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
    <section className='relative min-h-[60vh] flex items-center justify-center overflow-hidden'>
      {/* Background Image with Blur */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-110'
        style={{ backgroundImage: `url(/assets/hero-equipment.jpg)` }}
      >
      </div>

      {/* Content */}
      <div className='relative z-10 container mx-auto px-4 py-20'>
        <div className='max-w-3xl mx-auto text-center'>
          {/* Hero Heading */}
          <div className='animate-fade-in-up'>
            <h1 className='text-4xl md:text-6xl font-display font-bold mb-6 leading-tight text-black'>
              Middle East's <span className='text-black'>#1</span>
              <span className='block text-black'>Equipment Marketplace</span>
            </h1>

          </div>

          {/* Search Section */}
          <div className='search-hero max-w-2xl mx-auto animate-scale-in'>
            {/* Buy/Rent Toggle */}
            <div className='flex justify-center mb-4'>
              <div className='bg-white rounded-full p-1 shadow-lg border border-gray-200'>
                <button
                  onClick={() => setSearchType('buy')}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    searchType === 'buy'
                      ? 'bg-black text-white shadow-md'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setSearchType('rent')}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    searchType === 'rent'
                      ? 'bg-black text-white shadow-md'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Rent
                </button>
              </div>
            </div>

            <div className='flex gap-4 mb-6'>
              {/* Search Input */}
              <div className='flex-1 relative'>
                <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input
                  placeholder='Search for equipment, brand, or model...'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='pl-12 h-14 text-lg border-gray-200 bg-white text-black placeholder:text-gray-400'
                />
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                className='h-14 px-8 text-lg font-semibold bg-black hover:bg-gray-800 text-white border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg'
              >
                <Search className='h-5 w-5 mr-2' />
                Search
              </Button>
            </div>

            {/* Feature Cards */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8'>
              <div 
                className='bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group'
                onClick={() => router.push('/search?type=sale')}
              >
                <div className='flex flex-col items-center text-center space-y-2'>
                  <div className='p-3 bg-gray-100 rounded-full group-hover:bg-black group-hover:text-white transition-all duration-300'>
                    <Truck className='h-5 w-5 text-black group-hover:text-white' />
                  </div>
                  <span className='text-sm font-semibold text-black'>For Sale</span>
                </div>
              </div>
              
              <div 
                className='bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group'
                onClick={() => router.push('/search?type=rent')}
              >
                <div className='flex flex-col items-center text-center space-y-2'>
                  <div className='p-3 bg-gray-100 rounded-full group-hover:bg-black group-hover:text-white transition-all duration-300'>
                    <Settings className='h-5 w-5 text-black group-hover:text-white' />
                  </div>
                  <span className='text-sm font-semibold text-black'>For Rent</span>
                </div>
              </div>
              
              <div 
                className='bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group'
                onClick={() => router.push('/search?verified=true')}
              >
                <div className='flex flex-col items-center text-center space-y-2'>
                  <div className='p-3 bg-gray-100 rounded-full group-hover:bg-black group-hover:text-white transition-all duration-300'>
                    <Building2 className='h-5 w-5 text-black group-hover:text-white' />
                  </div>
                  <span className='text-sm font-semibold text-black'>Verified Dealers</span>
                </div>
              </div>
              
              <div className='bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group'>
                <div className='flex flex-col items-center text-center space-y-2'>
                  <div className='p-3 bg-gray-100 rounded-full group-hover:bg-black group-hover:text-white transition-all duration-300'>
                    <Filter className='h-5 w-5 text-black group-hover:text-white' />
                  </div>
                  <span className='text-sm font-semibold text-black'>Advanced Filters</span>
                </div>
              </div>
            </div>
          </div>
 
        </div>
      </div>

 
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
