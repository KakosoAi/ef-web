'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Search, MapPin } from 'lucide-react';
import { equipmentCategories } from '@/shared/constants';
import SearchWithCategory from '@/shared/ui/search-with-category';

const Hero = memo(() => {
  const router = useRouter();
  const [websiteMode, setWebsiteMode] = useState<'general' | 'agricultural'>('general');

  const handleSearch = useCallback(
    (query: string, searchType: string) => {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (searchType === 'buy') {
        params.set('type', 'sale');
      } else if (searchType === 'rent') {
        params.set('type', 'rent');
      } else if (searchType === 'tools') {
        params.set('type', 'tools');
        params.set('category', 'tools');
      }
      // Add mode parameter if agricultural
      if (websiteMode === 'agricultural') {
        params.set('mode', 'agricultural');
      }
      router.push(`/search?${params.toString()}`);
    },
    [router, websiteMode]
  );

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
          {/* Mode Switcher */}
          <div className='animate-fade-in-up mb-6'>
            <div className='inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20'>
              <button
                onClick={() => setWebsiteMode('general')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  websiteMode === 'general'
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                General Equipment
              </button>
              <button
                onClick={() => setWebsiteMode('agricultural')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  websiteMode === 'agricultural'
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Agricultural Machinery
              </button>
            </div>
          </div>

          {/* Hero Heading */}
          <div className='animate-fade-in-up mb-12 md:mb-16'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 md:mb-8 leading-tight text-white drop-shadow-2xl'>
              <span className='drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]'>Middle East&apos;s</span>{' '}
              <span className='text-yellow-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]'>#1</span>
              <span className='block text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]'>
                {websiteMode === 'agricultural' ? 'Agricultural Machinery' : 'Equipment'}{' '}
                Marketplace
              </span>
            </h1>
          </div>

          {/* Search Section */}
          <div className='search-hero max-w-5xl mx-auto animate-scale-in'>
            {/* Integrated Search Component with Equipment Type Selection */}
            <SearchWithCategory onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
