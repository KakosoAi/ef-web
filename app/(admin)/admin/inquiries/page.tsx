import { getInquiriesUncached } from '@/server/services/inquiries';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { Edit, Trash2, Eye, MoreHorizontal, Mail, Phone } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

export const dynamic = 'force-dynamic';

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiriesUncached();

  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600'>
            Inquiries
          </h1>
          <p className='text-muted-foreground text-sm font-medium'>
            View and manage customer inquiries{' '}
            <Badge variant='outline' className='ml-2'>
              {inquiries.length} Total
            </Badge>
          </p>
        </div>
      </div>

      <div className='rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden'>
        <Table>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              <TableHead>Title / Subject</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className='w-[50px]'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className='h-32 text-center'>
                  <div className='flex flex-col items-center justify-center text-muted-foreground'>
                    <p>No inquiries found</p>
                    <p className='text-xs'>Wait for new customer inquiries</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              inquiries.map(inquiry => (
                <TableRow key={inquiry.id} className='hover:bg-muted/50 transition-colors'>
                  <TableCell className='font-medium'>
                    <div className='flex flex-col max-w-[250px]'>
                      <span
                        className='truncate font-semibold text-foreground'
                        title={inquiry.title}
                      >
                        {inquiry.title || 'No Title'}
                      </span>
                      <span
                        className='text-xs text-muted-foreground truncate'
                        title={inquiry.description}
                      >
                        {inquiry.description}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col gap-1 text-sm'>
                      <span className='font-medium'>{inquiry.contactInfo.name}</span>
                      {inquiry.contactInfo.email && (
                        <div className='flex items-center gap-1 text-muted-foreground text-xs'>
                          <Mail size={12} /> {inquiry.contactInfo.email}
                        </div>
                      )}
                      {inquiry.contactInfo.phone && (
                        <div className='flex items-center gap-1 text-muted-foreground text-xs'>
                          <Phone size={12} /> {inquiry.contactInfo.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline'>{inquiry.category || 'General'}</Badge>
                  </TableCell>
                  <TableCell className='text-sm'>{inquiry.location || '-'}</TableCell>
                  <TableCell>
                    {inquiry.urgency && (
                      <Badge
                        variant={
                          inquiry.urgency === 'Urgent'
                            ? 'destructive'
                            : inquiry.urgency === 'High'
                              ? 'default'
                              : 'secondary'
                        }
                      >
                        {inquiry.urgency}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className='text-muted-foreground text-sm'>
                    {inquiry.postedDate ? new Date(inquiry.postedDate).toLocaleDateString() : '-'}
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
                          <Edit className='mr-2 h-4 w-4' /> Edit status
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
