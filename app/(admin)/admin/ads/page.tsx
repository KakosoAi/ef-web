import { getAllAds } from '@/server/services/ads';
import Image from 'next/image';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

export const dynamic = 'force-dynamic';

export default async function AdminAdsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 20;
  const { data: ads, count } = await getAllAds(page, limit);

  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600'>
            Ads Management
          </h1>
          <p className='text-muted-foreground text-sm font-medium'>
            Manage all equipment listings and advertisements{' '}
            <Badge variant='outline' className='ml-2'>
              {count} Total
            </Badge>
          </p>
        </div>
        <Button className='shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-purple-600 border-0'>
          Create New Ad
        </Button>
      </div>

      <div className='rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden'>
        <Table>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              <TableHead className='w-[80px]'>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category / Brand</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className='w-[50px]'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className='h-32 text-center'>
                  <div className='flex flex-col items-center justify-center text-muted-foreground'>
                    <p>No ads found</p>
                    <p className='text-xs'>Create a new ad to get started</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              ads.map(ad => (
                <TableRow key={ad.id} className='hover:bg-muted/50 transition-colors'>
                  <TableCell>
                    <div className='relative h-12 w-12 overflow-hidden rounded-lg border bg-muted shadow-sm'>
                      {ad.file_name ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ads/${ad.file_name}`}
                          alt={ad.title}
                          fill
                          className='object-cover transition-transform hover:scale-110 duration-300'
                        />
                      ) : (
                        <div className='flex h-full w-full items-center justify-center text-[10px] text-muted-foreground font-medium'>
                          No Img
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    className='font-semibold max-w-[200px] truncate text-foreground'
                    title={ad.title}
                  >
                    {ad.title}
                  </TableCell>
                  <TableCell className='font-mono text-sm font-medium text-primary'>
                    {ad.price
                      ? new Intl.NumberFormat('en-AE', {
                          style: 'currency',
                          currency: 'AED',
                        }).format(ad.price)
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col'>
                      <span className='text-sm font-medium'>{ad.category_name || '-'}</span>
                      <span className='text-xs text-muted-foreground'>{ad.brand_name || '-'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {ad.store_name || (
                      <span className='text-muted-foreground italic'>Individual</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-1'>
                      {ad.is_published || ad.published ? (
                        <Badge
                          variant='default'
                          className='bg-green-500/15 text-green-600 hover:bg-green-500/25 border-green-500/20'
                        >
                          Published
                        </Badge>
                      ) : (
                        <Badge variant='secondary'>Draft</Badge>
                      )}
                      {(ad.is_featured || ad.isfeatured) && (
                        <Badge
                          variant='outline'
                          className='border-yellow-500 text-yellow-600 bg-yellow-500/10'
                        >
                          Featured
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className='text-muted-foreground text-sm'>
                    {new Date(ad.created_at || ad.createdat || Date.now()).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                          <span className='sr-only'>Open menu</span>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className='mr-2 h-4 w-4' /> View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className='mr-2 h-4 w-4' /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='text-red-600'>
                          <Trash2 className='mr-2 h-4 w-4' /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Simple Pagination */}
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          Showing {(page - 1) * limit + 1} to {Math.min(page * limit, count)} of {count} entries
        </div>
        <div className='space-x-2'>
          <Button variant='outline' size='sm' disabled={page <= 1} asChild={page > 1}>
            {page > 1 ? <a href={`?page=${page - 1}`}>Previous</a> : <span>Previous</span>}
          </Button>
          <Button
            variant='outline'
            size='sm'
            disabled={page * limit >= count}
            asChild={page * limit < count}
          >
            {page * limit < count ? <a href={`?page=${page + 1}`}>Next</a> : <span>Next</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}
