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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleModeChange = useCallback(
    (mode: 'general' | 'agricultural') => {
      if (mode === websiteMode) return;

      setIsTransitioning(true);

      // Refined transition with professional timing
      setTimeout(() => {
        setWebsiteMode(mode);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 200);
    },
    [websiteMode]
  );

  const backgroundConfig = useMemo(() => {
    return {
      general: {
        image: '/assets/hero-equipment.jpg',
        overlay: 'bg-gradient-to-b from-black/50 via-black/40 to-black/60',
      },
      agricultural: {
        image: '/assets/hero-agriculture.jpg',
        overlay: 'bg-gradient-to-b from-green-900/20 via-transparent to-green-900/30',
      },
    };
  }, []);

  const handleSearch = useCallback(
    (query: string, searchType: string) => {
      // Use clean URL structure
      const params = new URLSearchParams();
      if (query) params.set('q', query);

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

      // Add mode parameter if agricultural
      if (websiteMode === 'agricultural') {
        params.set('mode', 'agricultural');
      }

      const queryString = params.toString();
      router.push(`${route}${queryString ? `?${queryString}` : ''}`);
    },
    [router, websiteMode]
  );

  const equipmentTypes = useMemo(() => equipmentCategories, []);

  return (
    <section className='relative min-h-[50vh] md:min-h-[55vh] flex items-center justify-center overflow-hidden'>
      {/* Professional Background Transition with Crossfade */}
      <div className='absolute inset-0'>
        {/* General Equipment Background */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-800 ease-in-out ${
            websiteMode === 'general' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${backgroundConfig.general.image})` }}
        />

        {/* Agricultural Background */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-800 ease-in-out ${
            websiteMode === 'agricultural' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${backgroundConfig.agricultural.image})` }}
        />
      </div>

      {/* Subtle Gradient Overlay with Smooth Transition */}
      <div
        className={`absolute inset-0 transition-all duration-800 ease-in-out ${
          isTransitioning ? 'opacity-90' : 'opacity-100'
        } ${backgroundConfig[websiteMode].overlay}`}
      ></div>

      {/* Refined Floating Elements for Agricultural Mode */}
      {websiteMode === 'agricultural' && (
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-green-400/20 rounded-full animate-pulse'></div>
          <div
            className='absolute top-1/3 right-1/4 w-1 h-1 bg-green-300/25 rounded-full animate-pulse'
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className='absolute bottom-1/3 left-1/3 w-1 h-1 bg-green-500/15 rounded-full animate-pulse'
            style={{ animationDelay: '4s' }}
          ></div>
        </div>
      )}

      {/* Content */}
      <div className='relative z-10 container mx-auto px-6 md:px-8 py-8 md:py-12 lg:py-16'>
        <div className='max-w-3xl mx-auto text-center'>
          {/* Mode Switcher */}
          <div className='animate-fade-in-up mb-6'>
            <div className='inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20 shadow-lg'>
              <button
                onClick={() => handleModeChange('general')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-400 ease-in-out transform ${
                  websiteMode === 'general'
                    ? 'bg-white text-gray-900 shadow-md scale-105'
                    : 'text-white hover:bg-white/15 hover:scale-102'
                }`}
              >
                General Equipment
              </button>
              <button
                onClick={() => handleModeChange('agricultural')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-400 ease-in-out transform ${
                  websiteMode === 'agricultural'
                    ? 'bg-white text-gray-900 shadow-md scale-105'
                    : 'text-white hover:bg-white/15 hover:scale-102'
                }`}
              >
                Agricultural Machinery
              </button>
            </div>
          </div>

          {/* Hero Heading - Fixed Height Container */}
          <div className='animate-fade-in-up mb-12 md:mb-16'>
            <div className='min-h-[120px] md:min-h-[140px] lg:min-h-[160px] flex items-center justify-center'>
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-white transition-all duration-600 ease-in-out ${
                  isTransitioning
                    ? 'opacity-85 transform translate-y-1'
                    : 'opacity-100 transform translate-y-0'
                }`}
              >
                <span className='block'>
                  Middle East&apos;s <span className='text-yellow-400'>#1</span>
                </span>
                <span className='block'>
                  {websiteMode === 'agricultural' ? 'Agricultural Machinery' : 'Equipment'}{' '}
                  Marketplace
                </span>
              </h1>
            </div>
          </div>

          {/* Search Section */}
          <div className='search-hero max-w-5xl mx-auto animate-scale-in'>
            {/* Integrated Search Component with Equipment Type Selection */}
            <SearchWithCategory onSearch={handleSearch} websiteMode={websiteMode} />
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
