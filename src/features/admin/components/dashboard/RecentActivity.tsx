import { FileText, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { formatDistanceToNow } from 'date-fns';

interface RecentActivityProps {
  items: any[]; // Using any for now as the type from server action is loose, but ideally should be typed
}

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <Card className='col-span-3 bg-card/40 backdrop-blur-md border-primary/10'>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {items.length === 0 ? (
            <p className='text-sm text-muted-foreground'>No recent activity.</p>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                className='flex items-center pb-4 last:pb-0 border-b border-border/50 last:border-0'
              >
                <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 ring-2 ring-background'>
                  <FileText className='h-5 w-5 text-primary' />
                </div>
                <div className='space-y-1'>
                  <p className='text-sm font-medium leading-none text-foreground/90'>
                    New Ad Posted
                  </p>
                  <p className='text-sm text-muted-foreground line-clamp-1'>
                    {item.title} ({item.category_name})
                  </p>
                </div>
                <div className='ml-auto font-medium text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full whitespace-nowrap'>
                  {item.createdat || item.created_at
                    ? formatDistanceToNow(new Date(item.createdat || item.created_at), {
                        addSuffix: true,
                      })
                    : 'Just now'}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
