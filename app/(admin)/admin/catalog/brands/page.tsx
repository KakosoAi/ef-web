import { getBrands } from '@/server/services/catalog';
import { BrandsClient } from '@/features/admin/components/catalog/BrandsClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
}

export default async function AdminBrandsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 20;
  const query = params.q || '';

  const { data, count } = await getBrands(page, limit, query);

  return (
    <BrandsClient
      initialData={data}
      totalCount={count}
      page={page}
      limit={limit}
      searchQuery={query}
    />
  );
}
