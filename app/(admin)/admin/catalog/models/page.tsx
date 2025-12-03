import { getModels, getBrands } from '@/server/services/catalog';
import { ModelsClient } from '@/features/admin/components/catalog/ModelsClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
}

export default async function AdminModelsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 20;
  const query = params.q || '';

  const [modelsData, brandsData] = await Promise.all([
    getModels(page, limit, query),
    getBrands(1, 1000), // Fetch all brands for dropdown
  ]);

  return (
    <ModelsClient
      initialData={modelsData.data}
      brands={brandsData.data}
      totalCount={modelsData.count}
      page={page}
      limit={limit}
      searchQuery={query}
    />
  );
}
