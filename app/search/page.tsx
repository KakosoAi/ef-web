'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Badge } from '@/shared/ui/badge'
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Eye, 
  Heart,
  Grid3X3,
  List,
  ChevronDown,
  Truck,
  Calendar
} from 'lucide-react'
import Header from '@/features/layout/components/Header'
import Footer from '@/features/layout/components/Footer'

interface Equipment {
  id: string
  title: string
  brand: string
  model: string
  year: number
  price: string
  location: string
  category: string
  condition: string
  image: string
  rating: number
  views: number
  isVerified: boolean
  type: 'sale' | 'rent'
}

const mockEquipment: Equipment[] = [
  {
    id: '1',
    title: 'CAT 320D Excavator',
    brand: 'Caterpillar',
    model: '320D',
    year: 2019,
    price: 'AED 185,000',
    location: 'Dubai',
    category: 'Excavators',
    condition: 'Excellent',
    image: '/assets/equipment/cat-320d-excavator-1.jpg',
    rating: 4.8,
    views: 1250,
    isVerified: true,
    type: 'sale'
  },
  {
    id: '2',
    title: 'Liebherr LTM 1060-3.1 Crane',
    brand: 'Liebherr',
    model: 'LTM 1060-3.1',
    year: 2020,
    price: 'AED 850/day',
    location: 'Abu Dhabi',
    category: 'Cranes',
    condition: 'Like New',
    image: '/assets/equipment/liebherr-crane.jpg',
    rating: 4.9,
    views: 890,
    isVerified: true,
    type: 'rent'
  },
  // Add more mock data as needed
]

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>(mockEquipment)

  useEffect(() => {
    const query = searchParams.get('q') || ''
    setSearchTerm(query)
    
    if (query) {
      const filtered = mockEquipment.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.brand.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredEquipment(filtered)
    } else {
      setFilteredEquipment(mockEquipment)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search Results</h1>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredEquipment.map((equipment) => (
            <div key={equipment.id} className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={equipment.image}
                  alt={equipment.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 left-2" variant={equipment.type === 'sale' ? 'default' : 'secondary'}>
                  {equipment.type === 'sale' ? 'For Sale' : 'For Rent'}
                </Badge>
                {equipment.isVerified && (
                  <Badge className="absolute top-2 right-2" variant="outline">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{equipment.title}</h3>
                <p className="text-muted-foreground mb-2">{equipment.brand} • {equipment.model} • {equipment.year}</p>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{equipment.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-primary">{equipment.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{equipment.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}