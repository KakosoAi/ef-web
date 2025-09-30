export interface EquipmentAd {
  id: string;
  title: string;
  price: string;
  category: string;
  condition: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  images: string[];
  description: string;
  seller: {
    name: string;
    rating: number;
    verified: boolean;
  };
  specifications: {
    year?: string;
    brand?: string;
    model?: string;
    hours?: string;
  };
}

export const equipmentData: EquipmentAd[] = [
  {
    id: '1',
    title: 'CAT 320D Excavator',
    price: '$85,000',
    category: 'Excavators',
    condition: 'Used',
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: '123 Construction Ave',
      city: 'New York, NY',
    },
    images: ['/assets/equipment/excavator-1.jpg'],
    description:
      'Well-maintained CAT 320D excavator with low hours. Perfect for medium to large construction projects.',
    seller: {
      name: 'NYC Equipment Co.',
      rating: 4.8,
      verified: true,
    },
    specifications: {
      year: '2018',
      brand: 'Caterpillar',
      model: '320D',
      hours: '2,450',
    },
  },
  {
    id: '2',
    title: 'John Deere 544K Wheel Loader',
    price: '$125,000',
    category: 'Wheel Loaders',
    condition: 'Used',
    location: {
      lat: 40.7589,
      lng: -73.9851,
      address: '456 Industrial Blvd',
      city: 'New York, NY',
    },
    images: ['/assets/equipment/loader-1.jpg'],
    description: 'Powerful John Deere wheel loader with excellent hydraulics and comfortable cab.',
    seller: {
      name: 'Empire Heavy Equipment',
      rating: 4.6,
      verified: true,
    },
    specifications: {
      year: '2019',
      brand: 'John Deere',
      model: '544K',
      hours: '1,850',
    },
  },
  {
    id: '3',
    title: 'Bobcat S650 Skid Steer',
    price: '$35,000',
    category: 'Skid Steers',
    condition: 'Used',
    location: {
      lat: 40.6892,
      lng: -74.0445,
      address: '789 Equipment Row',
      city: 'Jersey City, NJ',
    },
    images: ['/assets/equipment/skidsteer-1.jpg'],
    description:
      'Compact and versatile Bobcat skid steer loader. Great for tight spaces and various attachments.',
    seller: {
      name: 'Garden State Equipment',
      rating: 4.7,
      verified: true,
    },
    specifications: {
      year: '2020',
      brand: 'Bobcat',
      model: 'S650',
      hours: '950',
    },
  },
  {
    id: '4',
    title: 'Komatsu PC210 Excavator',
    price: '$95,000',
    category: 'Excavators',
    condition: 'Used',
    location: {
      lat: 40.7282,
      lng: -73.7949,
      address: '321 Queens Blvd',
      city: 'Queens, NY',
    },
    images: ['/assets/equipment/excavator-2.jpg'],
    description:
      'Reliable Komatsu excavator with advanced hydraulic system and fuel-efficient engine.',
    seller: {
      name: 'Queens Heavy Machinery',
      rating: 4.5,
      verified: false,
    },
    specifications: {
      year: '2017',
      brand: 'Komatsu',
      model: 'PC210',
      hours: '3,200',
    },
  },
  {
    id: '5',
    title: 'Case 580N Backhoe Loader',
    price: '$65,000',
    category: 'Backhoe Loaders',
    condition: 'Used',
    location: {
      lat: 40.8176,
      lng: -73.9782,
      address: '654 Bronx Ave',
      city: 'Bronx, NY',
    },
    images: ['/assets/equipment/backhoe-1.jpg'],
    description:
      'Versatile Case backhoe loader perfect for digging, loading, and material handling.',
    seller: {
      name: 'Bronx Equipment Depot',
      rating: 4.4,
      verified: true,
    },
    specifications: {
      year: '2019',
      brand: 'Case',
      model: '580N',
      hours: '1,650',
    },
  },
  {
    id: '6',
    title: 'Volvo EC160E Excavator',
    price: '$78,000',
    category: 'Excavators',
    condition: 'Used',
    location: {
      lat: 40.6782,
      lng: -73.9442,
      address: '987 Brooklyn Heights',
      city: 'Brooklyn, NY',
    },
    images: ['/assets/equipment/excavator-3.jpg'],
    description:
      'Fuel-efficient Volvo excavator with excellent operator comfort and precision controls.',
    seller: {
      name: 'Brooklyn Heavy Equipment',
      rating: 4.9,
      verified: true,
    },
    specifications: {
      year: '2018',
      brand: 'Volvo',
      model: 'EC160E',
      hours: '2,100',
    },
  },
  {
    id: '7',
    title: 'JCB 3CX Backhoe Loader',
    price: '$55,000',
    category: 'Backhoe Loaders',
    condition: 'Used',
    location: {
      lat: 40.7505,
      lng: -73.9934,
      address: '147 Manhattan Plaza',
      city: 'New York, NY',
    },
    images: ['/assets/equipment/backhoe-2.jpg'],
    description:
      'Compact JCB backhoe loader with excellent maneuverability and powerful digging force.',
    seller: {
      name: 'Manhattan Equipment Sales',
      rating: 4.3,
      verified: true,
    },
    specifications: {
      year: '2020',
      brand: 'JCB',
      model: '3CX',
      hours: '800',
    },
  },
  {
    id: '8',
    title: 'Caterpillar 950M Wheel Loader',
    price: '$145,000',
    category: 'Wheel Loaders',
    condition: 'Used',
    location: {
      lat: 40.7831,
      lng: -73.9712,
      address: '258 Harlem Way',
      city: 'New York, NY',
    },
    images: ['/assets/equipment/loader-2.jpg'],
    description:
      'Heavy-duty CAT wheel loader with high-capacity bucket and advanced load-sensing hydraulics.',
    seller: {
      name: 'Harlem Heavy Machinery',
      rating: 4.6,
      verified: true,
    },
    specifications: {
      year: '2019',
      brand: 'Caterpillar',
      model: '950M',
      hours: '1,950',
    },
  },
];

// Equipment categories for filtering
export const equipmentCategories = [
  'All Categories',
  'Excavators',
  'Wheel Loaders',
  'Skid Steers',
  'Backhoe Loaders',
  'Bulldozers',
  'Cranes',
  'Dump Trucks',
];

// Price ranges for filtering
export const priceRanges = [
  'All Prices',
  'Under $50,000',
  '$50,000 - $100,000',
  '$100,000 - $150,000',
  'Over $150,000',
];
