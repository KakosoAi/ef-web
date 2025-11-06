'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Filter, Grid, List, MapPin, Eye, MessageCircle, Building2 } from 'lucide-react';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import { InquiryCardSkeleton, InquiryListSkeleton } from '@/shared/ui/inquiry-skeleton';
import { InquiryCard } from '@/shared/ui/inquiry-card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/shared/ui/select';

interface Inquiry {
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
  contactInfo: {
    name: string;
    email: string;
    phone: string;
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

export default function InquiryBoard() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedUrgency, setSelectedUrgency] = useState('All Urgency');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Handle AI Map click
  const handleAiMapClick = (inquiry: Inquiry) => {
    if (inquiry.location && inquiry.location !== 'N/A') {
      const url = `/ai-map-search?location=${encodeURIComponent(inquiry.location)}&inquiry=${inquiry.id}&category=${encodeURIComponent(inquiry.category)}`;
      router.push(url);
    }
  };

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch inquiries from API - only run on client side
  useEffect(() => {
    if (!mounted) return;

    const fetchInquiries = async () => {
      try {
        setLoading(true);

        const response = await fetch('/api/inquiries');
        if (!response.ok) {
          throw new Error('Failed to fetch inquiries');
        }
        const data = await response.json();

        setInquiries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [mounted]);

  // Extract unique categories and locations from inquiries - always call these hooks
  const categories = useMemo(() => {
    if (!mounted || inquiries.length === 0) return ['All Categories'];
    const uniqueCategories = Array.from(new Set(inquiries.map(inquiry => inquiry.category)));
    return ['All Categories', ...uniqueCategories];
  }, [mounted, inquiries]);

  const locations = useMemo(() => {
    if (!mounted || inquiries.length === 0) return ['All Locations'];
    const uniqueLocations = Array.from(new Set(inquiries.map(inquiry => inquiry.location)));
    return ['All Locations', ...uniqueLocations];
  }, [mounted, inquiries]);

  const urgencyLevels = ['All Urgency', 'Low', 'Medium', 'High', 'Urgent'];

  // Filter inquiries based on search and filters
  const filteredInquiries = useMemo(() => {
    if (!mounted || loading || inquiries.length === 0) {
      return [];
    }

    let filtered = [...inquiries];

    // Apply search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(
        inquiry =>
          inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(inquiry => inquiry.category === selectedCategory);
    }

    // Apply location filter
    if (selectedLocation !== 'All Locations') {
      filtered = filtered.filter(inquiry => inquiry.location === selectedLocation);
    }

    // Apply urgency filter
    if (selectedUrgency !== 'All Urgency') {
      filtered = filtered.filter(inquiry => inquiry.urgency === selectedUrgency);
    }

    return filtered;
  }, [
    mounted,
    loading,
    inquiries,
    searchTerm,
    selectedCategory,
    selectedLocation,
    selectedUrgency,
  ]);

  // Categorize inquiries - make first 3 inquiries featured for premium display
  const featuredInquiries = useMemo(() => {
    return filteredInquiries.slice(0, 3); // First 3 are featured
  }, [filteredInquiries]);

  const regularInquiries = useMemo(() => {
    return filteredInquiries.slice(3); // Rest are regular
  }, [filteredInquiries]);

  // Don't render until mounted on client side
  if (!mounted) {
    return (
      <div className='min-h-screen bg-white'>
        <Header />
        <main className='container mx-auto px-6 py-10'>
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Urgent':
        return 'bg-red-500 text-white';
      case 'High':
        return 'bg-orange-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-white';
      case 'Low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getCategoryIcon = (category: string) => {
    const getImagePath = (category: string) => {
      switch (category) {
        case 'Excavators':
          return '/assets/categories/excavators.png';
        case 'Cranes':
          return '/assets/categories/cranes.png';
        case 'Bulldozers':
          return '/assets/categories/dozers.png';
        case 'Forklifts':
          return '/assets/categories/forklifts.png';
        case 'Concrete Mixers':
          return '/assets/categories/trucks.png';
        case 'Dump Trucks':
          return '/assets/categories/trucks.png';
        default:
          return '/assets/categories/other-equipments.png';
      }
    };

    return <Image src={getImagePath(category)} alt={category} fill className='object-contain' />;
  };

  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main>
        {/* Condensed Page Header - One Line */}
        <div className='bg-white border-b'>
          <div className='max-w-7xl mx-auto px-6 py-8'>
            <div className='flex items-center justify-between gap-6'>
              <div className='flex items-center gap-4'>
                <h1 className='text-xl font-semibold text-foreground'>Equipment Inquiries</h1>
                <Badge variant='outline' className='text-xs'>
                  {filteredInquiries.length} found
                </Badge>
              </div>

              <div className='flex items-center gap-3'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
                  <Input
                    type='search'
                    placeholder='Search inquiries'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='w-80 pl-10'
                  />
                </div>

                <Button
                  variant={showFilters ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className='h-4 w-4 mr-2' />
                  Filters
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className='mt-4 p-5 rounded-xl border bg-white shadow-sm'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder='Category' />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder='Location' />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
                    <SelectTrigger>
                      <SelectValue placeholder='Urgency' />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map(urgency => (
                        <SelectItem key={urgency} value={urgency}>
                          {urgency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Inquiries */}
        <div className='max-w-7xl mx-auto px-6 py-8'>
          {loading ? (
            <div className='space-y-6'>
              {/* Featured skeleton */}
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                <InquiryCardSkeleton featured />
                <InquiryCardSkeleton featured />
                <InquiryCardSkeleton featured />
              </div>
              {/* Regular skeleton */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                <InquiryCardSkeleton />
                <InquiryCardSkeleton />
                <InquiryCardSkeleton />
                <InquiryCardSkeleton />
              </div>
            </div>
          ) : error ? (
            <div className='text-center py-12'>
              <div className='text-red-600 mb-4'>Error: {error}</div>
              <Button onClick={() => window.location.reload()} className='px-4'>
                Retry
              </Button>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-gray-500 mb-4'>No inquiries found matching your criteria.</div>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setSelectedLocation('All Locations');
                  setSelectedUrgency('All Urgency');
                }}
                className='px-4'
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className='space-y-10'>
              {/* Featured Inquiries - Premium Display */}
              {featuredInquiries.length > 0 && (
                <div>
                  <div className='flex items-center gap-3 mb-4'>
                    <h2 className='text-lg font-semibold text-foreground'>Featured Inquiries</h2>
                    <Badge variant='outline' className='text-xs'>
                      Premium
                    </Badge>
                  </div>
                  <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {featuredInquiries.map(inquiry => (
                      <InquiryCard
                        key={inquiry.id}
                        inquiry={inquiry}
                        onAiMapClick={() => handleAiMapClick(inquiry)}
                        showAiMapButton={true}
                        onClick={() => router.push(`/inquiry-board/${inquiry.id}`)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Inquiries */}
              {regularInquiries.length > 0 && (
                <div>
                  <div className='flex items-center gap-3 mb-4'>
                    <h2 className='text-lg font-semibold text-foreground'>All Inquiries</h2>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {regularInquiries.map(inquiry => (
                      <InquiryCard
                        key={inquiry.id}
                        inquiry={inquiry}
                        onAiMapClick={() => handleAiMapClick(inquiry)}
                        showAiMapButton={true}
                        onClick={() => router.push(`/inquiry-board/${inquiry.id}`)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
