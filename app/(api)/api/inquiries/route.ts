import { NextRequest, NextResponse } from 'next/server';

// Mock inquiries data - this will be replaced with Supabase integration later
const mockInquiries = [
  {
    id: '1',
    title: 'Need 3 Excavators for Construction',
    description:
      'We are looking for 3 reliable excavators for a major construction project in downtown New York. The project will run for approximately 6 months with potential for extension. We need equipment that can handle heavy-duty excavation work including foundation digging, trenching, and material handling. The equipment must be in excellent working condition with recent maintenance records.',
    equipmentDetails: {
      category: 'Heavy Machinery',
      subCategory: 'Excavators',
      purpose: 'Construction & Excavation Work',
      modelsOfInterest: ['CAT 320', 'Komatsu PC200', 'Volvo EC210', 'Hitachi ZX200'],
    },
    contactInfo: {
      name: 'John Smith',
      companyName: 'BuildCorp Construction',
      email: 'john.smith@buildcorp.com',
      phone: '+1 (555) 123-4567',
    },
  },
  {
    id: '2',
    title: 'Crane Rental for High-Rise Development',
    description:
      'Urgent requirement for tower crane rental for high-rise residential development. 40-story building construction requires reliable crane service with experienced operators. The project is located in downtown Los Angeles with strict safety and operational requirements. We need equipment that meets all city regulations and safety standards.',
    equipmentDetails: {
      category: 'Lifting Equipment',
      subCategory: 'Tower Cranes',
      purpose: 'High-Rise Construction',
      modelsOfInterest: ['Liebherr 280 EC-H', 'Potain MDT 389', 'Terex CTT 202', 'Zoomlion T7015'],
    },
    contactInfo: {
      name: 'Maria Rodriguez',
      companyName: 'SkyLine Development',
      email: 'maria.rodriguez@skylinedev.com',
      phone: '+1 (555) 987-6543',
    },
  },
  {
    id: '3',
    title: 'Bulldozers for Land Clearing Project',
    description:
      'We require multiple bulldozers for a large-scale land clearing project in Austin, Texas. The project involves clearing 200 acres of mixed terrain for a new residential development. Equipment must be capable of handling both light vegetation and heavy brush clearing operations.',
    equipmentDetails: {
      category: 'Earthmoving Equipment',
      subCategory: 'Bulldozers',
      purpose: 'Land Clearing & Site Preparation',
      modelsOfInterest: ['CAT D6T', 'John Deere 850K', 'Komatsu D65', 'Case 1650M'],
    },
    contactInfo: {
      name: 'Robert Johnson',
      companyName: 'Texas Land Development',
      email: 'robert.johnson@texasland.com',
      phone: '+1 (555) 456-7890',
    },
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
