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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { BrandRecord } from '@/server/services/catalog';
import { createBrandAction, updateBrandAction } from '@/server/actions/catalog';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  icon: z.string().optional(),
  isfooter: z.boolean(),
});

interface BrandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brand?: BrandRecord | null;
}

export function BrandDialog({ open, onOpenChange, brand }: BrandDialogProps) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      icon: '',
      isfooter: false,
    },
  });

  useEffect(() => {
    if (brand) {
      form.reset({
        name: brand.name,
        icon: brand.icon || '',
        isfooter: brand.isfooter || false,
      });
    } else {
      form.reset({
        name: '',
        icon: '',
        isfooter: false,
      });
    }
  }, [brand, form, open]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      if (brand) {
        const result = await updateBrandAction(brand.id, values);
        if (result.success) {
          toast.success('Brand updated successfully');
          onOpenChange(false);
        } else {
          toast.error(result.error || 'Failed to update brand');
        }
      } else {
        const result = await createBrandAction(values);
        if (result.success) {
          toast.success('Brand created successfully');
          onOpenChange(false);
        } else {
          toast.error(result.error || 'Failed to create brand');
        }
      }
    } catch (error) {
      toast.error('Something went wrong');
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{brand ? 'Edit Brand' : 'Create Brand'}</DialogTitle>
          <DialogDescription>
            {brand ? 'Make changes to the brand here.' : 'Add a new brand to the catalog.'}
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
                    <Input placeholder='e.g., Caterpillar' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='icon'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder='https://...' {...field} />
                  </FormControl>
                  <FormDescription>URL to the brand logo image.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isfooter'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Show in Footer</FormLabel>
                    <FormDescription>
                      Display this brand in the website footer links.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit' disabled={isPending}>
                {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {brand ? 'Save Changes' : 'Create Brand'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
