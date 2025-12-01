import { redirect } from 'next/navigation';

export const dynamic = 'force-static';

interface PageProps {
  searchParams: Promise<{ q?: string; type?: string }>;
}

export default async function StoresListingRedirect({ searchParams }: PageProps) {
  const { q, type } = await searchParams;
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (type) params.set('type', type);
  const target = params.toString() ? `/store?${params.toString()}` : '/store';
  redirect(target);
}
