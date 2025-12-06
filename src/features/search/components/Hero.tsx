'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Search, MapPin, Plus, Headphones, MessageCircle } from 'lucide-react';
import { equipmentCategories } from '@/shared/constants';
import SearchWithCategory from '@/shared/ui/search-with-category';
import { useWebsiteMode } from '@/shared/contexts/website-mode-context';

const Hero = memo(
  ({ onModeChange }: { onModeChange?: (mode: 'general' | 'agricultural') => void }) => {
    const router = useRouter();
    const { websiteMode, setWebsiteMode } = useWebsiteMode();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleModeChange = useCallback(
      (mode: 'general' | 'agricultural') => {
        if (mode === websiteMode) return;

        setIsTransitioning(true);

        // Refined transition with professional timing
        setTimeout(() => {
          setWebsiteMode(mode);
          // Call the parent callback to update the mode in the main page
          onModeChange?.(mode);
          setTimeout(() => {
            setIsTransitioning(false);
          }, 100);
        }, 200);
      },
      [websiteMode, onModeChange, setWebsiteMode]
    );

    const backgroundConfig = useMemo(() => {
      return {
        general: {
          image: '/assets/hero-equipment.jpg',
          overlay: 'bg-gradient-to-r from-[#050814]/90 via-[#101226]/60 to-transparent',
        },
        agricultural: {
          image: '/assets/hero-agriculture.jpg',
          overlay: 'bg-gradient-to-r from-[#050814]/90 via-[#101226]/60 to-transparent',
        },
      };
    }, []);

    const handleSearch = useCallback(
      (query: string, searchType: string, filters?: Record<string, string | number | boolean>) => {
        const params = new URLSearchParams();
        if (websiteMode === 'agricultural') params.set('mode', 'agricultural');

        // If AI provided filters, include them and set an ai flag
        if (filters && Object.keys(filters).length > 0) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              params.set(key, String(value));
            }
          });
          params.set('ai', '1');
        }

        const slug = query
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();

        const targetPath = `/equipments/${searchType || 'rent'}${slug ? `/${slug}` : ''}`;
        const queryString = params.toString();
        router.push(`${targetPath}${queryString ? `?${queryString}` : ''}`);
      },
      [router, websiteMode]
    );

    const equipmentTypes = useMemo(() => equipmentCategories, []);

    return (
      <section className='relative min-h-[50vh] md:min-h-[55vh] flex items-center overflow-hidden'>
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
          <div className='max-w-4xl mr-auto text-left'>
            {/* Mode Switcher */}
            <div className='mb-6 flex justify-start'>
              <div className='relative inline-grid grid-cols-2 bg-white/20 backdrop-blur-md rounded-full p-1.5 border border-white/30 shadow-xl'>
                <div
                  className={`absolute top-1.5 bottom-1.5 rounded-full bg-gray-900 shadow-md transition-all duration-500 ease-in-out w-[calc(50%-0.375rem)] ${
                    websiteMode === 'general' ? 'left-1.5' : 'left-[50%]'
                  }`}
                ></div>
                <button
                  onClick={() => handleModeChange('general')}
                  className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full text-center transition-colors duration-500 ${
                    websiteMode === 'general' ? 'text-white' : 'text-white hover:text-white/80'
                  }`}
                >
                  General Equipment
                </button>
                <button
                  onClick={() => handleModeChange('agricultural')}
                  className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full text-center transition-colors duration-500 ${
                    websiteMode === 'agricultural' ? 'text-white' : 'text-white hover:text-white/80'
                  }`}
                >
                  Agricultural Machinery
                </button>
              </div>
            </div>

            {/* Hero Heading - Fixed Height Container */}
            <div className='mb-8'>
              <div className='min-h-[100px] flex items-center'>
                <h1
                  className={`text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-white`}
                >
                  <span className='block'>
                    Middle East&apos;s <span className='text-[#3b82f6]'>#1</span>
                  </span>
                  <span className='block'>Heavy Equipment</span>
                  <span className='block'>Marketplace</span>
                </h1>
              </div>
            </div>

            {/* Search Section */}
            <div className='search-hero max-w-3xl'>
              {/* Integrated Search Component with Equipment Type Selection */}
              <SearchWithCategory onSearch={handleSearch} websiteMode={websiteMode} />

              {/* Action Buttons */}
              <div className='mt-6 flex flex-wrap items-center gap-3'>
                <Button
                  variant='secondary'
                  className='bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 shadow-sm rounded-full px-4 py-2 h-auto'
                  onClick={() => router.push('/post-ad')}
                >
                  <Plus className='h-4 w-4 mr-2' />
                  Post Equipment
                </Button>
                <Button
                  variant='secondary'
                  className='bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 shadow-sm rounded-full px-4 py-2 h-auto'
                  onClick={() => router.push('/contact')}
                >
                  <Headphones className='h-4 w-4 mr-2' />
                  Contact Support
                </Button>
                <Button
                  variant='secondary'
                  className='bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 shadow-sm rounded-full px-4 py-2 h-auto'
                  onClick={() => {}}
                >
                  <MessageCircle className='h-4 w-4 mr-2 text-white' />
                  Live Chat
                </Button>
                <Button
                  variant='secondary'
                  className='bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 shadow-sm rounded-full px-4 py-2 h-auto'
                  onClick={() => router.push('/ai-map-search')}
                >
                  <MapPin className='h-4 w-4 mr-2 text-white' />
                  AI Map Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

Hero.displayName = 'Hero';

export default Hero;
