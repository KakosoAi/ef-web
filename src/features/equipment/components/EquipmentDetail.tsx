'use client';

import { useState, memo, useCallback } from 'react';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Separator } from '@/shared/ui/separator';
import Image from 'next/image';
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Mail,
  Star,
  Verified,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Settings,
  Shield,
  Award,
  Building2,
} from 'lucide-react';
import { EquipmentDetailProps } from '@/shared/types';

const EquipmentDetail = memo(({ equipment, onClose }: EquipmentDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentImageIndex(prev => (prev === equipment.images.length - 1 ? 0 : prev + 1));
  }, [equipment.images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(prev => (prev === 0 ? equipment.images.length - 1 : prev - 1));
  }, [equipment.images.length]);

  const toggleFavorite = useCallback(() => {
    setIsFavorited(!isFavorited);
  }, [isFavorited]);

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <div className='sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <Button variant='ghost' onClick={onClose} className='flex items-center space-x-2'>
              <ArrowLeft className='h-4 w-4' />
              <span>Back to Listings</span>
            </Button>

            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={toggleFavorite}
                className={isFavorited ? 'text-red-500 border-red-200' : ''}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                {isFavorited ? 'Saved' : 'Save'}
              </Button>
              <Button variant='outline' size='sm'>
                <Share2 className='h-4 w-4 mr-2' />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Images and Details */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Image Gallery */}
            <div className='bg-card rounded-xl border border-border overflow-hidden'>
              <div className='relative aspect-[16/10] bg-muted'>
                <Image
                  src={equipment.images[currentImageIndex] || '/api/placeholder/800/500'}
                  alt={equipment.title}
                  className='w-full h-full object-cover'
                  width={800}
                  height={500}
                />

                {/* Image Navigation */}
                {equipment.images.length > 1 && (
                  <>
                    <Button
                      variant='secondary'
                      size='sm'
                      className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0'
                      onClick={prevImage}
                    >
                      <ChevronLeft className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='secondary'
                      size='sm'
                      className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0'
                      onClick={nextImage}
                    >
                      <ChevronRight className='h-4 w-4' />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                <div className='absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm'>
                  {currentImageIndex + 1} / {equipment.images.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {equipment.images.length > 1 && (
                <div className='p-4 border-t border-border'>
                  <div className='flex space-x-2 overflow-x-auto scrollbar-hide'>
                    {equipment.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? 'border-primary'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${equipment.title} ${index + 1}`}
                          className='w-full h-full object-cover'
                          width={64}
                          height={64}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Equipment Details */}
            <div className='bg-card rounded-xl border border-border p-6'>
              <h2 className='text-2xl font-bold text-foreground mb-4'>Equipment Details</h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div className='flex items-center space-x-3'>
                    <Gauge className='h-5 w-5 text-muted-foreground' />
                    <div>
                      <div className='text-sm text-muted-foreground'>Operating Hours</div>
                      <div className='font-semibold'>{equipment.hours}</div>
                    </div>
                  </div>

                  <div className='flex items-center space-x-3'>
                    <Calendar className='h-5 w-5 text-muted-foreground' />
                    <div>
                      <div className='text-sm text-muted-foreground'>Manufacturing Year</div>
                      <div className='font-semibold'>{equipment.year}</div>
                    </div>
                  </div>

                  <div className='flex items-center space-x-3'>
                    <MapPin className='h-5 w-5 text-muted-foreground' />
                    <div>
                      <div className='text-sm text-muted-foreground'>Location</div>
                      <div className='font-semibold'>{equipment.location}</div>
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='flex items-center space-x-3'>
                    <Settings className='h-5 w-5 text-muted-foreground' />
                    <div>
                      <div className='text-sm text-muted-foreground'>Condition</div>
                      <div className='font-semibold'>{equipment.condition}</div>
                    </div>
                  </div>

                  <div className='flex items-center space-x-3'>
                    <Shield className='h-5 w-5 text-muted-foreground' />
                    <div>
                      <div className='text-sm text-muted-foreground'>Category</div>
                      <div className='font-semibold'>{equipment.category}</div>
                    </div>
                  </div>

                  <div className='flex items-center space-x-3'>
                    <Award className='h-5 w-5 text-muted-foreground' />
                    <div>
                      <div className='text-sm text-muted-foreground'>Serial Number</div>
                      <div className='font-semibold'>
                        {(equipment.specifications as any).serialNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className='bg-card rounded-xl border border-border p-6'>
              <h2 className='text-2xl font-bold text-foreground mb-4'>Technical Specifications</h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex justify-between py-2 border-b border-border'>
                  <span className='text-muted-foreground'>Make</span>
                  <span className='font-semibold'>{(equipment.specifications as any).make}</span>
                </div>
                <div className='flex justify-between py-2 border-b border-border'>
                  <span className='text-muted-foreground'>Model</span>
                  <span className='font-semibold'>{(equipment.specifications as any).model}</span>
                </div>
                <div className='flex justify-between py-2 border-b border-border'>
                  <span className='text-muted-foreground'>Engine Power</span>
                  <span className='font-semibold'>
                    {(equipment.specifications as any).enginePower}
                  </span>
                </div>
                <div className='flex justify-between py-2 border-b border-border'>
                  <span className='text-muted-foreground'>Fuel Type</span>
                  <span className='font-semibold'>
                    {(equipment.specifications as any).fuelType}
                  </span>
                </div>
                <div className='flex justify-between py-2 border-b border-border'>
                  <span className='text-muted-foreground'>Operating Weight</span>
                  <span className='font-semibold'>
                    {(equipment.specifications as any).operatingWeight}
                  </span>
                </div>
                <div className='flex justify-between py-2 border-b border-border'>
                  <span className='text-muted-foreground'>Bucket Capacity</span>
                  <span className='font-semibold'>
                    {(equipment.specifications as any).bucketCapacity}
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className='bg-card rounded-xl border border-border p-6'>
              <h2 className='text-2xl font-bold text-foreground mb-4'>Key Features</h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                {equipment.features?.map((feature, index) => (
                  <div key={index} className='flex items-center space-x-2'>
                    <div className='w-2 h-2 bg-primary rounded-full'></div>
                    <span className='text-muted-foreground'>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className='bg-card rounded-xl border border-border p-6'>
              <h2 className='text-2xl font-bold text-foreground mb-4'>Description</h2>
              <p className='text-muted-foreground leading-relaxed'>{equipment.description}</p>
            </div>
          </div>

          {/* Right Column - Contact and Action */}
          <div className='space-y-6'>
            {/* Price and Action */}
            <div className='bg-card rounded-xl border border-border p-6 sticky top-24'>
              <div className='text-center mb-6'>
                <Badge
                  variant='secondary'
                  className={`mb-3 ${equipment.priceType === 'For Sale' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'}`}
                >
                  {equipment.priceType}
                </Badge>
                <div className='text-3xl font-bold text-primary mb-2'>{equipment.price}</div>
                <div className='text-muted-foreground'>
                  {equipment.priceType === 'For Sale' ? 'Total Price' : 'Monthly Rate'}
                </div>
              </div>

              <div className='space-y-3'>
                <Button
                  className='w-full bg-primary hover:bg-primary-hover text-primary-foreground'
                  size='lg'
                >
                  <Phone className='h-4 w-4 mr-2' />
                  Call Dealer
                </Button>
                <Button variant='outline' className='w-full' size='lg'>
                  <Mail className='h-4 w-4 mr-2' />
                  Send Message
                </Button>
                <Button variant='outline' className='w-full' size='lg'>
                  Request Quote
                </Button>
              </div>
            </div>

            {/* Dealer Information */}
            <div className='bg-card rounded-xl border border-border p-6'>
              <h3 className='text-lg font-semibold text-foreground mb-4'>Dealer Information</h3>

              <div className='flex items-center space-x-3 mb-4'>
                <div className='w-12 h-12 bg-muted rounded-full flex items-center justify-center'>
                  <Building2 className='h-6 w-6 text-muted-foreground' />
                </div>
                <div>
                  <div className='flex items-center space-x-2'>
                    <span className='font-semibold text-foreground'>{equipment.dealer}</span>
                    {equipment.verified && <Verified className='h-4 w-4 text-success' />}
                  </div>
                  <div className='flex items-center space-x-1 text-sm text-muted-foreground'>
                    <Star className='h-3 w-3 text-warning fill-current' />
                    <span>{equipment.rating} rating</span>
                  </div>
                </div>
              </div>

              <div className='space-y-2 text-sm text-muted-foreground'>
                <div className='flex items-center space-x-2'>
                  <MapPin className='h-3 w-3' />
                  <span>{equipment.location}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Clock className='h-3 w-3' />
                  <span>Usually responds within 2 hours</span>
                </div>
              </div>

              <Separator className='my-4' />

              <Button variant='outline' className='w-full' size='sm'>
                View All Listings from {equipment.dealer}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

EquipmentDetail.displayName = 'EquipmentDetail';

export default EquipmentDetail;
