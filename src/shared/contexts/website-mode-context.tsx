'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type WebsiteMode = 'general' | 'agricultural';

interface WebsiteModeContextType {
  websiteMode: WebsiteMode;
  setWebsiteMode: (mode: WebsiteMode) => void;
}

const WebsiteModeContext = createContext<WebsiteModeContextType | undefined>(undefined);

export function WebsiteModeProvider({ children }: { children: ReactNode }) {
  const [websiteMode, setWebsiteMode] = useState<WebsiteMode>('general');

  return (
    <WebsiteModeContext.Provider value={{ websiteMode, setWebsiteMode }}>
      {children}
    </WebsiteModeContext.Provider>
  );
}

export function useWebsiteMode() {
  const context = useContext(WebsiteModeContext);
  if (context === undefined) {
    throw new Error('useWebsiteMode must be used within a WebsiteModeProvider');
  }
  return context;
}
