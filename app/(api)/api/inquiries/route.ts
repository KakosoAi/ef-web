import { NextRequest, NextResponse } from 'next/server';

// Mock inquiries data - this will be replaced with Supabase integration later
const mockInquiries = [
  {
    id: '1',
    title: 'Need 3 Excavators for Construction',
    category: 'Excavators',
    location: 'New York, NY',
    urgency: 'High',
    budget: '$15K-25K/mo',
    postedDate: '2024-01-15',
    views: 245,
    responses: 12,
    company: 'BuildCorp',
    rating: 4.8,
    verified: true,
    featured: true,
  },
  {
    id: '2',
    title: 'Crane Rental for High-Rise',
    category: 'Cranes',
    location: 'Los Angeles, CA',
    urgency: 'Urgent',
    budget: '$8K-12K/mo',
    postedDate: '2024-01-14',
    views: 189,
    responses: 8,
    company: 'SkyLine Dev',
    rating: 4.9,
    verified: true,
    promoted: true,
  },
];

export async function GET(request: NextRequest) {
  try {
    // In the future, this will fetch from Supabase
    // For now, return mock data
    return NextResponse.json({
      success: true,
      data: mockInquiries,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
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
