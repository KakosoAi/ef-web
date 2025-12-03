'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
import { SubCategoryRecord, CategoryRecord } from '@/server/services/catalog';
import { SubCategoryDialog } from './SubCategoryDialog';
import { DeleteSubCategoryDialog } from './DeleteSubCategoryDialog';

interface SubCategoriesClientProps {
  initialData: SubCategoryRecord[];
  categories: CategoryRecord[];
  totalCount: number;
  page: number;
  limit: number;
  searchQuery: string;
}

export function SubCategoriesClient({
  initialData,
  categories,
  totalCount,
  page,
  limit,
  searchQuery,
}: SubCategoriesClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [data, setData] = useState<SubCategoryRecord[]>(initialData);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryRecord | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchQuery);

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
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const openEdit = (item: SubCategoryRecord) => {
    setSelectedSubCategory(item);
    setIsEditOpen(true);
  };

  const openDelete = (item: SubCategoryRecord) => {
    setSelectedSubCategory(item);
    setIsDeleteOpen(true);
  };

  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600'>
            Sub Categories
          </h1>
          <p className='text-muted-foreground text-sm font-medium'>
            Manage equipment sub-categories{' '}
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
              placeholder='Search sub-categories...'
              className='w-[200px] pl-8 lg:w-[300px]'
              value={searchTerm}
              onChange={e => handleSearch(e.target.value)}
            />
          </div>
          <Button
            onClick={() => {
              setSelectedSubCategory(null);
              setIsCreateOpen(true);
            }}
            className='shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-purple-600 border-0'
          >
            <Plus className='mr-2 h-4 w-4' /> Add Sub-Category
          </Button>
        </div>
      </div>

      <div className='rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden'>
        <Table>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Parent Category</TableHead>
              <TableHead>ID</TableHead>
              <TableHead className='w-[50px]'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className='h-32 text-center'>
                  <div className='flex flex-col items-center justify-center text-muted-foreground'>
                    <LayoutGrid className='h-8 w-8 mb-2 opacity-50' />
                    <p>No sub-categories found</p>
                    <p className='text-xs'>Add a new sub-category to get started</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map(item => (
                <TableRow key={item.id} className='hover:bg-muted/50 transition-colors'>
                  <TableCell className='font-medium'>{item.name}</TableCell>
                  <TableCell>
                    <Badge variant='outline' className='bg-muted/50'>
                      {item.category?.name || `Category #${item.categoryid}`}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-muted-foreground font-mono text-xs'>
                    #{item.id}
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
                        <DropdownMenuItem onClick={() => openEdit(item)}>
                          <Edit className='mr-2 h-4 w-4' /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='text-red-600' onClick={() => openDelete(item)}>
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

      <SubCategoryDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        subCategory={null}
        categories={categories}
      />

      <SubCategoryDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        subCategory={selectedSubCategory}
        categories={categories}
      />

      <DeleteSubCategoryDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        subCategory={selectedSubCategory}
      />
    </div>
  );
}
