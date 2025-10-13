import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import EquipmentSearchClient from './EquipmentSearchClient';

interface PageProps {
  params: Promise<{
    type: string;
  }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
    location?: string;
    priceMin?: string;
    priceMax?: string;
    page?: string;
  }>;
}

// Valid equipment types
const validTypes = ['rent', 'buy', 'tools'];

export default async function EquipmentSearchPage({ params, searchParams }: PageProps) {
  const { type } = await params;
  const resolvedSearchParams = await searchParams;

  // Validate the type parameter
  if (!validTypes.includes(type)) {
    notFound();
  }

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
          <EquipmentSearchClient type={type} searchParams={resolvedSearchParams} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { type } = await params;

  const titles = {
    rent: 'Heavy Equipment for Rent - Equipment Finder',
    buy: 'Heavy Equipment for Sale - Equipment Finder',
    tools: 'Construction Tools for Rent - Equipment Finder',
  };

  const descriptions = {
    rent: 'Find heavy equipment for rent in the Middle East. Browse excavators, cranes, loaders and more.',
    buy: 'Buy heavy equipment in the Middle East. Quality used and new construction equipment for sale.',
    tools:
      'Rent construction tools and small equipment. Power tools, hand tools, and specialized equipment.',
  };

  return {
    title: titles[type as keyof typeof titles] || 'Equipment Search',
    description:
      descriptions[type as keyof typeof descriptions] ||
      'Search for heavy equipment and construction tools.',
  };
}
