import { getAllBlogs } from '@/server/services/blogs';
import Image from 'next/image';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { Edit, Trash2, Eye, MoreHorizontal, FileText } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

export const dynamic = 'force-dynamic';

export default async function AdminBlogsPage() {
  const { data: blogs, count } = await getAllBlogs(1, 100);

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Blogs & News</h1>
          <p className='text-muted-foreground'>
            Manage blog posts and news articles ({count} total)
          </p>
        </div>
        <Button>Create Post</Button>
      </div>

      <div className='rounded-md border bg-card'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[80px]'>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Published At</TableHead>
              <TableHead className='w-[50px]'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='h-24 text-center'>
                  No blog posts found.
                </TableCell>
              </TableRow>
            ) : (
              blogs.map(blog => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <div className='relative h-10 w-10 overflow-hidden rounded-md bg-muted flex items-center justify-center'>
                      {blog.image_url || blog.imageurl ? (
                        <Image
                          src={blog.image_url || blog.imageurl || ''}
                          alt={blog.title}
                          fill
                          className='object-cover'
                        />
                      ) : (
                        <FileText className='text-muted-foreground' size={20} />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className='font-medium max-w-[300px] truncate' title={blog.title}>
                    {blog.title}
                  </TableCell>
                  <TableCell className='text-muted-foreground max-w-[200px] truncate'>
                    {blog.slug}
                  </TableCell>
                  <TableCell>
                    {blog.is_published || blog.ispublished ? (
                      <Badge
                        variant='default'
                        className='bg-green-500/15 text-green-600 hover:bg-green-500/25 border-green-500/20'
                      >
                        Published
                      </Badge>
                    ) : (
                      <Badge variant='secondary'>Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell className='text-muted-foreground text-sm'>
                    {blog.published_at || blog.publishedat
                      ? new Date(
                          blog.published_at || blog.publishedat || Date.now()
                        ).toLocaleDateString()
                      : '-'}
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
                          <Eye className='mr-2 h-4 w-4' /> View post
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
    </div>
  );
}
