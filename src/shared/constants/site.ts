import { SiteConfig } from '@/shared/types';

export const siteConfig: SiteConfig = {
  name: 'Equipment Finder',
  description: 'One of the Largest Marketplace of Heavy Equipment in Middle East.',
  url: 'https://equipmentsfinder.com',
  ogImage: 'https://equipmentsfinder.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/equipmentsfinder',
    github: 'https://github.com/equipmentsfinder',
  },
};

export const contactInfo = {
  phone: '+971585839080',
  email: 'Support@equipmentsfinder.com',
  address: 'Dubai, United Arab Emirates',
  locations: ['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain'],
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
