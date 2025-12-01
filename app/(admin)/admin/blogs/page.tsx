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
    <div className='space-y-8'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600'>
            Blogs & News
          </h1>
          <p className='text-muted-foreground text-sm font-medium'>
            Manage blog posts and news articles{' '}
            <Badge variant='outline' className='ml-2'>
              {count} Total
            </Badge>
          </p>
        </div>
        <Button className='shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-purple-600 border-0'>
          Create Post
        </Button>
      </div>

      <div className='rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden'>
        <Table>
          <TableHeader className='bg-muted/50'>
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
                <TableCell colSpan={6} className='h-32 text-center'>
                  <div className='flex flex-col items-center justify-center text-muted-foreground'>
                    <p>No blog posts found</p>
                    <p className='text-xs'>Create a new post to get started</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              blogs.map(blog => (
                <TableRow key={blog.id} className='hover:bg-muted/50 transition-colors'>
                  <TableCell>
                    <div className='relative h-12 w-12 overflow-hidden rounded-lg border bg-muted shadow-sm flex items-center justify-center'>
                      {blog.image_url || blog.imageurl ? (
                        <Image
                          src={blog.image_url || blog.imageurl || ''}
                          alt={blog.title}
                          fill
                          className='object-cover transition-transform hover:scale-110 duration-300'
                        />
                      ) : (
                        <FileText className='text-muted-foreground' size={20} />
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    className='font-semibold max-w-[300px] truncate text-foreground'
                    title={blog.title}
                  >
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
