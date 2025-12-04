'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Loader2 } from 'lucide-react';
import { getAdsGrowthStats, DateRange } from '@/server/actions/dashboard';

interface DashboardChartsProps {
  data: { date: string; count: number }[];
}

export function DashboardCharts({ data: initialData }: DashboardChartsProps) {
  const [data, setData] = useState(initialData);
  const [range, setRange] = useState<DateRange>('1y');
  const [loading, setLoading] = useState(false);

  const handleRangeChange = async (newRange: DateRange) => {
    if (newRange === range) return;

    setRange(newRange);
    setLoading(true);
    try {
      const newData = await getAdsGrowthStats(newRange);
      setData(newData);
    } catch (error) {
      console.error('Failed to fetch chart data', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className='col-span-4 bg-card/40 backdrop-blur-md border-primary/10'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle>Ads Growth</CardTitle>
        <div className='flex items-center gap-1 bg-muted/30 p-1 rounded-lg'>
          {(['6m', '1y', '2y', '5y'] as const).map(r => (
            <Button
              key={r}
              variant={range === r ? 'secondary' : 'ghost'}
              size='sm'
              className={`h-7 px-3 text-xs ${range === r ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => handleRangeChange(r)}
              disabled={loading}
            >
              {r.toUpperCase()}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className='pl-2'>
        <div className='h-[300px] w-full relative'>
          {loading && (
            <div className='absolute inset-0 z-10 flex items-center justify-center bg-background/20 backdrop-blur-[1px]'>
              <Loader2 className='h-8 w-8 animate-spin text-primary' />
            </div>
          )}
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={data}>
              <defs>
                <linearGradient id='colorCount' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey='date'
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={value => {
                  if (!value) return '';
                  const date = new Date(value);
                  // Show Month Year for longer ranges, Month Day for shorter
                  if (range === '30d') {
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }
                  return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                }}
                minTickGap={30}
              />
              <YAxis
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={value => `${value}`}
              />
              <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#333' opacity={0.2} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                labelFormatter={value => {
                  const date = new Date(value);
                  if (range === '30d') {
                    return date.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }
                  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                }}
              />
              <Area
                type='monotone'
                dataKey='count'
                stroke='#8884d8'
                fillOpacity={1}
                fill='url(#colorCount)'
                animationDuration={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
