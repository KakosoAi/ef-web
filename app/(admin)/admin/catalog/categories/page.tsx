import { getCategories } from '@/server/services/catalog';
import { CategoriesClient } from '@/features/admin/components/catalog/CategoriesClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
}

export default async function AdminCategoriesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 20;
  const query = params.q || '';

  const { data, count } = await getCategories(page, limit, query);

  return (
    <CategoriesClient
      initialData={data}
      totalCount={count}
      page={page}
      limit={limit}
      searchQuery={query}
    />
  );
}
