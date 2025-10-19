import { Suspense } from 'react';
import SearchResults from '@/features/search/components/SearchResults';
import { Skeleton } from '@/shared/ui/skeleton';
import { Card, CardContent } from '@/shared/ui/card';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';

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

function SearchResultsSkeleton() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-6'>
        <div className='flex gap-6'>
          {/* Filters Sidebar Skeleton */}
          <div className='w-80 flex-shrink-0'>
            <div className='sticky top-6'>
              <Card>
                <CardContent className='p-6'>
                  <Skeleton className='h-6 w-32 mb-4' />
                  <div className='space-y-4'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i}>
                        <Skeleton className='h-4 w-24 mb-2' />
                        <Skeleton className='h-10 w-full' />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className='flex-1'>
            <div className='mb-6'>
              <Skeleton className='h-8 w-64 mb-2' />
              <Skeleton className='h-4 w-32' />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className='overflow-hidden'>
                  <Skeleton className='h-48 w-full' />
                  <CardContent className='p-4'>
                    <Skeleton className='h-4 w-3/4 mb-2' />
                    <Skeleton className='h-4 w-1/2 mb-2' />
                    <Skeleton className='h-4 w-2/3' />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function SearchResultsPage({ searchParams }: SearchPageProps) {
  const { q, type, category, location, priceMin, priceMax, page, mode } = await searchParams;

  // Convert search params to our new format
  const initialFilters = {
    categoryId: category ? parseInt(category) : undefined,
    cityId: location ? parseInt(location) : undefined,
    minPrice: priceMin ? parseFloat(priceMin) : undefined,
    maxPrice: priceMax ? parseFloat(priceMax) : undefined,
  };

  const websiteMode = mode === 'agricultural' ? 'agricultural' : 'general';

  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main className='container mx-auto px-4 py-6'>
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults
            initialQuery={q || ''}
            initialFilters={initialFilters}
            showFilters={true}
            websiteMode={websiteMode}
          />
        </Suspense>
      </main>
      <Footer websiteMode={websiteMode} />
    </div>
  );
}
