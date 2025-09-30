'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Badge } from '@/shared/ui/badge';
import {
  MapPin,
  Search,
  Bot,
  Zap,
  Filter,
  Settings,
  ArrowLeft,
  Sparkles,
  Map,
  Navigation,
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';

export default function AIMapSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className='min-h-screen bg-background'>
      <Header />

      <main className='container mx-auto px-4 py-8'>
        {/* Back Button */}
        <div className='mb-6'>
          <Button variant='ghost' asChild className='text-muted-foreground hover:text-foreground'>
            <Link href='/' className='flex items-center space-x-2'>
              <ArrowLeft className='h-4 w-4' />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        {/* Header Section */}
        <div className='text-center mb-12'>
          <div className='flex items-center justify-center space-x-3 mb-4'>
            <div className='relative'>
              <Bot className='h-12 w-12 text-primary' />
              <Sparkles className='h-6 w-6 text-yellow-500 absolute -top-1 -right-1' />
            </div>
            <h1 className='text-4xl font-display font-bold text-foreground'>AI Map Search</h1>
          </div>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Discover equipment locations with intelligent AI-powered mapping. Find the perfect
            equipment near you with advanced search capabilities.
          </p>
          <Badge variant='secondary' className='mt-4'>
            <Zap className='h-3 w-3 mr-1' />
            Powered by AI
          </Badge>
        </div>

        {/* Search Section */}
        <div className='max-w-4xl mx-auto mb-12'>
          <div className='bg-card rounded-xl border border-border p-8 shadow-lg'>
            <div className='flex flex-col md:flex-row gap-4 mb-6'>
              <div className='flex-1'>
                <Input
                  placeholder='Search for equipment, location, or specific needs...'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='h-12 text-lg'
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching} className='h-12 px-8'>
                {isSearching ? (
                  <>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className='h-4 w-4 mr-2' />
                    AI Search
                  </>
                )}
              </Button>
            </div>

            <div className='flex flex-wrap gap-2'>
              <Button variant='outline' size='sm'>
                <Filter className='h-3 w-3 mr-1' />
                Filters
              </Button>
              <Button variant='outline' size='sm'>
                <Navigation className='h-3 w-3 mr-1' />
                Near Me
              </Button>
              <Button variant='outline' size='sm'>
                <Settings className='h-3 w-3 mr-1' />
                Advanced
              </Button>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className='max-w-6xl mx-auto mb-12'>
          <div className='bg-muted rounded-xl border-2 border-dashed border-border p-12 text-center'>
            <Map className='h-24 w-24 text-muted-foreground mx-auto mb-6' />
            <h3 className='text-2xl font-semibold text-foreground mb-4'>
              Interactive AI Map Coming Soon
            </h3>
            <p className='text-muted-foreground text-lg mb-6 max-w-2xl mx-auto'>
              This space will feature an intelligent map interface that shows equipment locations,
              availability, and AI-powered recommendations based on your search criteria.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Badge variant='outline' className='text-sm py-2 px-4'>
                <MapPin className='h-3 w-3 mr-1' />
                Real-time Locations
              </Badge>
              <Badge variant='outline' className='text-sm py-2 px-4'>
                <Bot className='h-3 w-3 mr-1' />
                AI Recommendations
              </Badge>
              <Badge variant='outline' className='text-sm py-2 px-4'>
                <Zap className='h-3 w-3 mr-1' />
                Smart Filtering
              </Badge>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-2xl font-semibold text-center mb-8'>Upcoming Features</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-card rounded-lg border border-border p-6 text-center'>
              <Bot className='h-8 w-8 text-primary mx-auto mb-4' />
              <h3 className='font-semibold mb-2'>AI-Powered Search</h3>
              <p className='text-sm text-muted-foreground'>
                Natural language search with intelligent equipment matching
              </p>
            </div>
            <div className='bg-card rounded-lg border border-border p-6 text-center'>
              <MapPin className='h-8 w-8 text-primary mx-auto mb-4' />
              <h3 className='font-semibold mb-2'>Location Intelligence</h3>
              <p className='text-sm text-muted-foreground'>
                Find equipment based on proximity and availability
              </p>
            </div>
            <div className='bg-card rounded-lg border border-border p-6 text-center'>
              <Sparkles className='h-8 w-8 text-primary mx-auto mb-4' />
              <h3 className='font-semibold mb-2'>Smart Recommendations</h3>
              <p className='text-sm text-muted-foreground'>
                AI suggests the best equipment for your specific needs
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
