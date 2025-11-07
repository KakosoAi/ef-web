import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import { Badge } from '@/shared/ui/badge';
import { Shield, Lock, EyeOff, Database, Calendar } from 'lucide-react';

export const dynamic = 'force-static';

export default function PrivacyPage() {
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
                <h1 className='text-4xl font-semibold tracking-tight'>Privacy Policy</h1>
                <p className='mt-3 text-muted-foreground max-w-2xl'>
                  We respect your privacy. This policy explains what we collect, how we use it, and
                  the choices you have.
                </p>
              </div>
              <div className='hidden md:block opacity-70'>
                <span className='inline-flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary shadow-inner'>
                  <Lock className='size-10' />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className='mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6'>
          <article className='rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex items-center gap-3 mb-2'>
              <span className='inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                <Database className='size-4' />
              </span>
              <h2 className='text-xl font-semibold'>Information We Collect</h2>
            </div>
            <p className='text-muted-foreground'>
              We collect information you provide directly (like account details) and data generated
              when you use our services.
            </p>
          </article>

          <article className='rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex items-center gap-3 mb-2'>
              <span className='inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                <Shield className='size-4' />
              </span>
              <h2 className='text-xl font-semibold'>How We Use Information</h2>
            </div>
            <p className='text-muted-foreground'>
              We use data to provide and improve services, communicate with you, and maintain
              security and compliance.
            </p>
          </article>

          <article className='rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow md:col-span-2'>
            <div className='flex items-center gap-3 mb-2'>
              <span className='inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                <EyeOff className='size-4' />
              </span>
              <h2 className='text-xl font-semibold'>Your Rights</h2>
            </div>
            <p className='text-muted-foreground'>
              You may request access, correction, or deletion of your data as applicable. Contact us
              for assistance.
            </p>
          </article>

          <article className='rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow md:col-span-2'>
            <div className='flex items-center gap-3 mb-2'>
              <span className='inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                <Lock className='size-4' />
              </span>
              <h2 className='text-xl font-semibold'>General</h2>
            </div>
            <p className='text-muted-foreground'>
              This is placeholder content. Replace with specific privacy details, retention
              policies, and contact information.
            </p>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
