'use client';

import { PopularBrands } from '@/features/brands';
import BrowseListingsBanner from '@/features/equipment/components/BrowseListingsBanner';
import EquipmentDetail from '@/features/equipment/components/EquipmentDetail';
import FeaturedEquipment from '@/features/equipment/components/FeaturedEquipment';
import TopEquipmentForSale from '@/features/equipment/components/TopEquipmentForSale';
import { BannerIraqConstruct } from '@/features/layout/components/BannerIraqConstruct';
import Hero from '@/features/search/components/Hero';
import { TestimonialsSection } from '@/shared/ui/testimonials-with-marquee';
import { Equipment } from '@/shared/types';
import { useEffect, useState } from 'react';
import { useWebsiteMode } from '@/shared/contexts/website-mode-context';

export default function HomeClient() {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const { setWebsiteMode } = useWebsiteMode();

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
    <>
      <Hero onModeChange={setWebsiteMode} />
      {/* CategoriesServer is rendered by the server page directly below this Hero */}
    </>
  );
}
