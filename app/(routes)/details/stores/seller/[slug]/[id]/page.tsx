import { notFound } from 'next/navigation';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { getStoreById } from '@/server/services/stores';

export const revalidate = 300;
export const dynamic = 'force-static';

interface PageProps {
  params: Promise<{ slug: string; id: string }>;
}

export default async function StoreDetailPage({ params }: PageProps) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) {
    notFound();
  }

  const store = await getStoreById(numericId);
  if (!store) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main>
        {/* Banner section with logo overlay */}
        <section className='relative overflow-hidden border-b'>
          <div className='relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
            <div className='relative h-56 sm:h-72 w-full rounded-xl overflow-hidden bg-gray-100'>
              {store.banner ? (
                <Image
                  src={store.banner}
                  alt={`${store.name} banner`}
                  fill
                  className='object-cover'
                />
              ) : (
                <div className='absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100' />
              )}
            </div>
            <div className='flex items-end gap-4 -mt-8 pb-6'>
              <div className='h-20 w-20 rounded-xl border bg-white overflow-hidden shadow-sm'>
                {store.logo ? (
                  <Image
                    src={store.logo}
                    alt={`${store.name} logo`}
                    width={80}
                    height={80}
                    className='object-cover'
                  />
                ) : null}
              </div>
              <div className='flex-1'>
                <div className='flex items-center gap-2'>
                  <h1 className='text-2xl sm:text-3xl font-semibold tracking-tight'>
                    {store.name}
                  </h1>
                  {store.verified ? <Badge variant='default'>Verified</Badge> : null}
                </div>
                {store.tagline ? (
                  <p className='mt-1 text-muted-foreground'>{store.tagline}</p>
                ) : null}
              </div>
              {store.website ? (
                <Button asChild>
                  <a href={store.website} target='_blank' rel='noopener noreferrer'>
                    Visit Website
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </section>

        {/* Content section: clean reading column */}
        <section className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2'>
              <Card>
                <CardContent className='p-6'>
                  <h2 className='text-lg font-semibold'>About</h2>
                  {store.description ? (
                    <p className='mt-2 text-muted-foreground leading-7'>{store.description}</p>
                  ) : (
                    <p className='mt-2 text-muted-foreground'>No description provided.</p>
                  )}
                  {store.address ? (
                    <div className='mt-6'>
                      <h3 className='text-sm font-medium'>Address</h3>
                      <p className='mt-1 text-muted-foreground'>{store.address}</p>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardContent className='p-6'>
                  <h2 className='text-lg font-semibold'>Store Info</h2>
                  <dl className='mt-3 space-y-2'>
                    <div className='flex justify-between'>
                      <dt className='text-muted-foreground'>Status</dt>
                      <dd>{store.isactive ? 'Active' : 'Inactive'}</dd>
                    </div>
                    {/* <div className='flex justify-between'>
                      <dt className='text-muted-foreground'>Type</dt>
                      <dd>{store.storeType ?? '—'}</dd>
                    </div> */}
                    {typeof store.visits === 'number' ? (
                      <div className='flex justify-between'>
                        <dt className='text-muted-foreground'>Visits</dt>
                        <dd>{store.visits}</dd>
                      </div>
                    ) : null}
                  </dl>
                  <div className='mt-6'>
                    <Link href='/details/stores'>
                      <Button variant='outline' className='w-full'>
                        Back to Stores
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
