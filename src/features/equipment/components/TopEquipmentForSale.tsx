'use client';

import { memo, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Heart, Eye, MapPin, Phone, ArrowRight, Star, Verified, TrendingUp } from 'lucide-react';
import { EquipmentCard } from '@/shared/types';

const TopEquipmentForSale = memo(() => {
  const equipmentData: EquipmentCard[] = useMemo(
    () => [
      {
        id: 5,
        title: 'Komatsu PC200LC-8 Excavator',
        year: 2020,
        hours: '1,650',
        price: 'AED 320,000',
        priceType: 'For Sale',
        location: 'Dubai, UAE',
        dealer: 'Al Futtaim Equipment',
        verified: true,
        rating: 4.8,
        image: '/assets/equipment/cat-320d-excavator-1.jpg',
        features: ['Long Reach', 'Hydraulic Thumb', 'Climate Control'],
        condition: 'Excellent',
        category: 'Excavators',
      },
      {
        id: 6,
        title: 'Tadano GR-800XL Rough Terrain Crane',
        year: 2019,
        hours: '2,100',
        price: 'AED 2,100,000',
        priceType: 'For Sale',
        location: 'Abu Dhabi, UAE',
        dealer: 'United Crane Solutions',
        verified: true,
        rating: 4.9,
        image: '/assets/equipment/liebherr-crane.jpg',
        features: ['80 Ton Capacity', '4WD', 'All Terrain'],
        condition: 'Like New',
        category: 'Cranes',
      },
      {
        id: 7,
        title: 'Caterpillar 966H Wheel Loader',
        year: 2021,
        hours: '850',
        price: 'AED 485,000',
        priceType: 'For Sale',
        location: 'Sharjah, UAE',
        dealer: 'Cat Gulf Equipment',
        verified: true,
        rating: 4.7,
        image: '/assets/equipment/john-deere-loader.jpg',
        features: ['4.5m³ Bucket', 'Quick Coupler', 'Rear Camera'],
        condition: 'Excellent',
        category: 'Loaders',
      },
      {
        id: 8,
        title: 'Mercedes Actros 4141 Dump Truck',
        year: 2020,
        hours: '95,000',
        price: 'AED 285,000',
        priceType: 'For Sale',
        location: 'Al Ain, UAE',
        dealer: 'German Truck Solutions',
        verified: false,
        rating: 4.5,
        image: '/assets/equipment/volvo-truck.jpg',
        features: ['41 Ton GVW', 'Automatic', 'Air Suspension'],
        condition: 'Good',
        category: 'Trucks',
      },
    ],
    []
  );

  return (
    <section className='py-20 bg-gradient-to-br from-gray-50 to-white'>
      <div className='container mx-auto px-4'>
        {/* Section Header with Trending Icon */}
        <div className='text-center mb-16'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4'>
            <TrendingUp className='w-8 h-8 text-primary' />
          </div>
          <h2 className='text-4xl md:text-5xl font-display font-bold text-foreground mb-4'>
            Top Equipment <span className='text-primary'>For Sale</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Premium equipment available for immediate purchase from verified dealers
          </p>
        </div>

        {/* Equipment Grid - Consistent card widths with Featured Equipment */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
          {equipmentData.map((equipment, index) => (
            <div
              key={equipment.id}
              className='group relative overflow-hidden rounded-2xl border border-border bg-white shadow-lg hover:shadow-xl transition-all duration-500'
            >
              {/* Image Container - Standard aspect ratio */}
              <div className='relative aspect-[4/3] bg-muted overflow-hidden'>
                <Image
                  src={equipment.image}
                  alt={equipment.title}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                  width={400}
                  height={300}
                />

                {/* Overlay Controls - Different Positioning */}
                <div className='absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <Button
                    size='sm'
                    variant='secondary'
                    className='bg-white/90 text-primary hover:bg-white shadow-md'
                  >
                    <Eye className='h-4 w-4' />
                  </Button>
                  <Button
                    size='sm'
                    variant='secondary'
                    className='bg-white/90 text-primary hover:bg-white shadow-md'
                  >
                    <Heart className='h-4 w-4' />
                  </Button>
                  <Button
                    size='sm'
                    variant='secondary'
                    className='bg-white/90 text-primary hover:bg-white shadow-md'
                  >
                    <Phone className='h-4 w-4' />
                  </Button>
                </div>

                {/* Sale Badge - Different Style */}
                <div className='absolute top-4 left-4'>
                  <Badge className='bg-red-500 text-white font-bold px-3 py-1'>SALE</Badge>
                </div>

                {/* Verified Badge - Different Position */}
                {equipment.verified && (
                  <div className='absolute bottom-4 left-4'>
                    <Badge variant='secondary' className='bg-green-500 text-white'>
                      <Verified className='h-3 w-3 mr-1' />
                      Verified
                    </Badge>
                  </div>
                )}

                {/* Condition Badge - Different Style */}
                <div className='absolute bottom-4 right-4'>
                  <Badge variant='outline' className='bg-white/90 text-primary border-2'>
                    {equipment.condition}
                  </Badge>
                </div>
              </div>

              {/* Content - Standardized padding */}
              <div className='p-6'>
                {/* Category Tag - Standardized Style */}
                <div className='mb-4'>
                  <Badge variant='outline' className='text-xs mb-2'>
                    {equipment.category}
                  </Badge>
                  <h3 className='text-lg font-semibold text-foreground line-clamp-2 mb-2'>
                    {equipment.title}
                  </h3>
                  <div className='text-2xl font-bold text-secondary mb-1'>{equipment.price}</div>
                </div>

                {/* Details - Standardized Layout */}
                <div className='space-y-2 mb-4 text-sm text-muted-foreground'>
                  <div className='flex items-center justify-between'>
                    <span>Year:</span>
                    <span className='font-medium'>{equipment.year}</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Hours:</span>
                    <span className='font-medium'>{equipment.hours}</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <MapPin className='h-3 w-3' />
                    <span className='text-xs'>{equipment.location}</span>
                  </div>
                </div>

                {/* Features - Standardized Display */}
                <div className='mb-4'>
                  <div className='flex flex-wrap gap-1'>
                    {equipment.features.slice(0, 2).map(feature => (
                      <Badge key={feature} variant='outline' className='text-xs bg-muted/50'>
                        {feature}
                      </Badge>
                    ))}
                    {equipment.features.length > 2 && (
                      <Badge variant='outline' className='text-xs bg-muted/50'>
                        +{equipment.features.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Dealer Info - Standardized */}
                <div className='flex items-center justify-between mb-4 pt-4 border-t border-border'>
                  <div className='flex items-center space-x-2'>
                    <div className='text-sm'>
                      <div className='flex items-center space-x-1'>
                        <span className='font-medium text-foreground'>{equipment.dealer}</span>
                        {equipment.verified && <Verified className='h-3 w-3 text-success' />}
                      </div>
                      <div className='flex items-center space-x-1 text-xs text-muted-foreground'>
                        <Star className='h-3 w-3 text-warning fill-current' />
                        <span>{equipment.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button - Standardized Style */}
                <Button
                  className='w-full'
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent('showEquipmentDetail', { detail: equipment })
                    )
                  }
                >
                  View Details
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className='text-center'>
          <Button
            size='lg'
            variant='outline'
            className='border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
          >
            View All Equipment for Sale
            <ArrowRight className='ml-2 h-5 w-5' />
          </Button>
        </div>
      </div>
    </section>
  );
});

TopEquipmentForSale.displayName = 'TopEquipmentForSale';

export default TopEquipmentForSale;
