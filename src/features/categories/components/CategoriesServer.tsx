import CategoriesClient from './CategoriesClient';
import { headers } from 'next/headers';

interface CategoryWithImage {
  name: string;
  image: string;
  count?: string;
  description?: string;
}

// Server component wrapper that fetches categories with ISR and tags
export default async function CategoriesServer({
  websiteMode = 'general',
}: {
  websiteMode?: 'general' | 'agricultural';
}) {
  try {
    const hdrs = await headers();
    const proto = hdrs.get('x-forwarded-proto') ?? 'http';
    const host = hdrs.get('host') ?? 'localhost:3000';
    const url = `${proto}://${host}/api/categories`;

    // Forward cookies so protected previews can return JSON
    const cookie = hdrs.get('cookie') ?? undefined;

    const res = await fetch(url, {
      next: { revalidate: 300, tags: ['categories'] },
      cache: 'force-cache',
      headers: cookie ? { cookie } : undefined,
    });

    const contentType = res.headers.get('content-type') || '';

    // If request failed or returned non-JSON (e.g., SSO page), show error message
    if (!res.ok || !contentType.includes('application/json')) {
      return (
        <section className='py-4 bg-background'>
          <div className='container mx-auto px-4'>
            <div role='alert' className='text-center py-8 text-sm text-red-600'>
              Failed to load categories. Please try again later.
            </div>
          </div>
        </section>
      );
    }

    const json = (await res.json()) as { categories?: CategoryWithImage[] };
    const categories: CategoryWithImage[] = (json?.categories ?? []).map(c => ({
      ...c,
      count: c.count ?? '',
      description: c.description ?? '',
    }));

    return <CategoriesClient categories={categories} websiteMode={websiteMode} />;
  } catch (e) {
    // On errors or JSON parse failures, show error message
    return (
      <section className='py-4 bg-background'>
        <div className='container mx-auto px-4'>
          <div role='alert' className='text-center py-8 text-sm text-red-600'>
            Failed to load categories. Please try again later.
          </div>
        </div>
      </section>
    );
  }
}
