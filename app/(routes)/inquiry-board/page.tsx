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

  // Categorize inquiries - must be called before any conditional returns
  const featuredInquiries = useMemo(() => {
    return filteredInquiries.filter(inquiry => inquiry.featured);
  }, [filteredInquiries]);

  const promotedInquiries = useMemo(() => {
    return filteredInquiries.filter(inquiry => inquiry.promoted && !inquiry.featured);
  }, [filteredInquiries]);

  const regularInquiries = useMemo(() => {
    return filteredInquiries.filter(inquiry => !inquiry.promoted && !inquiry.featured);
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
    <div className='min-h-screen bg-background'>
      <Header />
      <main>
        {/* Page Header */}
        <div className='bg-card border-b border-border'>
          <div className='max-w-7xl mx-auto px-6 lg:px-8 py-4'>
            <div className='mb-4'>
              <h1 className='text-xl font-semibold text-foreground mb-1'>Equipment Inquiries</h1>
            </div>

            <div className='flex flex-col lg:flex-row gap-4 items-center'>
              <div className='relative flex-1 max-w-2xl'>
                <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5' />
                <input
                  type='text'
                  placeholder='Search equipment inquiries...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='w-full pl-12 pr-6 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent'
                />
              </div>

              <div className='flex items-center gap-3'>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                    showFilters ? 'bg-orange-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Filter className='h-4 w-4' />
                  Filter
                </button>

                <div className='flex bg-gray-100 rounded-xl p-1'>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <Grid className='h-4 w-4' />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <List className='h-4 w-4' />
                  </button>
                </div>
              </div>
            </div>

            {showFilters && (
              <div className='mt-4 p-4 bg-gray-50 rounded-xl'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className='px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500'
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
                    className='px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500'
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
                    className='px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500'
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

            <div className='mt-4 text-sm text-gray-600'>
              {filteredInquiries.length} inquiries found
            </div>
          </div>
        </div>

        {/* Inquiries */}
        <div className='max-w-7xl mx-auto px-6 lg:px-8 py-8'>
          {loading ? (
            <div className='flex justify-center items-center py-12'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
            </div>
          ) : error ? (
            <div className='text-center py-12'>
              <div className='text-red-600 mb-4'>Error: {error}</div>
              <button
                onClick={() => window.location.reload()}
                className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90'
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
                className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90'
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {filteredInquiries.map(inquiry => (
                <Link
                  key={inquiry.id}
                  href={`/inquiry-board/${inquiry.id}`}
                  className={`group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-orange-200 cursor-pointer block ${
                    inquiry.featured
                      ? 'md:col-span-2 lg:col-span-2 border-orange-200'
                      : inquiry.promoted
                        ? 'md:col-span-1 lg:col-span-1 border-blue-200'
                        : ''
                  }`}
                >
                  <div
                    className={`p-6 ${inquiry.featured ? 'p-8' : inquiry.promoted ? 'p-7' : 'p-6'}`}
                  >
                    {/* Header with badges */}
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex items-center gap-2'>
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getUrgencyColor(inquiry.urgency)} shadow-sm`}
                        >
                          {inquiry.urgency}
                        </span>
                        <span className='px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700'>
                          {inquiry.category}
                        </span>
                      </div>
                      {inquiry.verified && (
                        <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm'>
                          ✓ Verified
                        </div>
                      )}
                    </div>

                    {/* Category Icon */}
                    <div className='flex justify-center mb-3'>
                      <div
                        className={`p-2 rounded-lg bg-gray-50 flex items-center justify-center ${
                          inquiry.featured ? 'p-3' : inquiry.promoted ? 'p-2.5' : 'p-2'
                        }`}
                      >
                        <div
                          className={`relative ${
                            inquiry.featured
                              ? 'w-10 h-10'
                              : inquiry.promoted
                                ? 'w-8 h-8'
                                : 'w-6 h-6'
                          }`}
                        >
                          {getCategoryIcon(inquiry.category)}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight ${
                        inquiry.featured ? 'text-lg' : inquiry.promoted ? 'text-base' : 'text-sm'
                      }`}
                    >
                      {inquiry.title}
                    </h3>

                    {/* Location and Company */}
                    <div className='space-y-2 mb-4'>
                      <div className='flex items-center gap-2 text-gray-600 text-sm'>
                        <MapPin className='h-4 w-4' />
                        <span>{inquiry.location}</span>
                      </div>
                      <div className='flex items-center gap-2 text-gray-600 text-sm'>
                        <Building2 className='h-4 w-4' />
                        <span className='font-medium'>{inquiry.company}</span>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className='mb-3'>
                      <div className='text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg inline-block'>
                        {inquiry.budget}
                      </div>
                    </div>

                    {/* Stats Footer */}
                    <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                      <div className='flex items-center gap-1 text-xs text-gray-500'>
                        <Eye className='h-3 w-3' />
                        <span>{inquiry.views}</span>
                      </div>
                      <div className='flex items-center gap-1 text-xs text-gray-500'>
                        <MessageCircle className='h-3 w-3' />
                        <span>{inquiry.responses}</span>
                      </div>
                      <div className='flex items-center gap-1 text-xs text-gray-500'>
                        <Star className='h-3 w-3' />
                        <span>{inquiry.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className='space-y-4'>
              {filteredInquiries.map(inquiry => (
                <Link
                  key={inquiry.id}
                  href={`/inquiry-board/${inquiry.id}`}
                  className='block group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-orange-200 cursor-pointer p-4'
                >
                  <div className='flex items-center gap-6'>
                    {/* Icon Section */}
                    <div className='flex-shrink-0'>
                      <div
                        className={`p-2 rounded-lg bg-gray-50 flex items-center justify-center ${
                          inquiry.featured ? 'p-3' : inquiry.promoted ? 'p-2.5' : 'p-2'
                        }`}
                      >
                        <div
                          className={`relative ${
                            inquiry.featured
                              ? 'w-12 h-12'
                              : inquiry.promoted
                                ? 'w-10 h-10'
                                : 'w-8 h-8'
                          }`}
                        >
                          {getCategoryIcon(inquiry.category)}
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-3 mb-2'>
                        <h3
                          className={`font-medium text-gray-900 truncate group-hover:text-orange-600 transition-colors ${
                            inquiry.featured
                              ? 'text-lg'
                              : inquiry.promoted
                                ? 'text-base'
                                : 'text-sm'
                          }`}
                        >
                          {inquiry.title}
                        </h3>
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getUrgencyColor(inquiry.urgency)} shadow-sm`}
                        >
                          {inquiry.urgency}
                        </span>
                        {inquiry.verified && (
                          <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm'>
                            ✓ Verified
                          </div>
                        )}
                      </div>

                      <div className='flex items-center gap-6 text-sm text-gray-600'>
                        <div className='flex items-center gap-2'>
                          <div className='p-1 rounded-lg bg-gray-50'>
                            <MapPin className='h-4 w-4 text-gray-500' />
                          </div>
                          <span className='font-medium'>{inquiry.location}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <div className='p-1 rounded-lg bg-gray-50'>
                            <Building2 className='h-4 w-4 text-gray-500' />
                          </div>
                          <span className='font-medium'>{inquiry.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Budget and Stats */}
                    <div className='flex-shrink-0 text-right'>
                      <div className='text-sm font-medium text-orange-600 bg-orange-50 px-4 py-2 rounded-lg mb-3'>
                        {inquiry.budget}
                      </div>
                      <div className='flex items-center gap-3 text-xs text-gray-500'>
                        <div className='flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg'>
                          <Eye className='h-3.5 w-3.5' />
                          <span className='font-medium'>{inquiry.views}</span>
                        </div>
                        <div className='flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg'>
                          <MessageCircle className='h-3.5 w-3.5' />
                          <span className='font-medium'>{inquiry.responses}</span>
                        </div>
                        <div className='flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-lg'>
                          <Star className='h-3.5 w-3.5 text-yellow-500 fill-current' />
                          <span className='font-medium text-yellow-700'>{inquiry.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {filteredInquiries.length === 0 && (
            <div className='text-center py-12'>
              <div className='text-gray-400 mb-4'>
                <Search className='h-12 w-12 mx-auto' />
              </div>
              <h3 className='text-lg font-medium text-gray-900 mb-2'>No inquiries found</h3>
              <p className='text-gray-500'>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
