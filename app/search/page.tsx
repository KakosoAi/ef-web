import { Suspense } from 'react';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import SearchResultsClient from './SearchResultsClient';

export default function SearchResultsPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main>
        <Suspense fallback={<div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-pulse text-muted-foreground">Loading search results...</div>
          </div>
        </div>}>
          <SearchResultsClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
