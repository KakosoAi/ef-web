'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';
import { BrandRecord } from '@/server/services/catalog';
import { deleteBrandAction } from '@/server/actions/catalog';

interface DeleteBrandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brand: BrandRecord | null;
}

export function DeleteBrandDialog({ open, onOpenChange, brand }: DeleteBrandDialogProps) {
  const [isPending, setIsPending] = useState(false);

  async function onDelete() {
    if (!brand) return;

    setIsPending(true);
    try {
      const result = await deleteBrandAction(brand.id);
      if (result.success) {
        toast.success('Brand deleted successfully');
        onOpenChange(false);
      } else {
        toast.error(result.error || 'Failed to delete brand');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the brand
            <span className='font-semibold text-foreground'> {brand?.name} </span>
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={e => {
              e.preventDefault();
              onDelete();
            }}
            className='bg-red-600 hover:bg-red-700 focus:ring-red-600'
            disabled={isPending}
          >
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
