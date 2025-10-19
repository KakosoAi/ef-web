import { NextResponse } from 'next/server';
import { getCategoriesCached } from '@server/services/categories';

// Cache categories for 5 minutes to reduce Supabase queries
export const revalidate = 300;

export async function GET() {
  try {
    const categories = await getCategoriesCached();
    return NextResponse.json({ categories }, { status: 200 });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Categories API error:', e);
    return NextResponse.json({ categories: [] }, { status: 200 });
  }
}
