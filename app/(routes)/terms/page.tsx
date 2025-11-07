import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';

export const dynamic = 'force-static';

export default function TermsPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main className='container mx-auto px-4 py-10'>
        <div className='max-w-3xl mx-auto bg-card border border-border rounded-xl shadow-sm p-6'>
          <h1 className='text-3xl font-semibold mb-4'>Terms of Service</h1>
          <p className='text-muted-foreground mb-6'>
            These Terms of Service govern your use of our website and services. By accessing or
            using the site, you agree to be bound by these terms.
          </p>

          <h2 className='text-xl font-semibold mb-2'>1. Use of Service</h2>
          <p className='text-muted-foreground mb-4'>
            You agree to use the service in compliance with applicable laws and regulations. You are
            responsible for any content you post or submit.
          </p>

          <h2 className='text-xl font-semibold mb-2'>2. Accounts</h2>
          <p className='text-muted-foreground mb-4'>
            When you create an account, you are responsible for maintaining the security of your
            credentials and for all activities under your account.
          </p>

          <h2 className='text-xl font-semibold mb-2'>3. Liability</h2>
          <p className='text-muted-foreground mb-4'>
            We provide the service “as is” without warranties of any kind. We are not liable for any
            damages arising from your use of the service.
          </p>

          <p className='text-muted-foreground'>
            This is placeholder content. Replace with your specific terms.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
