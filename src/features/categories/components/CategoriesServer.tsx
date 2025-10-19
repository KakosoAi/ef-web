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

    const res = await fetch(url, {
      next: { revalidate: 300, tags: ['categories'] },
      cache: 'force-cache',
    });

    if (!res.ok) {
      return <CategoriesClient categories={[]} websiteMode={websiteMode} />;
    }

    const json = await res.json();
    const categories: CategoryWithImage[] = (json?.categories ?? []).map(
      (c: CategoryWithImage) => ({
        ...c,
        count: c.count ?? '',
        description: c.description ?? '',
      })
    );

    return <CategoriesClient categories={categories} websiteMode={websiteMode} />;
  } catch (e) {
    // In case of errors, render an empty state
    return <CategoriesClient categories={[]} websiteMode={websiteMode} />;
  }
}
