'use client';

import { PopularBrands } from '@/features/brands';
import Categories from '@/features/categories/components/Categories';
import BrowseListingsBanner from '@/features/equipment/components/BrowseListingsBanner';
import EquipmentDetail from '@/features/equipment/components/EquipmentDetail';
import FeaturedEquipment from '@/features/equipment/components/FeaturedEquipment';
import TopEquipmentForSale from '@/features/equipment/components/TopEquipmentForSale';
import Footer from '@/features/layout/components/Footer';
import Header from '@/features/layout/components/Header';
import { BannerIraqConstruct } from '@/features/layout/components/BannerIraqConstruct';
import Hero from '@/features/search/components/Hero';
import { TestimonialsSection } from '@/shared/ui/testimonials-with-marquee';
import { Equipment } from '@/shared/types';
import { useEffect, useState } from 'react';
import { useWebsiteMode } from '@/shared/contexts/website-mode-context';

export default function HomePage() {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const { websiteMode, setWebsiteMode } = useWebsiteMode();

  useEffect(() => {
    const handleShowEquipmentDetail = (event: CustomEvent) => {
      const equipment = {
        ...event.detail,
        images: [
          '/api/placeholder/800/500',
          '/api/placeholder/800/500',
          '/api/placeholder/800/500',
        ],
        description:
          'This premium heavy equipment is in excellent condition and ready for immediate deployment. Features advanced hydraulic systems, comfortable operator cabin with climate control, and comprehensive safety features. Recently serviced and comes with maintenance records.',
        specifications: {
          make: event.detail.title.split(' ')[0],
          model: event.detail.title.split(' ')[1] || 'N/A',
          serialNumber: 'SN' + Math.random().toString().slice(2, 8),
          enginePower: '150 HP',
          fuelType: 'Diesel',
          operatingWeight: '15,000 kg',
          bucketCapacity: '1.2 m³',
          maxDigDepth: '6.5 m',
          maxReach: '9.8 m',
          travelSpeed: '3.2 km/h',
          hydraulicFlow: '280 L/min',
          groundPressure: '0.45 kg/cm²',
        },
      };
      setSelectedEquipment(equipment);
    };

    window.addEventListener('showEquipmentDetail', handleShowEquipmentDetail as EventListener);
    return () => {
      window.removeEventListener('showEquipmentDetail', handleShowEquipmentDetail as EventListener);
    };
  }, []);

  if (selectedEquipment) {
    return (
      <EquipmentDetail equipment={selectedEquipment} onClose={() => setSelectedEquipment(null)} />
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main>
        <Hero onModeChange={setWebsiteMode} />
        <Categories websiteMode={websiteMode} />

        {/* SEO Content Block 1 - After Categories */}
        <div className='py-16 bg-card mt-16 md:mt-20 lg:mt-24 relative overflow-hidden'>
          {/* Background Pattern */}
          <div className='absolute inset-0 opacity-5'>
            <div className='absolute top-10 left-10 w-20 h-20 border-2 border-border rounded-full'></div>
            <div className='absolute top-32 right-20 w-16 h-16 border-2 border-border rounded-lg rotate-45'></div>
            <div className='absolute bottom-20 left-1/4 w-12 h-12 border-2 border-border rounded-full'></div>
            <div className='absolute bottom-32 right-1/3 w-14 h-14 border-2 border-border rounded-lg rotate-12'></div>
          </div>

          <div className='container mx-auto px-6 text-center relative z-10'>
            <div className='max-w-5xl mx-auto'>
              {/* Icon and Badge */}
              <div className='flex justify-center mb-6'>
                <div className='inline-flex items-center bg-card backdrop-blur-sm border border-border rounded-full px-4 py-2 shadow-sm'>
                  <div className='w-8 h-8 bg-foreground rounded-full flex items-center justify-center mr-3'>
                    <svg
                      className='w-4 h-4 text-background'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                    </svg>
                  </div>
                  <span className='text-sm font-semibold text-muted-foreground'>
                    Trusted by 10,000+ Professionals
                  </span>
                </div>
              </div>

              {/* Main Heading */}
              <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight'>
                Middle East&apos;s Leading{' '}
                <span className='bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent font-bold'>
                  Heavy Equipment
                </span>{' '}
                Marketplace
              </h2>

              {/* Enhanced Description */}
              <div className='max-w-4xl mx-auto'>
                <p className='text-xl text-gray-700 leading-relaxed mb-8'>
                  Equipment Finders connects construction professionals with verified heavy
                  machinery dealers across the UAE, Saudi Arabia, Qatar, Kuwait, Oman, and Bahrain.
                  Our platform features thousands of excavators, cranes, loaders, and specialized
                  construction equipment from trusted suppliers, ensuring you find the right
                  machinery for your project needs.
                </p>

                {/* Key Features Grid */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
                  <div className='bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
                    <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto'>
                      <svg
                        className='w-6 h-6 text-green-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                    </div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Verified Dealers</h3>
                    <p className='text-sm text-gray-600'>
                      All dealers are thoroughly vetted and verified for your peace of mind
                    </p>
                  </div>

                  <div className='bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
                    <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto'>
                      <svg
                        className='w-6 h-6 text-blue-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13 10V3L4 14h7v7l9-11h-7z'
                        />
                      </svg>
                    </div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Instant Connect</h3>
                    <p className='text-sm text-gray-600'>
                      Connect directly with equipment owners and get quotes instantly
                    </p>
                  </div>

                  <div className='bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
                    <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto'>
                      <svg
                        className='w-6 h-6 text-orange-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                      </svg>
                    </div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Regional Coverage</h3>
                    <p className='text-sm text-gray-600'>
                      Comprehensive coverage across all major Middle Eastern markets
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='py-8 bg-gray-50'>
          <FeaturedEquipment websiteMode={websiteMode} />
        </div>

        <div className='py-12 mt-16 md:mt-20 lg:mt-24 bg-white'>
          <BrowseListingsBanner />
        </div>

        {/* SEO Content Block 2 - Before Top Equipment */}
        <div className='py-8 bg-white mt-16 md:mt-20 lg:mt-24'>
          <div className='container mx-auto px-6 text-center'>
            <div className='max-w-4xl mx-auto'>
              <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
                Trusted Equipment Rental & Sales Platform
              </h2>
              <p className='text-lg text-gray-600 leading-relaxed'>
                Whether you&apos;re looking to buy or rent construction equipment, our comprehensive
                marketplace offers competitive pricing, detailed specifications, and direct dealer
                contact. From small contractors to large construction companies, Equipment Finders
                serves as your reliable partner for all heavy machinery requirements in the Middle
                East region.
              </p>
            </div>
          </div>
        </div>

        <div className='py-8 mt-16 md:mt-20 lg:mt-24 bg-gray-50'>
          <TopEquipmentForSale websiteMode={websiteMode} />
        </div>

        {/* SEO Content Block 3 - Before Testimonials */}
        <div className='py-8 bg-white mt-16 md:mt-20 lg:mt-24'>
          <div className='container mx-auto px-6 text-center'>
            <div className='max-w-4xl mx-auto'>
              <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
                Professional Equipment Solutions for Every Project
              </h2>
              <p className='text-lg text-gray-600 leading-relaxed'>
                From excavators and bulldozers to cranes and specialized machinery, our platform
                connects you with verified equipment dealers offering competitive rates and reliable
                service. Join thousands of satisfied customers who trust Equipment Finders for their
                construction equipment needs across the Middle East.
              </p>
            </div>
          </div>
        </div>

        <div className='py-8 mt-16 md:mt-20 lg:mt-24 bg-gray-50'>
          <TestimonialsSection
            title='What Our Customers Say'
            description='Trusted by thousands of equipment professionals worldwide'
            testimonials={[
              {
                author: {
                  name: 'Ahmed Al-Rashid',
                  handle: '@ahmed_construction',
                  avatar:
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                },
                text: 'Equipment Finders helped us find the perfect excavator for our construction project. The process was smooth and professional.',
                href: '#',
              },
              {
                author: {
                  name: 'Sarah Johnson',
                  handle: '@sarah_equipment',
                  avatar:
                    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
                },
                text: "Outstanding service and quality equipment. We've been using their platform for all our heavy machinery needs.",
                href: '#',
              },
              {
                author: {
                  name: 'Mohammed Hassan',
                  handle: '@mohammed_builds',
                  avatar:
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                },
                text: 'Reliable equipment and excellent customer support. Highly recommend for any construction business.',
                href: '#',
              },
              {
                author: {
                  name: 'Lisa Chen',
                  handle: '@lisa_machinery',
                  avatar:
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                },
                text: 'The best platform for finding quality construction equipment. Fast delivery and competitive prices.',
                href: '#',
              },
              {
                author: {
                  name: 'Omar Khalil',
                  handle: '@omar_projects',
                  avatar:
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
                },
                text: 'Professional service from start to finish. Their equipment quality exceeded our expectations.',
                href: '#',
              },
              {
                author: {
                  name: 'Jennifer Smith',
                  handle: '@jennifer_rentals',
                  avatar:
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
                },
                text: 'Great experience renting equipment through this platform. Will definitely use again for future projects.',
                href: '#',
              },
            ]}
          />
        </div>

        <div className='py-8 mt-16 md:mt-20 lg:mt-24 bg-white'>
          <PopularBrands websiteMode={websiteMode} />
        </div>
      </main>
      <BannerIraqConstruct />
      <Footer websiteMode={websiteMode} />
    </div>
  );
}
