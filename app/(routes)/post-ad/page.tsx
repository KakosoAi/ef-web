'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import { Checkbox } from '@/shared/ui/checkbox';
import { Search, Upload, X } from 'lucide-react';

type AdType = 'rent' | 'sell' | null;
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
  | 'aircraft'
  | null;

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

export default function PostAdPage() {
  const [step, setStep] = useState(1);
  const [adType, setAdType] = useState<AdType>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    modelYear: '',
    condition: '',
    fuelType: '',
    country: '',
    state: '',
    city: '',
    pricing: 'negotiable',
    pricePerDay: '',
    pricePerWeek: '',
    pricePerMonth: '',
    description: '',
    acceptTerms: false,
  });

  const filteredIndustries = industries.filter(industry =>
    industry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-advance to step 5 when on step 4 and category is not 'Aerial Platforms'
  useEffect(() => {
    if (step === 4 && selectedCategory && selectedCategory !== 'Aerial Platforms') {
      setStep(5);
    }
  }, [step, selectedCategory]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Card className='w-full max-w-2xl mx-auto'>
            <CardHeader>
              <CardTitle className='text-2xl font-bold text-center'>
                What type of advertisement are you posting?
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                <Input
                  placeholder='Search adType...'
                  className='pl-10'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className='text-sm text-gray-600'>2 options found</div>
              <div className='space-y-3'>
                <Card
                  className={`cursor-pointer transition-all hover:shadow-md ${adType === 'rent' ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setAdType('rent')}
                >
                  <CardContent className='p-4'>
                    <div className='flex items-center space-x-3'>
                      <div className='w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center'>
                        {adType === 'rent' && <div className='w-2 h-2 bg-blue-500 rounded-full' />}
                      </div>
                      <span className='font-medium'>Rent</span>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className={`cursor-pointer transition-all hover:shadow-md ${adType === 'sell' ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setAdType('sell')}
                >
                  <CardContent className='p-4'>
                    <div className='flex items-center space-x-3'>
                      <div className='w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center'>
                        {adType === 'sell' && <div className='w-2 h-2 bg-blue-500 rounded-full' />}
                      </div>
                      <span className='font-medium'>Sell</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Button onClick={handleNext} disabled={!adType} className='w-full'>
                Continue
              </Button>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className='w-full max-w-2xl mx-auto'>
            <CardHeader>
              <CardTitle className='text-2xl font-bold text-center'>
                Which industry does this advertisement belong to?
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                <Input
                  placeholder='Search industry...'
                  className='pl-10'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className='text-sm text-gray-600'>{filteredIndustries.length} options found</div>
              <div className='space-y-2 max-h-96 overflow-y-auto'>
                {filteredIndustries.map(industry => (
                  <Card
                    key={industry.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${selectedIndustry === industry.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                    onClick={() => setSelectedIndustry(industry.id as Industry)}
                  >
                    <CardContent className='p-3'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center'>
                          {selectedIndustry === industry.id && (
                            <div className='w-2 h-2 bg-blue-500 rounded-full' />
                          )}
                        </div>
                        <span className='font-medium'>{industry.name}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className='flex space-x-3'>
                <Button variant='outline' onClick={handleBack} className='flex-1'>
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!selectedIndustry} className='flex-1'>
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className='w-full max-w-2xl mx-auto'>
            <CardHeader>
              <CardTitle className='text-2xl font-bold text-center'>Select Category</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto'>
                {constructionCategories.map(category => (
                  <Card
                    key={category}
                    className={`cursor-pointer transition-all hover:shadow-md ${selectedCategory === category ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <CardContent className='p-3'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center'>
                          {selectedCategory === category && (
                            <div className='w-2 h-2 bg-blue-500 rounded-full' />
                          )}
                        </div>
                        <span className='text-sm font-medium'>{category}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className='flex space-x-3'>
                <Button variant='outline' onClick={handleBack} className='flex-1'>
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!selectedCategory} className='flex-1'>
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return selectedCategory === 'Aerial Platforms' ? (
          <Card className='w-full max-w-2xl mx-auto'>
            <CardHeader>
              <CardTitle className='text-2xl font-bold text-center'>Select Subcategory</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-3'>
                {aerialPlatformSubcategories.map(subcategory => (
                  <Card
                    key={subcategory}
                    className={`cursor-pointer transition-all hover:shadow-md ${selectedSubcategory === subcategory ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                    onClick={() => setSelectedSubcategory(subcategory)}
                  >
                    <CardContent className='p-3'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center'>
                          {selectedSubcategory === subcategory && (
                            <div className='w-2 h-2 bg-blue-500 rounded-full' />
                          )}
                        </div>
                        <span className='font-medium'>{subcategory}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className='flex space-x-3'>
                <Button variant='outline' onClick={handleBack} className='flex-1'>
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!selectedSubcategory} className='flex-1'>
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Skip subcategory for other categories - will auto-advance via useEffect
          <div className='text-center p-8'>
            <p className='text-gray-600'>Proceeding to next step...</p>
          </div>
        );

      case 5:
        return (
          <div className='w-full max-w-4xl mx-auto space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle className='text-2xl font-bold'>
                  Create a {adType === 'rent' ? 'Rental' : 'Sale'} Ad for {selectedCategory}
                  {selectedSubcategory && ` (${selectedSubcategory})`}
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                {/* Basic Information */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <Label htmlFor='title'>Title *</Label>
                    <Input
                      id='title'
                      placeholder='Equipment Name eg: Mercedes Flatbed Trailer'
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='brand'>Brand *</Label>
                    <Select
                      value={formData.brand}
                      onValueChange={value => setFormData({ ...formData, brand: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select Brand' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='caterpillar'>Caterpillar</SelectItem>
                        <SelectItem value='komatsu'>Komatsu</SelectItem>
                        <SelectItem value='volvo'>Volvo</SelectItem>
                        <SelectItem value='mercedes'>Mercedes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='model'>Model *</Label>
                    <Select
                      value={formData.model}
                      onValueChange={value => setFormData({ ...formData, model: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Please select brand first' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='model1'>Model 1</SelectItem>
                        <SelectItem value='model2'>Model 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='modelYear'>Model Year *</Label>
                    <Select
                      value={formData.modelYear}
                      onValueChange={value => setFormData({ ...formData, modelYear: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select model year' />
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
                  <div className='space-y-2'>
                    <Label htmlFor='condition'>Condition *</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={value => setFormData({ ...formData, condition: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select condition' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='new'>New</SelectItem>
                        <SelectItem value='used'>Used</SelectItem>
                        <SelectItem value='refurbished'>Refurbished</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='fuelType'>Fuel Type *</Label>
                    <Select
                      value={formData.fuelType}
                      onValueChange={value => setFormData({ ...formData, fuelType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select fuel type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='diesel'>Diesel</SelectItem>
                        <SelectItem value='petrol'>Petrol</SelectItem>
                        <SelectItem value='electric'>Electric</SelectItem>
                        <SelectItem value='hybrid'>Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Location */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>Select equipment location *</h3>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='country'>Country *</Label>
                      <Select
                        value={formData.country}
                        onValueChange={value => setFormData({ ...formData, country: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select Country' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='uae'>United Arab Emirates</SelectItem>
                          <SelectItem value='saudi'>Saudi Arabia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='state'>State</Label>
                      <Select
                        value={formData.state}
                        onValueChange={value => setFormData({ ...formData, state: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select State' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='dubai'>Dubai</SelectItem>
                          <SelectItem value='abudhabi'>Abu Dhabi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='city'>City</Label>
                      <Select
                        value={formData.city}
                        onValueChange={value => setFormData({ ...formData, city: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select City' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='dubai-city'>Dubai City</SelectItem>
                          <SelectItem value='sharjah'>Sharjah</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>Pricing *</h3>
                  <div className='flex space-x-4'>
                    {['negotiable', 'fixed', 'on-call'].map(type => (
                      <Card
                        key={type}
                        className={`cursor-pointer transition-all hover:shadow-md ${formData.pricing === type ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                        onClick={() => setFormData({ ...formData, pricing: type })}
                      >
                        <CardContent className='p-3'>
                          <div className='flex items-center space-x-2'>
                            <div className='w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center'>
                              {formData.pricing === type && (
                                <div className='w-2 h-2 bg-blue-500 rounded-full' />
                              )}
                            </div>
                            <span className='capitalize'>{type.replace('-', ' ')}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {formData.pricing === 'fixed' && (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='pricePerDay'>Price per day</Label>
                        <div className='relative'>
                          <span className='absolute left-3 top-3 text-gray-500'>AED</span>
                          <Input
                            id='pricePerDay'
                            type='number'
                            placeholder='0'
                            className='pl-12'
                            value={formData.pricePerDay}
                            onChange={e =>
                              setFormData({ ...formData, pricePerDay: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='pricePerWeek'>Price per week</Label>
                        <div className='relative'>
                          <span className='absolute left-3 top-3 text-gray-500'>AED</span>
                          <Input
                            id='pricePerWeek'
                            type='number'
                            placeholder='0'
                            className='pl-12'
                            value={formData.pricePerWeek}
                            onChange={e =>
                              setFormData({ ...formData, pricePerWeek: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='pricePerMonth'>Price per month</Label>
                        <div className='relative'>
                          <span className='absolute left-3 top-3 text-gray-500'>AED</span>
                          <Input
                            id='pricePerMonth'
                            type='number'
                            placeholder='0'
                            className='pl-12'
                            value={formData.pricePerMonth}
                            onChange={e =>
                              setFormData({ ...formData, pricePerMonth: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className='space-y-2'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea
                    id='description'
                    placeholder='Share additional information about the listing, if have any.'
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Image Upload */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>Upload Images</h3>
                  <p className='text-sm text-gray-600'>We accept images of size upto 6 MB</p>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    {[
                      'Front View',
                      'Back View',
                      'Interior',
                      'Side View (both left and right)',
                      'Wheels and tires',
                    ].map(viewType => (
                      <Card
                        key={viewType}
                        className='border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors'
                      >
                        <CardContent className='p-6 text-center'>
                          <Upload className='mx-auto h-8 w-8 text-gray-400 mb-2' />
                          <p className='text-sm font-medium text-gray-700'>{viewType}</p>
                          <p className='text-xs text-gray-500 mt-1'>
                            Drag images here or click to select files
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className='text-xs text-gray-500 space-y-1'>
                    <p>• You can attach maximum of 6 images.</p>
                    <p>• Maximum size of image is upto 6 MB.</p>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='terms'
                    checked={formData.acceptTerms}
                    onCheckedChange={checked =>
                      setFormData({ ...formData, acceptTerms: checked as boolean })
                    }
                  />
                  <Label htmlFor='terms' className='text-sm'>
                    I accept{' '}
                    <span className='text-blue-600 underline cursor-pointer'>
                      Terms & Conditions
                    </span>
                  </Label>
                </div>

                {/* Action Buttons */}
                <div className='flex space-x-3 pt-6'>
                  <Button variant='outline' onClick={handleBack} className='flex-1'>
                    Back
                  </Button>
                  <Button className='flex-1' disabled={!formData.acceptTerms}>
                    Post Advertisement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='container mx-auto'>
        {/* Progress Indicator */}
        <div className='mb-8'>
          <div className='flex items-center justify-center space-x-4'>
            {[1, 2, 3, 4, 5].map(stepNumber => (
              <div key={stepNumber} className='flex items-center'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 5 && (
                  <div
                    className={`w-12 h-0.5 ${step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {renderStepContent()}
      </div>
    </div>
  );
}
