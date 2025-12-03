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
import { ModelRecord, BrandRecord } from '@/server/services/catalog';
import { createModelAction, updateModelAction } from '@/server/actions/catalog';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  brandid: z.number().min(1, 'Brand is required'),
});

interface ModelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  model?: ModelRecord | null;
  brands: BrandRecord[];
}

export function ModelDialog({ open, onOpenChange, model, brands }: ModelDialogProps) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      brandid: 0,
    },
  });

  useEffect(() => {
    if (model) {
      form.reset({
        name: model.name,
        brandid: model.brandid,
      });
    } else {
      form.reset({
        name: '',
        brandid: 0,
      });
    }
  }, [model, form, open]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      if (model) {
        const result = await updateModelAction(model.id, values);
        if (result.success) {
          toast.success('Model updated successfully');
          onOpenChange(false);
        } else {
          toast.error(result.error || 'Failed to update model');
        }
      } else {
        const result = await createModelAction(values);
        if (result.success) {
          toast.success('Model created successfully');
          onOpenChange(false);
        } else {
          toast.error(result.error || 'Failed to create model');
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
          <DialogTitle>{model ? 'Edit Model' : 'Create Model'}</DialogTitle>
          <DialogDescription>
            {model ? 'Make changes to the model here.' : 'Add a new model to the catalog.'}
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
                    <Input placeholder='e.g., 320D' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='brandid'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={value => field.onChange(Number(value))}
                    value={field.value ? field.value.toString() : undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a brand' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map(brand => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>
                          {brand.name}
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
                {model ? 'Save Changes' : 'Create Model'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
