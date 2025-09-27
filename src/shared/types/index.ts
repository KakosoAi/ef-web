// Equipment types
export type {
  Equipment,
  EquipmentSpecifications,
  EquipmentCard,
  EquipmentDetailProps,
  EquipmentFilters,
} from './equipment';

// Search types
export type { SearchParams, SearchFilters, SearchResult, SearchFormData } from './search';

// Category types
export type { Category, CategoryGrid, CategoryStats } from './categories';

// Common UI types
export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  locations: string[];
}
