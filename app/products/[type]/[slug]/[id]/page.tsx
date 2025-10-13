'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Equipment } from '@/shared/types/equipment';
import Link from 'next/link';
import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Calendar,
  Clock,
  Eye,
  Phone,
  Mail,
  MessageCircle,
  Heart,
  Share2,
  FileText,
  Building2,
  Verified,
  X,
  ZoomIn,
  Wifi,
  Car,
  Waves,
  Snowflake,
  Users,
  Settings,
  Gauge,
  Weight,
  Zap,
  Wrench,
  Fuel,
} from 'lucide-react';
import { equipmentData, type EquipmentAd } from '@/shared/data/equipmentData';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';

// Convert EquipmentAd to our component format
const convertEquipmentData = (equipmentAd: EquipmentAd) => ({
  id: parseInt(equipmentAd.id),
  title: equipmentAd.title,
  category: equipmentAd.category,
  subcategories: ['Heavy Equipment', 'Construction', 'Earthmoving'],
  rating: equipmentAd.seller.rating,
  reviewCount: Math.floor(Math.random() * 200) + 50, // Random review count
  price: parseFloat(equipmentAd.price.replace(/[$,]/g, '')),
  originalPrice: null,
  brand: equipmentAd.specifications.brand || 'Unknown',
  model: equipmentAd.specifications.model || 'Unknown',
  year: parseInt(equipmentAd.specifications.year || '2020'),
  hours: equipmentAd.specifications.hours || 'N/A',
  condition: equipmentAd.condition,
  location: equipmentAd.location.city,
  images:
    equipmentAd.images.length > 0
      ? equipmentAd.images
      : ['/assets/equipment/cat-320d-excavator-1.jpg'],
  description: equipmentAd.description,
  specifications: [
    { name: 'Operating Weight', value: '20,300 kg', icon: Weight },
    { name: 'Engine Power', value: '122 HP', icon: Zap },
    { name: 'Bucket Capacity', value: '0.9 m³', icon: Settings },
    { name: 'Max Digging Depth', value: '6.5 m', icon: Gauge },
    { name: 'Max Reach', value: '9.9 m', icon: Wrench },
    { name: 'Fuel Tank', value: '400 L', icon: Car },
  ],
  dealer: equipmentAd.seller.name,
  contactPerson: 'Sales Manager',
  phone: '+971-4-555-0123',
  email: 'sales@equipment.ae',
  whatsapp: '+971-50-555-0123',
});

// Helper function to create slug from title
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export default function ProductDetailPage() {
  const params = useParams<{ type: string; slug: string; id: string }>();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('Overview');
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const { type, slug, id } = params;
    const equipmentId = id as string;

    // Find equipment by ID
    const foundEquipment = equipmentData.find(eq => eq.id === equipmentId);

    if (foundEquipment) {
      const convertedEquipment = convertEquipmentData(foundEquipment);
      const expectedSlug = createSlug(foundEquipment.title);

      // Validate that the URL parameters match the equipment data
      if (slug !== expectedSlug) {
        setError('Equipment not found - invalid URL');
      } else {
        setEquipment(convertedEquipment);
      }
    } else {
      setError('Equipment not found');
    }
    setLoading(false);
  }, [params]);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (error || !equipment) {
    return (
      <div className='min-h-screen flex flex-col'>
        <Header />
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-gray-900 mb-4'>Equipment Not Found</h1>
            <p className='text-gray-600 mb-8'>
              The equipment you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link
              href='/'
              className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'
            >
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setSelectedImageIndex(prev => (prev === equipment.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setSelectedImageIndex(prev => (prev === 0 ? equipment.images.length - 1 : prev - 1));
  };

  const tabs = ['Overview', 'Specifications', 'Location', 'Reviews'];

  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <Header />

      <main className='flex-1 container mx-auto px-4 py-8'>
        {/* Breadcrumb */}
        <nav className='flex items-center space-x-2 text-sm text-gray-600 mb-6'>
          <Link href='/' className='hover:text-blue-600'>
            Home
          </Link>
          <ChevronRight className='h-4 w-4' />
          <Link href='/search' className='hover:text-blue-600'>
            Equipment
          </Link>
          <ChevronRight className='h-4 w-4' />
          <span className='text-gray-900'>{equipment.title}</span>
        </nav>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Images */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
              {/* Main Image */}
              <div className='relative aspect-video bg-gray-100'>
                <Image
                  src={equipment.images[selectedImageIndex]}
                  alt={equipment.title}
                  fill
                  className='object-cover'
                />
                <button
                  onClick={() => setShowImageModal(true)}
                  className='absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors'
                >
                  <ZoomIn className='h-5 w-5' />
                </button>
                {equipment.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors'
                    >
                      <ChevronLeft className='h-5 w-5' />
                    </button>
                    <button
                      onClick={nextImage}
                      className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors'
                    >
                      <ChevronRight className='h-5 w-5' />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {equipment.images.length > 1 && (
                <div className='p-4 border-t'>
                  <div className='flex space-x-2 overflow-x-auto'>
                    {equipment.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImageIndex === index
                            ? 'border-blue-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${equipment.title} ${index + 1}`}
                          fill
                          className='object-cover'
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className='mt-8'>
              <div className='border-b border-gray-200'>
                <nav className='-mb-px flex space-x-8'>
                  {tabs.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className='mt-6'>
                {activeTab === 'Overview' && (
                  <div className='bg-white rounded-lg shadow-sm p-6'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Description</h3>
                    <p className='text-gray-700 leading-relaxed'>{equipment.description}</p>
                  </div>
                )}

                {activeTab === 'Specifications' && (
                  <div className='bg-white rounded-lg shadow-sm p-6'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                      Technical Specifications
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {Array.isArray(equipment.specifications) &&
                        equipment.specifications.map(
                          (
                            spec: {
                              name: string;
                              value: string;
                              icon: React.ComponentType<{ className?: string }>;
                            },
                            index: number
                          ) => {
                            const IconComponent = spec.icon;
                            return (
                              <div
                                key={index}
                                className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'
                              >
                                <IconComponent className='h-5 w-5 text-blue-600' />
                                <div>
                                  <div className='font-medium text-gray-900'>{spec.name}</div>
                                  <div className='text-sm text-gray-600'>{spec.value}</div>
                                </div>
                              </div>
                            );
                          }
                        )}
                    </div>
                  </div>
                )}

                {activeTab === 'Location' && (
                  <div className='bg-white rounded-lg shadow-sm p-6'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Location</h3>
                    <div className='flex items-center space-x-2 text-gray-600'>
                      <MapPin className='h-5 w-5' />
                      <span>{equipment.location}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'Reviews' && (
                  <div className='bg-white rounded-lg shadow-sm p-6'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Reviews</h3>
                    <div className='flex items-center space-x-2 mb-4'>
                      <div className='flex items-center'>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(equipment.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className='text-sm text-gray-600'>
                        {equipment.rating} ({equipment.reviewCount} reviews)
                      </span>
                    </div>
                    <p className='text-gray-600'>Reviews and ratings will be displayed here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className='space-y-6'>
            {/* Price and Basic Info */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='text-3xl font-bold text-blue-600'>
                  ${equipment.price.toLocaleString()}
                </div>
                <div className='flex items-center space-x-2'>
                  <button className='p-2 text-gray-400 hover:text-red-500 transition-colors'>
                    <Heart className='h-5 w-5' />
                  </button>
                  <button className='p-2 text-gray-400 hover:text-blue-500 transition-colors'>
                    <Share2 className='h-5 w-5' />
                  </button>
                </div>
              </div>

              <h1 className='text-2xl font-bold text-gray-900 mb-4'>{equipment.title}</h1>

              <div className='space-y-3 mb-6'>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-600'>Brand</span>
                  <span className='font-medium'>{equipment.brand}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-600'>Model</span>
                  <span className='font-medium'>{equipment.model}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-600'>Year</span>
                  <span className='font-medium'>{equipment.year}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-600'>Hours</span>
                  <span className='font-medium'>{equipment.hours}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-600'>Condition</span>
                  <span className='font-medium capitalize'>{equipment.condition}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-600'>Location</span>
                  <span className='font-medium'>{equipment.location}</span>
                </div>
              </div>

              <div className='flex items-center space-x-2 mb-6'>
                <div className='flex items-center'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(equipment.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className='text-sm text-gray-600'>
                  {equipment.rating} ({equipment.reviewCount} reviews)
                </span>
              </div>

              <div className='space-y-3'>
                <button className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium'>
                  Contact Seller
                </button>
                <button className='w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium'>
                  Request Quote
                </button>
              </div>
            </div>

            {/* Dealer Info */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <div className='flex items-center space-x-3 mb-4'>
                <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center'>
                  <Building2 className='h-6 w-6 text-white' />
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900'>{equipment.dealer}</h3>
                  <div className='flex items-center space-x-1'>
                    <Verified className='h-4 w-4 text-green-500' />
                    <span className='text-sm text-green-600'>Verified Dealer</span>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <div className='flex items-center space-x-3'>
                  <Phone className='h-4 w-4 text-gray-400' />
                  <span className='text-sm'>{equipment.phone}</span>
                </div>
                <div className='flex items-center space-x-3'>
                  <Mail className='h-4 w-4 text-gray-400' />
                  <span className='text-sm'>{equipment.email}</span>
                </div>
                <div className='flex items-center space-x-3'>
                  <MessageCircle className='h-4 w-4 text-gray-400' />
                  <span className='text-sm'>{equipment.whatsapp}</span>
                </div>
              </div>

              <div className='mt-4 pt-4 border-t'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-600'>Response Rate</span>
                  <span className='font-medium'>95%</span>
                </div>
                <div className='flex items-center justify-between text-sm mt-2'>
                  <span className='text-gray-600'>Response Time</span>
                  <span className='font-medium'>Within 2 hours</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <h3 className='font-semibold text-gray-900 mb-4'>Quick Actions</h3>
              <div className='space-y-3'>
                <Link
                  href='/ai-map-search'
                  className='flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors'
                >
                  <Eye className='h-4 w-4' />
                  <span className='text-sm'>View on AI Map</span>
                </Link>
                <button className='flex items-center space-x-3 text-gray-600 hover:text-gray-700 transition-colors'>
                  <FileText className='h-4 w-4' />
                  <span className='text-sm'>Download Brochure</span>
                </button>
                <button className='flex items-center space-x-3 text-gray-600 hover:text-gray-700 transition-colors'>
                  <Calendar className='h-4 w-4' />
                  <span className='text-sm'>Schedule Inspection</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Image Modal */}
      {showImageModal && (
        <div className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4'>
          <div className='relative max-w-4xl max-h-full'>
            <button
              onClick={() => setShowImageModal(false)}
              className='absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors'
            >
              <X className='h-8 w-8' />
            </button>
            <Image
              src={equipment.images[selectedImageIndex]}
              alt={equipment.title}
              width={800}
              height={600}
              className='max-w-full max-h-full object-contain'
            />
            {equipment.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors'
                >
                  <ChevronLeft className='h-6 w-6' />
                </button>
                <button
                  onClick={nextImage}
                  className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors'
                >
                  <ChevronRight className='h-6 w-6' />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
