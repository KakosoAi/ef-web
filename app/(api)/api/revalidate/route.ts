import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const auth = request.headers.get('authorization') || '';
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json({ error: 'Missing REVALIDATE_SECRET' }, { status: 500 });
  }

  const expected = `Bearer ${secret}`;
  if (auth !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { tags } = body as { tags?: string[] };
    const list = Array.isArray(tags) && tags.length > 0 ? tags : ['categories'];

    for (const tag of list) {
      revalidateTag(tag);
    }

    return NextResponse.json({ revalidated: true, tags: list }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
