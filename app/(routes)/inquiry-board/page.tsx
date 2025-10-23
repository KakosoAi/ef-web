'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Filter,
  Grid,
  List,
  MapPin,
  Eye,
  MessageCircle,
  Star,
  Building2,
} from 'lucide-react';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import { InquiryCardSkeleton, InquiryListSkeleton } from '@/shared/ui/inquiry-skeleton';

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
        console.error('Error fetching inquiries:', err);
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
      <div className='min-h-screen bg-gray-50'>
        <Header />
        <main className='container mx-auto px-4 py-8'>
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
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <main>
        {/* Condensed Page Header - One Line */}
        <div className='bg-white border-b shadow-sm'>
          <div className='max-w-7xl mx-auto px-6 py-4'>
            <div className='flex items-center justify-between gap-6'>
              <div className='flex items-center gap-4'>
                <h1 className='text-xl font-bold text-gray-900'>Equipment Inquiries</h1>
                <span className='px-3 py-1 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full'>
                  {filteredInquiries.length} found
                </span>
              </div>

              <div className='flex items-center gap-3'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                  <input
                    type='text'
                    placeholder='Search inquiries...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='w-80 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50'
                  />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    showFilters
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Filter className='h-4 w-4' />
                  Filter
                </button>
              </div>
            </div>

            {showFilters && (
              <div className='mt-4 p-4 bg-gray-50 rounded-lg border'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white'
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedLocation}
                    onChange={e => setSelectedLocation(e.target.value)}
                    className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white'
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedUrgency}
                    onChange={e => setSelectedUrgency(e.target.value)}
                    className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white'
                  >
                    {urgencyLevels.map(urgency => (
                      <option key={urgency} value={urgency}>
                        {urgency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Inquiries */}
        <div className='max-w-7xl mx-auto px-6 py-6'>
          {loading ? (
            <div className='space-y-6'>
              {/* Featured skeleton */}
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                <InquiryCardSkeleton featured />
                <InquiryCardSkeleton featured />
                <InquiryCardSkeleton featured />
              </div>
              {/* Regular skeleton */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                <InquiryCardSkeleton />
                <InquiryCardSkeleton />
                <InquiryCardSkeleton />
                <InquiryCardSkeleton />
              </div>
            </div>
          ) : error ? (
            <div className='text-center py-12'>
              <div className='text-red-600 mb-4'>Error: {error}</div>
              <button
                onClick={() => window.location.reload()}
                className='px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600'
              >
                Retry
              </button>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-gray-500 mb-4'>No inquiries found matching your criteria.</div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setSelectedLocation('All Locations');
                  setSelectedUrgency('All Urgency');
                }}
                className='px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600'
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className='space-y-8'>
              {/* Featured Inquiries - Premium Display */}
              {featuredInquiries.length > 0 && (
                <div>
                  <div className='flex items-center gap-2 mb-4'>
                    <div className='w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full'></div>
                    <h2 className='text-lg font-semibold text-gray-900'>Featured Inquiries</h2>
                    <span className='px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full'>
                      Premium
                    </span>
                  </div>
                  <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    {featuredInquiries.map(inquiry => (
                      <Link
                        key={inquiry.id}
                        href={`/inquiry-board/${inquiry.id}`}
                        className='group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-orange-300 overflow-hidden transform hover:-translate-y-1'
                      >
                        <div className='p-4'>
                          {/* Header with Premium Badge and Urgency */}
                          <div className='flex items-center justify-between mb-3'>
                            <span className='px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-md shadow-sm'>
                              ⭐ FEATURED
                            </span>
                            <span
                              className={`px-2 py-1 rounded-md text-xs font-medium ${getUrgencyColor(inquiry.urgency)}`}
                            >
                              {inquiry.urgency}
                            </span>
                          </div>

                          {/* Main Content - Left Aligned */}
                          <div className='flex gap-4'>
                            {/* Large Category Image - Left Side */}
                            <div className='flex-shrink-0'>
                              <div className='relative w-32 h-32 bg-gray-50 rounded-xl shadow-sm p-4 border border-gray-100'>
                                {getCategoryIcon(inquiry.category)}
                              </div>
                              <div className='mt-2 text-center'>
                                <span className='px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-md'>
                                  {inquiry.category}
                                </span>
                              </div>
                            </div>

                            {/* Content - Right Side */}
                            <div className='flex-1 min-w-0'>
                              {/* Title */}
                              <h3 className='font-bold text-lg text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2'>
                                {inquiry.title}
                              </h3>

                              {/* Description */}
                              <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
                                {inquiry.description}
                              </p>

                              {/* Details */}
                              <div className='space-y-2 mb-3'>
                                <div className='flex items-center gap-2'>
                                  <MapPin className='h-3 w-3 text-orange-500 flex-shrink-0' />
                                  <span className='text-sm text-gray-700 truncate'>
                                    {inquiry.location}
                                  </span>
                                </div>
                                <div className='flex items-center gap-2'>
                                  <Building2 className='h-3 w-3 text-blue-500 flex-shrink-0' />
                                  <span className='text-sm text-gray-700 truncate'>
                                    {inquiry.company}
                                  </span>
                                </div>
                              </div>

                              {/* Budget & Date */}
                              <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
                                <div>
                                  <div className='text-xs text-gray-500'>Budget</div>
                                  <div className='font-bold text-orange-600'>{inquiry.budget}</div>
                                </div>
                                <div className='text-right'>
                                  <div className='text-xs text-gray-500'>Posted</div>
                                  <div className='text-sm text-gray-700'>
                                    {new Date(inquiry.postedDate).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Inquiries */}
              {regularInquiries.length > 0 && (
                <div>
                  <div className='flex items-center gap-2 mb-4'>
                    <div className='w-1 h-6 bg-gray-400 rounded-full'></div>
                    <h2 className='text-lg font-semibold text-gray-900'>All Inquiries</h2>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {regularInquiries.map(inquiry => (
                      <Link
                        key={inquiry.id}
                        href={`/inquiry-board/${inquiry.id}`}
                        className='group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-orange-300 overflow-hidden'
                      >
                        <div className='p-4'>
                          {/* Header with Urgency */}
                          <div className='flex items-center justify-between mb-3'>
                            <span
                              className={`px-2 py-1 rounded-md text-xs font-medium ${getUrgencyColor(inquiry.urgency)}`}
                            >
                              {inquiry.urgency}
                            </span>
                          </div>

                          {/* Main Content - Left Aligned */}
                          <div className='flex gap-3'>
                            {/* Large Category Image - Left Side */}
                            <div className='flex-shrink-0'>
                              <div className='relative w-20 h-20 bg-gray-50 rounded-lg shadow-sm p-3 border border-gray-100'>
                                {getCategoryIcon(inquiry.category)}
                              </div>
                            </div>

                            {/* Content - Right Side */}
                            <div className='flex-1 min-w-0'>
                              {/* Category Badge */}
                              <div className='mb-2'>
                                <span className='px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md'>
                                  {inquiry.category}
                                </span>
                              </div>

                              {/* Title */}
                              <h3 className='font-semibold text-sm text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2'>
                                {inquiry.title}
                              </h3>

                              {/* Location & Company */}
                              <div className='space-y-1 mb-2'>
                                <div className='flex items-center gap-1'>
                                  <MapPin className='h-3 w-3 text-orange-500 flex-shrink-0' />
                                  <span className='text-xs text-gray-600 truncate'>
                                    {inquiry.location}
                                  </span>
                                </div>
                                <div className='flex items-center gap-1'>
                                  <Building2 className='h-3 w-3 text-blue-500 flex-shrink-0' />
                                  <span className='text-xs text-gray-600 truncate'>
                                    {inquiry.company}
                                  </span>
                                </div>
                              </div>

                              {/* Budget */}
                              <div className='pt-2 border-t border-gray-100'>
                                <div className='text-xs text-gray-500'>Budget</div>
                                <div className='font-bold text-orange-600 text-sm'>
                                  {inquiry.budget}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Footer - Removed view/comment counts */}
                          <div className='mt-3 pt-2 border-t border-gray-100'>
                            <div className='flex items-center justify-between'>
                              <div className='text-xs text-gray-500'>
                                Posted {new Date(inquiry.postedDate).toLocaleDateString()}
                              </div>
                              <div className='text-xs font-medium text-orange-600'>
                                View Details
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
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
