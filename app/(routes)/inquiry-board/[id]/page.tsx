'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import { ArrowLeft } from 'lucide-react';

// Mock data
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

export default function InquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const inquiryId = params?.id as string;

  const inquiry = mockInquiries.find(inq => inq.id === inquiryId);

  if (!inquiry) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <Header />
        <main className='max-w-4xl mx-auto px-6 py-12'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold text-gray-900 mb-4'>Inquiry Not Found</h1>
            <p className='text-gray-600 mb-6'>
              The inquiry you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Button onClick={() => router.push('/inquiry-board')} variant='outline'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Back to Inquiry Board
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />

      <main className='max-w-4xl mx-auto px-6 py-8'>
        <div className='mb-8'>
          <Button onClick={() => router.push('/inquiry-board')} variant='ghost' className='mb-4'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Inquiry Board
          </Button>

          <h1 className='text-3xl font-bold text-gray-900'>{inquiry.title}</h1>
        </div>

        <div className='space-y-6'>
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-700'>{inquiry.description}</p>
            </CardContent>
          </Card>

          {/* Equipment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <span className='font-medium'>Category:</span> {inquiry.equipmentDetails.category}
                </div>
                <div>
                  <span className='font-medium'>Sub Category:</span>{' '}
                  {inquiry.equipmentDetails.subCategory}
                </div>
                <div>
                  <span className='font-medium'>Purpose:</span> {inquiry.equipmentDetails.purpose}
                </div>
                <div>
                  <span className='font-medium'>Models of interest:</span>{' '}
                  {inquiry.equipmentDetails.modelsOfInterest.join(', ')}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <span className='font-medium'>Name:</span> {inquiry.contactInfo.name}
                </div>
                <div>
                  <span className='font-medium'>Company Name:</span>{' '}
                  {inquiry.contactInfo.companyName}
                </div>
                <div>
                  <span className='font-medium'>Email:</span> {inquiry.contactInfo.email}
                </div>
                <div>
                  <span className='font-medium'>Phone Number:</span> {inquiry.contactInfo.phone}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
