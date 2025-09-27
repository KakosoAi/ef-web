'use client';

import { useState, useEffect } from 'react';
import Header from '@/features/layout/components/Header';
import Hero from '@/features/search/components/Hero';
import Categories from '@/features/categories/components/Categories';
import FeaturedEquipment from '@/features/equipment/components/FeaturedEquipment';
import Footer from '@/features/layout/components/Footer';
import EquipmentDetail from '@/features/equipment/components/EquipmentDetail';
import { Equipment } from '@/shared/types';

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
      </main>
      <Footer />
    </div>
  );
}
