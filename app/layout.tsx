import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/shared/ui/sonner';
import { TooltipProvider } from '@/shared/ui/tooltip';
// Removed unused import - QueryClientProvider is used in providers.tsx
import { AppProviders } from './providers';

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
  title: 'Equipment Finders - Heavy Equipment Marketplace',
  description: 'Find and explore heavy machinery and equipment with Equipment Finders',
  icons: {
    icon: [{ url: '/favicon.ico?v=2', sizes: '32x32', type: 'image/x-icon' }],
    apple: [{ url: '/favicon.ico?v=2', sizes: '180x180', type: 'image/x-icon' }],
    shortcut: '/favicon.ico?v=2',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </AppProviders>
      </body>
    </html>
  );
}
