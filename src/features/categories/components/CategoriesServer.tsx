/* eslint-disable no-restricted-imports */
import CategoriesClient from './CategoriesClient';
import { getCategoriesCached } from '@server/services/categories';

interface CategoryWithImage {
  name: string;
  image: string;
  count?: string;
  description?: string;
}

// Server component that fetches categories directly from server service (bypasses Vercel Protect)
export default async function CategoriesServer({
  websiteMode = 'general',
}: {
  websiteMode?: 'general' | 'agricultural';
}) {
  try {
    const categories = await getCategoriesCached();

    // Normalize to client shape without using any
    const normalized: CategoryWithImage[] = (categories ?? []).map(c => ({
      name: (c as { name: string }).name,
      image: (c as { image: string }).image,
      count: '',
      description: '',
    }));

    return <CategoriesClient categories={normalized} websiteMode={websiteMode} />;
  } catch (e) {
    // On error, render empty state (service already falls back to defaults where possible)
    return <CategoriesClient categories={[]} websiteMode={websiteMode} />;
  }
}
