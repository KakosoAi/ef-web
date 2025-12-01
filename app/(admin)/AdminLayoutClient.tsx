'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/features/admin/components/AdminSidebar';
import { UserRole } from '@/shared/types/roles';
import { NeonOrbs } from '@/shared/ui/neon-orbs';

export default function AdminLayoutClient({
  children,
  userRole,
}: {
  children: React.ReactNode;
  userRole: UserRole;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sidebar width calculation:
  // Expanded: IconNav (64px) + DetailSidebar (320px) + Padding (24px) = 408px -> ~420px safe area
  // Collapsed: IconNav (64px) + DetailSidebar (64px) + Padding (24px) = 152px -> ~160px safe area
  const paddingLeftClass = isCollapsed ? 'lg:pl-[160px]' : 'lg:pl-[420px]';
  const softSpringEasing = 'cubic-bezier(0.25, 1.1, 0.4, 1)';

  return (
    <div className='flex min-h-screen w-full bg-muted/10 relative overflow-hidden'>
      {/* Background Effects */}
      <NeonOrbs />

      {/* Sidebar - Fixed on desktop */}
      <aside className='hidden w-auto lg:flex fixed inset-y-0 left-0 z-20 p-3'>
        <AdminSidebar
          userRole={userRole}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </aside>

      {/* Main Content Area */}
      <main
        className={`flex-1 ${paddingLeftClass} min-h-screen flex flex-col transition-all duration-500`}
        style={{ transitionTimingFunction: softSpringEasing }}
      >
        {/* Mobile Header could go here */}
        <div className='flex-1 p-6 md:p-8'>
          {/* Unified Page Wrapper with Glassmorphism */}
          <div className='relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm p-6'>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
