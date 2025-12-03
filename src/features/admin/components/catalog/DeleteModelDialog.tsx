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
import { ModelRecord } from '@/server/services/catalog';
import { deleteModelAction } from '@/server/actions/catalog';

interface DeleteModelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  model: ModelRecord | null;
}

export function DeleteModelDialog({ open, onOpenChange, model }: DeleteModelDialogProps) {
  const [isPending, setIsPending] = useState(false);

  async function onDelete() {
    if (!model) return;

    setIsPending(true);
    try {
      const result = await deleteModelAction(model.id);
      if (result.success) {
        toast.success('Model deleted successfully');
        onOpenChange(false);
      } else {
        toast.error(result.error || 'Failed to delete model');
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
            This action cannot be undone. This will permanently delete the model
            <span className='font-semibold text-foreground'> {model?.name} </span>
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
