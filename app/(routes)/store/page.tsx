import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { getStores, getStoreTypes } from '@/server/services/stores';

export const revalidate = 120;
export const dynamic = 'force-static';

interface PageProps {
  searchParams: Promise<{ q?: string; type?: string }>;
}

export default async function StorePage({ searchParams }: PageProps) {
  const { q, type } = await searchParams;
  const storeTypeId = type ? Number(type) : undefined;

  const [stores, storeTypes] = await Promise.all([
    getStores({ q, storeTypeId, limit: 48 }),
    getStoreTypes(),
  ]);

  // Ensure we only pass valid image sources to next/image.
  // Accepts absolute http(s), data URIs, or local paths starting with '/'.
  function isValidImageSrc(src?: string | null): boolean {
    if (!src) return false;
    const s = src.trim();
    if (s.startsWith('data:image')) return true;
    if (s.startsWith('/')) return true; // local asset
    try {
      const u = new URL(s);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  }

  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main>
        {/* Premium hero */}
        <section className='relative overflow-hidden border-b'>
          <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-center'>
              <div>
                <h1 className='text-3xl sm:text-4xl font-semibold tracking-tight'>Stores</h1>
                <p className='mt-3 text-muted-foreground max-w-prose'>
                  Browse verified sellers and dealerships. Clean and fast, like an iPhone page.
                </p>
                <div className='mt-6 flex flex-wrap gap-2'>
                  {storeTypes.map(st => (
                    <Link
                      key={st.id}
                      href={`/store?type=${st.id}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
                    >
                      <Badge
                        variant={storeTypeId === st.id ? 'default' : 'outline'}
                        className='cursor-pointer'
                      >
                        {st.name ?? 'Type'}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
              <div className='rounded-xl bg-gradient-to-br from-gray-50 to-white border p-6'>
                <form className='flex gap-2' action='/store' method='get'>
                  <input
                    name='q'
                    defaultValue={q || ''}
                    placeholder='Search stores'
                    className='flex-1 rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-ring'
                  />
                  {storeTypeId ? <input type='hidden' name='type' value={storeTypeId} /> : null}
                  <Button type='submit'>Search</Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10'>
          {stores.length === 0 ? (
            <div className='text-center py-20'>
              <h2 className='text-xl font-medium'>No stores found</h2>
              <p className='mt-2 text-muted-foreground'>Try a different search or filter.</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {stores.map(store => (
                <Link key={store.id} href={`/details/stores/seller/${store.slug}/${store.id}`}>
                  <Card className='hover:shadow-lg transition-shadow'>
                    <CardContent className='p-0'>
                      <div className='relative h-40 w-full overflow-hidden rounded-t-lg bg-gray-100'>
                        {isValidImageSrc(store.banner) ? (
                          <Image
                            src={store.banner!}
                            alt={`${store.name} banner`}
                            fill
                            className='object-cover'
                          />
                        ) : (
                          <div className='absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100' />
                        )}
                        {/* Logo */}
                        <div className='absolute -bottom-6 left-4 h-12 w-12 rounded-full border bg-white overflow-hidden shadow-sm'>
                          {isValidImageSrc(store.logo) ? (
                            <Image
                              src={store.logo!}
                              alt={`${store.name} logo`}
                              width={48}
                              height={48}
                              className='object-cover'
                            />
                          ) : (
                            <Image
                              src={'/placeholder.svg'}
                              alt={`${store.name} logo placeholder`}
                              width={48}
                              height={48}
                              className='object-cover'
                            />
                          )}
                        </div>
                      </div>
                      <div className='p-4 pt-6'>
                        <div className='flex items-center gap-2'>
                          <h3 className='text-lg font-semibold tracking-tight'>{store.name}</h3>
                          {store.verified ? <Badge variant='default'>Verified</Badge> : null}
                        </div>
                        {store.tagline ? (
                          <p className='mt-1 text-sm text-muted-foreground line-clamp-2'>
                            {store.tagline}
                          </p>
                        ) : null}
                        <div className='mt-4 flex items-center justify-between'>
                          <Button variant='outline' size='sm'>
                            View Store
                          </Button>
                          {typeof store.visits === 'number' ? (
                            <span className='text-xs text-muted-foreground'>
                              {store.visits} visits
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
