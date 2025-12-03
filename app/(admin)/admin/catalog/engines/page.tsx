import { getEngines } from '@/server/services/catalog';
import { EnginesClient } from '@/features/admin/components/catalog/EnginesClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
}

export default async function AdminEnginesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 20;
  const query = params.q || '';

  const { data, count } = await getEngines(page, limit, query);

  return (
    <EnginesClient
      initialData={data}
      totalCount={count}
      page={page}
      limit={limit}
      searchQuery={query}
    />
  );
}
