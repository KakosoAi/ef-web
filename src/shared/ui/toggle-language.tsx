'use client';

import React from 'react';
import { Languages, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';

const LANGUAGE_OPTIONS = [
  {
    icon: Globe,
    value: 'en',
    label: 'EN',
    name: 'English',
  },
  {
    icon: Languages,
    value: 'ar',
    label: 'ع',
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
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguageState(savedLanguage);

    // Set lang attribute only (no direction change)
    document.documentElement.lang = savedLanguage;
  }, []);

  const setLanguage = React.useCallback((newLanguage: string) => {
    setLanguageState(newLanguage);
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
      <div className='bg-muted/80 inline-flex items-center overflow-hidden rounded-md border h-7 w-14'>
        <div className='flex size-7 items-center justify-center text-xs font-medium text-muted-foreground'>
          EN
        </div>
        <div className='flex size-7 items-center justify-center text-xs font-medium text-muted-foreground'>
          ع
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
      className='bg-muted/80 inline-flex items-center overflow-hidden rounded-md border'
      role='radiogroup'
    >
      {LANGUAGE_OPTIONS.map(option => (
        <button
          key={option.value}
          className={cn(
            'relative flex size-7 cursor-pointer items-center justify-center rounded-md transition-all text-xs font-medium',
            language === option.value
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
          role='radio'
          aria-checked={language === option.value}
          aria-label={`Switch to ${option.name}`}
          onClick={() => setLanguage(option.value)}
        >
          {language === option.value && (
            <motion.div
              layoutId='language-option'
              transition={{ type: 'spring', bounce: 0.1, duration: 0.75 }}
              className='border-muted-foreground/50 absolute inset-0 rounded-md border'
            />
          )}
          <span className='relative z-10'>{option.label}</span>
        </button>
      ))}
    </motion.div>
  );
}
