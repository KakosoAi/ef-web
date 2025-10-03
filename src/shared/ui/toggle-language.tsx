'use client';

import React from 'react';
import { Languages, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';

const LANGUAGE_OPTIONS = [
  {
    icon: Globe,
    value: 'en',
    label: 'English',
    name: 'English',
  },
  {
    icon: Languages,
    value: 'ar',
    label: 'Arabic',
    name: 'العربية',
  },
];

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState('en');
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    if (typeof window === 'undefined') return;

    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguageState(savedLanguage);

    // Set lang attribute only (no direction change)
    document.documentElement.lang = savedLanguage;
  }, []);

  const setLanguage = React.useCallback((newLanguage: string) => {
    setLanguageState(newLanguage);
    if (typeof window === 'undefined') return;

    localStorage.setItem('language', newLanguage);

    // Update lang attribute only (no direction change)
    document.documentElement.lang = newLanguage;
  }, []);

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);

  // Fallback for when provider is not available (e.g., during SSR)
  if (context === undefined) {
    return {
      language: 'en',
      setLanguage: () => {},
      dir: 'ltr' as const,
    };
  }
  return context;
}

export function ToggleLanguage() {
  const { language, setLanguage } = useLanguage();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className='bg-muted/80 inline-flex items-center overflow-hidden rounded-md border h-7 px-2'>
        <div className='flex items-center justify-center text-[10px] font-medium text-muted-foreground'>
          English | Arabic
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key={String(isMounted)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className='bg-muted/80 inline-flex items-center overflow-hidden rounded-md border h-7 px-2 cursor-pointer hover:bg-muted/60 transition-colors'
      role='button'
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      aria-label={`Current language: ${language === 'en' ? 'English' : 'Arabic'}. Click to switch.`}
    >
      <span className='text-[10px] font-medium text-foreground'>
        <span className={cn(language === 'en' ? 'text-orange-500' : 'text-muted-foreground')}>
          English
        </span>
        <span className='text-muted-foreground mx-1'>|</span>
        <span className={cn(language === 'ar' ? 'text-orange-500' : 'text-muted-foreground')}>
          Arabic
        </span>
      </span>
    </motion.div>
  );
}
