import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import EquipmentSearchClient from '../EquipmentSearchClient';

export const revalidate = 60;
export const dynamic = 'force-static';

interface PageProps {
  params: Promise<{
    type: string;
    query: string;
  }>;
  searchParams: Promise<{
    category?: string;
    location?: string;
    priceMin?: string;
    priceMax?: string;
    page?: string;
  }>;
}

// Valid equipment types
const validTypes = ['rent', 'buy', 'tools'];

export default async function EquipmentSearchQueryPage({ params, searchParams }: PageProps) {
  const { type, query } = await params;
  const resolvedSearchParams = await searchParams;

  // Validate the type parameter
  if (!validTypes.includes(type)) {
    notFound();
  }

  const mergedSearchParams = { ...resolvedSearchParams, q: query };

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
          <EquipmentSearchClient type={type} searchParams={mergedSearchParams} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { type, query } = await params;

  const titles = {
    rent: `Equipment for Rent: ${query} - Equipment Finder`,
    buy: `Equipment for Sale: ${query} - Equipment Finder`,
    tools: `Tools for Rent: ${query} - Equipment Finder`,
  } as const;

  const descriptions = {
    rent: `Find heavy equipment for rent matching "${query}" in the Middle East`,
    buy: `Browse heavy equipment for sale matching "${query}" from verified dealers`,
    tools: `Rent construction tools matching "${query}" and specialized equipment`,
  } as const;

  return {
    title: titles[type as keyof typeof titles] || `Equipment Search: ${query}`,
    description:
      descriptions[type as keyof typeof descriptions] ||
      `Search for heavy equipment and construction tools: ${query}.`,
  };
}
