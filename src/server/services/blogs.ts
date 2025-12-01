import 'server-only';
import { getSupabaseServerClient } from '@/server/lib/supabase';
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
  const supabase = getSupabaseServerClient();
  const offset = (page - 1) * limit;

  // Try to fetch from 'blogs' table with all columns
  // Using select('*') allows us to see what we actually get back if schema differs
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
        debugError('Error fetching blogs (retry):', retryError);
        return { data: [], count: 0 };
      }
      return { data: (retryData as BlogRecord[]) || [], count: retryCount || 0 };
    }

    debugError('Error fetching blogs:', error);
    return { data: [], count: 0 };
  }

  return { data: (data as BlogRecord[]) || [], count: count || 0 };
}
