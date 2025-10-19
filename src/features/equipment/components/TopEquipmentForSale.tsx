'use client';

import { memo, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Heart, Eye, MapPin, Phone, ArrowRight, Star, Verified, TrendingUp } from 'lucide-react';
import { EquipmentCard } from '@/shared/types';
import { useWebsiteMode } from '@/shared/contexts/website-mode-context';
interface TopEquipmentForSaleProps {
  websiteMode?: 'general' | 'agricultural';
}

const TopEquipmentForSale = memo(({ websiteMode: propWebsiteMode }: TopEquipmentForSaleProps) => {
  const { websiteMode: contextWebsiteMode } = useWebsiteMode();
  const websiteMode = propWebsiteMode || contextWebsiteMode;
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const allEquipmentData: EquipmentCard[] = useMemo(
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
        image: '/assets/equipment/cat-wheel-loader.jpg',
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
        image: '/assets/equipment/dump-truck.jpg',
        features: ['41 Ton GVW', 'Automatic', 'Air Suspension'],
        condition: 'Good',
        category: 'Trucks',
      },
      // Additional equipment for Show More functionality
      {
        id: 9,
        title: 'Hyundai R220LC-9S Excavator',
        year: 2021,
        hours: '1,450',
        price: 'AED 295,000',
        priceType: 'For Sale',
        location: 'Dubai, UAE',
        dealer: 'Hyundai Construction Equipment',
        verified: true,
        rating: 4.8,
        image: '/assets/equipment/cat-320d-excavator-1.jpg',
        features: ['22 Ton Class', 'Fuel Efficient', 'Advanced Hydraulics'],
        condition: 'Excellent',
        category: 'Excavators',
      },
      {
        id: 10,
        title: 'Genie Z-45/25J Boom Lift',
        year: 2022,
        hours: '320',
        price: 'AED 165,000',
        priceType: 'For Sale',
        location: 'Abu Dhabi, UAE',
        dealer: 'Genie Middle East',
        verified: true,
        rating: 4.9,
        image: '/assets/equipment/scissor-lift.jpg',
        features: ['45ft Working Height', 'Bi-Energy', 'Zero Tail Swing'],
        condition: 'Like New',
        category: 'Aerial Platforms',
      },
      {
        id: 11,
        title: 'Bobcat S770 Skid Steer',
        year: 2020,
        hours: '2,100',
        price: 'AED 125,000',
        priceType: 'For Sale',
        location: 'Sharjah, UAE',
        dealer: 'Bobcat of the Middle East',
        verified: false,
        rating: 4.6,
        image: '/assets/equipment/cat-bulldozer.jpg',
        features: ['3,325 lb Operating Capacity', 'Vertical Lift Path', 'Cab Suspension'],
        condition: 'Good',
        category: 'Skid Steers',
      },
      {
        id: 12,
        title: 'Ingersoll Rand P185WJD Compressor',
        year: 2019,
        hours: '3,200',
        price: 'AED 45,000',
        priceType: 'For Sale',
        location: 'Ajman, UAE',
        dealer: 'Ingersoll Rand UAE',
        verified: true,
        rating: 4.7,
        image: '/assets/equipment/cat-320d-excavator-2.jpg',
        features: ['185 CFM', 'Tier 4 Final', 'Aftercooler'],
        condition: 'Good',
        category: 'Compressors',
      },
    ],
    []
  );

  // Split equipment into visible and collapsible sections
  const visibleEquipment = allEquipmentData.slice(0, 5); // Show 5 items initially
  const collapsibleEquipment = allEquipmentData.slice(5); // Remaining equipment (collapsible)

  return (
    <section className='py-12 bg-white'>
      <div className='container mx-auto px-4'>
        {/* Section Header with Trending Icon */}
        <div className='text-center mb-16'>
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              websiteMode === 'agricultural' ? 'bg-green-600/10' : 'bg-primary/10'
            }`}
          >
            <TrendingUp
              className={`w-8 h-8 ${
                websiteMode === 'agricultural' ? 'text-green-600' : 'text-primary'
              }`}
            />
          </div>
          <h2 className='text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4'>
            Top Equipment{' '}
            <span className={websiteMode === 'agricultural' ? 'text-green-600' : 'text-primary'}>
              For Sale
            </span>
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            Premium equipment available for immediate purchase from verified dealers
          </p>
        </div>

        {/* Equipment Grid - Show 5 items initially */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center mb-8'>
          {visibleEquipment.map((equipment, index) => (
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
                    <Button
                      size='sm'
                      variant='secondary'
                      className={`bg-white/90 hover:bg-white ${
                        websiteMode === 'agricultural' ? 'text-green-600' : 'text-primary'
                      }`}
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
                  <Badge
                    variant='outline'
                    className={`bg-white/90 border-white/20 ${
                      websiteMode === 'agricultural' ? 'text-green-600' : 'text-primary'
                    }`}
                  >
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

        {/* Collapsible section for additional equipment */}
        <div
          className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? 'grid-rows-[1fr] opacity-100 mb-8' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className='min-h-0'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center'>
              {collapsibleEquipment.map((equipment, index) => (
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
                        <Button
                          size='sm'
                          variant='secondary'
                          className={`bg-white/90 hover:bg-white ${
                            websiteMode === 'agricultural' ? 'text-green-600' : 'text-primary'
                          }`}
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
                      <Badge
                        variant='outline'
                        className={`bg-white/90 border-white/20 ${
                          websiteMode === 'agricultural' ? 'text-green-600' : 'text-primary'
                        }`}
                      >
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
                        className={`text-base font-medium mb-1 ${
                          websiteMode === 'agricultural' ? 'text-green-600' : 'text-primary'
                        }`}
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
          </div>
        </div>

        {/* Show More / Show Less Button */}
        {collapsibleEquipment.length > 0 && (
          <div className='text-center mt-8'>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`inline-flex items-center px-6 py-3 bg-gradient-to-r text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md ${
                websiteMode === 'agricultural'
                  ? 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                  : 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
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

TopEquipmentForSale.displayName = 'TopEquipmentForSale';

export default TopEquipmentForSale;
