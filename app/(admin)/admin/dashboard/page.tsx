import { getDashboardStats, DateRange } from '@/server/actions/dashboard';
import { DashboardCharts } from '@/features/admin/components/dashboard/DashboardCharts';
import { RecentActivity } from '@/features/admin/components/dashboard/RecentActivity';
import { StatsCards } from '@/features/admin/components/dashboard/StatsCards';
import { DashboardHeader } from '@/features/admin/components/dashboard/DashboardHeader';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const range = (resolvedParams.range as DateRange) || '5y';
  const stats = await getDashboardStats(range);

  return (
    <div className='space-y-8 p-2'>
      {stats.error && (
        <div className='bg-destructive/15 text-destructive p-4 rounded-lg border border-destructive/20 shadow-sm animate-in fade-in slide-in-from-top-2'>
          <p className='font-medium'>Error loading dashboard stats:</p>
          <p className='text-sm'>{stats.error}</p>
        </div>
      )}

      {/* Interactive Header with Actions */}
      <DashboardHeader stats={stats} />

      {/* Enhanced Stats Cards */}
      <StatsCards stats={stats} />

      {/* Charts & Activity Grid */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-7 items-start'>
        <DashboardCharts data={stats.adsOverTime} />
        <RecentActivity items={stats.recentAds} />
      </div>
    </div>
  );
}
