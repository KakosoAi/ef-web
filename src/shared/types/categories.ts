import { LucideIcon } from 'lucide-react';

export interface Category {
  name: string;
  icon: LucideIcon;
  count: string;
  slug?: string;
  description?: string;
}

export interface CategoryGrid {
  categories: Category[];
  title?: string;
  subtitle?: string;
}

export interface CategoryStats {
  totalEquipment: number;
  totalCategories: number;
  featuredCategories: Category[];
}