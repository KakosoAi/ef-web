import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { AspectRatio } from '@/shared/ui/aspect-ratio';
import { Skeleton } from '@/shared/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { getStores, getStoreTypes, getStoresCount } from '@/server/services/stores';

export const revalidate = 120;
export const dynamic = 'force-static';

interface PageProps {
  searchParams: Promise<{ q?: string; type?: string; page?: string }>;
}

export default async function StorePage({ searchParams }: PageProps) {
  const { q, type, page: pageParam } = await searchParams;
  const storeTypeId = type ? Number(type) : undefined;
  const page = pageParam ? Math.max(1, Number(pageParam)) : 1;
  const limit = 12;

  const [stores, storeTypes, total] = await Promise.all([
    getStores({ q, storeTypeId, limit, page }),
    getStoreTypes(),
    getStoresCount({ q, storeTypeId }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

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
        <section className='relative overflow-hidden border-b bg-gradient-to-b from-white to-gray-50/50'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-center'>
              <div className='lg:col-span-4'>
                <h1 className='text-3xl sm:text-4xl font-semibold tracking-tight'>Stores</h1>
                <p className='mt-2 text-muted-foreground'>Browse verified dealers and sellers.</p>
              </div>
              <div className='lg:col-span-8'>
                <form
                  className='flex flex-col sm:flex-row gap-3 items-stretch sm:items-center'
                  action='/store'
                  method='get'
                  aria-label='Store search and type filter'
                >
                  <div className='flex w-full sm:w-auto items-center gap-2'>
                    <label htmlFor='store-type' className='sr-only'>
                      Store type
                    </label>
                    <select
                      id='store-type'
                      name='type'
                      defaultValue={storeTypeId ?? ''}
                      className='h-10 w-full sm:w-48 rounded-md border bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'
                    >
                      <option value=''>All</option>
                      {storeTypes.map(st => (
                        <option key={st.id} value={st.id}>
                          {st.name ?? 'Type'}
                        </option>
                      ))}
                    </select>
                    <label htmlFor='store-search' className='sr-only'>
                      Search stores
                    </label>
                    <input
                      id='store-search'
                      name='q'
                      defaultValue={q || ''}
                      placeholder='Search stores'
                      className='h-10 flex-1 rounded-md border px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'
                    />
                  </div>
                  <Button type='submit' className='h-10'>
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10'>
          {stores.length === 0 ? (
            <div className='text-center py-20'>
              <h2 className='text-xl font-medium'>No stores found</h2>
              <p className='mt-2 text-muted-foreground'>Try a different search or filter.</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
              {stores.map(store => (
                <Link
                  key={store.id}
                  href={`/details/stores/seller/${store.slug}/${store.id}`}
                  className='group'
                  aria-label={`View ${store.name}`}
                >
                  <Card className='overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5'>
                    <CardContent className='p-0'>
                      <div className='relative bg-gray-100'>
                        <AspectRatio ratio={16 / 9}>
                          {isValidImageSrc(store.banner) ? (
                            <Image
                              src={store.banner!}
                              alt={`${store.name} banner`}
                              fill
                              className='object-cover transition-opacity duration-300'
                              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                              loading='lazy'
                            />
                          ) : (
                            <div className='absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100' />
                          )}
                          <Skeleton className='absolute inset-0' />
                          <div className='absolute inset-0 bg-gradient-to-t from-black/5 to-transparent' />
                        </AspectRatio>
                        <div className='absolute -bottom-6 left-4 h-12 w-12 rounded-full border bg-white overflow-hidden shadow-sm ring-1 ring-black/5'>
                          {isValidImageSrc(store.logo) ? (
                            <Image
                              src={store.logo!}
                              alt={`${store.name} logo`}
                              width={48}
                              height={48}
                              className='object-cover'
                              loading='lazy'
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
                      <div className='p-5 pt-7'>
                        <div className='flex items-center gap-2'>
                          <h3 className='text-lg font-semibold tracking-tight'>{store.name}</h3>
                          {store.verified ? <Badge variant='default'>Verified</Badge> : null}
                        </div>
                        {store.tagline ? (
                          <p className='mt-1 text-sm text-muted-foreground line-clamp-2'>
                            {store.tagline}
                          </p>
                        ) : null}
                        <div className='mt-5 flex items-center justify-between'>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='group-hover:bg-gray-50'
                            aria-label={`Open ${store.name}`}
                          >
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
          {/* Pagination */}
          {totalPages > 1 && (
            <div className='mt-10 flex items-center justify-center gap-2'>
              {/* Prev */}
              <Link
                href={`/store?${new URLSearchParams({ ...(q ? { q } : {}), ...(storeTypeId ? { type: String(storeTypeId) } : {}), page: String(Math.max(1, page - 1)) }).toString()}`}
                aria-disabled={page <= 1}
                className={`inline-flex h-9 items-center rounded-md border px-3 text-sm ${page <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-50'}`}
              >
                Prev
              </Link>
              {/* Pages */}
              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                const href = `/store?${new URLSearchParams({ ...(q ? { q } : {}), ...(storeTypeId ? { type: String(storeTypeId) } : {}), page: String(p) }).toString()}`;
                return (
                  <Link
                    key={p}
                    href={href}
                    aria-current={p === page ? 'page' : undefined}
                    className={`inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-sm ${p === page ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    {p}
                  </Link>
                );
              })}
              {/* Next */}
              <Link
                href={`/store?${new URLSearchParams({ ...(q ? { q } : {}), ...(storeTypeId ? { type: String(storeTypeId) } : {}), page: String(Math.min(totalPages, page + 1)) }).toString()}`}
                aria-disabled={page >= totalPages}
                className={`inline-flex h-9 items-center rounded-md border px-3 text-sm ${page >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-50'}`}
              >
                Next
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
