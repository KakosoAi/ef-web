'use client'

import { useParams, useRouter } from 'next/navigation'
import EquipmentDetail from '@/features/equipment/components/EquipmentDetail'
import Header from '@/features/layout/components/Header'
import Footer from '@/features/layout/components/Footer'

// Mock data - in a real app this would come from an API
const mockEquipment = {
  id: 1,
  title: 'CAT 320D Excavator',
  year: 2019,
  hours: '2,500 hrs',
  price: 'AED 185,000',
  priceType: 'Fixed Price',
  location: 'Dubai, UAE',
  dealer: 'Heavy Equipment Dubai',
  verified: true,
  rating: 4.8,
  images: [
    '/assets/equipment/cat-320d-excavator-1.jpg',
    '/assets/equipment/cat-320d-excavator-2.jpg',
    '/assets/equipment/cat-320d-excavator-3.jpg',
  ],
  features: [
    'Air Conditioning',
    'GPS Tracking',
    'Hydraulic Thumb',
    'Quick Coupler',
    'LED Work Lights',
    'Backup Camera'
  ],
  condition: 'Excellent',
  category: 'Excavators',
  description: 'Well-maintained CAT 320D excavator in excellent condition. Perfect for construction and excavation projects. Regular maintenance performed by authorized Caterpillar service center.',
  specifications: {
    make: 'Caterpillar',
    model: '320D',
    serialNumber: 'CAT320D12345',
    enginePower: '122 kW (163 HP)',
    fuelType: 'Diesel',
    weight: '20,000 kg'
  }
}

export default function EquipmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params

  const handleBack = () => {
    router.back()
  }

  // In a real app, you would fetch the equipment data based on the ID
  // For now, we'll use the mock data
  const equipment = mockEquipment

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <EquipmentDetail 
          equipment={equipment} 
          onBack={handleBack}
        />
      </main>
      <Footer />
    </div>
  )
}