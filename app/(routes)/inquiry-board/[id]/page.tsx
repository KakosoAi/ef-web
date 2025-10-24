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
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100'>
      <Header />

      <div className='container mx-auto px-4 py-8'>
        {/* Header Section */}
        <div className='mb-10'>
          <div className='flex items-center gap-4 mb-8'>
            <button
              onClick={() => router.back()}
              className='flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md'
            >
              <span className='text-lg'>←</span>
              <span className='font-medium text-gray-700'>Back</span>
            </button>
            <div className='flex items-center gap-3'>
              <span className='px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg shadow-sm'>
                High Priority
              </span>
              <span className='px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg shadow-sm'>
                Active
              </span>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm'>
            <div className='flex items-start justify-between mb-6'>
              <div className='flex-1'>
                <h1 className='text-2xl font-bold text-gray-900 mb-3 leading-tight'>
                  {inquiry.title}
                </h1>
                <div className='flex items-center gap-2 text-gray-600 mb-4'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  <span>
                    {inquiry.projectDetails?.location ||
                      inquiry.location ||
                      'Location not specified'}
                  </span>
                </div>
              </div>
              <div className='flex flex-col items-end gap-2'>
                <div className='px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg'>
                  <span className='text-sm font-medium text-blue-800'>
                    {inquiry.equipmentDetails?.category || inquiry.category}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
              <div className='flex items-center gap-6 text-sm text-gray-500'>
                <div className='flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  <span>
                    Posted{' '}
                    {new Date(inquiry.stats?.postedDate || inquiry.postedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                    />
                  </svg>
                  <span className='font-semibold text-gray-700'>
                    {inquiry.budget || 'Contact for pricing'}
                  </span>
                </div>
              </div>
              {inquiry.verified && (
                <div className='flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full'>
                  <svg className='w-4 h-4 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='text-sm font-medium text-green-700'>Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Project Description */}
            <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
              <CardHeader className='pb-6 border-b border-gray-100'>
                <CardTitle className='text-xl font-bold text-gray-900 flex items-center gap-3'>
                  <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center'>
                    <svg
                      className='w-4 h-4 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                      />
                    </svg>
                  </div>
                  Project Description
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-6'>
                <p className='text-gray-700 leading-relaxed text-base'>{inquiry.description}</p>
              </CardContent>
            </Card>

            {/* Equipment Requirements */}
            <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
              <CardHeader className='pb-6 border-b border-gray-100'>
                <CardTitle className='text-xl font-bold text-gray-900 flex items-center gap-3'>
                  <div className='w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center'>
                    <svg
                      className='w-4 h-4 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
                      />
                    </svg>
                  </div>
                  Equipment Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-4'>
                    <div className='p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-200'>
                      <span className='font-semibold text-gray-900 block mb-2 text-sm uppercase tracking-wide'>
                        Category
                      </span>
                      <p className='text-gray-700 text-base font-medium'>
                        {inquiry.equipmentDetails?.category || inquiry.category}
                      </p>
                    </div>
                    <div className='p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-200'>
                      <span className='font-semibold text-gray-900 block mb-2 text-sm uppercase tracking-wide'>
                        Sub Category
                      </span>
                      <p className='text-gray-700'>
                        {inquiry.equipmentDetails?.subCategory || 'Not specified'}
                      </p>
                    </div>
                    <div className='p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-200'>
                      <span className='font-semibold text-gray-900 block mb-2 text-sm uppercase tracking-wide'>
                        Quantity
                      </span>
                      <p className='text-gray-700'>
                        {inquiry.equipmentDetails?.quantity || 'Not specified'} units
                      </p>
                    </div>
                  </div>
                  <div className='space-y-4'>
                    <div className='p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-200'>
                      <span className='font-semibold text-gray-900 block mb-2 text-sm uppercase tracking-wide'>
                        Purpose
                      </span>
                      <p className='text-gray-700'>
                        {inquiry.equipmentDetails?.purpose || 'Not specified'}
                      </p>
                    </div>
                    <div className='p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-200'>
                      <span className='font-semibold text-gray-900 block mb-2 text-sm uppercase tracking-wide'>
                        Duration
                      </span>
                      <p className='text-gray-700'>
                        {inquiry.equipmentDetails?.duration || 'Not specified'}
                      </p>
                    </div>
                    <div className='p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-200'>
                      <span className='font-semibold text-gray-900 block mb-2 text-sm uppercase tracking-wide'>
                        Budget Range
                      </span>
                      <p className='text-gray-700'>
                        {inquiry.equipmentDetails?.budgetRange || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Models of Interest */}
                {inquiry.equipmentDetails?.modelsOfInterest &&
                  inquiry.equipmentDetails.modelsOfInterest.length > 0 && (
                    <div className='mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50'>
                      <h4 className='font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                        <svg
                          className='w-5 h-5 text-blue-600'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                          />
                        </svg>
                        Preferred Models
                      </h4>
                      <div className='flex flex-wrap gap-3'>
                        {inquiry.equipmentDetails.modelsOfInterest.map((model, index) => (
                          <span
                            key={index}
                            className='px-4 py-2 bg-white text-gray-800 rounded-lg text-sm border border-blue-200 shadow-sm hover:shadow-md transition-all duration-200 font-medium'
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
            <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
              <CardHeader className='pb-6 border-b border-gray-100'>
                <CardTitle className='text-xl font-bold text-gray-900 flex items-center gap-3'>
                  <div className='w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center'>
                    <svg
                      className='w-4 h-4 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                      />
                    </svg>
                  </div>
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {inquiry.equipmentDetails?.startDate && (
                    <div className='p-5 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-200'>
                      <span className='font-semibold text-gray-900 block mb-2 text-sm uppercase tracking-wide'>
                        Start Date
                      </span>
                      <p className='text-gray-700 font-medium'>
                        {new Date(inquiry.equipmentDetails.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {inquiry.equipmentDetails?.workingHours && (
                    <div className='p-5 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-200'>
                      <span className='font-semibold text-gray-900 block mb-2 text-sm uppercase tracking-wide'>
                        Working Hours
                      </span>
                      <p className='text-gray-700 font-medium'>
                        {inquiry.equipmentDetails.workingHours}
                      </p>
                    </div>
                  )}
                  {inquiry.equipmentDetails?.siteConditions && (
                    <div className='md:col-span-2 p-5 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-200'>
                      <span className='font-semibold text-gray-900 block mb-2 text-sm uppercase tracking-wide'>
                        Site Conditions
                      </span>
                      <p className='text-gray-700'>{inquiry.equipmentDetails.siteConditions}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-8'>
            {/* Contact Information */}
            <Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
              <CardHeader className='pb-6 border-b border-gray-100'>
                <CardTitle className='text-xl font-bold text-gray-900 flex items-center gap-3'>
                  <div className='w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center'>
                    <svg
                      className='w-4 h-4 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </div>
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-6'>
                <div className='space-y-6'>
                  <div className='grid grid-cols-1 gap-4'>
                    <div className='p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-200'>
                      <span className='font-semibold text-gray-900 block mb-2 text-sm uppercase tracking-wide'>
                        Contact Person
                      </span>
                      <p className='text-gray-700 font-medium'>{inquiry.contactInfo.name}</p>
                    </div>
                    <div className='p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-200'>
                      <span className='font-semibold text-gray-900 block mb-2 text-sm uppercase tracking-wide'>
                        Company
                      </span>
                      <p className='text-gray-700 font-medium'>
                        {inquiry.contactInfo.companyName || 'Not specified'}
                      </p>
                    </div>
                    <div className='p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-200'>
                      <span className='font-semibold text-gray-900 block mb-2 text-sm uppercase tracking-wide'>
                        Email
                      </span>
                      <p className='text-gray-700 font-medium break-all'>
                        {inquiry.contactInfo.email}
                      </p>
                    </div>
                    <div className='p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-200'>
                      <span className='font-semibold text-gray-900 block mb-2 text-sm uppercase tracking-wide'>
                        Phone
                      </span>
                      <p className='text-gray-700 font-medium'>{inquiry.contactInfo.phone}</p>
                    </div>
                    {inquiry.contactInfo.address && (
                      <div className='p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-200'>
                        <span className='font-semibold text-gray-900 block mb-2 text-sm uppercase tracking-wide'>
                          Address
                        </span>
                        <p className='text-gray-700'>{inquiry.contactInfo.address}</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className='flex flex-col gap-3 pt-6 border-t border-gray-100'>
                    <button className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2'>
                      <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                        />
                      </svg>
                      Send Message
                    </button>
                    <button className='w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2'>
                      <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                        />
                      </svg>
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
