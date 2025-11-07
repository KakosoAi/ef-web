import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';

export const dynamic = 'force-static';

export default function PrivacyPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main className='container mx-auto px-4 py-10'>
        <div className='max-w-3xl mx-auto bg-card border border-border rounded-xl shadow-sm p-6'>
          <h1 className='text-3xl font-semibold mb-4'>Privacy Policy</h1>
          <p className='text-muted-foreground mb-6'>
            Your privacy matters to us. This policy explains how we collect, use, and protect your
            personal information.
          </p>

          <h2 className='text-xl font-semibold mb-2'>1. Information We Collect</h2>
          <p className='text-muted-foreground mb-4'>
            We may collect information you provide directly and data collected automatically when
            you use our services.
          </p>

          <h2 className='text-xl font-semibold mb-2'>2. How We Use Information</h2>
          <p className='text-muted-foreground mb-4'>
            We use your information to provide and improve our services, communicate with you, and
            ensure security and compliance.
          </p>

          <h2 className='text-xl font-semibold mb-2'>3. Your Rights</h2>
          <p className='text-muted-foreground mb-4'>
            You may have rights to access, correct, or delete your data. Contact us for requests.
          </p>

          <p className='text-muted-foreground'>
            This is placeholder content. Replace with your specific privacy details.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
