'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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
import EquipmentService from '@/shared/services/equipment';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';

// Convert EquipmentAd to our component format
// Add type definition for specification
type SpecificationItem = {
  name: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
};

const convertEquipmentFromService = (item: {
  id: number;
  title: string;
  category: string;
  subcategories: string[];
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number | null;
  brand: string;
  model: string;
  year: number;
  hours: string;
  condition: string;
  location: string;
  images: string[];
  description: string;
  dealer: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
}): Equipment => ({
  id: item.id,
  title: item.title,
  category: item.category,
  subcategories: item.subcategories || [],
  rating: item.rating || 0,
  reviewCount: item.reviewCount || 0,
  price: item.price,
  originalPrice: item.originalPrice ?? null,
  brand: item.brand || 'Unknown',
  model: item.model || 'Unknown',
  year: item.year || new Date().getFullYear(),
  hours: item.hours || 'N/A',
  condition: item.condition || 'Unknown',
  location: item.location || 'Unknown',
  images:
    item.images && item.images.length > 0
      ? item.images
      : ['/assets/equipment/cat-320d-excavator-1.jpg'],
  description: item.description || '',
  specifications: [
    { name: 'Operating Weight', value: '20,300 kg', icon: Weight },
    { name: 'Engine Power', value: '122 HP', icon: Zap },
    { name: 'Bucket Capacity', value: '0.9 m³', icon: Settings },
    { name: 'Max Digging Depth', value: '6.5 m', icon: Gauge },
    { name: 'Max Reach', value: '9.9 m', icon: Wrench },
    { name: 'Fuel Tank', value: '400 L', icon: Car },
  ],
  dealer: item.dealer || 'Unknown Dealer',
  contactPerson: item.contactPerson || 'Contact Dealer',
  phone: item.phone || '',
  email: item.email || '',
  whatsapp: item.whatsapp || '',
});

// Add type definition for equipment
type Equipment = {
  id: number;
  title: string;
  category: string;
  subcategories: string[];
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number | null;
  brand: string;
  model: string;
  year: number;
  hours: string;
  condition: string;
  location: string;
  images: string[];
  description: string;
  specifications: SpecificationItem[];
  dealer: string;
  contactPerson: string;
  phone: string;
  email: string;
  whatsapp: string;
};

export default function ProductDetailPage() {
  const params = useParams() as { type: string; slug: string; id: string };
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('Overview');
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const equipmentId = Number(params.id);
    EquipmentService.getEquipment(equipmentId)
      .then(item => {
        if (item) {
          setEquipment(convertEquipmentFromService(item));
        } else {
          setError('Equipment not found');
        }
      })
      .catch(() => {
        setError('Failed to load equipment details');
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading equipment details...</p>
        </div>
      </div>
    );
  }

  if (error || !equipment) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>Equipment Not Found</h1>
          <p className='text-gray-600 mb-6'>
            The equipment you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href='/equipments/rent'
            className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'
          >
            Browse Equipment
          </Link>
        </div>
      </div>
    );
  }

  const openImageModal = () => setShowImageModal(true);
  const closeImageModal = () => setShowImageModal(false);

  const nextImage = () => {
    setSelectedImageIndex(prev => (prev + 1) % equipment.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(prev => (prev - 1 + equipment.images.length) % equipment.images.length);
  };

  const tabs = [
    'Overview',
    'Amenities',
    'Policies',
    'Location',
    "What's Included",
    'Reviews',
    'Availability',
    'FAQs',
  ];

  return (
    <div className='min-h-screen bg-white'>
      <Header />

      {/* Image Modal */}
      {showImageModal && (
        <div className='fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center'>
          <div className='relative w-full h-full flex items-center justify-center p-4'>
            <button
              onClick={closeImageModal}
              className='absolute top-4 right-4 text-white hover:text-gray-300 z-10'
            >
              <X className='w-8 h-8' />
            </button>

            <button
              onClick={prevImage}
              className='absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10'
            >
              <ChevronLeft className='w-12 h-12' />
            </button>

            <button
              onClick={nextImage}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10'
            >
              <ChevronRight className='w-12 h-12' />
            </button>

            <Image
              src={equipment.images[selectedImageIndex]}
              alt={equipment.title}
              width={1200}
              height={800}
              className='max-w-full max-h-full object-contain'
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-6'>
        <div className='flex items-start justify-between mb-6'>
          <div className='flex-1'>
            <h1 className='text-3xl font-bold text-gray-900 mb-3'>{equipment.title}</h1>
            <div className='flex items-center space-x-4 mb-2'>
              <div className='flex items-center space-x-1'>
                <Star className='w-4 h-4 text-yellow-400 fill-current' />
                <span className='font-medium text-gray-900'>{equipment.rating}</span>
                <span className='text-gray-600'>({equipment.reviewCount} Reviews)</span>
              </div>
              <div className='flex items-center space-x-2'>
                {equipment.subcategories.map((cat: string, index: number) => (
                  <span key={index} className='text-blue-600 text-sm font-medium'>
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className='flex items-center space-x-3'>
            <button className='p-2 border border-border rounded-lg hover:bg-muted transition-colors'>
              <Share2 className='w-5 h-5 text-muted-foreground' />
            </button>
            <button className='p-2 border border-border rounded-lg hover:bg-muted transition-colors'>
              <Heart className='w-5 h-5 text-muted-foreground' />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Images and Content */}
          <div className='lg:col-span-2'>
            {/* Image Gallery */}
            <div className='mb-8'>
              <div className='grid grid-cols-3 gap-2 h-80'>
                {/* Main Image - Takes up 2/3 of the width */}
                <div
                  className='col-span-2 relative rounded-lg overflow-hidden cursor-pointer group'
                  onClick={openImageModal}
                >
                  <Image
                    src={equipment.images[0] || '/assets/equipment/cat-320d-excavator-1.jpg'}
                    alt={equipment.title}
                    fill
                    className='object-cover transition-transform group-hover:scale-105'
                  />
                </div>

                {/* Right Side Thumbnails - 2x2 grid */}
                <div className='grid grid-rows-2 gap-2'>
                  <div
                    className='relative rounded-lg overflow-hidden cursor-pointer group'
                    onClick={() => {
                      setSelectedImageIndex(1);
                      openImageModal();
                    }}
                  >
                    <Image
                      src={equipment.images[1] || '/assets/equipment/cat-320d-excavator-2.jpg'}
                      alt={equipment.title}
                      fill
                      className='object-cover transition-transform group-hover:scale-105'
                    />
                  </div>
                  <div
                    className='relative rounded-lg overflow-hidden cursor-pointer group'
                    onClick={() => {
                      setSelectedImageIndex(2);
                      openImageModal();
                    }}
                  >
                    <Image
                      src={equipment.images[2] || '/assets/equipment/cat-320d-excavator-3.jpg'}
                      alt={equipment.title}
                      fill
                      className='object-cover transition-transform group-hover:scale-105'
                    />
                  </div>
                </div>
              </div>

              {/* Additional thumbnails row */}
              <div className='grid grid-cols-4 gap-2 mt-2'>
                <div
                  className='relative h-20 rounded-lg overflow-hidden cursor-pointer group'
                  onClick={() => {
                    setSelectedImageIndex(3);
                    openImageModal();
                  }}
                >
                  <Image
                    src={equipment.images[3] || '/assets/equipment/cat-320d-excavator-4.jpg'}
                    alt={equipment.title}
                    fill
                    className='object-cover transition-transform group-hover:scale-105'
                  />
                </div>
                <div
                  className='relative h-20 rounded-lg overflow-hidden cursor-pointer group'
                  onClick={() => {
                    setSelectedImageIndex(4);
                    openImageModal();
                  }}
                >
                  <Image
                    src={equipment.images[4] || '/assets/equipment/cat-320d-excavator-5.jpg'}
                    alt={equipment.title}
                    fill
                    className='object-cover transition-transform group-hover:scale-105'
                  />
                </div>
                <div
                  className='relative h-20 rounded-lg overflow-hidden cursor-pointer group'
                  onClick={() => {
                    setSelectedImageIndex(5);
                    openImageModal();
                  }}
                >
                  <Image
                    src={equipment.images[5] || '/assets/equipment/cat-320d-excavator-6.jpg'}
                    alt={equipment.title}
                    fill
                    className='object-cover transition-transform group-hover:scale-105'
                  />
                </div>
                <div
                  className='relative h-20 rounded-lg overflow-hidden cursor-pointer group'
                  onClick={() => {
                    setSelectedImageIndex(6);
                    openImageModal();
                  }}
                >
                  <Image
                    src={equipment.images[6] || '/assets/equipment/cat-320d-excavator-7.jpg'}
                    alt={equipment.title}
                    fill
                    className='object-cover transition-transform group-hover:scale-105'
                  />
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className='border-b border-gray-200 mb-6'>
              <nav className='flex space-x-8'>
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className='space-y-6'>
              {activeTab === 'Overview' && (
                <div>
                  <h3 className='text-lg font-medium text-gray-900 mb-4'>About This Equipment</h3>
                  <p className='text-gray-700 leading-relaxed mb-6'>{equipment.description}</p>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                    <div>
                      <h4 className='text-base font-medium text-gray-900 mb-3'>
                        Equipment Details
                      </h4>
                      <div className='space-y-2'>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Brand:</span>
                          <span className='font-medium'>{equipment.brand}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Model:</span>
                          <span className='font-medium'>{equipment.model}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Year:</span>
                          <span className='font-medium'>{equipment.year}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Hours:</span>
                          <span className='font-medium'>{equipment.hours}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Condition:</span>
                          <span className='font-medium text-green-600'>{equipment.condition}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Location:</span>
                          <span className='font-medium'>{equipment.location}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className='text-base font-medium text-gray-900 mb-3'>
                        Seller Information
                      </h4>
                      <div className='space-y-2'>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Dealer:</span>
                          <span className='font-medium'>{equipment.dealer}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Contact:</span>
                          <span className='font-medium'>{equipment.contactPerson}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Phone:</span>
                          <span className='font-medium'>{equipment.phone}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Email:</span>
                          <span className='font-medium'>{equipment.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4 className='text-base font-medium text-gray-900 mb-4'>
                    Technical Specifications
                  </h4>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    {equipment.specifications.map((spec: SpecificationItem, index: number) => (
                      <div
                        key={index}
                        className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'
                      >
                        <spec.icon className='w-5 h-5 text-gray-600' />
                        <div>
                          <div className='text-sm text-gray-600'>{spec.name}</div>
                          <div className='font-medium text-gray-900'>{spec.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Amenities' && (
                <div>
                  <h3 className='text-lg font-medium text-gray-900 mb-4'>
                    Equipment Features & Amenities
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <h4 className='text-base font-medium text-gray-900 mb-3'>
                        Standard Features
                      </h4>
                      <div className='space-y-2'>
                        <div className='flex items-center space-x-2'>
                          <Verified className='w-4 h-4 text-green-600' />
                          <span>Air Conditioning</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Verified className='w-4 h-4 text-green-600' />
                          <span>Hydraulic Quick Coupler</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Verified className='w-4 h-4 text-green-600' />
                          <span>LED Work Lights</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Verified className='w-4 h-4 text-green-600' />
                          <span>Backup Camera</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Verified className='w-4 h-4 text-green-600' />
                          <span>Joystick Controls</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className='text-base font-medium text-gray-900 mb-3'>
                        Additional Equipment
                      </h4>
                      <div className='space-y-2'>
                        <div className='flex items-center space-x-2'>
                          <Verified className='w-4 h-4 text-green-600' />
                          <span>Standard Bucket</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Verified className='w-4 h-4 text-green-600' />
                          <span>Rubber Tracks</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Verified className='w-4 h-4 text-green-600' />
                          <span>Hammer Lines</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Verified className='w-4 h-4 text-green-600' />
                          <span>Auxiliary Hydraulics</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Verified className='w-4 h-4 text-green-600' />
                          <span>Operator Manual</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Policies' && (
                <div>
                  <h3 className='text-lg font-medium text-gray-900 mb-4'>
                    Purchase & Rental Policies
                  </h3>
                  <div className='space-y-6'>
                    <div>
                      <h4 className='text-base font-medium text-gray-900 mb-3'>Payment Terms</h4>
                      <ul className='space-y-2 text-gray-700'>
                        <li>• Bank financing available with approved credit</li>
                        <li>• Cash payment accepted</li>
                        <li>• Trade-in equipment accepted</li>
                        <li>• Lease-to-own options available</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className='text-base font-medium text-gray-900 mb-3'>
                        Inspection Policy
                      </h4>
                      <ul className='space-y-2 text-gray-700'>
                        <li>• 48-hour inspection period after purchase</li>
                        <li>• Professional inspection reports available</li>
                        <li>• Equipment can be tested before purchase</li>
                        <li>• All sales final after inspection period</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className='text-base font-medium text-gray-900 mb-3'>Warranty</h4>
                      <ul className='space-y-2 text-gray-700'>
                        <li>• 30-day mechanical warranty included</li>
                        <li>• Extended warranty options available</li>
                        <li>• Parts and service support</li>
                        <li>• Manufacturer warranty may apply</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Location' && (
                <div>
                  <h3 className='text-lg font-medium text-gray-900 mb-4'>Equipment Location</h3>
                  <div className='mb-4'>
                    <p className='text-gray-700'>
                      <strong>Current Location:</strong> {equipment.location}
                    </p>
                    <p className='text-gray-700'>
                      <strong>Dealer:</strong> {equipment.dealer}
                    </p>
                    <p className='text-gray-700'>
                      <strong>Address:</strong> Industrial Area, {equipment.location}
                    </p>
                    <p className='text-gray-700'>
                      <strong>Viewing Hours:</strong> Monday - Friday: 8:00 AM - 5:00 PM
                    </p>
                  </div>
                  <div className='bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-4'>
                    <span className='text-gray-500'>
                      Map showing equipment location would be displayed here
                    </span>
                  </div>
                  <div className='bg-blue-50 p-4 rounded-lg'>
                    <h4 className='font-semibold text-blue-900 mb-2'>Transportation</h4>
                    <p className='text-blue-800'>
                      Delivery and transportation services available. Contact us for shipping quotes
                      to your location.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "What's Included" && (
                <div>
                  <h3 className='text-lg font-medium text-gray-900 mb-4'>
                    What&apos;s Included with Purchase
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <h4 className='text-base font-medium text-gray-900 mb-3'>Documentation</h4>
                      <div className='space-y-2'>
                        <div className='flex items-center space-x-2'>
                          <FileText className='w-4 h-4 text-blue-600' />
                          <span>Title and Registration</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <FileText className='w-4 h-4 text-blue-600' />
                          <span>Service Records</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <FileText className='w-4 h-4 text-blue-600' />
                          <span>Operator Manual</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <FileText className='w-4 h-4 text-blue-600' />
                          <span>Parts Manual</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className='text-base font-medium text-gray-900 mb-3'>Services</h4>
                      <div className='space-y-2'>
                        <div className='flex items-center space-x-2'>
                          <Wrench className='w-4 h-4 text-green-600' />
                          <span>Pre-delivery Inspection</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Wrench className='w-4 h-4 text-green-600' />
                          <span>Fresh Service & Fluids</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Wrench className='w-4 h-4 text-green-600' />
                          <span>Equipment Orientation</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Wrench className='w-4 h-4 text-green-600' />
                          <span>30-Day Support</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Reviews' && (
                <div>
                  <h3 className='text-lg font-medium text-gray-900 mb-4'>Customer Reviews</h3>
                  <div className='space-y-6'>
                    <div className='border-b pb-4'>
                      <div className='flex items-center space-x-2 mb-2'>
                        <div className='flex space-x-1'>
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} className='w-4 h-4 text-yellow-400 fill-current' />
                          ))}
                        </div>
                        <span className='font-semibold'>Ahmed Al-Rashid</span>
                        <span className='text-gray-500 text-sm'>2 weeks ago</span>
                      </div>
                      <p className='text-gray-700'>
                        &quot;Excellent excavator in great condition. The dealer was very
                        professional and the equipment performed exactly as described. Highly
                        recommended!&quot;
                      </p>
                    </div>
                    <div className='border-b pb-4'>
                      <div className='flex items-center space-x-2 mb-2'>
                        <div className='flex space-x-1'>
                          {[1, 2, 3, 4].map(star => (
                            <Star key={star} className='w-4 h-4 text-yellow-400 fill-current' />
                          ))}
                          <Star className='w-4 h-4 text-gray-300' />
                        </div>
                        <span className='font-semibold'>Construction Co. LLC</span>
                        <span className='text-gray-500 text-sm'>1 month ago</span>
                      </div>
                      <p className='text-gray-700'>
                        &quot;Good machine for the price. Some minor wear but nothing unexpected for
                        the hours. Delivery was on time.&quot;
                      </p>
                    </div>
                    <div>
                      <div className='flex items-center space-x-2 mb-2'>
                        <div className='flex space-x-1'>
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} className='w-4 h-4 text-yellow-400 fill-current' />
                          ))}
                        </div>
                        <span className='font-semibold'>Mohammed Hassan</span>
                        <span className='text-gray-500 text-sm'>2 months ago</span>
                      </div>
                      <p className='text-gray-700'>
                        &quot;Outstanding service from this dealer. The excavator has been working
                        perfectly on our construction site. Great value for money.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Availability' && (
                <div>
                  <h3 className='text-lg font-medium text-gray-900 mb-4'>Equipment Availability</h3>
                  <div className='space-y-6'>
                    <div className='bg-green-50 p-4 rounded-lg'>
                      <div className='flex items-center space-x-2 mb-2'>
                        <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                        <span className='font-semibold text-green-800'>Available Now</span>
                      </div>
                      <p className='text-green-700'>
                        This equipment is currently available for immediate purchase or inspection.
                      </p>
                    </div>
                    <div>
                      <h4 className='text-base font-medium text-gray-900 mb-3'>Viewing Schedule</h4>
                      <div className='space-y-2 text-gray-700'>
                        <p>
                          <strong>Monday - Friday:</strong> 8:00 AM - 5:00 PM
                        </p>
                        <p>
                          <strong>Saturday:</strong> 9:00 AM - 2:00 PM
                        </p>
                        <p>
                          <strong>Sunday:</strong> By appointment only
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className='text-base font-medium text-gray-900 mb-3'>
                        Delivery Timeline
                      </h4>
                      <div className='space-y-2 text-gray-700'>
                        <p>• Local delivery: 1-2 business days</p>
                        <p>• Regional delivery: 3-5 business days</p>
                        <p>• International shipping: 2-4 weeks</p>
                        <p>• Express delivery available upon request</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'FAQs' && (
                <div>
                  <h3 className='text-lg font-medium text-gray-900 mb-4'>
                    Frequently Asked Questions
                  </h3>
                  <div className='space-y-4'>
                    <div className='border-b pb-4'>
                      <h4 className='font-semibold text-gray-900 mb-2'>
                        What is the condition of this equipment?
                      </h4>
                      <p className='text-gray-700'>
                        This equipment is in {equipment.condition.toLowerCase()} condition with{' '}
                        {equipment.hours} operating hours. It has been regularly maintained and
                        serviced according to manufacturer specifications.
                      </p>
                    </div>
                    <div className='border-b pb-4'>
                      <h4 className='font-semibold text-gray-900 mb-2'>Is financing available?</h4>
                      <p className='text-gray-700'>
                        Yes, we offer various financing options including bank loans, lease-to-own
                        programs, and trade-in opportunities. Contact us to discuss the best option
                        for your needs.
                      </p>
                    </div>
                    <div className='border-b pb-4'>
                      <h4 className='font-semibold text-gray-900 mb-2'>
                        Can I inspect the equipment before purchase?
                      </h4>
                      <p className='text-gray-700'>
                        Absolutely! We encourage all potential buyers to inspect and test the
                        equipment. We can arrange a convenient time for you to visit our facility or
                        have the equipment demonstrated.
                      </p>
                    </div>
                    <div className='border-b pb-4'>
                      <h4 className='font-semibold text-gray-900 mb-2'>
                        What warranty is included?
                      </h4>
                      <p className='text-gray-700'>
                        All equipment comes with a 30-day mechanical warranty. Extended warranty
                        options are available for additional coverage and peace of mind.
                      </p>
                    </div>
                    <div className='border-b pb-4'>
                      <h4 className='font-semibold text-gray-900 mb-2'>Do you provide delivery?</h4>
                      <p className='text-gray-700'>
                        Yes, we provide delivery services throughout the UAE and internationally.
                        Delivery costs vary based on distance and equipment size. Contact us for a
                        delivery quote.
                      </p>
                    </div>
                    <div>
                      <h4 className='font-semibold text-gray-900 mb-2'>
                        What payment methods do you accept?
                      </h4>
                      <p className='text-gray-700'>
                        We accept bank transfers, certified checks, cash payments, and financing
                        through approved lenders. Trade-ins are also welcome as partial payment.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Equipment Info & Contact */}
          <div className='lg:col-span-1'>
            <div className='bg-white border border-gray-200 rounded-lg p-6 sticky top-6'>
              {/* Price Section */}
              <div className='mb-6'>
                <div className='text-3xl font-bold text-gray-900 mb-1'>
                  ${equipment.price.toLocaleString()}
                </div>
                <div className='text-sm text-gray-600'>Asking Price</div>
                {equipment.originalPrice && (
                  <div className='text-sm text-gray-500 line-through mt-1'>
                    Was ${equipment.originalPrice.toLocaleString()}
                  </div>
                )}
              </div>

              {/* Equipment Details */}
              <div className='mb-6'>
                <h4 className='font-semibold text-gray-900 mb-3'>Equipment Details</h4>
                <div className='space-y-2'>
                  <div className='flex justify-between py-1'>
                    <span className='text-gray-600'>Year:</span>
                    <span className='font-medium'>{equipment.year}</span>
                  </div>
                  <div className='flex justify-between py-1'>
                    <span className='text-gray-600'>Hours:</span>
                    <span className='font-medium'>{equipment.hours}</span>
                  </div>
                  <div className='flex justify-between py-1'>
                    <span className='text-gray-600'>Condition:</span>
                    <span className='font-medium text-green-600'>{equipment.condition}</span>
                  </div>
                </div>
              </div>

              {/* Seller Information */}
              <div className='mb-6'>
                <h4 className='font-semibold text-gray-900 mb-3'>Seller Information</h4>
                <div className='space-y-2'>
                  <div className='font-medium text-gray-900'>{equipment.dealer}</div>
                  <div className='text-gray-600'>{equipment.contactPerson}</div>
                  <div className='text-gray-600'>{equipment.location}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='space-y-3 mb-6'>
                <button className='w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary-hover transition-colors'>
                  Contact Seller
                </button>

                <button className='w-full border border-border text-foreground py-3 px-4 rounded-lg font-medium hover:bg-muted transition-colors'>
                  Request Quote
                </button>

                <button className='w-full bg-success text-success-foreground py-3 px-4 rounded-lg font-medium hover:bg-success/90 transition-colors'>
                  Schedule Inspection
                </button>

                <Link
                  href={`/ai-map-search?location=${encodeURIComponent(equipment.location)}&equipment=${encodeURIComponent(equipment.title)}`}
                  className='w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2'
                >
                  <MapPin className='w-4 h-4' />
                  <span>AI Map Search</span>
                </Link>
              </div>

              {/* Contact Details */}
              <div className='border-t pt-4'>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <Phone className='w-4 h-4 text-gray-500' />
                    <span className='text-sm text-gray-700'>{equipment.phone}</span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <Mail className='w-4 h-4 text-gray-500' />
                    <span className='text-sm text-gray-700'>{equipment.email}</span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <MessageCircle className='w-4 h-4 text-gray-500' />
                    <span className='text-sm text-gray-700'>{equipment.whatsapp}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
