'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import { InquiryDetailSkeleton } from '@/shared/ui/inquiry-skeleton';

interface InquiryDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Urgent';
  budget: string;
  postedDate: string;
  views: number;
  responses: number;
  company: string;
  rating: number;
  verified: boolean;
  promoted?: boolean;
  featured?: boolean;
  projectDetails?: {
    location: string;
    projectType?: string;
    urgency: 'Low' | 'Medium' | 'High' | 'Urgent';
    status: string;
  };
  stats?: {
    views: number;
    responses: number;
    postedDate: string;
  };
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    companyName?: string;
    address?: string;
  };
  equipmentDetails?: {
    category: string;
    subCategory?: string;
    purpose?: string;
    modelsOfInterest?: string[];
    quantity?: number;
    duration?: string;
    startDate?: string;
    workingHours?: string;
    siteConditions?: string;
    budgetRange?: string;
  };
}

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
      quantity: 3,
      duration: '6 months',
      startDate: '2024-02-15',
      workingHours: '8 AM - 6 PM',
      siteConditions: 'Urban construction site with limited access',
      budgetRange: '$150,000 - $200,000',
    },
    projectDetails: {
      location: 'Downtown New York, NY',
      projectType: 'Commercial Construction',
      urgency: 'High',
      status: 'Active',
    },
    contactInfo: {
      name: 'John Smith',
      companyName: 'BuildCorp Construction',
      email: 'john.smith@buildcorp.com',
      phone: '+1 (555) 123-4567',
      address: '123 Construction Ave, New York, NY 10001',
    },
    stats: {
      views: 247,
      responses: 12,
      postedDate: '2024-01-15',
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
  const [inquiry, setInquiry] = useState<InquiryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/inquiries/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch inquiry details');
        }
        const data = await response.json();
        setInquiry(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchInquiry();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className='min-h-screen bg-background'>
        <Header />
        <InquiryDetailSkeleton />
        <Footer />
      </div>
    );
  }

  if (error || !inquiry) {
    return (
      <div className='min-h-screen bg-background'>
        <Header />
        <main className='max-w-7xl mx-auto px-6 lg:px-8 py-8'>
          <div className='text-center py-12'>
            <div className='text-red-600 mb-4'>{error || 'Inquiry not found'}</div>
            <button
              onClick={() => window.history.back()}
              className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90'
            >
              Go Back
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />

      <div className='container mx-auto px-4 py-8'>
        {/* Header Section */}
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-6'>
            <button
              onClick={() => router.back()}
              className='p-2 hover:bg-gray-100 rounded-md transition-colors'
            >
              ← Back
            </button>
            <div className='flex items-center gap-3'>
              <span className='px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-md'>
                High Priority
              </span>
              <span className='px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-md'>
                Active
              </span>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <h1 className='text-2xl font-bold text-gray-900 mb-2'>{inquiry.title}</h1>
            <p className='text-gray-600 mb-4'>
              {inquiry.projectDetails?.location || inquiry.location || 'Location not specified'}
            </p>
            <div className='flex items-center gap-6 text-sm text-gray-500'>
              <span>
                Posted{' '}
                {new Date(inquiry.stats?.postedDate || inquiry.postedDate).toLocaleDateString()}
              </span>
              <span className='font-medium text-base text-gray-700'>
                {inquiry.equipmentDetails?.category || inquiry.category}
              </span>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Project Description */}
            <Card className='shadow-sm border bg-white'>
              <CardHeader className='pb-4'>
                <CardTitle className='text-lg font-semibold text-gray-900'>
                  Project Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-700 leading-relaxed'>{inquiry.description}</p>
              </CardContent>
            </Card>

            {/* Equipment Requirements */}
            <Card className='shadow-sm border bg-white'>
              <CardHeader className='pb-4'>
                <CardTitle className='text-lg font-semibold text-gray-900'>
                  Equipment Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-4'>
                    <div className='p-3 bg-gray-50 rounded-md border'>
                      <span className='font-medium text-gray-900 block mb-1'>Category</span>
                      <p className='text-gray-700 text-base font-medium'>
                        {inquiry.equipmentDetails?.category || inquiry.category}
                      </p>
                    </div>
                    <div className='p-3 bg-gray-50 rounded-md border'>
                      <span className='font-medium text-gray-900 block mb-1'>Sub Category</span>
                      <p className='text-gray-700'>
                        {inquiry.equipmentDetails?.subCategory || 'Not specified'}
                      </p>
                    </div>
                    <div className='p-3 bg-gray-50 rounded-md border'>
                      <span className='font-medium text-gray-900 block mb-1'>Quantity</span>
                      <p className='text-gray-700'>
                        {inquiry.equipmentDetails?.quantity || 'Not specified'} units
                      </p>
                    </div>
                  </div>
                  <div className='space-y-4'>
                    <div className='p-3 bg-gray-50 rounded-md border'>
                      <span className='font-medium text-gray-900 block mb-1'>Purpose</span>
                      <p className='text-gray-700'>
                        {inquiry.equipmentDetails?.purpose || 'Not specified'}
                      </p>
                    </div>
                    <div className='p-3 bg-gray-50 rounded-md border'>
                      <span className='font-medium text-gray-900 block mb-1'>Duration</span>
                      <p className='text-gray-700'>
                        {inquiry.equipmentDetails?.duration || 'Not specified'}
                      </p>
                    </div>
                    <div className='p-3 bg-gray-50 rounded-md border'>
                      <span className='font-medium text-gray-900 block mb-1'>Budget Range</span>
                      <p className='text-gray-700'>
                        {inquiry.equipmentDetails?.budgetRange || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Models of Interest */}
                {inquiry.equipmentDetails?.modelsOfInterest &&
                  inquiry.equipmentDetails.modelsOfInterest.length > 0 && (
                    <div className='mt-6'>
                      <h4 className='font-medium text-gray-900 mb-3'>Preferred Models</h4>
                      <div className='flex flex-wrap gap-2'>
                        {inquiry.equipmentDetails.modelsOfInterest.map((model, index) => (
                          <span
                            key={index}
                            className='px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm border'
                          >
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card className='shadow-sm border bg-white'>
              <CardHeader className='pb-4'>
                <CardTitle className='text-lg font-semibold text-gray-900'>
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {inquiry.equipmentDetails?.startDate && (
                    <div className='p-4 bg-gray-50 rounded-md border'>
                      <span className='font-medium text-gray-900 block mb-1'>Start Date</span>
                      <p className='text-gray-700'>
                        {new Date(inquiry.equipmentDetails.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {inquiry.equipmentDetails?.workingHours && (
                    <div className='p-4 bg-gray-50 rounded-md border'>
                      <span className='font-medium text-gray-900 block mb-1'>Working Hours</span>
                      <p className='text-gray-700'>{inquiry.equipmentDetails.workingHours}</p>
                    </div>
                  )}
                  {inquiry.equipmentDetails?.siteConditions && (
                    <div className='md:col-span-2 p-4 bg-gray-50 rounded-md border'>
                      <span className='font-medium text-gray-900 block mb-1'>Site Conditions</span>
                      <p className='text-gray-700'>{inquiry.equipmentDetails.siteConditions}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Contact Information */}
            <Card className='shadow-sm border bg-white'>
              <CardHeader className='pb-4'>
                <CardTitle className='text-lg font-semibold text-gray-900'>
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='p-3 bg-gray-50 rounded-md border'>
                      <span className='font-medium text-gray-900 block mb-1'>Contact Person</span>
                      <p className='text-gray-700'>{inquiry.contactInfo.name}</p>
                    </div>
                    <div className='p-3 bg-gray-50 rounded-md border'>
                      <span className='font-medium text-gray-900 block mb-1'>Company</span>
                      <p className='text-gray-700'>
                        {inquiry.contactInfo.companyName || 'Not specified'}
                      </p>
                    </div>
                    <div className='p-3 bg-gray-50 rounded-md border'>
                      <span className='font-medium text-gray-900 block mb-1'>Email</span>
                      <p className='text-gray-700'>{inquiry.contactInfo.email}</p>
                    </div>
                    <div className='p-3 bg-gray-50 rounded-md border'>
                      <span className='font-medium text-gray-900 block mb-1'>Phone</span>
                      <p className='text-gray-700'>{inquiry.contactInfo.phone}</p>
                    </div>
                    {inquiry.contactInfo.address && (
                      <div className='md:col-span-2 p-3 bg-gray-50 rounded-md border'>
                        <span className='font-medium text-gray-900 block mb-1'>Address</span>
                        <p className='text-gray-700'>{inquiry.contactInfo.address}</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className='flex gap-3 pt-4'>
                    <button className='flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'>
                      Send Message
                    </button>
                    <button className='flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors'>
                      Call Now
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
