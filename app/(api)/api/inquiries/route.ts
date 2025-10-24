import { NextResponse, NextRequest } from 'next/server';
import { getInquiriesCached } from '@server/services/inquiries';

export async function GET() {
  try {
    const inquiries = await getInquiriesCached();
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In the future, this will create a new inquiry in Supabase
    // For now, return a mock response
    const newInquiry = {
      id: Date.now().toString(),
      ...body,
      postedDate: new Date().toISOString().split('T')[0],
      views: 0,
      responses: 0,
      verified: false,
    };

    return NextResponse.json(
      {
        success: true,
        data: newInquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create inquiry' },
      { status: 500 }
    );
  }
}
