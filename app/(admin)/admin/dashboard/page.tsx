import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Users, FileText, MessageSquare, Activity, TrendingUp } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-4xl font-bold tracking-tight text-foreground/90'>Dashboard Overview</h1>
        <p className='text-lg text-muted-foreground/80'>
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
            <div className='text-2xl font-bold'>1,234</div>
            <p className='text-xs text-muted-foreground mt-1 flex items-center gap-1'>
              <TrendingUp className='h-3 w-3 text-green-500' />
              <span className='text-green-500 font-medium'>+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className='bg-card/40 backdrop-blur-md border-primary/10 hover:bg-card/60 transition-colors'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Inquiries</CardTitle>
            <div className='p-2 bg-blue-500/10 rounded-full'>
              <MessageSquare className='h-4 w-4 text-blue-500' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>42</div>
            <p className='text-xs text-muted-foreground mt-1 flex items-center gap-1'>
              <TrendingUp className='h-3 w-3 text-green-500' />
              <span className='text-green-500 font-medium'>+12</span> since yesterday
            </p>
          </CardContent>
        </Card>

        <Card className='bg-card/40 backdrop-blur-md border-primary/10 hover:bg-card/60 transition-colors'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
            <div className='p-2 bg-orange-500/10 rounded-full'>
              <Users className='h-4 w-4 text-orange-500' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>573</div>
            <p className='text-xs text-muted-foreground mt-1 flex items-center gap-1'>
              <TrendingUp className='h-3 w-3 text-green-500' />
              <span className='text-green-500 font-medium'>+4</span> new today
            </p>
          </CardContent>
        </Card>

        <Card className='bg-card/40 backdrop-blur-md border-primary/10 hover:bg-card/60 transition-colors'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Sessions</CardTitle>
            <div className='p-2 bg-purple-500/10 rounded-full'>
              <Activity className='h-4 w-4 text-purple-500' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>128</div>
            <p className='text-xs text-muted-foreground mt-1 flex items-center gap-1'>
              <TrendingUp className='h-3 w-3 text-green-500' />
              <span className='text-green-500 font-medium'>+10%</span> from last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4 bg-card/40 backdrop-blur-md border-primary/10'>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-6'>
              {/* Mock Activity List */}
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className='flex items-center pb-4 last:pb-0 border-b border-border/50 last:border-0'
                >
                  <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 ring-2 ring-background'>
                    <FileText className='h-5 w-5 text-primary' />
                  </div>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium leading-none text-foreground/90'>
                      New Ad Posted
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      Caterpillar 320D Excavator was added by User #{100 + i}
                    </p>
                  </div>
                  <div className='ml-auto font-medium text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full'>
                    Just now
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className='col-span-3 bg-card/40 backdrop-blur-md border-primary/10'>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='p-4 bg-background/50 hover:bg-background/80 rounded-lg flex items-center justify-between cursor-pointer border border-border/50 transition-all hover:shadow-md group'>
              <div className='flex items-center gap-3'>
                <div className='h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform'>
                  <FileText className='h-4 w-4 text-blue-500' />
                </div>
                <span className='text-sm font-medium'>Review Pending Ads</span>
              </div>
              <span className='bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs px-2.5 py-1 rounded-full font-medium'>
                5
              </span>
            </div>

            <div className='p-4 bg-background/50 hover:bg-background/80 rounded-lg flex items-center justify-between cursor-pointer border border-border/50 transition-all hover:shadow-md group'>
              <div className='flex items-center gap-3'>
                <div className='h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform'>
                  <MessageSquare className='h-4 w-4 text-red-500' />
                </div>
                <span className='text-sm font-medium'>Unread Inquiries</span>
              </div>
              <span className='bg-red-500/20 text-red-600 dark:text-red-400 text-xs px-2.5 py-1 rounded-full font-medium'>
                2
              </span>
            </div>

            <div className='p-4 bg-background/50 hover:bg-background/80 rounded-lg flex items-center justify-between cursor-pointer border border-border/50 transition-all hover:shadow-md group'>
              <div className='flex items-center gap-3'>
                <div className='h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform'>
                  <Users className='h-4 w-4 text-orange-500' />
                </div>
                <span className='text-sm font-medium'>New User Approvals</span>
              </div>
              <span className='bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs px-2.5 py-1 rounded-full font-medium'>
                1
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
