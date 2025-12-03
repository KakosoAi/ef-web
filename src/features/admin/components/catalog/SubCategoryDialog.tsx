'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { SubCategoryRecord, CategoryRecord } from '@/server/services/catalog';
import { createSubCategoryAction, updateSubCategoryAction } from '@/server/actions/catalog';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  categoryid: z.number().min(1, 'Category is required'),
});

interface SubCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subCategory?: SubCategoryRecord | null;
  categories: CategoryRecord[];
}

export function SubCategoryDialog({
  open,
  onOpenChange,
  subCategory,
  categories,
}: SubCategoryDialogProps) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      categoryid: 0,
    },
  });

  useEffect(() => {
    if (subCategory) {
      form.reset({
        name: subCategory.name,
        categoryid: subCategory.categoryid,
      });
    } else {
      form.reset({
        name: '',
        categoryid: 0,
      });
    }
  }, [subCategory, form, open]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      if (subCategory) {
        const result = await updateSubCategoryAction(subCategory.id, values);
        if (result.success) {
          toast.success('Sub-Category updated successfully');
          onOpenChange(false);
        } else {
          toast.error(result.error || 'Failed to update sub-category');
        }
      } else {
        const result = await createSubCategoryAction(values);
        if (result.success) {
          toast.success('Sub-Category created successfully');
          onOpenChange(false);
        } else {
          toast.error(result.error || 'Failed to create sub-category');
        }
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{subCategory ? 'Edit Sub-Category' : 'Create Sub-Category'}</DialogTitle>
          <DialogDescription>
            {subCategory
              ? 'Make changes to the sub-category here.'
              : 'Add a new sub-category to the catalog.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g., Mini Excavators' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='categoryid'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category</FormLabel>
                  <Select
                    onValueChange={value => field.onChange(Number(value))}
                    value={field.value ? field.value.toString() : undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit' disabled={isPending}>
                {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {subCategory ? 'Save Changes' : 'Create Sub-Category'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
