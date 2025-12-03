'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Edit, Trash2, MoreHorizontal, Folder, Plus, Search, LayoutGrid } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Input } from '@/shared/ui/input';
import { CategoryRecord } from '@/server/services/catalog';
import { CategoryDialog } from './CategoryDialog';
import { DeleteCategoryDialog } from './DeleteCategoryDialog';

interface CategoriesClientProps {
  initialData: CategoryRecord[];
  totalCount: number;
  page: number;
  limit: number;
  searchQuery: string;
}

export function CategoriesClient({
  initialData,
  totalCount,
  page,
  limit,
  searchQuery,
}: CategoriesClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [data, setData] = useState<CategoryRecord[]>(initialData);
  const [selectedCategory, setSelectedCategory] = useState<CategoryRecord | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  // Update data when initialData changes (e.g. after server revalidation)
  if (data !== initialData) {
    setData(initialData);
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    params.set('page', '1'); // Reset to page 1 on search
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const openEdit = (category: CategoryRecord) => {
    setSelectedCategory(category);
    setIsEditOpen(true);
  };

  const openDelete = (category: CategoryRecord) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600'>
            Categories
          </h1>
          <p className='text-muted-foreground text-sm font-medium'>
            Manage equipment categories and organization{' '}
            <Badge variant='outline' className='ml-2'>
              {totalCount} Total
            </Badge>
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search categories...'
              className='w-[200px] pl-8 lg:w-[300px]'
              value={searchTerm}
              onChange={e => handleSearch(e.target.value)}
            />
          </div>
          <Button
            onClick={() => {
              setSelectedCategory(null);
              setIsCreateOpen(true);
            }}
            className='shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-purple-600 border-0'
          >
            <Plus className='mr-2 h-4 w-4' /> Add Category
          </Button>
        </div>
      </div>

      <div className='rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden'>
        <Table>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              <TableHead className='w-[80px]'>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Footer Visibility</TableHead>
              <TableHead className='w-[50px]'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className='h-32 text-center'>
                  <div className='flex flex-col items-center justify-center text-muted-foreground'>
                    <LayoutGrid className='h-8 w-8 mb-2 opacity-50' />
                    <p>No categories found</p>
                    <p className='text-xs'>Add a new category to get started</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map(category => (
                <TableRow key={category.id} className='hover:bg-muted/50 transition-colors'>
                  <TableCell>
                    <div className='relative h-10 w-10 overflow-hidden rounded-lg border bg-muted shadow-sm flex items-center justify-center'>
                      {category.icon ? (
                        <Image
                          src={category.icon}
                          alt={category.name}
                          fill
                          className='object-cover'
                        />
                      ) : (
                        <Folder className='text-muted-foreground h-5 w-5' />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className='font-medium'>{category.name}</TableCell>
                  <TableCell className='text-muted-foreground font-mono text-xs'>
                    #{category.id}
                  </TableCell>
                  <TableCell>
                    {category.isfooter ? (
                      <Badge
                        variant='default'
                        className='bg-green-500/15 text-green-600 hover:bg-green-500/25 border-green-500/20'
                      >
                        Visible
                      </Badge>
                    ) : (
                      <Badge variant='secondary'>Hidden</Badge>
                    )}
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
                        <DropdownMenuItem onClick={() => openEdit(category)}>
                          <Edit className='mr-2 h-4 w-4' /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className='text-red-600'
                          onClick={() => openDelete(category)}
                        >
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

      {/* Pagination */}
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalCount)} of {totalCount}{' '}
          entries
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            disabled={page * limit >= totalCount}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <CategoryDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} category={null} />

      <CategoryDialog open={isEditOpen} onOpenChange={setIsEditOpen} category={selectedCategory} />

      <DeleteCategoryDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        category={selectedCategory}
      />
    </div>
  );
}
