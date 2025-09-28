import { memo, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Heart, Eye, MapPin, Phone, ArrowRight, Star, Verified } from 'lucide-react';
import { EquipmentCard } from '@/shared/types';

const FeaturedEquipment = memo(() => {
  const equipmentData: EquipmentCard[] = useMemo(
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
        image:
          'https://www.equipmentsfinder.com/_next/image?url=https%3A%2F%2Fimages.equipmentsfinder.com%2Fpublic%2Fuploads%2Fads%2F1748414599947-liebherr-crane-50-ton&w=1080&q=75',
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
        image:
          'https://www.equipmentsfinder.com/_next/image?url=https%3A%2F%2Fimages.equipmentsfinder.com%2Fpublic%2Fuploads%2Fads%2F1758022254351-hk215c&w=1080&q=75',
        features: ['40 Ton Capacity', 'All Weather', 'Maintenance Records'],
        condition: 'Good',
        category: 'Trucks',
      },
    ],
    []
  );

  return (
    <section className='py-20 bg-muted/30'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-display font-bold text-foreground mb-4'>
            Featured <span className='text-secondary'>Equipment</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Handpicked premium equipment from verified dealers across the Middle East
          </p>
        </div>

        {/* Equipment Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
          {equipmentData.map(equipment => (
            <div key={equipment.id} className='card-featured group'>
              {/* Image Container */}
              <div className='relative aspect-[4/3] bg-muted overflow-hidden'>
                <Image
                  src={equipment.image}
                  alt={equipment.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                  width={400}
                  height={300}
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
              <div className='p-6'>
                {/* Header */}
                <div className='mb-4'>
                  <Badge variant='outline' className='text-xs mb-2'>
                    {equipment.category}
                  </Badge>
                  <h3 className='text-lg font-semibold text-foreground line-clamp-2 mb-2'>
                    {equipment.title}
                  </h3>
                  <div className='text-2xl font-bold text-secondary mb-1'>{equipment.price}</div>
                </div>

                {/* Details */}
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

                {/* Features */}
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

                {/* Dealer Info */}
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

                {/* Action Button */}
                <Button
                  className='w-full bg-primary hover:bg-primary-hover text-primary-foreground'
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent('showEquipmentDetail', { detail: equipment })
                    )
                  }
                >
                  View Details
                  <ArrowRight className='h-4 w-4 ml-2' />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Actions */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-gradient-primary rounded-xl p-8 text-white text-center'>
            <h3 className='text-2xl font-display font-bold mb-4'>Sell Your Equipment</h3>
            <p className='text-white/90 mb-6'>
              Reach thousands of verified buyers across the Middle East
            </p>
            <Button
              variant='secondary'
              size='lg'
              className='bg-white text-primary hover:bg-white/90'
            >
              List Your Equipment
              <ArrowRight className='h-5 w-5 ml-2' />
            </Button>
          </div>

          <div className='bg-gradient-secondary rounded-xl p-8 text-white text-center'>
            <h3 className='text-2xl font-display font-bold mb-4'>Need Custom Equipment?</h3>
            <p className='text-white/90 mb-6'>
              Our experts will help you find the perfect equipment for your needs
            </p>
            <Button
              variant='outline'
              size='lg'
              className='border-white text-white hover:bg-white hover:text-secondary'
            >
              Request Quote
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
