import CategoriesClient from './CategoriesClient';

interface CategoryWithImage {
  name: string;
  image: string;
  count?: string;
  description?: string;
}

function getBaseUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.VERCEL_URL;
  if (envUrl) {
    const hasProtocol = envUrl.startsWith('http://') || envUrl.startsWith('https://');
    return hasProtocol ? envUrl : `https://${envUrl}`;
  }
  const port = process.env.PORT || '3000';
  return `http://localhost:${port}`;
}

// Server component wrapper that fetches categories with ISR and tags
export default async function CategoriesServer({
  websiteMode = 'general',
}: {
  websiteMode?: 'general' | 'agricultural';
}) {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(new URL('/api/categories', baseUrl), {
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
