import { SiteConfig } from '@/shared/types';

export const siteConfig: SiteConfig = {
  name: "Machinery Vision",
  description: "UAE's premier marketplace for heavy equipment and machinery. Buy, sell, and rent construction equipment with confidence.",
  url: "https://machinery-vision.com",
  ogImage: "https://machinery-vision.com/og.jpg",
  links: {
    twitter: "https://twitter.com/machineryvision",
    github: "https://github.com/machineryvision"
  }
};

export const contactInfo = {
  phone: "+971 XXX XXXX",
  email: "info@machinery-vision.com",
  address: "Dubai, United Arab Emirates",
  locations: [
    "Dubai",
    "Abu Dhabi", 
    "Sharjah",
    "Ajman",
    "Ras Al Khaimah",
    "Fujairah"
  ]
};

export const routes = {
  home: "/",
  search: "/search",
  equipment: "/equipment",
  categories: "/categories",
  about: "/about",
  contact: "/contact",
  login: "/login",
  register: "/register"
} as const;

export const equipmentCategories = [
  "Excavators",
  "Cranes", 
  "Loaders",
  "Bulldozers",
  "Trucks",
  "Aerial Platforms",
  "Compactors",
  "Crushers"
] as const;

export const equipmentConditions = [
  "New",
  "Like New", 
  "Excellent",
  "Good",
  "Fair"
] as const;