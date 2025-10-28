import Footer from '@/features/layout/components/Footer';
import Header from '@/features/layout/components/Header';
import { CATEGORY_NAMES } from '@/shared/constants/categories';
import { createSlug } from '@/shared/utils/urlHelpers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import EquipmentSearchClient from '../../EquipmentSearchClient';

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

  // Derive initial label from static category names to avoid build-time fetch
  const categorySlug = category.toLowerCase();

  const initialCategoryId: number | undefined = undefined;
  const initialCategoryLabel: string | undefined = CATEGORY_NAMES.find(
    name => createSlug(name) === categorySlug
  );
  const categoriesMap: Record<string, number> | undefined = undefined;

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
  // Pre-generate high-priority categories for rent (extendable)
  const types = ['rent'];
  const slugs = CATEGORY_NAMES.map(name => createSlug(name));
  return types.flatMap(type => slugs.map(category => ({ type, category })));
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
