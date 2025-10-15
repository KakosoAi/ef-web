'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';
import { LanguageProvider } from '@/shared/ui/toggle-language';
import { WebsiteModeProvider } from '@/shared/contexts/website-mode-context';

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <LanguageProvider>
        <WebsiteModeProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </WebsiteModeProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
