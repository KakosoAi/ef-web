'use client';

import { memo } from 'react';
import { Button } from '@/shared/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const BrowseListingsBanner = memo(() => {
  return (
    <section className='w-full py-12 px-4'>
      <div className='container mx-auto'>
        <div className='relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'>
          {/* Background Image */}
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30'
            style={{
              backgroundImage:
                'url(https://www.equipmentsfinder.com/_next/image?url=%2Fbanner%2Fbanner-browse-listing.jpg&w=3840&q=75)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Gradient Overlay for better text readability */}
          <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent' />

          {/* Content */}
          <div className='relative z-10 px-8 py-16 md:py-20'>
            <div className='max-w-2xl'>
              {/* Heading */}
              <h2 className='text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-tight'>
                Find Your Perfect Equipment
              </h2>

              {/* Subheading */}
              <p className='text-lg md:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed'>
                Browse thousands of verified equipment listings from trusted dealers across the
                Middle East
              </p>

              {/* CTA Button */}
              <Link href='/search'>
                <Button
                  size='lg'
                  className='bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg'
                >
                  Browse Listings
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full' />
          <div className='absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-secondary/20 to-transparent rounded-tl-full' />
        </div>
      </div>
    </section>
  );
});

BrowseListingsBanner.displayName = 'BrowseListingsBanner';

export default BrowseListingsBanner;
