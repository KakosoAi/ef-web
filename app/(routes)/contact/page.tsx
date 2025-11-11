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
import ContactMap from './ContactMap';
import Link from 'next/link';

export const dynamic = 'force-static';
export const revalidate = 300;

export default function ContactPage() {
  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main>
        <section className='bg-gray-50/60 border-b'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
              <div className='lg:col-span-7'>
                <h1 className='text-4xl sm:text-5xl font-semibold tracking-tight'>Contact Us</h1>
                <p className='mt-4 text-muted-foreground max-w-prose'>
                  We&apos;re here to answer your questions and explore opportunities. Contact us
                  today and let&apos;s pave the way to a healthier future together
                </p>
                <div className='mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  <div className='rounded-lg bg-white border p-4'>
                    <div className='text-sm font-medium'>Call us</div>
                    <div className='mt-1 text-sm text-muted-foreground'>+971585839080</div>
                  </div>
                  <div className='rounded-lg bg-white border p-4'>
                    <div className='text-sm font-medium'>Email</div>
                    <div className='mt-1 text-sm text-muted-foreground'>
                      info@equipmentsfinder.com
                    </div>
                  </div>
                  <div className='rounded-lg bg-white border p-4'>
                    <div className='text-sm font-medium'>Address</div>
                    <div className='mt-1 text-sm text-muted-foreground'>
                      Capital Golden Tower, Dubai
                    </div>
                  </div>
                </div>
                <div className='mt-6 flex flex-wrap gap-6 text-sm'>
                  <Link href='/support' className='text-blue-600 hover:underline'>
                    Customer Support
                  </Link>
                  <Link href='/feedback' className='text-blue-600 hover:underline'>
                    Feedback and Suggestions
                  </Link>
                  <Link href='/media' className='text-blue-600 hover:underline'>
                    Media Inquiries
                  </Link>
                </div>
              </div>
              <div className='lg:col-span-5'>
                <Card className='rounded-2xl shadow-sm'>
                  <CardContent className='p-6'>
                    <div className='mb-4'>
                      <h2 className='text-xl font-semibold'>Get in Touch</h2>
                      <p className='text-sm text-muted-foreground'>You can reach us anytime</p>
                    </div>
                    <form className='space-y-3'>
                      <Input placeholder='Name' aria-label='Name' />
                      <Input type='email' placeholder='Email' aria-label='Email' />
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
                        <Input placeholder='Phone' aria-label='Phone' />
                      </div>
                      <Textarea
                        placeholder='Tell us briefly what this is about!'
                        aria-label='Message'
                      />
                      <Button className='w-full bg-blue-600 hover:bg-blue-700'>Submit</Button>
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
              <ContactMap />
            </div>
            <div className='lg:col-span-6'>
              <h3 className='text-lg font-semibold'>Our Location</h3>
              <p className='mt-2 text-muted-foreground max-w-prose'>Connecting Near and Far</p>
              <div className='mt-4 space-y-2 text-sm'>
                <div className='font-medium'>Headquarters</div>
                <div>Equipments Finder</div>
                <div>Capital Golden Tower, Dubai</div>
                <div className='mt-2'>
                  <Link
                    href={'https://www.google.com/maps?q=Capital+Golden+Tower,+Dubai'}
                    target='_blank'
                    className='text-blue-600 hover:underline'
                  >
                    Open Google Maps
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='bg-gray-50/60 border-y'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
              <div className='lg:col-span-4'>
                <h4 className='text-xl font-semibold'>FAQ</h4>
                <p className='mt-2 text-sm text-muted-foreground'>
                  If there are questions you want to ask, we will answer all your questions.
                </p>
                <form className='mt-4 flex gap-2'>
                  <Input placeholder='Enter your email' aria-label='Email for FAQ' />
                  <Button>Submit</Button>
                </form>
              </div>
              <div className='lg:col-span-8'>
                <Accordion type='single' collapsible className='w-full'>
                  <AccordionItem value='q1'>
                    <AccordionTrigger>What makes Equipments Finder different?</AccordionTrigger>
                    <AccordionContent>
                      We combine verified sellers, curated listings, and modern search to help you
                      find the right equipment faster.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='q2'>
                    <AccordionTrigger>How secure are my communications?</AccordionTrigger>
                    <AccordionContent>
                      Your data is protected with industry-standard practices and secure transport.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='q3'>
                    <AccordionTrigger>Can I personalize my experience?</AccordionTrigger>
                    <AccordionContent>
                      Use filters, saved searches, and location preferences to tailor results.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='q4'>
                    <AccordionTrigger>
                      Does Equipments Finder offer group features?
                    </AccordionTrigger>
                    <AccordionContent>
                      We support inquiries and collaboration tools for teams and projects.
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
                  <h3 className='text-2xl sm:text-3xl font-semibold'>
                    EMPOWERING IRAQ’S CONSTRUCTION & INFRASTRUCTURE REVOLUTION
                  </h3>
                  <div className='mt-6 flex items-center justify-center gap-3'>
                    <Button className='bg-white text-black hover:bg-gray-200'>
                      Want to list Ads ?
                    </Button>
                    <Button className='bg-blue-600 hover:bg-blue-700'>One click away</Button>
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
