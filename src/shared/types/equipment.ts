export interface Equipment {
  id: number;
  title: string;
  year: number;
  hours: string;
  price: string;
  priceType: 'For Sale' | 'For Rent';
  location: string;
  dealer: string;
  verified: boolean;
  rating: number;
  image: string;
  images: string[];
  features: string[];
  condition: string;
  category: string;
  description: string;
  specifications: EquipmentSpecifications;
}

export interface EquipmentSpecifications {
  make: string;
  model: string;
  serialNumber: string;
  enginePower: string;
  fuelType: string;
  operatingWeight: string;
  bucketCapacity: string;
  maxDigDepth: string;
  maxReach: string;
  travelSpeed: string;
  hydraulicFlow: string;
  groundPressure: string;
}

export interface EquipmentCard {
  id: number;
  title: string;
  year: number;
  hours: string;
  price: string;
  priceType: 'For Sale' | 'For Rent';
  location: string;
  dealer: string;
  verified: boolean;
  rating: number;
  image: string;
  features: string[];
  condition: string;
  category: string;
}

export interface EquipmentDetailProps {
  equipment: Equipment;
  onClose: () => void;
}

export interface EquipmentFilters {
  category?: string;
  priceRange?: [number, number];
  yearRange?: [number, number];
  location?: string;
  condition?: string;
  dealer?: string;
}