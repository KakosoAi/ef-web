'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { DateRange } from '@/server/actions/dashboard';
import { useRouter, useSearchParams } from 'next/navigation';

interface DashboardChartsProps {
  data: { date: string; count: number }[];
}

export function DashboardCharts({ data }: DashboardChartsProps) {
  const searchParams = useSearchParams();
  const range = (searchParams.get('range') as DateRange) || '5y';

  // Determine which ranges to show.
  // If current range is '30d' (from Header), we might want to show it or just let the buttons be inactive.
  // We'll stick to the standard ranges in the chart controls.

  return (
    <Card className='col-span-4 bg-card/40 backdrop-blur-md border-primary/10 shadow-sm hover:shadow-md transition-shadow duration-300'>
      <CardHeader className='flex flex-row items-center justify-between pb-2 border-b border-border/40 mb-4'>
        <div className='space-y-1'>
          <CardTitle className='text-lg font-medium'>Ads Growth</CardTitle>
          <p className='text-xs text-muted-foreground'>Cumulative growth over time</p>
        </div>
        <div className='flex items-center gap-1 bg-muted/30 p-1 rounded-lg border border-border/40'>
          {(['6m', '1y', '2y', '5y'] as const).map(r => (
            <RangeButton key={r} range={r} currentRange={range} />
          ))}
        </div>
      </CardHeader>
      <CardContent className='pl-0 pr-4 pb-4'>
        <div className='h-[350px] w-full relative'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id='colorCount' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='hsl(var(--primary))' stopOpacity={0.3} />
                  <stop offset='95%' stopColor='hsl(var(--primary))' stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey='date'
                stroke='#888888'
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={value => {
                  if (!value) return '';
                  const date = new Date(value);
                  if (range === '30d') {
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }
                  return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                }}
                minTickGap={40}
                dy={10}
              />
              <YAxis
                stroke='#888888'
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={value => {
                  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
                  return `${value}`;
                }}
                dx={-10}
              />
              <CartesianGrid
                strokeDasharray='3 3'
                vertical={false}
                stroke='hsl(var(--border))'
                opacity={0.4}
              />
              <Tooltip
                content={<CustomTooltip range={range} />}
                cursor={{
                  stroke: 'hsl(var(--muted-foreground))',
                  strokeWidth: 1,
                  strokeDasharray: '4 4',
                }}
              />
              <Area
                type='monotone'
                dataKey='count'
                stroke='hsl(var(--primary))'
                strokeWidth={2}
                fillOpacity={1}
                fill='url(#colorCount)'
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function RangeButton({ range, currentRange }: { range: DateRange; currentRange: DateRange }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    if (range === currentRange) return;
    const params = new URLSearchParams(searchParams);
    params.set('range', range);
    router.push(`?${params.toString()}`);
  };

  return (
    <Button
      variant={currentRange === range ? 'secondary' : 'ghost'}
      size='sm'
      className={`h-7 px-3 text-xs font-medium transition-all ${
        currentRange === range
          ? 'bg-background shadow-sm text-primary'
          : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
      }`}
      onClick={handleClick}
    >
      {range.toUpperCase()}
    </Button>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  label?: string | number;
  range?: DateRange;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length && label) {
    return (
      <div className='bg-background/95 backdrop-blur-sm border border-border/50 p-3 rounded-lg shadow-xl'>
        <p className='text-xs text-muted-foreground mb-1'>
          {new Date(label).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <p className='text-sm font-bold text-primary'>{payload[0].value} Ads</p>
      </div>
    );
  }
  return null;
}
