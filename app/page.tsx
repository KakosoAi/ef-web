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

export default function HomePage() {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

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
        <Hero />
        <Categories />

        <FeaturedEquipment />
        <BrowseListingsBanner />
        <TopEquipmentForSale />
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
        <PopularBrands />
      </main>
      <BannerIraqConstruct />
      <Footer />
    </div>
  );
}
