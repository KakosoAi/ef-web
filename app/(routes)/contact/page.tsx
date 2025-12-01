import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/shared/ui/select';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/shared/ui/accordion';
import { Phone, Mail, MapPin } from 'lucide-react';
import MapClient from './MapClient';
import Link from 'next/link';

export const dynamic = 'force-static';
export const revalidate = 300;

export default function ContactPage() {
  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main>
        <section className='bg-gradient-to-b from-gray-50 to-white border-b'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>
              <div className='lg:col-span-6'>
                <div className='p-8'>
                  <h1 className='text-5xl font-semibold tracking-tight'>Contact Us</h1>
                  <p className='mt-4 text-lg text-muted-foreground max-w-prose'>
                    We&apos;re here to answer your questions and explore opportunities. Contact us
                    today and let&apos;s pave the way to a healthier future together
                  </p>
                  <div className='mt-6 space-y-3'>
                    <div className='flex items-center gap-3 text-sm'>
                      <Phone className='h-4 w-4 text-orange-600' />
                      <span className='font-medium'>Call us</span>
                      <span className='text-muted-foreground'>+971585839080</span>
                    </div>
                    <div className='flex items-center gap-3 text-sm'>
                      <Mail className='h-4 w-4 text-orange-600' />
                      <span className='font-medium'>Email</span>
                      <span className='text-muted-foreground'>info@equipmentsfinder.com</span>
                    </div>
                    <div className='flex items-center gap-3 text-sm'>
                      <MapPin className='h-4 w-4 text-orange-600' />
                      <span className='font-medium'>Address</span>
                      <span className='text-muted-foreground'>Capital Golden Tower, Dubai</span>
                    </div>
                  </div>
                  <form className='mt-6 space-y-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                      <Input placeholder='Name' aria-label='Name' className='bg-gray-50' />
                      <Input
                        type='email'
                        placeholder='Email'
                        aria-label='Email'
                        className='bg-gray-50'
                      />
                    </div>
                    <div className='flex gap-2'>
                      <Select defaultValue='+971'>
                        <SelectTrigger className='w-36'>
                          <SelectValue placeholder='+971' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='+971'>+971</SelectItem>
                          <SelectItem value='+1'>+1</SelectItem>
                          <SelectItem value='+44'>+44</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder='Phone' aria-label='Phone' className='bg-gray-50' />
                    </div>
                    <Textarea
                      placeholder='Tell us briefly what this is about!'
                      aria-label='Message'
                      className='bg-gray-50'
                    />
                    <Button className='w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-transform duration-300 hover:-translate-y-0.5'>
                      Submit
                    </Button>
                  </form>
                </div>
              </div>
              <div className='lg:col-span-6'>
                <MapClient />
              </div>
            </div>
          </div>
        </section>

        <section className='bg-gradient-to-b from-white to-gray-50 border-y'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
              <div className='lg:col-span-4'>
                <h4 className='text-xl font-semibold'>Frequently asked questions</h4>
                <p className='mt-2 text-sm text-muted-foreground'>
                  If there are questions you want to ask, we will answer all your questions.
                </p>
              </div>
              <div className='lg:col-span-8'>
                <div className='space-y-6 divide-y'>
                  <div className='pt-0'>
                    <div className='font-medium'>What makes Equipments Finder different?</div>
                    <div className='mt-1 text-sm text-muted-foreground'>
                      We combine verified sellers, curated listings, and modern search to help you
                      find the right equipment faster.
                    </div>
                  </div>
                  <div className='pt-6'>
                    <div className='font-medium'>How secure are my communications?</div>
                    <div className='mt-1 text-sm text-muted-foreground'>
                      Your data is protected with industry-standard practices and secure transport.
                    </div>
                  </div>
                  <div className='pt-6'>
                    <div className='font-medium'>Can I personalize my experience?</div>
                    <div className='mt-1 text-sm text-muted-foreground'>
                      Use filters, saved searches, and location preferences to tailor results.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='relative'>
          <div
            className='relative'
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className='bg-black/40'>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16'>
                <div className='text-center text-white'>
                  <h3 className='text-3xl sm:text-4xl font-semibold'>
                    EMPOWERING IRAQ’S CONSTRUCTION & INFRASTRUCTURE REVOLUTION
                  </h3>
                  <div className='mt-6 flex items-center justify-center gap-3'>
                    <Link href='/post-ad'>
                      <Button className='bg-white text-black hover:bg-gray-200'>Post Now</Button>
                    </Link>
                    <Link href='/equipments/buy'>
                      <Button className='bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'>
                        Browse Ads
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
