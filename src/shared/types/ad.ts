export interface Ad {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: 'parts' | 'service' | 'transport' | 'maintenance' | 'financing' | 'insurance';
  icon: string;
  imageUrl?: string;
  ctaText: string;
  ctaUrl?: string;
  company: {
    name: string;
    logo?: string;
    website?: string;
    phone?: string;
    email?: string;
  };
  features: string[];
  pricing?: {
    startingPrice?: number;
    currency: string;
    priceType: 'fixed' | 'starting_from' | 'contact_for_quote';
  };
  location?: {
    city: string;
    country: string;
    region: string;
  };
  isActive: boolean;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  // Future Supabase fields
  supabaseId?: string;
  userId?: string;
}

export interface AdListItem {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  category: Ad['category'];
  isPremium: boolean;
}
