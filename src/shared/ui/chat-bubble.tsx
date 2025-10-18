'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { MessageLoading } from '@/shared/ui/message-loading';

interface ChatBubbleProps {
  variant?: 'sent' | 'received';
  layout?: 'default' | 'ai';
  className?: string;
  children: React.ReactNode;
}

export function ChatBubble({
  variant = 'received',
  layout = 'default',
  className,
  children,
}: ChatBubbleProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-2 mb-4',
        variant === 'sent' && 'flex-row-reverse',
        className
      )}
    >
      {children}
    </div>
  );
}

interface ChatBubbleMessageProps {
  variant?: 'sent' | 'received';
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function ChatBubbleMessage({
  variant = 'received',
  isLoading,
  className,
  children,
}: ChatBubbleMessageProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-3 text-sm',
        variant === 'sent' ? 'bg-primary text-primary-foreground' : 'bg-muted',
        className
      )}
    >
      {isLoading ? (
        <div className='flex items-center space-x-2'>
          <MessageLoading />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

interface ChatBubbleAvatarProps {
  src?: string;
  fallback?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function ChatBubbleAvatar({ src, fallback = 'AI', icon, className }: ChatBubbleAvatarProps) {
  return (
    <Avatar className={cn('h-8 w-8', className)}>
      {src && <AvatarImage src={src} />}
      <AvatarFallback>{icon || fallback}</AvatarFallback>
    </Avatar>
  );
}

interface ChatBubbleActionProps {
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ChatBubbleAction({ icon, onClick, className }: ChatBubbleActionProps) {
  return (
    <Button variant='ghost' size='icon' className={cn('h-6 w-6', className)} onClick={onClick}>
      {icon}
    </Button>
  );
}

export function ChatBubbleActionWrapper({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn('flex items-center gap-1 mt-2', className)}>{children}</div>;
}
