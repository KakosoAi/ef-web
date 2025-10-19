'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Eye,
  MessageCircle,
  Star,
  Building2,
  Phone,
  Mail,
  Globe,
  Shield,
  AlertTriangle,
  DollarSign,
  Users,
  Truck,
  Settings,
  Award,
  Share2,
  Heart,
  Flag,
} from 'lucide-react';

// Mock data - this will be replaced with Supabase data later
const mockInquiries = [
  {
    id: '1',
    title: 'Need 3 Excavators for Construction',
    category: 'Excavators',
    location: 'New York, NY',
    urgency: 'High' as const,
    budget: '$15K-25K/mo',
    postedDate: '2024-01-15',
    views: 245,
    responses: 12,
    company: 'BuildCorp',
    rating: 4.8,
    verified: true,
    featured: true,
    description:
      'We are looking for 3 reliable excavators for a major construction project in downtown New York. The project will run for approximately 6 months with potential for extension. We need equipment that can handle heavy-duty excavation work including foundation digging, trenching, and material handling.',
    requirements: [
      'Minimum 20-ton operating weight',
      'Hydraulic breaker attachment capability',
      'GPS tracking system preferred',
      'Recent maintenance records required',
      'Certified operators available if needed',
    ],
    projectDetails: {
      duration: '6 months (with potential extension)',
      startDate: '2024-02-01',
      workingHours: '7 AM - 6 PM, Monday to Saturday',
      siteConditions: 'Urban construction site with limited access',
      additionalEquipment: 'Dump trucks and compactors also needed',
    },
    contactInfo: {
      contactPerson: 'John Smith',
      position: 'Project Manager',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@buildcorp.com',
      website: 'www.buildcorp.com',
      address: '123 Construction Ave, New York, NY 10001',
    },
    companyInfo: {
      established: '1995',
      employees: '500+',
      projects: '200+ completed',
      specialization: 'Commercial & Residential Construction',
    },
  },
  {
    id: '2',
    title: 'Crane Rental for High-Rise',
    category: 'Cranes',
    location: 'Los Angeles, CA',
    urgency: 'Urgent' as const,
    budget: '$8K-12K/mo',
    postedDate: '2024-01-14',
    views: 189,
    responses: 8,
    company: 'SkyLine Dev',
    rating: 4.9,
    verified: true,
    promoted: true,
    description:
      'Urgent requirement for tower crane rental for high-rise residential development. 40-story building construction requires reliable crane service with experienced operators.',
    requirements: [
      'Tower crane with 60m+ jib length',
      'Minimum 8-ton lifting capacity',
      'Certified crane operators required',
      'Insurance coverage mandatory',
      'Weekly safety inspections',
    ],
    projectDetails: {
      duration: '18 months',
      startDate: '2024-01-20',
      workingHours: '6 AM - 8 PM, 6 days a week',
      siteConditions: 'High-rise construction in downtown LA',
      additionalEquipment: 'Concrete pumps and hoists needed',
    },
    contactInfo: {
      contactPerson: 'Maria Rodriguez',
      position: 'Construction Director',
      phone: '+1 (555) 987-6543',
      email: 'maria.rodriguez@skylinedev.com',
      website: 'www.skylinedev.com',
      address: '456 Development Blvd, Los Angeles, CA 90210',
    },
    companyInfo: {
      established: '2008',
      employees: '300+',
      projects: '150+ completed',
      specialization: 'High-rise & Commercial Development',
    },
  },
];

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case 'Urgent':
      return 'bg-red-100 text-red-800 border border-red-200';
    case 'High':
      return 'bg-orange-100 text-orange-800 border border-orange-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    case 'Low':
      return 'bg-green-100 text-green-800 border border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Excavators':
      return <Truck className='w-full h-full text-orange-600' />;
    case 'Cranes':
      return <Settings className='w-full h-full text-blue-600' />;
    case 'Bulldozers':
      return <Truck className='w-full h-full text-yellow-600' />;
    default:
      return <Settings className='w-full h-full text-gray-600' />;
  }
};

export default function InquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);

  const inquiryId = params.id as string;

  const inquiry = useMemo(() => {
    return mockInquiries.find(inq => inq.id === inquiryId);
  }, [inquiryId]);

  if (!inquiry) {
    return (
      <div className='min-h-screen bg-background'>
        <Header />
        <main className='max-w-4xl mx-auto px-6 py-12'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold text-foreground mb-4'>Inquiry Not Found</h1>
            <p className='text-muted-foreground mb-6'>
              The inquiry you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Button onClick={() => router.push('/inquiry-board')}>
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
    <div className='min-h-screen bg-background'>
      <Header />

      <main className='max-w-6xl mx-auto px-6 py-8'>
        {/* Back Button */}
        <div className='mb-6'>
          <Button
            variant='ghost'
            onClick={() => router.push('/inquiry-board')}
            className='text-muted-foreground hover:text-foreground'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Inquiry Board
          </Button>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Header Card */}
            <Card>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div className='flex items-center gap-4'>
                    <div className='p-3 rounded-lg bg-gray-50 flex items-center justify-center'>
                      <div className='w-8 h-8'>{getCategoryIcon(inquiry.category)}</div>
                    </div>
                    <div>
                      <div className='flex items-center gap-2 mb-2'>
                        <Badge className={getUrgencyColor(inquiry.urgency)}>
                          {inquiry.urgency}
                        </Badge>
                        <Badge variant='secondary'>{inquiry.category}</Badge>
                        {inquiry.verified && (
                          <Badge className='bg-blue-100 text-blue-800 border border-blue-200'>
                            <Shield className='w-3 h-3 mr-1' />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <CardTitle className='text-2xl font-bold text-foreground'>
                        {inquiry.title}
                      </CardTitle>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setIsFavorited(!isFavorited)}
                    >
                      <Heart
                        className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`}
                      />
                    </Button>
                    <Button variant='outline' size='sm'>
                      <Share2 className='w-4 h-4' />
                    </Button>
                    <Button variant='outline' size='sm'>
                      <Flag className='w-4 h-4' />
                    </Button>
                  </div>
                </div>

                <div className='flex items-center gap-6 text-sm text-muted-foreground'>
                  <div className='flex items-center gap-2'>
                    <MapPin className='w-4 h-4' />
                    <span>{inquiry.location}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4' />
                    <span>Posted {new Date(inquiry.postedDate).toLocaleDateString()}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Eye className='w-4 h-4' />
                    <span>{inquiry.views} views</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <MessageCircle className='w-4 h-4' />
                    <span>{inquiry.responses} responses</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Project Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground leading-relaxed'>{inquiry.description}</p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Equipment Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2'>
                  {inquiry.requirements.map((requirement, index) => (
                    <li key={index} className='flex items-start gap-2'>
                      <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0' />
                      <span className='text-muted-foreground'>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <h4 className='font-medium text-foreground mb-1'>Duration</h4>
                    <p className='text-muted-foreground'>{inquiry.projectDetails.duration}</p>
                  </div>
                  <div>
                    <h4 className='font-medium text-foreground mb-1'>Start Date</h4>
                    <p className='text-muted-foreground'>{inquiry.projectDetails.startDate}</p>
                  </div>
                  <div>
                    <h4 className='font-medium text-foreground mb-1'>Working Hours</h4>
                    <p className='text-muted-foreground'>{inquiry.projectDetails.workingHours}</p>
                  </div>
                  <div>
                    <h4 className='font-medium text-foreground mb-1'>Site Conditions</h4>
                    <p className='text-muted-foreground'>{inquiry.projectDetails.siteConditions}</p>
                  </div>
                  <div className='md:col-span-2'>
                    <h4 className='font-medium text-foreground mb-1'>Additional Equipment</h4>
                    <p className='text-muted-foreground'>
                      {inquiry.projectDetails.additionalEquipment}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Budget Card */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <DollarSign className='w-5 h-5' />
                  Budget Range
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-primary mb-2'>{inquiry.budget}</div>
                <p className='text-sm text-muted-foreground'>Monthly rental budget for equipment</p>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Building2 className='w-5 h-5' />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='font-medium'>{inquiry.company}</span>
                  <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                    <span className='text-sm font-medium'>{inquiry.rating}</span>
                  </div>
                </div>

                <Separator />

                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div>
                    <span className='text-muted-foreground'>Established</span>
                    <p className='font-medium'>{inquiry.companyInfo.established}</p>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Employees</span>
                    <p className='font-medium'>{inquiry.companyInfo.employees}</p>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Projects</span>
                    <p className='font-medium'>{inquiry.companyInfo.projects}</p>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Specialization</span>
                    <p className='font-medium text-xs'>{inquiry.companyInfo.specialization}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <h4 className='font-medium text-foreground mb-1'>
                    {inquiry.contactInfo.contactPerson}
                  </h4>
                  <p className='text-sm text-muted-foreground'>{inquiry.contactInfo.position}</p>
                </div>

                <Separator />

                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <Phone className='w-4 h-4 text-muted-foreground' />
                    <span className='text-sm'>{inquiry.contactInfo.phone}</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Mail className='w-4 h-4 text-muted-foreground' />
                    <span className='text-sm'>{inquiry.contactInfo.email}</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Globe className='w-4 h-4 text-muted-foreground' />
                    <span className='text-sm'>{inquiry.contactInfo.website}</span>
                  </div>
                  <div className='flex items-start gap-3'>
                    <MapPin className='w-4 h-4 text-muted-foreground mt-0.5' />
                    <span className='text-sm'>{inquiry.contactInfo.address}</span>
                  </div>
                </div>

                <Separator />

                <div className='space-y-2'>
                  <Button className='w-full'>
                    <MessageCircle className='w-4 h-4 mr-2' />
                    Send Response
                  </Button>
                  <Button variant='outline' className='w-full'>
                    <Phone className='w-4 h-4 mr-2' />
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Inquiry Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 gap-4 text-center'>
                  <div>
                    <div className='text-2xl font-bold text-primary'>{inquiry.views}</div>
                    <div className='text-xs text-muted-foreground'>Views</div>
                  </div>
                  <div>
                    <div className='text-2xl font-bold text-primary'>{inquiry.responses}</div>
                    <div className='text-xs text-muted-foreground'>Responses</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
