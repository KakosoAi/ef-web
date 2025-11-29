import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import EquipmentSearchClient from '../../EquipmentSearchClient';
import { getSupabaseServerClient } from '@/server/lib/supabase';
import { createSlug } from '@/shared/utils/urlHelpers';

export const revalidate = 60;
export const dynamic = 'force-static';

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

  // Fetch categories from Supabase and map slug -> { id, name }
  const supabase = getSupabaseServerClient();
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name')
    .eq('visible', true);

  // If categories fetch fails, proceed without preselect but keep the route
  const categorySlug = category.toLowerCase();
  const slugVariants = Array.from(
    new Set([categorySlug, categorySlug.replace(/s$/, ''), categorySlug.replace(/-es$/, '')])
  );

  let initialCategoryId: number | undefined = undefined;
  let initialCategoryLabel: string | undefined = undefined;
  let categoriesMap: Record<string, number> | undefined = undefined;

  if (!error && Array.isArray(categories)) {
    // Build mapping of name -> id
    categoriesMap = Object.fromEntries(
      categories.map((c: { id: number; name: string }) => [c.name, c.id])
    );

    // Find matching category by slug of name
    const matched = categories.find((c: { id: number; name: string }) =>
      slugVariants.includes(createSlug(c.name))
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
