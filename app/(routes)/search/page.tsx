import { redirect } from 'next/navigation';
import { createSlug } from '@/shared/utils/urlHelpers';

export const revalidate = 60;
export const dynamic = 'force-static';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    type?: string;
    category?: string;
    location?: string;
    priceMin?: string;
    priceMax?: string;
    page?: string;
    mode?: string;
  }>;
}

export default async function SearchResultsPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const { q, type, category, location, priceMin, priceMax, page } = params;

  // Map legacy types to new route types; default to rent when absent
  const normalizedType = type === 'sale' ? 'buy' : type === 'rent' ? 'rent' : 'rent';

  const qs = new URLSearchParams();
  if (category) qs.set('category', category);
  if (location) qs.set('location', location);
  if (priceMin) qs.set('priceMin', priceMin);
  if (priceMax) qs.set('priceMax', priceMax);
  if (page) qs.set('page', page);

  const slug = q ? createSlug(q) : '';
  const basePath = `/equipments/${normalizedType}${slug ? `/${slug}` : ''}`;
  const destination = `${basePath}${qs.toString() ? `?${qs.toString()}` : ''}`;

  // Permanently move users away from the deprecated /search path
  redirect(destination);
}
