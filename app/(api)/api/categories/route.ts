import { NextResponse } from 'next/server';
import { getCategories } from '@server/services/categories';

// Cache categories for 5 minutes to reduce Supabase queries
export const revalidate = 300;

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({ categories });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Categories API error:', e);
    return NextResponse.json({ error: 'Categories data is not available' }, { status: 500 });
  }
}
