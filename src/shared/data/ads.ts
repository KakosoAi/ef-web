import { Ad } from '@/shared/types/ad';

export const adsData: Ad[] = [
  {
    id: 'parts-service-001',
    title: 'Parts & Service Solutions',
    description:
      'Comprehensive parts and service solutions for all your heavy equipment needs. We provide genuine OEM parts, aftermarket alternatives, and expert service support to keep your machinery running at peak performance.',
    shortDescription: 'Genuine parts available',
    category: 'parts',
    icon: '⚙️',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=400&fit=crop',
    ctaText: 'Browse Parts Catalog',
    company: {
      name: 'MidEast Parts & Service',
      website: 'https://mideastparts.com',
      phone: '+971-4-123-4567',
      email: 'parts@mideastparts.com',
    },
    features: [
      'Genuine OEM Parts',
      '24/7 Emergency Service',
      'Expert Technicians',
      'Warranty Coverage',
      'Fast Delivery',
      'Competitive Pricing',
    ],
    pricing: {
      currency: 'AED',
      priceType: 'contact_for_quote',
    },
    location: {
      city: 'Dubai',
      country: 'UAE',
      region: 'Middle East',
    },
    isActive: true,
    isPremium: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'equipment-insurance-001',
    title: 'Equipment Insurance Protection',
    description:
      'Protect your valuable heavy equipment investment with comprehensive insurance coverage. Our specialized policies cover theft, damage, breakdown, and liability for construction and industrial equipment.',
    shortDescription: 'Protect your investment',
    category: 'insurance',
    icon: '🏗️',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    ctaText: 'Get Insurance Quote',
    company: {
      name: 'Gulf Equipment Insurance',
      website: 'https://gulfequipinsurance.com',
      phone: '+971-4-987-6543',
      email: 'quotes@gulfequipinsurance.com',
    },
    features: [
      'Comprehensive Coverage',
      'Competitive Premiums',
      'Quick Claims Processing',
      '24/7 Support',
      'Flexible Payment Plans',
      'Regional Expertise',
    ],
    pricing: {
      startingPrice: 500,
      currency: 'AED',
      priceType: 'starting_from',
    },
    location: {
      city: 'Abu Dhabi',
      country: 'UAE',
      region: 'Middle East',
    },
    isActive: true,
    isPremium: true,
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
  },
  {
    id: 'equipment-transport-001',
    title: 'Equipment Transport Services',
    description:
      'Professional heavy equipment transportation services across the Middle East. We specialize in safe, secure, and timely delivery of construction machinery, industrial equipment, and oversized loads.',
    shortDescription: 'Nationwide delivery service',
    category: 'transport',
    icon: '🚚',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop',
    ctaText: 'Request Transport Quote',
    company: {
      name: 'Heavy Haul Transport Co.',
      website: 'https://heavyhaul-me.com',
      phone: '+971-50-123-4567',
      email: 'logistics@heavyhaul-me.com',
    },
    features: [
      'Specialized Heavy Haul',
      'Nationwide Coverage',
      'Insured Transport',
      'Real-time Tracking',
      'Expert Drivers',
      'Competitive Rates',
    ],
    pricing: {
      startingPrice: 1500,
      currency: 'AED',
      priceType: 'starting_from',
    },
    location: {
      city: 'Sharjah',
      country: 'UAE',
      region: 'Middle East',
    },
    isActive: true,
    isPremium: false,
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
  },
  {
    id: 'maintenance-services-001',
    title: 'Maintenance & Repair Services',
    description:
      'Expert maintenance and repair services for all types of heavy equipment. Our certified technicians provide preventive maintenance, emergency repairs, and complete overhauls to maximize equipment uptime.',
    shortDescription: 'Expert repair & maintenance',
    category: 'maintenance',
    icon: '🔧',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=400&fit=crop',
    ctaText: 'Schedule Service',
    company: {
      name: 'ProMaint Equipment Services',
      website: 'https://promaint-me.com',
      phone: '+971-4-555-0123',
      email: 'service@promaint-me.com',
    },
    features: [
      'Certified Technicians',
      'Preventive Maintenance',
      'Emergency Repairs',
      'Mobile Service Units',
      'Genuine Parts',
      'Service Contracts',
    ],
    pricing: {
      startingPrice: 300,
      currency: 'AED',
      priceType: 'starting_from',
    },
    location: {
      city: 'Dubai',
      country: 'UAE',
      region: 'Middle East',
    },
    isActive: true,
    isPremium: false,
    createdAt: '2024-01-08T16:45:00Z',
    updatedAt: '2024-01-08T16:45:00Z',
  },
  {
    id: 'equipment-financing-001',
    title: 'Equipment Financing Solutions',
    description:
      'Flexible financing options for heavy equipment purchases and leases. We offer competitive rates, flexible terms, and quick approval processes to help you acquire the equipment you need for your business.',
    shortDescription: 'Flexible payment options',
    category: 'financing',
    icon: '💰',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    ctaText: 'Apply for Financing',
    company: {
      name: 'Gulf Equipment Finance',
      website: 'https://gulfequipfinance.com',
      phone: '+971-4-777-8888',
      email: 'finance@gulfequipfinance.com',
    },
    features: [
      'Competitive Interest Rates',
      'Flexible Terms',
      'Quick Approval',
      'Lease Options',
      'Equipment Refinancing',
      'Business Loans',
    ],
    pricing: {
      startingPrice: 5,
      currency: 'AED',
      priceType: 'starting_from',
    },
    location: {
      city: 'Dubai',
      country: 'UAE',
      region: 'Middle East',
    },
    isActive: true,
    isPremium: true,
    createdAt: '2024-01-05T11:20:00Z',
    updatedAt: '2024-01-05T11:20:00Z',
  },
];

// Helper function to get ads by category
export const getAdsByCategory = (category: Ad['category']): Ad[] => {
  return adsData.filter(ad => ad.category === category && ad.isActive);
};

// Helper function to get ad by ID
export const getAdById = (id: string): Ad | undefined => {
  return adsData.find(ad => ad.id === id && ad.isActive);
};

// Helper function to get all active ads
export const getActiveAds = (): Ad[] => {
  return adsData.filter(ad => ad.isActive);
};
