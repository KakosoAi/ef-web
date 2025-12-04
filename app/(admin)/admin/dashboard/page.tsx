import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Users, FileText, MessageSquare, Store, TrendingUp } from 'lucide-react';
import { getDashboardStats } from '@/server/actions/dashboard';
import { DashboardCharts } from '@/features/admin/components/dashboard/DashboardCharts';
import { RecentActivity } from '@/features/admin/components/dashboard/RecentActivity';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className='space-y-8'>
      {stats.error && (
        <div className='bg-destructive/15 text-destructive p-4 rounded-md border border-destructive/20'>
          <p className='font-medium'>Error loading dashboard stats:</p>
          <p className='text-sm'>{stats.error}</p>
        </div>
      )}

      <div className='flex flex-col gap-2'>
        <h1 className='text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600'>
          Dashboard Overview
        </h1>
        <p className='text-lg text-muted-foreground/80 font-medium'>
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='bg-card/40 backdrop-blur-md border-primary/10 hover:bg-card/60 transition-colors'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Ads</CardTitle>
            <div className='p-2 bg-primary/10 rounded-full'>
              <FileText className='h-4 w-4 text-primary' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalAds.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground mt-1 flex items-center gap-1'>
              <span className='text-primary font-medium'>{stats.activeAds}</span> active
            </p>
          </CardContent>
        </Card>

        <Card className='bg-card/40 backdrop-blur-md border-primary/10 hover:bg-card/60 transition-colors'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Inquiries</CardTitle>
            <div className='p-2 bg-blue-500/10 rounded-full'>
              <MessageSquare className='h-4 w-4 text-blue-500' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalInquiries.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground mt-1 flex items-center gap-1'>
              <TrendingUp className='h-3 w-3 text-green-500' />
              <span className='text-green-500 font-medium'>All time</span>
            </p>
          </CardContent>
        </Card>

        <Card className='bg-card/40 backdrop-blur-md border-primary/10 hover:bg-card/60 transition-colors'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Stores</CardTitle>
            <div className='p-2 bg-orange-500/10 rounded-full'>
              <Store className='h-4 w-4 text-orange-500' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalStores.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground mt-1 flex items-center gap-1'>
              <TrendingUp className='h-3 w-3 text-green-500' />
              <span className='text-green-500 font-medium'>Registered</span>
            </p>
          </CardContent>
        </Card>

        <Card className='bg-card/40 backdrop-blur-md border-primary/10 hover:bg-card/60 transition-colors'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Ads Ratio</CardTitle>
            <div className='p-2 bg-purple-500/10 rounded-full'>
              <Users className='h-4 w-4 text-purple-500' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {stats.totalAds > 0 ? Math.round((stats.activeAds / stats.totalAds) * 100) : 0}%
            </div>
            <p className='text-xs text-muted-foreground mt-1 flex items-center gap-1'>
              <span className='text-green-500 font-medium'>
                {stats.activeAds} / {stats.totalAds}
              </span>{' '}
              ads are live
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-7'>
        <DashboardCharts data={stats.adsOverTime} />
        <RecentActivity items={stats.recentAds} />
      </div>
    </div>
  );
}
