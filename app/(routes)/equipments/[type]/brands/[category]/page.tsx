import Footer from '@/features/layout/components/Footer';
import Header from '@/features/layout/components/Header';
import { CATEGORY_NAMES } from '@/shared/constants/categories';
import { createSlug } from '@/shared/utils/urlHelpers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import EquipmentSearchClient from '../../EquipmentSearchClient';
import { SearchService } from '@/server/services/search';
import type { SearchQueryParams, SearchResultItem, SearchResponse } from '@/shared/types/search';
import { getCategoriesCached } from '@/server/services/categories';

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

  const typeForSearch = type;

  // Derive initial label from static category names to avoid build-time fetch
  const categorySlug = category.toLowerCase();

  // Resolve category id and build categories map on the server for SSR
  let initialCategoryId: number | undefined = undefined;
  let initialCategoryLabel: string | undefined = undefined;
  let categoriesMap: Record<string, number> | undefined = undefined;

  try {
    const categories = await getCategoriesCached();
    if (categories && categories.length > 0) {
      categoriesMap = categories.reduce<Record<string, number>>((acc, cat) => {
        acc[cat.name] = cat.id;
        return acc;
      }, {});

      // Find matching category by slug
      const matched = categories.find(c => createSlug(c.name) === categorySlug);

      if (matched) {
        initialCategoryId = matched.id;
        initialCategoryLabel = matched.name;
      }
    }
  } catch (e) {
    // ignore, fallback to client-side categories fetch
  }

  let initialResults: SearchResponse | undefined = undefined;

  // Construct initialSearchParams for the search service
  const initialSearchParams: SearchQueryParams = {
    searchText: resolvedSearchParams.q,
    type: typeForSearch,
    categoryId: initialCategoryId,
    priceMin: resolvedSearchParams.priceMin ? Number(resolvedSearchParams.priceMin) : undefined,
    priceMax: resolvedSearchParams.priceMax ? Number(resolvedSearchParams.priceMax) : undefined,
    page: resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1,
  };

  try {
    const searchService = new SearchService();
    initialResults = await searchService.search(initialSearchParams);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Initial server search failed:', e);
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
              {/* Server-rendered initial results fallback */}
              <div className='mb-6'>
                <h1 className='text-2xl font-bold text-gray-900'>
                  {initialCategoryLabel ? `${initialCategoryLabel} – ` : ''}
                  {typeForSearch === 'buy'
                    ? 'Equipment for Sale'
                    : typeForSearch === 'rent'
                      ? 'Equipment for Rent'
                      : 'Tools'}
                </h1>
                <p className='text-gray-600 mt-1'>
                  {initialResults?.pagination?.total
                    ? `${initialResults.pagination.total} results`
                    : 'Loading results...'}
                </p>
              </div>

              {!initialResults || initialResults.items.length === 0 ? (
                <div className='text-center py-12'>
                  <p className='text-gray-600'>No equipment found for this category yet.</p>
                </div>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {initialResults.items.map((item: SearchResultItem) => {
                    const img = item.images?.[0]?.url || '/placeholder.svg';
                    const year = item.year ?? 'N/A';
                    const loc =
                      item.location?.city ||
                      item.location?.state ||
                      item.location?.country ||
                      'Location not specified';
                    const price =
                      typeof item.price === 'number'
                        ? `$${item.price.toLocaleString()}`
                        : (item.price ?? '');
                    const detailsHref = `/products/${typeForSearch}/${item.slug}/${item.id}`;
                    return (
                      <div key={item.id} className='bg-white rounded-xl overflow-hidden shadow'>
                        <div className='relative aspect-[4/3]'>
                          <Image
                            src={img}
                            alt={item.title}
                            fill
                            sizes='(max-width: 768px) 100vw, 33vw'
                            className='object-cover'
                          />
                        </div>
                        <div className='p-4'>
                          <h3 className='font-medium text-base text-gray-900 mb-2 line-clamp-1'>
                            {item.title}
                          </h3>
                          <div className='mb-3'>
                            <span className='text-lg font-semibold text-orange-600'>{price}</span>
                          </div>
                          <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                            <span>{year}</span>
                            <span className='flex items-center'>{loc}</span>
                          </div>
                          <a
                            href={detailsHref}
                            className='inline-flex items-center justify-center w-full border border-gray-200 rounded-lg py-2 text-gray-700 hover:text-orange-600 hover:border-orange-300 transition-colors'
                          >
                            View Details
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          }
        >
          <EquipmentSearchClient
            type={type}
            searchParams={mergedSearchParams}
            initialCategoryId={initialCategoryId}
            categoriesMap={categoriesMap}
            initialResults={initialResults}
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
