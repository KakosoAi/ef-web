'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Calendar, Download, RefreshCcw } from 'lucide-react';
import { DashboardStats } from '@/server/actions/dashboard';

interface DashboardHeaderProps {
  stats: DashboardStats;
}

export function DashboardHeader({ stats }: DashboardHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isExporting, setIsExporting] = useState(false);

  // Determine current range from URL or default
  const currentRange = searchParams.get('range') || '5y';

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleRangeChange = (range: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (range === 'default') {
        params.delete('range');
      } else {
        params.set('range', range);
      }
      router.replace(`?${params.toString()}`);
    });
  };

  const handleExport = () => {
    setIsExporting(true);
    try {
      // Create CSV content
      const headers = ['Metric', 'Value'];
      const rows = [
        ['Total Ads', stats.totalAds],
        ['Active Ads', stats.activeAds],
        ['Total Stores', stats.totalStores],
        ['Total Inquiries', stats.totalInquiries],
        ['Generated At', new Date().toLocaleString()],
      ];

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(',')),
        '',
        'Recent Activity',
        'Title,Category,Price,Date',
        ...stats.recentAds.map(ad => {
          const dateStr = ad.createdat || ad.created_at || new Date().toISOString();
          return `"${ad.title}","${ad.category_name}",${ad.price},"${new Date(dateStr).toLocaleDateString()}"`;
        }),
      ].join('\n');

      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `dashboard_report_${new Date().toISOString().split('T')[0]}.csv`
      );
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Export failed', error);
    } finally {
      setIsExporting(false);
    }
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-border/40 pb-6 relative'>
      {/* Dimming Overlay for Refresh */}
      {isPending && (
        <div className='absolute inset-0 bg-background/50 backdrop-blur-[1px] z-50 flex items-center justify-center rounded-lg animate-in fade-in duration-200'>
          <RefreshCcw className='h-6 w-6 text-primary animate-spin' />
        </div>
      )}

      <div className='space-y-1'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Analytics Overview</h1>
        <p className='text-base text-muted-foreground font-medium flex items-center gap-2'>
          <span
            className={`w-2 h-2 rounded-full ${isPending ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}
          />
          System Status: {isPending ? 'Refreshing...' : 'Operational'} &bull; {today}
        </p>
      </div>

      <div className='flex items-center gap-2'>
        <Button
          variant={currentRange === '30d' ? 'secondary' : 'outline'}
          size='sm'
          className='h-9 gap-2 hidden sm:flex'
          onClick={() => handleRangeChange(currentRange === '30d' ? 'default' : '30d')}
          disabled={isPending}
        >
          <Calendar className='h-4 w-4 text-muted-foreground' />
          <span>{currentRange === '30d' ? 'Clear Filter' : 'Last 30 Days'}</span>
        </Button>

        <Button
          variant='outline'
          size='sm'
          className='h-9 gap-2'
          onClick={handleExport}
          disabled={isExporting || isPending}
        >
          <Download className={`h-4 w-4 ${isExporting ? 'animate-bounce' : ''}`} />
          <span className='hidden sm:inline'>{isExporting ? 'Exporting...' : 'Export Report'}</span>
        </Button>

        <Button
          size='sm'
          className='h-9 gap-2 bg-primary hover:bg-primary/90'
          onClick={handleRefresh}
          disabled={isPending}
        >
          <RefreshCcw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
          <span className='hidden sm:inline'>Refresh Data</span>
        </Button>
      </div>
    </div>
  );
}
