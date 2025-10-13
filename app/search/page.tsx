import { redirect } from 'next/navigation';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    type?: string;
    category?: string;
    location?: string;
    priceMin?: string;
    priceMax?: string;
    page?: string;
  }>;
}

export default async function SearchResultsPage({ searchParams }: SearchPageProps) {
  // Redirect old search URLs to new clean URL structure
  const { q, type, category, location, priceMin, priceMax, page } = await searchParams;

  // Determine the new route based on type
  let newRoute = '/equipments/buy'; // default
  if (type === 'rent') {
    newRoute = '/equipments/rent';
  } else if (type === 'tools') {
    newRoute = '/equipments/tools';
  } else if (type === 'sale') {
    newRoute = '/equipments/buy';
  }

  // Build new query parameters
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (category) params.set('category', category);
  if (location) params.set('location', location);
  if (priceMin) params.set('priceMin', priceMin);
  if (priceMax) params.set('priceMax', priceMax);
  if (page) params.set('page', page);

  const queryString = params.toString();
  const redirectUrl = `${newRoute}${queryString ? `?${queryString}` : ''}`;

  redirect(redirectUrl);
}
