import { NextRequest, NextResponse } from 'next/server';

interface PrewarmPayload {
  queries?: string[];
  token?: string;
}

const DEFAULT_QUERIES = ['excavator', 'crane', 'loader', 'dozer', 'truck'];

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const body: PrewarmPayload = await request.json().catch(() => ({}));

    const token = url.searchParams.get('token') || body.token;
    const secret = process.env.REVALIDATE_SECRET;
    if (secret && token !== secret) {
      return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const queriesParam = url.searchParams.getAll('q');
    const queries = (
      body.queries && body.queries.length > 0
        ? body.queries
        : queriesParam.length > 0
          ? queriesParam
          : DEFAULT_QUERIES
    ).slice(0, 25);

    const results = await Promise.all(
      queries.map(async q => {
        const res = await fetch(`/api/search?searchText=${encodeURIComponent(q)}&page=1&limit=10`, {
          // Ensure request participates in caching
          cache: 'force-cache',
          headers: { Accept: 'application/json' },
        });
        const ok = res.ok;
        return { q, ok, status: res.status };
      })
    );

    // Also prewarm count endpoint to match UI patterns
    const countRes = await fetch(`/api/search/count?page=1&limit=10`, {
      cache: 'force-cache',
      headers: { Accept: 'application/json' },
    });

    return NextResponse.json(
      { success: true, results, countOk: countRes.ok, countStatus: countRes.status },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Prewarm API error:', error);
    return NextResponse.json({ success: false, error: 'PREWARM_ERROR' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
