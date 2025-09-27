import { SiteConfig } from '@/shared/types';

export const siteConfig: SiteConfig = {
  name: 'Equipment Finders',
  description:
    "UAE's premier marketplace for heavy equipment and machinery. Buy, sell, and rent construction equipment with confidence.",
  url: 'https://equipment-finder.com',
  ogImage: 'https://equipment-finder.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/equipmentfinder',
    github: 'https://github.com/equipmentfinder',
  },
};

export const contactInfo = {
  phone: '+971 4 567 8900',
  email: 'info@equipment-finder.com',
  address: 'Dubai, United Arab Emirates',
  locations: ['UAE Emirates'],
};

export const routes = {
  home: '/',
  search: '/search',
  equipment: '/equipment',
  categories: '/categories',
  about: '/about',
  contact: '/contact',
  login: '/login',
  register: '/register',
} as const;

export const equipmentCategories = [
  'Excavators',
  'Cranes',
  'Loaders',
  'Bulldozers',
  'Trucks',
  'Aerial Platforms',
  'Compactors',
  'Crushers',
] as const;

export const equipmentConditions = ['New', 'Like New', 'Excellent', 'Good', 'Fair'] as const;
