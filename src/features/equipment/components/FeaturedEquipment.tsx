import { memo, useMemo, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Heart, Eye, MapPin, Phone, ArrowRight, Star, Verified } from 'lucide-react';
import { EquipmentCard } from '@/shared/types';

const FeaturedEquipment = memo(() => {
  const [isExpanded, setIsExpanded] = useState(false);

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
    <section className='py-20 bg-muted/30'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4'>
            Featured <span className='text-primary'>Equipment</span>
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
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
                  <div className='text-base font-medium text-primary mb-1'>{equipment.price}</div>
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
                  className='w-full bg-transparent border border-orange-200 text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all duration-200'
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(
                        new CustomEvent('showEquipmentDetail', { detail: equipment })
                      );
                    }
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
                      <div className='text-base font-medium text-primary mb-1'>
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
                      className='w-full bg-transparent border border-orange-200 text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all duration-200'
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.dispatchEvent(
                            new CustomEvent('showEquipmentDetail', { detail: equipment })
                          );
                        }
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
              className='inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200'
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

        {/* Call to Actions */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='bg-gray-900 rounded-xl p-8 text-white text-center border border-gray-700'>
            <h3 className='text-2xl font-display font-bold mb-4'>Sell Your Equipment</h3>
            <p className='text-gray-300 mb-6'>
              Reach thousands of verified buyers across the Middle East
            </p>
            <Button
              variant='secondary'
              size='lg'
              className='bg-orange-500 text-white hover:bg-orange-600'
            >
              List Your Equipment
              <ArrowRight className='h-5 w-5 ml-2' />
            </Button>
          </div>

          <div className='bg-gray-900 rounded-xl p-8 text-white text-center border border-gray-700'>
            <h3 className='text-2xl font-display font-bold mb-4'>Equipment Valuation</h3>
            <p className='text-gray-300 mb-6'>
              Get accurate market value for your equipment instantly
            </p>
            <Button
              variant='secondary'
              size='lg'
              className='bg-orange-500 text-white hover:bg-orange-600'
            >
              Get Valuation
              <ArrowRight className='h-5 w-5 ml-2' />
            </Button>
          </div>

          <div className='bg-gray-900 rounded-xl p-8 text-white text-center border border-gray-700'>
            <h3 className='text-2xl font-display font-bold mb-4'>Equipment Financing</h3>
            <p className='text-gray-300 mb-6'>
              Flexible financing options for your equipment purchase
            </p>
            <Button
              variant='secondary'
              size='lg'
              className='bg-orange-500 text-white hover:bg-orange-600'
            >
              Apply Now
              <ArrowRight className='h-5 w-5 ml-2' />
            </Button>
          </div>

          <div className='bg-gray-900 rounded-xl p-8 text-white text-center border border-gray-700'>
            <h3 className='text-2xl font-display font-bold mb-4'>Equipment Insurance</h3>
            <p className='text-gray-300 mb-6'>Comprehensive coverage for your valuable equipment</p>
            <Button
              variant='secondary'
              size='lg'
              className='bg-orange-500 text-white hover:bg-orange-600'
            >
              Get Quote
              <ArrowRight className='h-5 w-5 ml-2' />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

FeaturedEquipment.displayName = 'FeaturedEquipment';

export default FeaturedEquipment;
