'use client';

import { memo, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Heart, Eye, MapPin, Phone, ArrowRight, Star, Verified } from 'lucide-react';
import { EquipmentCard } from '@/shared/types';
const FeaturedEquipment = memo(({ websiteMode }: { websiteMode?: 'general' | 'agricultural' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const allEquipmentData: EquipmentCard[] = useMemo(
    () => [
      {
        id: 1,
        title: 'Caterpillar 320D Excavator',
        year: 2019,
        hours: '2,400',
        price: 'AED 285,000',
        priceType: 'For Sale',
        location: 'Dubai, UAE',
        dealer: 'Heavy Equipment UAE',
        verified: true,
        rating: 4.9,
        image: '/assets/equipment/cat-320d-excavator-1.jpg',
        features: ['GPS Tracking', 'Climate Control', 'Low Hours'],
        condition: 'Excellent',
        category: 'Excavators',
      },
      {
        id: 2,
        title: 'Liebherr LTM 1050 Mobile Crane',
        year: 2020,
        hours: '1,850',
        price: 'AED 12,000/month',
        priceType: 'For Rent',
        location: 'Abu Dhabi, UAE',
        dealer: 'Gulf Crane Services',
        verified: true,
        rating: 4.8,
        image: '/assets/equipment/liebherr-crane.jpg',
        features: ['50 Ton Capacity', 'All Terrain', 'Recent Service'],
        condition: 'Like New',
        category: 'Cranes',
      },
      {
        id: 3,
        title: 'John Deere 544K Wheel Loader',
        year: 2021,
        hours: '980',
        price: 'AED 8,500/month',
        priceType: 'For Rent',
        location: 'Sharjah, UAE',
        dealer: 'Construction Equipment Co.',
        verified: true,
        rating: 4.7,
        image: '/assets/equipment/cat-wheel-loader.jpg',
        features: ['4WD', 'Quick Attach', 'Fuel Efficient'],
        condition: 'Excellent',
        category: 'Loaders',
      },
      {
        id: 4,
        title: 'Volvo A40G Articulated Truck',
        year: 2018,
        hours: '3,200',
        price: 'AED 425,000',
        priceType: 'For Sale',
        location: 'Ajman, UAE',
        dealer: 'Nordic Heavy Machinery',
        verified: false,
        rating: 4.6,
        image: '/assets/equipment/dump-truck.jpg',
        features: ['40 Ton Capacity', 'All Weather', 'Maintenance Records'],
        condition: 'Good',
        category: 'Trucks',
      },
      // Additional equipment for Show More functionality
      {
        id: 5,
        title: 'Komatsu PC200-8 Excavator',
        year: 2020,
        hours: '1,850',
        price: 'AED 320,000',
        priceType: 'For Sale',
        location: 'Dubai, UAE',
        dealer: 'Komatsu Middle East',
        verified: true,
        rating: 4.8,
        image: '/assets/equipment/cat-320d-excavator-1.jpg',
        features: ['Hydraulic Thumb', 'GPS Ready', 'Low Hours'],
        condition: 'Excellent',
        category: 'Excavators',
      },
      {
        id: 6,
        title: 'JLG 600S Boom Lift',
        year: 2022,
        hours: '450',
        price: 'AED 4,200/month',
        priceType: 'For Rent',
        location: 'Abu Dhabi, UAE',
        dealer: 'Access Equipment Rental',
        verified: true,
        rating: 4.9,
        image: '/assets/equipment/scissor-lift.jpg',
        features: ['60ft Reach', '4WD', 'Dual Fuel'],
        condition: 'Like New',
        category: 'Aerial Platforms',
      },
      {
        id: 7,
        title: 'Manitou MT 1440 Telehandler',
        year: 2021,
        hours: '1,200',
        price: 'AED 185,000',
        priceType: 'For Sale',
        location: 'Sharjah, UAE',
        dealer: 'Manitou UAE',
        verified: false,
        rating: 4.6,
        image: '/assets/equipment/cat-bulldozer.jpg',
        features: ['14m Lift Height', '4 Ton Capacity', 'Joystick Control'],
        condition: 'Good',
        category: 'Telehandlers',
      },
      {
        id: 8,
        title: 'Atlas Copco XAS 185 Compressor',
        year: 2019,
        hours: '2,800',
        price: 'AED 1,850/month',
        priceType: 'For Rent',
        location: 'Ajman, UAE',
        dealer: 'Atlas Copco Rental',
        verified: true,
        rating: 4.7,
        image: '/assets/equipment/cat-320d-excavator-3.jpg',
        features: ['185 CFM', 'Portable', 'Fuel Efficient'],
        condition: 'Good',
        category: 'Compressors',
      },
    ],
    []
  );

  // Split equipment into visible and collapsible sections
  const visibleEquipment = allEquipmentData.slice(0, 5); // First row only (always visible)
  const collapsibleEquipment = allEquipmentData.slice(5); // Remaining equipment (collapsible)

  return (
    <section className='py-12 bg-white'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-display font-bold text-foreground mb-4'>
            Featured{' '}
            <span className={websiteMode === 'agricultural' ? 'text-green-600' : 'text-primary'}>
              Equipment
            </span>
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Handpicked premium equipment from verified dealers across the Middle East
          </p>
        </div>

        {/* Equipment Grid - First row only (always visible) */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center mb-8'>
          {visibleEquipment.map(equipment => (
            <div key={equipment.id} className='card-featured group'>
              {/* Image Container - More Vertical */}
              <div className='relative aspect-[4/3] bg-muted overflow-hidden'>
                <Image
                  src={equipment.image}
                  alt={equipment.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                  width={300}
                  height={225}
                />

                {/* Overlay Controls */}
                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                  <div className='flex space-x-2'>
                    <Button
                      size='sm'
                      variant='secondary'
                      className='bg-white/90 text-primary hover:bg-white'
                    >
                      <Eye className='h-4 w-4' />
                    </Button>
                    <Button
                      size='sm'
                      variant='secondary'
                      className='bg-white/90 text-primary hover:bg-white'
                    >
                      <Heart className='h-4 w-4' />
                    </Button>
                    <Button
                      size='sm'
                      variant='secondary'
                      className='bg-white/90 text-primary hover:bg-white'
                    >
                      <Phone className='h-4 w-4' />
                    </Button>
                  </div>
                </div>

                {/* Price Badge */}
                <div className='absolute top-4 left-4'>
                  <Badge
                    variant='secondary'
                    className={`${equipment.priceType === 'For Sale' ? 'bg-success' : 'bg-warning'} text-white font-semibold`}
                  >
                    {equipment.priceType}
                  </Badge>
                </div>

                {/* Condition Badge */}
                <div className='absolute top-4 right-4'>
                  <Badge variant='outline' className='bg-white/90 text-primary border-white/20'>
                    {equipment.condition}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className='p-3'>
                {/* Header */}
                <div className='mb-3'>
                  <h3 className='text-sm font-normal text-gray-800 dark:text-white line-clamp-2 mb-1'>
                    {equipment.title}
                  </h3>
                  <div
                    className={`text-base font-medium mb-1 ${websiteMode === 'agricultural' ? 'text-green-600' : 'text-primary'}`}
                  >
                    {equipment.price}
                  </div>
                </div>

                {/* Key Details - Reduced */}
                <div className='flex items-center justify-between mb-3 text-xs text-gray-500 dark:text-gray-400'>
                  <span className='font-normal'>{equipment.year}</span>
                  <div className='flex items-center space-x-1'>
                    <MapPin className='h-3 w-3' />
                    <span className='text-xs'>{equipment.location.split(',')[0]}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className={`w-full bg-transparent border transition-all duration-200 ${
                    websiteMode === 'agricultural'
                      ? 'border-green-200 text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700'
                      : 'border-orange-200 text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700'
                  }`}
                  onClick={() => {
                    const slug = equipment.title
                      .toLowerCase()
                      .replace(/[^a-z0-9\s-]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-')
                      .trim();
                    const type =
                      parseFloat(equipment.price.replace(/[$,]/g, '')) > 75000 ? 'buy' : 'rent';
                    router.push(`/products/${type}/${slug}/${equipment.id}`);
                  }}
                >
                  View Details
                  <ArrowRight className='h-3 w-3 ml-2' />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Collapsible section for additional equipment */}
        <div
          className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? 'grid-rows-[1fr] opacity-100 mb-8' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className='min-h-0'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center'>
              {collapsibleEquipment.map(equipment => (
                <div key={equipment.id} className='card-featured group'>
                  {/* Image Container - More Vertical */}
                  <div className='relative aspect-[4/3] bg-muted overflow-hidden'>
                    <Image
                      src={equipment.image}
                      alt={equipment.title}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                      width={300}
                      height={225}
                    />

                    {/* Overlay Controls */}
                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                      <div className='flex space-x-2'>
                        <Button
                          size='sm'
                          variant='secondary'
                          className={`bg-white/90 hover:bg-white ${
                            websiteMode === 'agricultural' ? 'text-green-600' : 'text-primary'
                          }`}
                        >
                          <Eye className='h-4 w-4' />
                        </Button>
                        <Button
                          size='sm'
                          variant='secondary'
                          className={`bg-white/90 hover:bg-white ${
                            websiteMode === 'agricultural' ? 'text-green-600' : 'text-primary'
                          }`}
                        >
                          <Heart className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className='p-3'>
                    {/* Title and Price */}
                    <div className='mb-3'>
                      <h3 className='text-sm font-normal text-gray-800 dark:text-white line-clamp-2 mb-1'>
                        {equipment.title}
                      </h3>
                      <div
                        className={`text-base font-medium mb-1 ${websiteMode === 'agricultural' ? 'text-green-600' : 'text-primary'}`}
                      >
                        {equipment.price}
                      </div>
                    </div>

                    {/* Key Details - Reduced */}
                    <div className='flex items-center justify-between mb-3 text-xs text-gray-500 dark:text-gray-400'>
                      <span className='font-normal'>{equipment.year}</span>
                      <div className='flex items-center space-x-1'>
                        <MapPin className='h-3 w-3' />
                        <span className='text-xs'>{equipment.location.split(',')[0]}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      className={`w-full bg-transparent border transition-all duration-200 ${
                        websiteMode === 'agricultural'
                          ? 'border-green-200 text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700'
                          : 'border-orange-200 text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700'
                      }`}
                      onClick={() => {
                        const slug = equipment.title
                          .toLowerCase()
                          .replace(/[^a-z0-9\s-]/g, '')
                          .replace(/\s+/g, '-')
                          .replace(/-+/g, '-')
                          .trim();
                        const type =
                          parseFloat(equipment.price.replace(/[$,]/g, '')) > 75000 ? 'buy' : 'rent';
                        router.push(`/equipments/${type}/${slug}/${equipment.id}`);
                      }}
                    >
                      View Details
                      <ArrowRight className='h-3 w-3 ml-2' />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Show More / Show Less Button */}
        {collapsibleEquipment.length > 0 && (
          <div className='text-center mb-8'>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`inline-flex items-center px-6 py-3 font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md ${
                websiteMode === 'agricultural'
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
              }`}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
              <svg
                className={`ml-2 w-4 h-4 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                strokeWidth={2}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
});

FeaturedEquipment.displayName = 'FeaturedEquipment';

export default FeaturedEquipment;
