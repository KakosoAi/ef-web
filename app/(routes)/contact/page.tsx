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
                <h1 className='text-5xl font-semibold tracking-tight'>Contact Us</h1>
                <p className='mt-5 text-lg text-muted-foreground max-w-prose'>
                  We&apos;re here to answer your questions and explore opportunities. Contact us
                  today and let&apos;s pave the way to a healthier future together
                </p>
                <div className='mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  <div className='rounded-2xl bg-gradient-to-b from-white to-white/80 backdrop-blur border ring-1 ring-black/5 shadow-sm p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'>
                    <div className='flex items-center gap-2 text-sm font-medium'>
                      <Phone className='h-4 w-4 text-blue-600' /> Call us
                    </div>
                    <div className='mt-1 text-sm text-muted-foreground'>+971585839080</div>
                  </div>
                  <div className='rounded-2xl bg-gradient-to-b from-white to-white/80 backdrop-blur border ring-1 ring-black/5 shadow-sm p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'>
                    <div className='flex items-center gap-2 text-sm font-medium'>
                      <Mail className='h-4 w-4 text-blue-600' /> Email
                    </div>
                    <div className='mt-1 text-sm text-muted-foreground'>
                      info@equipmentsfinder.com
                    </div>
                  </div>
                  <div className='rounded-2xl bg-gradient-to-b from-white to-white/80 backdrop-blur border ring-1 ring-black/5 shadow-sm p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'>
                    <div className='flex items-center gap-2 text-sm font-medium'>
                      <MapPin className='h-4 w-4 text-blue-600' /> Address
                    </div>
                    <div className='mt-1 text-sm text-muted-foreground'>
                      Capital Golden Tower, Dubai
                    </div>
                  </div>
                </div>
                <Card className='mt-8 rounded-3xl shadow-xl border bg-white/80 backdrop-blur ring-1 ring-black/5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5'>
                  <CardContent className='p-6'>
                    <div className='mb-4'>
                      <h2 className='text-2xl font-semibold'>Get in Touch</h2>
                      <p className='text-sm text-muted-foreground'>You can reach us anytime</p>
                    </div>
                    <form className='space-y-4'>
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
                          <SelectTrigger className='w-28'>
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
                      <Button className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-transform duration-300 hover:-translate-y-0.5'>
                        Submit
                      </Button>
                    </form>
                  </CardContent>
                </Card>
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
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Card className='rounded-xl border bg-white'>
                    <CardContent className='p-5'>
                      <div className='font-medium'>What makes Equipments Finder different?</div>
                      <div className='mt-1 text-sm text-muted-foreground'>
                        We combine verified sellers, curated listings, and modern search to help you
                        find the right equipment faster.
                      </div>
                    </CardContent>
                  </Card>
                  <Card className='rounded-xl border bg-white'>
                    <CardContent className='p-5'>
                      <div className='font-medium'>How secure are my communications?</div>
                      <div className='mt-1 text-sm text-muted-foreground'>
                        Your data is protected with industry-standard practices and secure
                        transport.
                      </div>
                    </CardContent>
                  </Card>
                  <Card className='rounded-xl border bg-white'>
                    <CardContent className='p-5'>
                      <div className='font-medium'>Can I personalize my experience?</div>
                      <div className='mt-1 text-sm text-muted-foreground'>
                        Use filters, saved searches, and location preferences to tailor results.
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className='mt-4'>
                  <Button variant='outline'>Learn more</Button>
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
                    <Button className='bg-white text-black hover:bg-gray-200'>
                      Want to list Ads ?
                    </Button>
                    <Button className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'>
                      One click away
                    </Button>
                  </div>
                  <div className='mt-4'>
                    <details className='inline-block text-left'>
                      <summary className='cursor-pointer'>show more</summary>
                      <div className='mt-3 max-w-3xl text-sm text-white/90'>
                        Project Iraq – Baghdad, the leading construction event in Baghdad is back
                        for its third edition, presenting unparalleled opportunities for businesses
                        to engage with Iraq&apos;s burgeoning construction and infrastructure
                        industries. Taking place from 24 to 26 June 2025 at Baghdad International
                        Fairground in Iraq, the event serves as a vital hub for connecting industry
                        leaders, innovators, and decision-makers, all working collaboratively to
                        shape the nation&apos;s development path.
                      </div>
                    </details>
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
