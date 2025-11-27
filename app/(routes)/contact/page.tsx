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
              <div className='lg:col-span-7'>
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
              </div>
              <div className='lg:col-span-5'>
                <Card className='rounded-3xl shadow-xl border bg-white/80 backdrop-blur ring-1 ring-black/5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5'>
                  <CardContent className='p-6'>
                    <div className='mb-4'>
                      <h2 className='text-2xl font-semibold'>Get in Touch</h2>
                      <p className='text-sm text-muted-foreground'>You can reach us anytime</p>
                    </div>
                    <form className='space-y-4'>
                      <Input placeholder='Name' aria-label='Name' className='bg-gray-50' />
                      <Input
                        type='email'
                        placeholder='Email'
                        aria-label='Email'
                        className='bg-gray-50'
                      />
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
            </div>
          </div>
        </section>

        <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
            <div className='lg:col-span-6'>
              <MapClient />
            </div>
            <div className='lg:col-span-6'>
              <h3 className='text-xl font-semibold'>Our Location</h3>
              <p className='mt-2 text-muted-foreground max-w-prose'>Connecting Near and Far</p>
              <div className='mt-5 rounded-2xl border bg-white/80 backdrop-blur p-5 ring-1 ring-black/5 shadow-sm'>
                <div className='text-sm font-medium'>Headquarters</div>
                <div className='mt-1 text-sm'>Equipments Finder</div>
                <div className='text-sm'>Capital Golden Tower, Dubai</div>
                <div className='mt-4 space-y-2'>
                  <div className='flex items-center gap-2 text-sm'>
                    <span className='inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600'>
                      📍
                    </span>
                    <Link
                      href={'https://www.google.com/maps?q=Capital+Golden+Tower,+Dubai'}
                      target='_blank'
                      className='text-blue-600 hover:underline'
                    >
                      Open Google Maps
                    </Link>
                  </div>
                  <div className='flex items-center gap-2 text-sm'>
                    <span className='inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600'>
                      📞
                    </span>
                    <Link href={'tel:+971585839080'} className='text-blue-600 hover:underline'>
                      +971585839080
                    </Link>
                  </div>
                  <div className='flex items-center gap-2 text-sm'>
                    <span className='inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600'>
                      ✉️
                    </span>
                    <Link
                      href={'mailto:info@equipmentsfinder.com'}
                      className='text-blue-600 hover:underline'
                    >
                      info@equipmentsfinder.com
                    </Link>
                  </div>
                </div>
                <div className='mt-5 flex gap-2'>
                  <Link
                    href={'https://www.google.com/maps?q=Capital+Golden+Tower,+Dubai'}
                    target='_blank'
                    className='inline-flex h-9 items-center rounded-md border px-3 text-sm hover:bg-gray-50'
                  >
                    Open Google Maps
                  </Link>
                  <Link
                    href={'tel:+971585839080'}
                    className='inline-flex h-9 items-center rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-3 text-sm text-white hover:from-blue-700 hover:to-indigo-700'
                  >
                    Call Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='bg-gradient-to-b from-white to-gray-50 border-y'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
              <div className='lg:col-span-4'>
                <h4 className='text-xl font-semibold'>FAQ</h4>
                <p className='mt-2 text-sm text-muted-foreground'>
                  If there are questions you want to ask, we will answer all your questions.
                </p>
                <form className='mt-4 flex gap-2'>
                  <Input
                    placeholder='Enter your email'
                    aria-label='Email for FAQ'
                    className='bg-gray-50'
                  />
                  <Button className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'>
                    Submit
                  </Button>
                </form>
              </div>
              <div className='lg:col-span-8'>
                <Accordion
                  type='single'
                  collapsible
                  className='w-full rounded-2xl border bg-white/80 backdrop-blur p-2'
                >
                  <AccordionItem value='q1'>
                    <AccordionTrigger className='py-5 text-base'>
                      What makes Equipments Finder different?
                    </AccordionTrigger>
                    <AccordionContent>
                      We combine verified sellers, curated listings, and modern search to help you
                      find the right equipment faster.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='q2'>
                    <AccordionTrigger className='py-5 text-base'>
                      How secure are my communications?
                    </AccordionTrigger>
                    <AccordionContent>
                      Your data is protected with industry-standard practices and secure transport.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='q3'>
                    <AccordionTrigger className='py-5 text-base'>
                      Can I personalize my experience?
                    </AccordionTrigger>
                    <AccordionContent>
                      Use filters, saved searches, and location preferences to tailor results.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
