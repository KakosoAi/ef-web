'use client';

import { useWebsiteMode } from '@/shared/contexts/website-mode-context';
import { ChatWidget } from './chat-widget';

export function ChatWidgetWrapper() {
  const { websiteMode } = useWebsiteMode();

  return <ChatWidget websiteMode={websiteMode} />;
}
