import { FileText, ArrowUpRight, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: string | number;
  title: string;
  createdat?: string;
  created_at?: string;
  category_name?: string;
  price: number;
  [key: string]: unknown;
}

interface RecentActivityProps {
  items: ActivityItem[];
}

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <Card className='col-span-3 bg-card/40 backdrop-blur-md border-primary/10 h-full flex flex-col'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-lg font-medium'>Recent Activity</CardTitle>
        <Badge variant='outline' className='bg-primary/5 text-primary border-primary/20'>
          Live Feed
        </Badge>
      </CardHeader>
      <CardContent className='flex-1'>
        <div className='space-y-6'>
          {items.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-full py-8 text-muted-foreground'>
              <FileText className='h-8 w-8 mb-2 opacity-20' />
              <p className='text-sm'>No recent activity.</p>
            </div>
          ) : (
            items.map((item, i) => {
              const dateStr = item.createdat || item.created_at;
              return (
                <div
                  key={item.id || i}
                  className='group flex items-start pb-4 last:pb-0 border-b border-border/40 last:border-0 transition-all duration-200 hover:bg-muted/30 p-2 rounded-lg -mx-2'
                >
                  <div className='h-9 w-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mr-3 ring-1 ring-primary/10 mt-0.5 group-hover:ring-primary/30 transition-all'>
                    <FileText className='h-4 w-4 text-primary' />
                  </div>
                  <div className='space-y-1 flex-1 min-w-0'>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm font-medium leading-none text-foreground/90 truncate pr-2'>
                        {item.title}
                      </p>
                      <span className='text-[10px] text-muted-foreground whitespace-nowrap'>
                        {dateStr
                          ? formatDistanceToNow(new Date(dateStr), {
                              addSuffix: true,
                            })
                          : 'Just now'}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                      <span className='bg-secondary/50 px-1.5 py-0.5 rounded text-[10px] font-medium text-secondary-foreground'>
                        {item.category_name || 'Uncategorized'}
                      </span>
                      {item.price > 0 && (
                        <span className='flex items-center text-green-600/80 font-medium'>
                          <DollarSign className='h-3 w-3 mr-0.5' />
                          {item.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='ml-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <ArrowUpRight className='h-4 w-4 text-muted-foreground/50' />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
