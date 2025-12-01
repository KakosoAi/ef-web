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

export default async function AdminAdsPage() {
  const { data: ads, count } = await getAllAds(1, 100); // Fetch first 100 for now

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Ads Management</h1>
          <p className='text-muted-foreground'>
            Manage all equipment listings and advertisements ({count} total)
          </p>
        </div>
        <Button>Create New Ad</Button>
      </div>

      <div className='rounded-md border bg-card'>
        <Table>
          <TableHeader>
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
                <TableCell colSpan={8} className='h-24 text-center'>
                  No ads found.
                </TableCell>
              </TableRow>
            ) : (
              ads.map(ad => (
                <TableRow key={ad.id}>
                  <TableCell>
                    <div className='relative h-10 w-10 overflow-hidden rounded-md bg-muted'>
                      {ad.file_name ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ads/${ad.file_name}`}
                          alt={ad.title}
                          fill
                          className='object-cover'
                        />
                      ) : (
                        <div className='flex h-full w-full items-center justify-center text-xs text-muted-foreground'>
                          No Img
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className='font-medium max-w-[200px] truncate' title={ad.title}>
                    {ad.title}
                  </TableCell>
                  <TableCell>
                    {ad.price
                      ? new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
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
                          <Edit className='mr-2 h-4 w-4' /> Edit ad
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
    </div>
  );
}
