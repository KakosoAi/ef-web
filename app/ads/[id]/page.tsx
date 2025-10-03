'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { getAdById } from '@/shared/data/ads';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent } from '@/shared/ui/card';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdPage() {
  const params = useParams();
  const adId = params.id as string;

  const ad = getAdById(adId);

  if (!ad) {
    notFound();
  }

  const formatPrice = (price: number, currency: string, type: string) => {
    if (type === 'starting_from') {
      return `Starting from ${currency} ${price.toLocaleString()}`;
    }
    if (type === 'fixed') {
      return `${currency} ${price.toLocaleString()}`;
    }
    return 'Contact for Quote';
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />

      <main className='container mx-auto px-4 py-8'>
        {/* Back Navigation */}
        <div className='mb-6'>
          <Link
            href='/ai-map-search'
            className='inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Equipment Search
          </Link>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Header Section */}
            <Card>
              <CardContent className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex items-center space-x-3'>
                    <div className='text-3xl'>{ad.icon}</div>
                    <div>
                      <h1 className='text-2xl font-bold text-gray-900'>{ad.title}</h1>
                      <p className='text-gray-600'>{ad.shortDescription}</p>
                    </div>
                  </div>
                  <div className='flex space-x-2'>
                    {ad.isPremium && (
                      <Badge className='bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900'>
                        <Star className='w-3 h-3 mr-1' />
                        Premium
                      </Badge>
                    )}
                    <Badge variant='secondary' className='capitalize'>
                      {ad.category}
                    </Badge>
                  </div>
                </div>

                {/* Hero Image */}
                {ad.imageUrl && (
                  <div className='relative w-full h-64 rounded-lg overflow-hidden mb-6'>
                    <Image src={ad.imageUrl} alt={ad.title} fill className='object-cover' />
                  </div>
                )}

                {/* Description */}
                <div className='prose max-w-none'>
                  <p className='text-gray-700 leading-relaxed'>{ad.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Features Section */}
            <Card>
              <CardContent className='p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>Key Features</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  {ad.features.map((feature, index) => (
                    <div key={index} className='flex items-center space-x-2'>
                      <CheckCircle className='w-5 h-5 text-green-500 flex-shrink-0' />
                      <span className='text-gray-700'>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location Section */}
            {ad.location && (
              <Card>
                <CardContent className='p-6'>
                  <h2 className='text-xl font-semibold text-gray-900 mb-4'>Service Area</h2>
                  <div className='flex items-center space-x-2 text-gray-700'>
                    <MapPin className='w-5 h-5 text-gray-500' />
                    <span>
                      {ad.location.city}, {ad.location.country}
                    </span>
                    <Badge variant='outline'>{ad.location.region}</Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Pricing Card */}
            <Card className='sticky top-4'>
              <CardContent className='p-6'>
                <div className='text-center mb-6'>
                  {ad.pricing ? (
                    <div>
                      <div className='text-2xl font-bold text-gray-900 mb-1'>
                        {formatPrice(
                          ad.pricing.startingPrice || 0,
                          ad.pricing.currency,
                          ad.pricing.priceType
                        )}
                      </div>
                      {ad.pricing.priceType === 'starting_from' && (
                        <p className='text-sm text-gray-600'>per month</p>
                      )}
                    </div>
                  ) : (
                    <div className='text-xl font-semibold text-gray-900'>Contact for Pricing</div>
                  )}
                </div>

                <Button
                  className='w-full mb-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                  size='lg'
                >
                  {ad.ctaText}
                  <ExternalLink className='w-4 h-4 ml-2' />
                </Button>

                {/* Company Info */}
                <div className='border-t pt-4'>
                  <h3 className='font-semibold text-gray-900 mb-3'>Contact Information</h3>
                  <div className='space-y-3'>
                    <div>
                      <div className='font-medium text-gray-900'>{ad.company.name}</div>
                    </div>

                    {ad.company.phone && (
                      <div className='flex items-center space-x-2 text-gray-600'>
                        <Phone className='w-4 h-4' />
                        <a
                          href={`tel:${ad.company.phone}`}
                          className='hover:text-orange-600 transition-colors'
                        >
                          {ad.company.phone}
                        </a>
                      </div>
                    )}

                    {ad.company.email && (
                      <div className='flex items-center space-x-2 text-gray-600'>
                        <Mail className='w-4 h-4' />
                        <a
                          href={`mailto:${ad.company.email}`}
                          className='hover:text-orange-600 transition-colors'
                        >
                          {ad.company.email}
                        </a>
                      </div>
                    )}

                    {ad.company.website && (
                      <div className='flex items-center space-x-2 text-gray-600'>
                        <Globe className='w-4 h-4' />
                        <a
                          href={ad.company.website}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='hover:text-orange-600 transition-colors'
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card>
              <CardContent className='p-6'>
                <h3 className='font-semibold text-gray-900 mb-4'>Why Choose Us</h3>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-2'>
                    <CheckCircle className='w-5 h-5 text-green-500' />
                    <span className='text-sm text-gray-700'>Verified Business</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <CheckCircle className='w-5 h-5 text-green-500' />
                    <span className='text-sm text-gray-700'>Licensed & Insured</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <CheckCircle className='w-5 h-5 text-green-500' />
                    <span className='text-sm text-gray-700'>Regional Expertise</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <CheckCircle className='w-5 h-5 text-green-500' />
                    <span className='text-sm text-gray-700'>24/7 Support</span>
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
