import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/shared/ui/sonner';
import { TooltipProvider } from '@/shared/ui/tooltip';
// Removed unused import - QueryClientProvider is used in providers.tsx
import { ReactQueryProvider } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Machinery Vision - Heavy Equipment Marketplace',
  description: 'Find and explore heavy machinery and equipment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        <ReactQueryProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
