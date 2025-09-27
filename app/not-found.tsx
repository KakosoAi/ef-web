import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main className='container mx-auto px-4 py-16 text-center'>
        <div className='max-w-md mx-auto'>
          <h1 className='text-6xl font-bold text-primary mb-4'>404</h1>
          <h2 className='text-2xl font-semibold mb-4'>Page Not Found</h2>
          <p className='text-muted-foreground mb-8'>
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <Button asChild>
            <Link href='/'>Return Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
