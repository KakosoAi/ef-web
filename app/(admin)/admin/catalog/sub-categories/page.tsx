import { getSubCategories, getCategories } from '@/server/services/catalog';
import { SubCategoriesClient } from '@/features/admin/components/catalog/SubCategoriesClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
}

export default async function AdminSubCategoriesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 20;
  const query = params.q || '';

  const [subCategoriesData, categoriesData] = await Promise.all([
    getSubCategories(page, limit, query),
    getCategories(1, 1000), // Fetch all categories for dropdown
  ]);

  return (
    <SubCategoriesClient
      initialData={subCategoriesData.data}
      categories={categoriesData.data}
      totalCount={subCategoriesData.count}
      page={page}
      limit={limit}
      searchQuery={query}
    />
  );
}
