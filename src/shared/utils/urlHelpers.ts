import { EquipmentAd } from '@/shared/data/equipmentData';

// Helper function to create slug from title
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Helper function to determine equipment type based on category or price
export const getEquipmentType = (equipment: EquipmentAd): string => {
  // For now, we'll default to 'rent' but this could be enhanced
  // to check if it's for sale or rent based on price or other indicators
  const priceNumber = parseFloat(equipment.price.replace(/[$,]/g, ''));

  // Simple logic: higher prices are typically for sale, lower for rent
  // This can be enhanced based on actual business logic
  if (priceNumber > 100000) {
    return 'buy';
  } else if (priceNumber > 50000) {
    return 'buy';
  } else {
    return 'rent';
  }
};

// Generate equipment URL in the format /products/[type]/[slug]/[id]
export const generateEquipmentUrl = (equipment: EquipmentAd): string => {
  const type = getEquipmentType(equipment);
  const slug = createSlug(equipment.title);
  return `/products/${type}/${slug}/${equipment.id}`;
};

// Parse equipment URL to extract parameters
export const parseEquipmentUrl = (
  url: string
): { type: string; slug: string; id: string } | null => {
  const match = url.match(/^\/products\/([^/]+)\/([^/]+)\/([^/]+)$/);
  if (!match) return null;

  return {
    type: match[1],
    slug: match[2],
    id: match[3],
  };
};
