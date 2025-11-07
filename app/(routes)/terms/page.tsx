import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import { Badge } from '@/shared/ui/badge';
import { Shield, FileText, UserCheck, AlertTriangle, Calendar } from 'lucide-react';

export const dynamic = 'force-static';

export default function TermsPage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-background to-background'>
      <Header />
      <main className='container mx-auto px-4 py-12'>
        {/* Hero */}
        <section className='mx-auto max-w-5xl mb-10'>
          <div className='relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]'>
            <div className='flex items-start justify-between gap-6'>
              <div>
                <div className='flex items-center gap-3 mb-3'>
                  <span className='inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm'>
                    <Shield className='size-5' />
                  </span>
                  <Badge className='bg-primary/15 text-primary'>
                    <Calendar className='mr-1 size-3.5' /> Last updated: Jan 2025
                  </Badge>
                </div>
                <h1 className='text-4xl font-semibold tracking-tight'>Terms of Service</h1>
                <p className='mt-3 text-muted-foreground max-w-2xl'>
                  Clear, fair, and transparent terms that govern how you use our services. Please
                  read them carefully.
                </p>
              </div>
              <div className='hidden md:block opacity-70'>
                <span className='inline-flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary shadow-inner'>
                  <FileText className='size-10' />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Unified Content */}
        <section className='mx-auto max-w-5xl'>
          <article className='rounded-2xl border border-border bg-card shadow-sm overflow-hidden divide-y divide-border'>
            <div className='p-6'>
              <div className='flex items-center gap-3 mb-2'>
                <span className='inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                  <FileText className='size-4' />
                </span>
                <h2 className='text-xl font-semibold'>Use of Service</h2>
              </div>
              <p className='text-muted-foreground'>
                Use our services in compliance with applicable laws and regulations. You’re
                responsible for the content you post or submit.
              </p>
            </div>

            <div className='p-6'>
              <div className='flex items-center gap-3 mb-2'>
                <span className='inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                  <UserCheck className='size-4' />
                </span>
                <h2 className='text-xl font-semibold'>Accounts</h2>
              </div>
              <p className='text-muted-foreground'>
                Keep your credentials secure. You are responsible for all activities under your
                account.
              </p>
            </div>

            <div className='p-6'>
              <div className='flex items-center gap-3 mb-2'>
                <span className='inline-flex size-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive'>
                  <AlertTriangle className='size-4' />
                </span>
                <h2 className='text-xl font-semibold'>Liability</h2>
              </div>
              <p className='text-muted-foreground'>
                The service is provided “as is” without warranties of any kind. We are not liable
                for any damages arising from use of the service.
              </p>
            </div>

            <div className='p-6'>
              <div className='flex items-center gap-3 mb-2'>
                <span className='inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                  <Shield className='size-4' />
                </span>
                <h2 className='text-xl font-semibold'>General</h2>
              </div>
              <p className='text-muted-foreground'>
                This is placeholder content. Replace with your specific terms and any jurisdictional
                requirements. Keep language readable and precise.
              </p>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
