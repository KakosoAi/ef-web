import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import EquipmentSearchClient from '../../EquipmentSearchClient';
import { createSlug } from '@/shared/utils/urlHelpers';

export const revalidate = 60;
export const dynamic = 'force-static';
export const dynamicParams = true; // Allow fallback generation for params not pre-generated

interface PageProps {
  params: Promise<{ type: string; category: string }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
    location?: string;
    priceMin?: string;
    priceMax?: string;
    page?: string;
  }>;
}

const validTypes = ['rent', 'buy', 'tools'];

export default async function EquipmentBrandsCategoryPage({ params, searchParams }: PageProps) {
  const { type, category } = await params;
  const resolvedSearchParams = await searchParams;

  if (!validTypes.includes(type)) {
    notFound();
  }

  // Fetch categories via route handler and map slug -> { id, name }
  const res = await fetch('/api/categories', { next: { revalidate: 60 } });
  let cats: Array<{ id: number; name: string }> = [];
  let fetchError: unknown = undefined;
  try {
    if (res.ok) {
      const body = await res.json();
      cats = Array.isArray(body) ? body : body?.categories || [];
    } else {
      fetchError = new Error(`Failed to fetch categories: ${res.status}`);
    }
  } catch (e) {
    fetchError = e;
  }

  // If categories fetch fails, proceed without preselect but keep the route
  const categorySlug = category.toLowerCase();

  let initialCategoryId: number | undefined = undefined;
  let initialCategoryLabel: string | undefined = undefined;
  let categoriesMap: Record<string, number> | undefined = undefined;

  if (!fetchError && Array.isArray(cats)) {
    // Build mapping of name -> id
    categoriesMap = Object.fromEntries(
      cats.map((c: { id: number; name: string }) => [c.name, c.id])
    );

    // Find matching category by slug of name
    const matched = cats.find(
      (c: { id: number; name: string }) => createSlug(c.name) === categorySlug
    );

    if (matched) {
      initialCategoryId = matched.id;
      initialCategoryLabel = matched.name;
    }
  }

  // Merge incoming search params with derived category label (for UI preselect)
  const mergedSearchParams = {
    ...resolvedSearchParams,
    category: initialCategoryLabel || resolvedSearchParams.category,
  };

  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main>
        <Suspense
          fallback={
            <div className='container mx-auto px-4 py-8'>
              <div className='text-center py-12'>
                <div className='animate-pulse text-muted-foreground'>
                  Loading{' '}
                  {type === 'buy'
                    ? 'equipment for sale'
                    : type === 'rent'
                      ? 'equipment for rent'
                      : 'tools'}
                  ...
                </div>
              </div>
            </div>
          }
        >
          <EquipmentSearchClient
            type={type}
            searchParams={mergedSearchParams}
            initialCategoryId={initialCategoryId}
            categoriesMap={categoriesMap}
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

// Pre-generate known categories for rent; others will fallback on first request
export async function generateStaticParams() {
  const known = [
    'excavators',
    'wheel-loaders',
    'cranes',
    'bulldozers',
    'backhoe-loaders',
    'skid-steers',
    'compactors',
    'generators',
  ];
  return known.map(category => ({ type: 'rent', category }));
}

export async function generateMetadata({ params }: PageProps) {
  const { type, category } = await params;
  const categoryTitle = category.replace(/-/g, ' ');

  const titles = {
    rent: `Equipment for Rent: ${categoryTitle} - Equipment Finder`,
    buy: `Equipment for Sale: ${categoryTitle} - Equipment Finder`,
    tools: `Tools for Rent: ${categoryTitle} - Equipment Finder`,
  } as const;

  const descriptions = {
    rent: `Find heavy equipment for rent in the category "${categoryTitle}" in the Middle East`,
    buy: `Browse heavy equipment for sale in the category "${categoryTitle}" from verified dealers`,
    tools: `Rent construction tools in the category "${categoryTitle}" and specialized equipment`,
  } as const;

  return {
    title: titles[type as keyof typeof titles] || `Equipment Search: ${categoryTitle}`,
    description:
      descriptions[type as keyof typeof descriptions] ||
      `Search for heavy equipment and construction tools: ${categoryTitle}.`,
  };
}
