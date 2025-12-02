import 'server-only';
import { getSupabaseAdminClient } from '@/server/lib/supabase-admin';
import { debugError } from '@/shared/utils/debug';

export interface BlogRecord {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image_url?: string | null;
  imageurl?: string | null;
  published_at?: string | null;
  publishedat?: string | null;
  created_at?: string;
  createdat?: string;
  is_published?: boolean;
  ispublished?: boolean;
  author_id?: string | null;
  authorid?: string | null;
  tags: string[] | null;
}

export async function getAllBlogs(
  page: number = 1,
  limit: number = 20
): Promise<{ data: BlogRecord[]; count: number }> {
  const supabase = getSupabaseAdminClient();
  const offset = (page - 1) * limit;

  // Try to fetch from 'blogs' table
  const query = supabase
    .from('blogs')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    // Try sorting by createdat if created_at fails (common schema difference)
    if (error.message && error.message.includes('created_at')) {
      const retryQuery = supabase
        .from('blogs')
        .select('*', { count: 'exact' })
        .order('createdat', { ascending: false })
        .range(offset, offset + limit - 1);

      const { data: retryData, error: retryError, count: retryCount } = await retryQuery;

      if (retryError) {
        debugError('Error fetching blogs (retry createdat):', retryError);
        // Try one last time with simple ID sort or no sort
        const finalRetry = supabase
          .from('blogs')
          .select('*', { count: 'exact' })
          .range(offset, offset + limit - 1);

        const { data: finalData, error: finalError, count: finalCount } = await finalRetry;

        if (finalError) {
          debugError('Error fetching blogs (final retry):', finalError);
          return { data: [], count: 0 };
        }
        return { data: (finalData as BlogRecord[]) || [], count: finalCount || 0 };
      }
      return { data: (retryData as BlogRecord[]) || [], count: retryCount || 0 };
    }

    debugError('Error fetching blogs:', JSON.stringify(error, null, 2));
    // Attempt fallback if error wasn't about created_at but still failed (e.g. generic error)
    const fallbackQuery = supabase
      .from('blogs')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1);
    const { data: fallbackData, error: fallbackError, count: fallbackCount } = await fallbackQuery;

    if (fallbackError) {
      debugError('Error fetching blogs (fallback):', JSON.stringify(fallbackError, null, 2));
      return { data: [], count: 0 };
    }
    return { data: (fallbackData as BlogRecord[]) || [], count: fallbackCount || 0 };
  }

  return { data: (data as BlogRecord[]) || [], count: count || 0 };
}
