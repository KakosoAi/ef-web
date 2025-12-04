import { Card, CardContent } from '@/shared/ui/card';
import {
  FileText,
  MessageSquare,
  Store,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from 'lucide-react';
import { DashboardStats } from '@/server/actions/dashboard';

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Ads',
      value: stats.totalAds.toLocaleString(),
      subValue: `${stats.activeAds} active`,
      icon: FileText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      gradient: 'from-blue-500/5 to-transparent',
      trend: '+12%', // Mock trend for visual
      trendUp: true,
    },
    {
      title: 'Total Inquiries',
      value: stats.totalInquiries.toLocaleString(),
      subValue: 'All time',
      icon: MessageSquare,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      gradient: 'from-indigo-500/5 to-transparent',
      trend: '+5%',
      trendUp: true,
    },
    {
      title: 'Total Stores',
      value: stats.totalStores.toLocaleString(),
      subValue: 'Registered',
      icon: Store,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      gradient: 'from-orange-500/5 to-transparent',
      trend: '+2%',
      trendUp: true,
    },
    {
      title: 'Active Ads Ratio',
      value: `${stats.totalAds > 0 ? Math.round((stats.activeAds / stats.totalAds) * 100) : 0}%`,
      subValue: `${stats.activeAds} / ${stats.totalAds} live`,
      icon: Activity,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      gradient: 'from-emerald-500/5 to-transparent',
      trend: '-1%',
      trendUp: false,
    },
  ];

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
      {cards.map((card, index) => (
        <Card
          key={index}
          className={`relative overflow-hidden border ${card.borderColor} bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg group`}
        >
          {/* Gradient Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50 group-hover:opacity-100 transition-opacity`}
          />

          <CardContent className='p-6 relative z-10'>
            <div className='flex justify-between items-start mb-4'>
              <div className={`p-3 rounded-xl ${card.bgColor} ${card.color} shadow-inner`}>
                <card.icon className='h-6 w-6' />
              </div>
              {card.trend && (
                <div
                  className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${card.trendUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}
                >
                  {card.trendUp ? (
                    <ArrowUpRight className='h-3 w-3 mr-1' />
                  ) : (
                    <ArrowDownRight className='h-3 w-3 mr-1' />
                  )}
                  {card.trend}
                </div>
              )}
            </div>

            <div className='space-y-1'>
              <h3 className='text-sm font-medium text-muted-foreground tracking-wide'>
                {card.title}
              </h3>
              <div className='text-3xl font-bold tracking-tight text-foreground'>{card.value}</div>
              <p className='text-xs text-muted-foreground flex items-center gap-2'>
                <span className='opacity-80'>{card.subValue}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
