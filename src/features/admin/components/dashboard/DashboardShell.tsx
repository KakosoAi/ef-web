'use client';

import { useTransition } from 'react';
import { cn } from '@/shared/lib/utils';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  // Note: Since DashboardHeader is handling the transition state locally for the header,
  // if we want the WHOLE page to dim, we might need to share context.
  // However, a simpler way for now (since we are server rendering the page content based on params)
  // is to rely on Next.js's inherent loading states or pass the refresh trigger down.

  // Actually, the "refresh" button uses router.refresh() which triggers a server re-render.
  // We can detect this using useTransition if we wrapped the refresh call, but here the Header is separate.

  // For the user's specific request "refresh should start a very slighl dimmed animation",
  // the DashboardHeader's local state dims the header. To dim the BODY, we'd need to lift state.

  return <div className='relative min-h-screen'>{children}</div>;
}
