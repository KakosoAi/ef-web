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
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { EngineRecord } from '@/server/services/catalog';
import { createEngineAction, updateEngineAction } from '@/server/actions/catalog';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

interface EngineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  engine?: EngineRecord | null;
}

export function EngineDialog({ open, onOpenChange, engine }: EngineDialogProps) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (engine) {
      form.reset({
        name: engine.name,
      });
    } else {
      form.reset({
        name: '',
      });
    }
  }, [engine, form, open]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      if (engine) {
        const result = await updateEngineAction(engine.id, values);
        if (result.success) {
          toast.success('Engine updated successfully');
          onOpenChange(false);
        } else {
          toast.error(result.error || 'Failed to update engine');
        }
      } else {
        const result = await createEngineAction(values);
        if (result.success) {
          toast.success('Engine created successfully');
          onOpenChange(false);
        } else {
          toast.error(result.error || 'Failed to create engine');
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
          <DialogTitle>{engine ? 'Edit Engine' : 'Create Engine'}</DialogTitle>
          <DialogDescription>
            {engine ? 'Make changes to the engine here.' : 'Add a new engine to the catalog.'}
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
                    <Input placeholder='e.g., Cummins X15' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit' disabled={isPending}>
                {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {engine ? 'Save Changes' : 'Create Engine'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
