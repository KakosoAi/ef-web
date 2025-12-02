import { getAllStores } from '@/server/services/stores';
import Image from 'next/image';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { Edit, Trash2, Eye, MoreHorizontal, Store, ExternalLink } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

export const dynamic = 'force-dynamic';

export default async function AdminStoresPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 20;
  const { data: stores, count } = await getAllStores(page, limit);

  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600'>
            Stores Management
          </h1>
          <p className='text-muted-foreground text-sm font-medium'>
            Manage verified vendors and store listings{' '}
            <Badge variant='outline' className='ml-2'>
              {count} Total
            </Badge>
          </p>
        </div>
        <Button className='shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-purple-600 border-0'>
          Add New Store
        </Button>
      </div>

      <div className='rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden'>
        <Table>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              <TableHead className='w-[80px]'>Logo</TableHead>
              <TableHead>Store Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Visits</TableHead>
              <TableHead className='w-[50px]'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stores.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className='h-32 text-center'>
                  <div className='flex flex-col items-center justify-center text-muted-foreground'>
                    <p>No stores found</p>
                    <p className='text-xs'>Add a new store to get started</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              stores.map(store => (
                <TableRow key={store.id} className='hover:bg-muted/50 transition-colors'>
                  <TableCell>
                    <div className='relative h-12 w-12 overflow-hidden rounded-lg border bg-muted shadow-sm flex items-center justify-center'>
                      {store.logo ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/stores/${store.logo}`}
                          alt={store.name || 'Store Logo'}
                          fill
                          className='object-cover transition-transform hover:scale-110 duration-300'
                        />
                      ) : (
                        <Store className='text-muted-foreground' size={20} />
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    className='font-semibold max-w-[200px] truncate text-foreground'
                    title={store.name || ''}
                  >
                    <div className='flex flex-col'>
                      <span>{store.name || 'Unknown Store'}</span>
                      {store.website && (
                        <a
                          href={store.website}
                          target='_blank'
                          rel='noreferrer'
                          className='text-xs text-primary flex items-center gap-1 hover:underline'
                        >
                          Visit Site <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className='text-sm text-muted-foreground'>
                    {store.address || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col gap-1'>
                      {store.isactive ? (
                        <Badge
                          variant='default'
                          className='bg-green-500/15 text-green-600 hover:bg-green-500/25 border-green-500/20 w-fit'
                        >
                          Active
                        </Badge>
                      ) : (
                        <Badge variant='secondary' className='w-fit'>
                          Inactive
                        </Badge>
                      )}
                      {store.verified && (
                        <Badge
                          variant='outline'
                          className='border-blue-500/30 text-blue-600 bg-blue-500/5 w-fit text-[10px]'
                        >
                          Verified
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col text-xs'>
                      <span className='font-medium'>{store.subscriptionstatus || 'Free'}</span>
                      {store.subscriptionexpireat && (
                        <span className='text-muted-foreground'>
                          Exp: {new Date(store.subscriptionexpireat).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className='font-mono text-sm'>{store.visits || 0}</span>
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
