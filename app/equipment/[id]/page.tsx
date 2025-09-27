'use client';

import { useParams, useRouter } from 'next/navigation';
import EquipmentDetail from '@/features/equipment/components/EquipmentDetail';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';

// Mock data for now - replace with actual data fetching
const mockEquipment = {
  id: 1,
  title: 'CAT 320D Excavator',
  year: 2019,
  hours: '2,400',
  price: 'AED 185,000',
  priceType: 'For Sale' as const,
  location: 'Dubai',
  dealer: 'Heavy Equipment UAE',
  verified: true,
  rating: 4.8,
  image: '/assets/equipment/cat-320d-excavator-1.jpg',
  images: ['/assets/equipment/cat-320d-excavator-1.jpg'],
  features: ['GPS Tracking', 'Climate Control', 'Low Hours'],
  condition: 'Excellent',
  category: 'Excavators',
  description: 'Excellent condition CAT 320D excavator with low operating hours. Perfect for construction projects.',
  specifications: {
    make: 'Caterpillar',
    model: '320D',
    serialNumber: 'CAT320D2019001',
    enginePower: '140 HP',
    fuelType: 'Diesel',
    operatingWeight: '20,000 kg',
    bucketCapacity: '0.9 m³',
    maxDigDepth: '6.5 m',
    maxReach: '9.8 m',
    travelSpeed: '5.5 km/h',
    hydraulicFlow: '280 L/min',
    groundPressure: '0.45 kg/cm²'
  }
};

export default function EquipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const handleBack = () => {
    router.back();
  };

  // In a real app, you would fetch the equipment data based on the ID
  // For now, we'll use the mock data
  const equipment = { ...mockEquipment, id: Number(id) };

  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main>
        <EquipmentDetail equipment={equipment} onClose={handleBack} />
      </main>
      <Footer />
    </div>
  );
}
