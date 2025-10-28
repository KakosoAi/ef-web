'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import { Checkbox } from '@/shared/ui/checkbox';
import { Badge } from '@/shared/ui/badge';
import AIChatInput from '@/shared/ui/ai-chat-input';
import {
  Search,
  Upload,
  X,
  Sparkles,
  Eye,
  Save,
  Send,
  ChevronDown,
  ChevronUp,
  MapPin,
  DollarSign,
  Settings,
  Image as ImageIcon,
  FileText,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';

type AdType = 'rent' | 'sell';
type Industry =
  | 'construction'
  | 'agriculture'
  | 'marine'
  | 'oil-gas'
  | 'material-handling'
  | 'vehicles'
  | 'trucks'
  | 'mining'
  | 'forestry'
  | 'aircraft';

const industries = [
  { id: 'construction', name: 'Construction' },
  { id: 'agriculture', name: 'Agriculture' },
  { id: 'marine', name: 'Marine And Port Handling' },
  { id: 'oil-gas', name: 'Oil And Gas' },
  { id: 'material-handling', name: 'Material Handling Equipment' },
  { id: 'vehicles', name: 'Vehicles And Buses' },
  { id: 'trucks', name: 'Trucks And Trailers' },
  { id: 'mining', name: 'Mining And Quarry Equipment' },
  { id: 'forestry', name: 'Forestry Equipment' },
  { id: 'aircraft', name: 'Aircraft Handling Equipment' },
];

const constructionCategories = [
  'Aerial Platforms',
  'Backhoe Loaders',
  'Compactors',
  'Compressors',
  'Excavators',
  'Dozers',
  'Cranes',
  'Generators',
  'Lifting Equipment',
  'Wheel Loaders',
  'Motor Graders',
  'Trucks',
  'Trailers',
  'Milling Machines',
  'Asphalt Pavers',
  'Concrete Pumps',
  'Drilling Machines & Rigs',
  'Boom Loaders',
  'Skid Steers',
  'Concrete Batching Plants',
  'Other Equipment',
];

const aerialPlatformSubcategories = ['Boom Lifts', 'Manlifts', 'Scissor Lifts', 'Spider Lifts'];

// Category to image mapping
const getCategoryImage = (category: string): string => {
  const categoryImageMap: { [key: string]: string } = {
    'Aerial Platforms': '/assets/categories/ariel-platforms.png',
    'Backhoe Loaders': '/assets/categories/backhoe-loaders.png',
    Compactors: '/assets/categories/compactors.png',
    Compressors: '/assets/categories/compressors.png',
    Excavators: '/assets/categories/excavators.png',
    Dozers: '/assets/categories/dozers.png',
    Cranes: '/assets/categories/cranes.png',
    Generators: '/assets/categories/generators.png',
    'Wheel Loaders': '/assets/categories/wheel-loaders.png',
    'Motor Graders': '/assets/categories/motor-graders.png',
    Trucks: '/assets/categories/trucks.png',
    Trailers: '/assets/categories/trailers.png',
    'Boom Loaders': '/assets/categories/boom-loader.png',
    'Skid Steers': '/assets/categories/skid-steers.png',
    Forklifts: '/assets/categories/forklifts.png',
    'Container Stackers': '/assets/categories/container-stackers.png',
    Crushers: '/assets/categories/crushers.png',
    Attachments: '/assets/categories/attachments.png',
    'Vehicles And Buses': '/assets/categories/vehicle-buses.png',
    'Other Equipment': '/assets/categories/other-equipments.png',
  };

  return categoryImageMap[category] || '/assets/categories/other-equipments.png';
};

export default function PostAdPage() {
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [showAiSuccessMessage, setShowAiSuccessMessage] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    location: true,
    pricing: true,
    description: true,
    images: true,
  });

  const [formData, setFormData] = useState({
    // Basic Info
    adType: '' as AdType | '',
    industry: '' as Industry | '',
    category: '',
    subcategory: '',
    title: '',
    brand: '',
    model: '',
    modelYear: '',
    condition: '',
    fuelType: '',

    // Location
    country: '',
    state: '',
    city: '',

    // Pricing
    pricing: 'negotiable',
    pricePerDay: '',
    pricePerWeek: '',
    pricePerMonth: '',
    salePrice: '',

    // Description & Details
    description: '',
    features: [] as string[],
    specifications: '',

    // Images
    images: [] as File[],
    thumbnailImage: '',

    // Terms
    acceptTerms: false,
  });

  const handleAiGenerate = async (prompt: string) => {
    if (!prompt.trim()) return;

    setIsAiProcessing(true);

    try {
      // Call the AI analysis API
      const response = await fetch('/api/ai/analyze-equipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze equipment description');
      }

      const { formData: aiFormData, extractedInfo } = await response.json();

      // Update form data with AI-generated information
      setFormData(prev => ({
        ...prev,
        ...aiFormData,
        // Add thumbnail image based on AI-selected category
        thumbnailImage: aiFormData.category
          ? getCategoryImage(aiFormData.category)
          : prev.thumbnailImage,
        // Preserve any existing data that wasn't extracted by AI
        images: prev.images,
        acceptTerms: prev.acceptTerms,
      }));

      // Show success message
      setShowAiSuccessMessage(true);
      setTimeout(() => setShowAiSuccessMessage(false), 8000); // Hide after 8 seconds

      // console.log('AI Analysis Results:', { extractedInfo, aiFormData });
    } catch (error) {
      // console.error('Error processing AI request:', error);

      // Show user-friendly error message
      alert(
        error instanceof Error ? error.message : 'Failed to process your request. Please try again.'
      );
    } finally {
      setIsAiProcessing(false);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const SectionHeader = ({
    title,
    icon: Icon,
    section,
    required = false,
  }: {
    title: string;
    icon: React.ComponentType<{ className?: string; size?: string | number }>;
    section: keyof typeof expandedSections;
    required?: boolean;
  }) => (
    <div
      className='flex items-center justify-between cursor-pointer p-4 hover:bg-gray-50 rounded-lg transition-colors'
      onClick={() => toggleSection(section)}
    >
      <div className='flex items-center space-x-3'>
        <Icon className='h-5 w-5 text-blue-600' />
        <h3 className='text-lg font-semibold text-gray-900'>
          {title}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </h3>
      </div>
      {expandedSections[section] ? (
        <ChevronUp className='h-5 w-5 text-gray-400' />
      ) : (
        <ChevronDown className='h-5 w-5 text-gray-400' />
      )}
    </div>
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative'>
      <Header />

      {/* AI Processing Overlay */}
      {isAiProcessing && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center border border-gray-100'>
            <div className='mb-6'>
              <div className='relative mx-auto w-16 h-16 mb-4'>
                <div className='absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 animate-spin'>
                  <div className='absolute inset-1 rounded-full bg-white'></div>
                </div>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <Sparkles className='h-6 w-6 text-purple-600' />
                </div>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                AI is analyzing your equipment
              </h3>
              <p className='text-gray-600 text-sm leading-relaxed'>
                Our AI is processing your description and filling out the form with relevant
                details. This usually takes a few seconds.
              </p>
            </div>
            <div className='flex items-center justify-center space-x-2 text-sm text-gray-500'>
              <div className='flex space-x-1'>
                <div className='w-2 h-2 bg-purple-600 rounded-full animate-bounce'></div>
                <div
                  className='w-2 h-2 bg-blue-600 rounded-full animate-bounce'
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className='w-2 h-2 bg-indigo-600 rounded-full animate-bounce'
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
              <span>Processing...</span>
            </div>
          </div>
        </div>
      )}

      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        {/* AI Success Message */}
        {showAiSuccessMessage && (
          <div className='mb-6 flex items-center justify-center w-full'>
            <div className='bg-green-50 border border-green-200 rounded-xl p-4 max-w-4xl w-full shadow-sm'>
              <div className='flex items-start space-x-3'>
                <CheckCircle className='h-5 w-5 text-green-600 mt-0.5 flex-shrink-0' />
                <div className='flex-1'>
                  <h4 className='text-sm font-semibold text-green-800 mb-1'>
                    AI has filled out your form!
                  </h4>
                  <p className='text-sm text-green-700 leading-relaxed'>
                    Please review all the information below and make any necessary edits. The AI
                    does its best, but you know your equipment better than anyone.
                    <span className='font-medium'>
                      {' '}
                      Double-check the details, pricing, and location before submitting.
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setShowAiSuccessMessage(false)}
                  className='text-green-600 hover:text-green-800 transition-colors'
                >
                  <X className='h-4 w-4' />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI Chat Section - Visually Appealing */}
        <div className='mb-8 flex items-center justify-center w-full'>
          <div className='flex items-center bg-white rounded-2xl shadow-lg border border-gray-100 p-3 max-w-4xl w-full hover:shadow-xl transition-all duration-300'>
            <div className='flex items-center space-x-2 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap mr-4'>
              <div className='p-1.5 bg-white/20 rounded-lg backdrop-blur-sm'>
                <Sparkles className='h-4 w-4 drop-shadow-sm' />
              </div>
              <span className='text-sm font-semibold'>AI Assistant</span>
            </div>
            <div className='flex-1 min-w-0'>
              <AIChatInput
                onSubmit={handleAiGenerate}
                isProcessing={isAiProcessing}
                placeholder='Tell me about your equipment - brand, model, condition, location...'
                glowIntensity={0.3}
                showEffects={true}
                backgroundOpacity={0.98}
              />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Form */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Basic Information */}
            <Card className='shadow-md'>
              <SectionHeader title='Basic Information' icon={Settings} section='basic' required />
              {expandedSections.basic && (
                <CardContent className='px-6 pb-6'>
                  <div className='space-y-6'>
                    {/* Ad Type */}
                    <div className='space-y-3'>
                      <Label className='text-base font-medium'>Advertisement Type *</Label>
                      <div className='grid grid-cols-2 gap-4'>
                        {[
                          { value: 'rent', label: 'For Rent', desc: 'Rent out your equipment' },
                          { value: 'sell', label: 'For Sale', desc: 'Sell your equipment' },
                        ].map(type => (
                          <Card
                            key={type.value}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              formData.adType === type.value
                                ? 'ring-2 ring-blue-500 bg-blue-50'
                                : ''
                            }`}
                            onClick={() =>
                              setFormData({ ...formData, adType: type.value as AdType })
                            }
                          >
                            <CardContent className='p-4'>
                              <div className='flex items-center space-x-3'>
                                <div className='w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center'>
                                  {formData.adType === type.value && (
                                    <div className='w-2 h-2 bg-blue-500 rounded-full' />
                                  )}
                                </div>
                                <div>
                                  <div className='font-medium'>{type.label}</div>
                                  <div className='text-sm text-gray-500'>{type.desc}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Industry & Category */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div className='space-y-2'>
                        <Label htmlFor='industry' className='text-base font-medium'>
                          Industry *
                        </Label>
                        <Select
                          value={formData.industry}
                          onValueChange={value =>
                            setFormData({ ...formData, industry: value as Industry })
                          }
                        >
                          <SelectTrigger className='h-12'>
                            <SelectValue placeholder='Select Industry' />
                          </SelectTrigger>
                          <SelectContent>
                            {industries.map(industry => (
                              <SelectItem key={industry.id} value={industry.id}>
                                {industry.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='category' className='text-base font-medium'>
                          Category *
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={value =>
                            setFormData({
                              ...formData,
                              category: value,
                              thumbnailImage: getCategoryImage(value),
                            })
                          }
                        >
                          <SelectTrigger className='h-12'>
                            <SelectValue placeholder='Select Category' />
                          </SelectTrigger>
                          <SelectContent>
                            {constructionCategories.map(category => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Equipment Details */}
                    <div className='space-y-2'>
                      <Label htmlFor='title' className='text-base font-medium'>
                        Equipment Title *
                      </Label>
                      <Input
                        id='title'
                        placeholder='e.g., Heavy Duty Excavator for Construction Projects'
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        className='h-12 text-base'
                      />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='brand' className='text-base font-medium'>
                          Brand *
                        </Label>
                        <Select
                          value={formData.brand}
                          onValueChange={value => setFormData({ ...formData, brand: value })}
                        >
                          <SelectTrigger className='h-12'>
                            <SelectValue placeholder='Select Brand' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='caterpillar'>Caterpillar</SelectItem>
                            <SelectItem value='komatsu'>Komatsu</SelectItem>
                            <SelectItem value='volvo'>Volvo</SelectItem>
                            <SelectItem value='mercedes'>Mercedes</SelectItem>
                            <SelectItem value='jcb'>JCB</SelectItem>
                            <SelectItem value='hitachi'>Hitachi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='model' className='text-base font-medium'>
                          Model *
                        </Label>
                        <Input
                          id='model'
                          placeholder='e.g., CAT 320D'
                          value={formData.model}
                          onChange={e => setFormData({ ...formData, model: e.target.value })}
                          className='h-12'
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='modelYear' className='text-base font-medium'>
                          Year *
                        </Label>
                        <Select
                          value={formData.modelYear}
                          onValueChange={value => setFormData({ ...formData, modelYear: value })}
                        >
                          <SelectTrigger className='h-12'>
                            <SelectValue placeholder='Year' />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='condition' className='text-base font-medium'>
                          Condition *
                        </Label>
                        <Select
                          value={formData.condition}
                          onValueChange={value => setFormData({ ...formData, condition: value })}
                        >
                          <SelectTrigger className='h-12'>
                            <SelectValue placeholder='Select Condition' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='new'>New</SelectItem>
                            <SelectItem value='used'>Used - Excellent</SelectItem>
                            <SelectItem value='good'>Used - Good</SelectItem>
                            <SelectItem value='fair'>Used - Fair</SelectItem>
                            <SelectItem value='refurbished'>Refurbished</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='fuelType' className='text-base font-medium'>
                          Fuel Type
                        </Label>
                        <Select
                          value={formData.fuelType}
                          onValueChange={value => setFormData({ ...formData, fuelType: value })}
                        >
                          <SelectTrigger className='h-12'>
                            <SelectValue placeholder='Select Fuel Type' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='diesel'>Diesel</SelectItem>
                            <SelectItem value='petrol'>Petrol</SelectItem>
                            <SelectItem value='electric'>Electric</SelectItem>
                            <SelectItem value='hybrid'>Hybrid</SelectItem>
                            <SelectItem value='other'>Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Location */}
            <Card className='shadow-md'>
              <SectionHeader title='Location' icon={MapPin} section='location' required />
              {expandedSections.location && (
                <CardContent className='px-6 pb-6'>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='country' className='text-base font-medium'>
                        Country *
                      </Label>
                      <Select
                        value={formData.country}
                        onValueChange={value => setFormData({ ...formData, country: value })}
                      >
                        <SelectTrigger className='h-12'>
                          <SelectValue placeholder='Select Country' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='uae'>United Arab Emirates</SelectItem>
                          <SelectItem value='saudi'>Saudi Arabia</SelectItem>
                          <SelectItem value='qatar'>Qatar</SelectItem>
                          <SelectItem value='kuwait'>Kuwait</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='state' className='text-base font-medium'>
                        State/Emirate
                      </Label>
                      <Select
                        value={formData.state}
                        onValueChange={value => setFormData({ ...formData, state: value })}
                      >
                        <SelectTrigger className='h-12'>
                          <SelectValue placeholder='Select State' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='dubai'>Dubai</SelectItem>
                          <SelectItem value='abudhabi'>Abu Dhabi</SelectItem>
                          <SelectItem value='sharjah'>Sharjah</SelectItem>
                          <SelectItem value='ajman'>Ajman</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='city' className='text-base font-medium'>
                        City
                      </Label>
                      <Select
                        value={formData.city}
                        onValueChange={value => setFormData({ ...formData, city: value })}
                      >
                        <SelectTrigger className='h-12'>
                          <SelectValue placeholder='Select City' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='dubai-city'>Dubai City</SelectItem>
                          <SelectItem value='sharjah-city'>Sharjah</SelectItem>
                          <SelectItem value='abu-dhabi-city'>Abu Dhabi City</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Pricing */}
            <Card className='shadow-md'>
              <SectionHeader title='Pricing' icon={DollarSign} section='pricing' required />
              {expandedSections.pricing && (
                <CardContent className='px-6 pb-6'>
                  <div className='space-y-6'>
                    <div className='space-y-3'>
                      <Label className='text-base font-medium'>Pricing Type *</Label>
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        {[
                          {
                            value: 'negotiable',
                            label: 'Negotiable',
                            desc: 'Price can be discussed',
                          },
                          { value: 'fixed', label: 'Fixed Price', desc: 'Set rental/sale rates' },
                          { value: 'on-call', label: 'Price on Call', desc: 'Contact for pricing' },
                        ].map(type => (
                          <Card
                            key={type.value}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              formData.pricing === type.value
                                ? 'ring-2 ring-blue-500 bg-blue-50'
                                : ''
                            }`}
                            onClick={() => setFormData({ ...formData, pricing: type.value })}
                          >
                            <CardContent className='p-4'>
                              <div className='flex items-center space-x-3'>
                                <div className='w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center'>
                                  {formData.pricing === type.value && (
                                    <div className='w-2 h-2 bg-blue-500 rounded-full' />
                                  )}
                                </div>
                                <div>
                                  <div className='font-medium text-sm'>{type.label}</div>
                                  <div className='text-xs text-gray-500'>{type.desc}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {formData.pricing === 'fixed' && (
                      <div className='space-y-4'>
                        {formData.adType === 'rent' ? (
                          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <div className='space-y-2'>
                              <Label htmlFor='pricePerDay' className='text-base font-medium'>
                                Price per Day
                              </Label>
                              <div className='relative'>
                                <span className='absolute left-3 top-3 text-gray-500 font-medium'>
                                  AED
                                </span>
                                <Input
                                  id='pricePerDay'
                                  type='number'
                                  placeholder='0'
                                  className='pl-12 h-12 text-base'
                                  value={formData.pricePerDay}
                                  onChange={e =>
                                    setFormData({ ...formData, pricePerDay: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                            <div className='space-y-2'>
                              <Label htmlFor='pricePerWeek' className='text-base font-medium'>
                                Price per Week
                              </Label>
                              <div className='relative'>
                                <span className='absolute left-3 top-3 text-gray-500 font-medium'>
                                  AED
                                </span>
                                <Input
                                  id='pricePerWeek'
                                  type='number'
                                  placeholder='0'
                                  className='pl-12 h-12 text-base'
                                  value={formData.pricePerWeek}
                                  onChange={e =>
                                    setFormData({ ...formData, pricePerWeek: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                            <div className='space-y-2'>
                              <Label htmlFor='pricePerMonth' className='text-base font-medium'>
                                Price per Month
                              </Label>
                              <div className='relative'>
                                <span className='absolute left-3 top-3 text-gray-500 font-medium'>
                                  AED
                                </span>
                                <Input
                                  id='pricePerMonth'
                                  type='number'
                                  placeholder='0'
                                  className='pl-12 h-12 text-base'
                                  value={formData.pricePerMonth}
                                  onChange={e =>
                                    setFormData({ ...formData, pricePerMonth: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className='space-y-2'>
                            <Label htmlFor='salePrice' className='text-base font-medium'>
                              Sale Price
                            </Label>
                            <div className='relative'>
                              <span className='absolute left-3 top-3 text-gray-500 font-medium'>
                                AED
                              </span>
                              <Input
                                id='salePrice'
                                type='number'
                                placeholder='0'
                                className='pl-12 h-12 text-base'
                                value={formData.salePrice}
                                onChange={e =>
                                  setFormData({ ...formData, salePrice: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Description & Details */}
            <Card className='shadow-md'>
              <SectionHeader title='Description & Details' icon={FileText} section='description' />
              {expandedSections.description && (
                <CardContent className='px-6 pb-6'>
                  <div className='space-y-6'>
                    <div className='space-y-2'>
                      <Label htmlFor='description' className='text-base font-medium'>
                        Description *
                      </Label>
                      <Textarea
                        id='description'
                        placeholder='Provide a detailed description of your equipment, its condition, features, and any other relevant information...'
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className='min-h-[200px] text-base'
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='specifications' className='text-base font-medium'>
                        Technical Specifications
                      </Label>
                      <Textarea
                        id='specifications'
                        placeholder='Engine details, dimensions, capacity, operating weight, etc.'
                        value={formData.specifications}
                        onChange={e => setFormData({ ...formData, specifications: e.target.value })}
                        className='min-h-[120px] text-base'
                      />
                    </div>

                    {formData.features.length > 0 && (
                      <div className='space-y-2'>
                        <Label className='text-base font-medium'>Key Features</Label>
                        <div className='flex flex-wrap gap-2'>
                          {formData.features.map((feature, index) => (
                            <Badge key={index} variant='secondary' className='text-sm'>
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Images */}
            <Card className='shadow-md'>
              <SectionHeader title='Images' icon={ImageIcon} section='images' />
              {expandedSections.images && (
                <CardContent className='px-6 pb-6'>
                  <div className='space-y-4'>
                    <div className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors'>
                      <Upload className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                      <p className='text-lg font-medium text-gray-600 mb-2'>
                        Upload Equipment Images
                      </p>
                      <p className='text-sm text-gray-500 mb-4'>
                        Add up to 10 high-quality images of your equipment
                      </p>
                      <Button
                        variant='outline'
                        className='border-blue-300 text-blue-600 hover:bg-blue-50'
                      >
                        <Upload className='h-4 w-4 mr-2' />
                        Choose Images
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Terms */}
            <Card className='shadow-md'>
              <CardContent className='p-6'>
                <div className='flex items-start space-x-3'>
                  <Checkbox
                    id='terms'
                    checked={formData.acceptTerms}
                    onCheckedChange={checked =>
                      setFormData({ ...formData, acceptTerms: checked as boolean })
                    }
                    className='mt-1'
                  />
                  <div className='space-y-1'>
                    <Label htmlFor='terms' className='text-base font-medium cursor-pointer'>
                      I agree to the Terms and Conditions *
                    </Label>
                    <p className='text-sm text-gray-600'>
                      By posting this advertisement, you agree to our terms of service and privacy
                      policy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 pt-6'>
              <Button
                variant='outline'
                size='lg'
                className='flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50'
              >
                <Save className='h-4 w-4 mr-2' />
                Save as Draft
              </Button>
              <Button
                size='lg'
                className='flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                disabled={!formData.acceptTerms}
              >
                <Send className='h-4 w-4 mr-2' />
                Publish Advertisement
              </Button>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className='lg:col-span-1'>
            <Card className='sticky top-8 shadow-lg'>
              <CardHeader className='bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg'>
                <CardTitle className='flex items-center space-x-2'>
                  <Eye className='h-5 w-5' />
                  <span>Live Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className='p-6 space-y-4'>
                <div className='aspect-video bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden'>
                  {formData.thumbnailImage ? (
                    <Image
                      src={formData.thumbnailImage}
                      alt={formData.title || 'Equipment'}
                      width={400}
                      height={225}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <ImageIcon className='h-12 w-12 text-gray-400' />
                  )}
                </div>

                <div className='space-y-3'>
                  <h3 className='font-bold text-lg text-gray-900'>
                    {formData.title || 'Equipment Title'}
                  </h3>

                  <div className='flex items-center space-x-2'>
                    <Badge variant={formData.adType === 'rent' ? 'default' : 'secondary'}>
                      {formData.adType === 'rent' ? 'For Rent' : 'For Sale'}
                    </Badge>
                    {formData.condition && <Badge variant='outline'>{formData.condition}</Badge>}
                  </div>

                  {formData.brand && formData.model && (
                    <p className='text-gray-600'>
                      {formData.brand} {formData.model} {formData.modelYear}
                    </p>
                  )}

                  {formData.pricing === 'fixed' && (
                    <div className='space-y-1'>
                      {formData.adType === 'rent' ? (
                        <>
                          {formData.pricePerDay && (
                            <p className='text-green-600 font-semibold'>
                              AED {formData.pricePerDay}/day
                            </p>
                          )}
                          {formData.pricePerWeek && (
                            <p className='text-green-600'>AED {formData.pricePerWeek}/week</p>
                          )}
                          {formData.pricePerMonth && (
                            <p className='text-green-600'>AED {formData.pricePerMonth}/month</p>
                          )}
                        </>
                      ) : (
                        formData.salePrice && (
                          <p className='text-green-600 font-semibold text-xl'>
                            AED {formData.salePrice}
                          </p>
                        )
                      )}
                    </div>
                  )}

                  {formData.pricing === 'negotiable' && (
                    <p className='text-blue-600 font-semibold'>Price Negotiable</p>
                  )}

                  {formData.pricing === 'on-call' && (
                    <p className='text-purple-600 font-semibold'>Price on Call</p>
                  )}

                  <div className='flex items-center space-x-1 text-gray-500 text-sm'>
                    <MapPin className='h-4 w-4' />
                    <span>
                      {[formData.city, formData.state, formData.country]
                        .filter(Boolean)
                        .join(', ') || 'Location not specified'}
                    </span>
                  </div>

                  {formData.description && (
                    <div className='space-y-2'>
                      <h4 className='font-semibold text-gray-900'>Description</h4>
                      <p className='text-sm text-gray-600 line-clamp-4'>{formData.description}</p>
                    </div>
                  )}

                  {formData.features.length > 0 && (
                    <div className='space-y-2'>
                      <h4 className='font-semibold text-gray-900'>Features</h4>
                      <div className='flex flex-wrap gap-1'>
                        {formData.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant='outline' className='text-xs'>
                            {feature}
                          </Badge>
                        ))}
                        {formData.features.length > 3 && (
                          <Badge variant='outline' className='text-xs'>
                            +{formData.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
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
