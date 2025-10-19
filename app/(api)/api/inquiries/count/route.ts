import { NextResponse } from 'next/server';
import { countPublishedInquiries } from '@server/services/inquiries';

export async function GET() {
  try {
    const count = await countPublishedInquiries();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error counting inquiries:', error);
    return NextResponse.json({ error: 'Failed to count inquiries' }, { status: 500 });
  }
}
