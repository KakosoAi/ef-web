'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Grid,
  List,
  MapPin,
  Eye,
  MessageCircle,
  Star,
  DollarSign,
  Building2,
  Calendar,
  Crown,
} from 'lucide-react';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';

interface Inquiry {
  id: string;
  title: string;
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
}

const mockInquiries: Inquiry[] = [
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
  {
    id: '3',
    title: 'Bulldozers for Land Clearing',
    category: 'Bulldozers',
    location: 'Austin, TX',
    urgency: 'Medium',
    budget: '$5K-8K/mo',
    postedDate: '2024-01-13',
    views: 156,
    responses: 15,
    company: 'Texas Land Dev',
    rating: 4.6,
    verified: false,
  },
  {
    id: '4',
    title: 'Forklift Fleet for Warehouse',
    category: 'Forklifts',
    location: 'Chicago, IL',
    urgency: 'Low',
    budget: '$2K-3.5K/mo',
    postedDate: '2024-01-12',
    views: 203,
    responses: 22,
    company: 'Midwest Logistics',
    rating: 4.7,
    verified: true,
    promoted: true,
  },
  {
    id: '5',
    title: 'Concrete Mixer Trucks',
    category: 'Concrete Mixers',
    location: 'Phoenix, AZ',
    urgency: 'High',
    budget: '$4K-6K/mo',
    postedDate: '2024-01-11',
    views: 178,
    responses: 9,
    company: 'Desert Homes',
    rating: 4.5,
    verified: true,
  },
  {
    id: '6',
    title: 'Dump Trucks for Mining',
    category: 'Dump Trucks',
    location: 'Denver, CO',
    urgency: 'Medium',
    budget: '$7K-10K/mo',
    postedDate: '2024-01-10',
    views: 134,
    responses: 6,
    company: 'Rocky Mining',
    rating: 4.4,
    verified: false,
  },
];

const categories = [
  'All Categories',
  'Excavators',
  'Cranes',
  'Bulldozers',
  'Forklifts',
  'Concrete Mixers',
  'Dump Trucks',
];
const locations = [
  'All Locations',
  'New York, NY',
  'Los Angeles, CA',
  'Austin, TX',
  'Chicago, IL',
  'Phoenix, AZ',
  'Denver, CO',
];
const urgencyLevels = ['All Urgency', 'Low', 'Medium', 'High', 'Urgent'];

export default function InquiryBoard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedUrgency, setSelectedUrgency] = useState('All Urgency');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredInquiries = useMemo(() => {
    return mockInquiries.filter(inquiry => {
      const matchesSearch =
        inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All Categories' || inquiry.category === selectedCategory;
      const matchesLocation =
        selectedLocation === 'All Locations' || inquiry.location === selectedLocation;
      const matchesUrgency =
        selectedUrgency === 'All Urgency' || inquiry.urgency === selectedUrgency;

      return matchesSearch && matchesCategory && matchesLocation && matchesUrgency;
    });
  }, [searchTerm, selectedCategory, selectedLocation, selectedUrgency]);

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
    switch (category) {
      case 'Excavators':
        return '🚜';
      case 'Cranes':
        return '🏗️';
      case 'Bulldozers':
        return '🚧';
      case 'Forklifts':
        return '🏭';
      case 'Concrete Mixers':
        return '🚛';
      case 'Dump Trucks':
        return '🚚';
      default:
        return '⚙️';
    }
  };

  const featuredInquiries = useMemo(() => {
    return filteredInquiries.filter(inquiry => inquiry.featured);
  }, [filteredInquiries]);

  const promotedInquiries = useMemo(() => {
    return filteredInquiries.filter(inquiry => inquiry.promoted && !inquiry.featured);
  }, [filteredInquiries]);

  const regularInquiries = useMemo(() => {
    return filteredInquiries.filter(inquiry => !inquiry.promoted && !inquiry.featured);
  }, [filteredInquiries]);

  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main>
        {/* Page Header */}
        <div className='bg-white border-b border-gray-100'>
          <div className='max-w-7xl mx-auto px-6 lg:px-8 py-6'>
            <div className='mb-6'>
              <h1 className='text-2xl font-semibold text-gray-900 mb-2'>Equipment Inquiries</h1>
              <p className='text-gray-600'>Find the perfect equipment for your project</p>
            </div>

            <div className='flex flex-col lg:flex-row gap-4 items-center'>
              <div className='relative flex-1 max-w-2xl'>
                <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                <input
                  type='text'
                  placeholder='Search equipment inquiries...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='w-full pl-12 pr-6 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent'
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
          {viewMode === 'grid' ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {filteredInquiries.map(inquiry => (
                <div
                  key={inquiry.id}
                  className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 cursor-pointer transform hover:-translate-y-1 ${
                    inquiry.featured
                      ? 'md:col-span-2 lg:col-span-2'
                      : inquiry.promoted
                        ? 'md:col-span-1 lg:col-span-1'
                        : ''
                  }`}
                >
                  <div
                    className={`p-6 ${inquiry.featured ? 'p-8' : inquiry.promoted ? 'p-7' : 'p-6'}`}
                  >
                    {/* Header with icon and urgency */}
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex items-center gap-3'>
                        <div
                          className={`p-2 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 ${
                            inquiry.featured ? 'p-3' : inquiry.promoted ? 'p-2.5' : 'p-2'
                          }`}
                        >
                          <span
                            className={
                              inquiry.featured
                                ? 'text-2xl'
                                : inquiry.promoted
                                  ? 'text-xl'
                                  : 'text-lg'
                            }
                          >
                            {getCategoryIcon(inquiry.category)}
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getUrgencyColor(inquiry.urgency)} shadow-sm`}
                        >
                          {inquiry.urgency}
                        </span>
                      </div>
                      {inquiry.verified && (
                        <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm'>
                          ✓ Verified
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-medium text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors ${
                        inquiry.featured ? 'text-lg' : inquiry.promoted ? 'text-base' : 'text-sm'
                      }`}
                    >
                      {inquiry.title}
                    </h3>

                    {/* Location and Company */}
                    <div className='flex flex-col gap-2 mb-4'>
                      <div className='flex items-center gap-2 text-sm text-gray-600'>
                        <div className='p-1 rounded-lg bg-gray-50'>
                          <MapPin className='h-4 w-4 text-gray-500' />
                        </div>
                        <span className='font-medium'>{inquiry.location}</span>
                      </div>
                      <div className='flex items-center gap-2 text-sm text-gray-600'>
                        <div className='p-1 rounded-lg bg-gray-50'>
                          <Building2 className='h-4 w-4 text-gray-500' />
                        </div>
                        <span className='font-medium'>{inquiry.company}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                      <div className='text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-lg'>
                        {inquiry.budget}
                      </div>
                      <div className='flex items-center gap-4 text-xs text-gray-500'>
                        <div className='flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg'>
                          <Eye className='h-3.5 w-3.5' />
                          <span className='font-medium'>{inquiry.views}</span>
                        </div>
                        <div className='flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg'>
                          <MessageCircle className='h-3.5 w-3.5' />
                          <span className='font-medium'>{inquiry.responses}</span>
                        </div>
                        <div className='flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded-lg'>
                          <Star className='h-3.5 w-3.5 text-yellow-500 fill-current' />
                          <span className='font-medium text-yellow-700'>{inquiry.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='space-y-4'>
              {filteredInquiries.map(inquiry => (
                <div
                  key={inquiry.id}
                  className='group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 cursor-pointer p-6'
                >
                  <div className='flex items-center gap-6'>
                    {/* Icon Section */}
                    <div className='flex-shrink-0'>
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 ${
                          inquiry.featured ? 'p-4' : inquiry.promoted ? 'p-3.5' : 'p-3'
                        }`}
                      >
                        <span
                          className={
                            inquiry.featured
                              ? 'text-3xl'
                              : inquiry.promoted
                                ? 'text-2xl'
                                : 'text-xl'
                          }
                        >
                          {getCategoryIcon(inquiry.category)}
                        </span>
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
                </div>
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
