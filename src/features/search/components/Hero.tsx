'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Search, MapPin, Filter, Truck, Settings, Building2 } from 'lucide-react';
import { equipmentCategories } from '@/shared/constants';

const Hero = memo(() => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (location) params.set('location', location);
    router.push(`/search?${params.toString()}`);
  }, [searchQuery, location, router]);

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
        <div className='max-w-3xl mx-auto text-center text-white'>
          {/* Hero Heading */}
          <div className='animate-fade-in-up'>
            <h1 className='text-4xl md:text-6xl font-display font-bold mb-6 leading-tight'>
              Find <span className='text-primary'>Heavy Equipment</span>
              <span className='block text-white/90'>Across Middle East</span>
            </h1>

          </div>

          {/* Search Section */}
          <div className='search-hero max-w-2xl mx-auto animate-scale-in'>
            <div className='flex flex-col lg:flex-row gap-4 mb-6'>
              {/* Search Input */}
              <div className='flex-1 relative'>
                <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground' />
                <Input
                  placeholder='Search for equipment, brand, or model...'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='pl-12 h-14 text-lg border-border/20 bg-white/95 backdrop-blur-sm text-foreground placeholder:text-muted-foreground'
                />
              </div>

              {/* Location Input */}
              <div className='lg:w-72 relative'>
                <MapPin className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground' />
                <Input
                  placeholder='Location'
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className='pl-12 h-14 text-lg border-border/20 bg-white/95 backdrop-blur-sm text-foreground placeholder:text-muted-foreground'
                />
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                className='h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary-hover text-primary-foreground border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg'
              >
                <Search className='h-5 w-5 mr-2' />
                Search
              </Button>
            </div>

            {/* Quick Filters */}
            <div className='flex flex-wrap gap-3 justify-center'>
              <Button
                variant='outline'
                size='sm'
                className='bg-white/95 backdrop-blur-sm border-white/30 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-md'
                onClick={() => router.push('/search?type=sale')}
              >
                <Truck className='h-4 w-4 mr-2' />
                For Sale
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='bg-white/95 backdrop-blur-sm border-white/30 text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-md'
                onClick={() => router.push('/search?type=rent')}
              >
                <Settings className='h-4 w-4 mr-2' />
                For Rent
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='bg-white/95 backdrop-blur-sm border-white/30 text-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-105 hover:shadow-md'
                onClick={() => router.push('/search?verified=true')}
              >
                <Building2 className='h-4 w-4 mr-2' />
                Verified Dealers
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='bg-white/95 backdrop-blur-sm border-white/30 text-foreground hover:bg-muted hover:text-foreground transition-all duration-300 hover:scale-105 hover:shadow-md'
              >
                <Filter className='h-4 w-4 mr-2' />
                Advanced Filters
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
