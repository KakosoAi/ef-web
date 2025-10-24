import { NextRequest, NextResponse } from 'next/server';
import { getInquiryByIdCached } from '@server/services/inquiries';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const inquiry = await getInquiryByIdCached(id);

    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiry' }, { status: 500 });
  }
}
