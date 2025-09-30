'use client';

import { useState, FormEvent } from 'react';
import { Send, Bot, Paperclip, Mic, CornerDownLeft } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/shared/ui/chat-bubble';
import { ChatInput } from '@/shared/ui/chat-input';
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from '@/shared/ui/expandable-chat';
import { ChatMessageList } from '@/shared/ui/chat-message-list';
import { MachineryIcon } from '@/shared/ui/machinery-icon';

export function ExpandableChatDemo() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: 'Hello! How can I help you today?',
      sender: 'ai',
    },
    {
      id: 2,
      content: 'I have a question about the equipment.',
      sender: 'user',
    },
    {
      id: 3,
      content: "Sure! I'd be happy to help. What would you like to know about our equipment?",
      sender: 'ai',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        content: input,
        sender: 'user',
      },
    ]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          content:
            "Thank you for your question! I'm here to help you find the right equipment for your needs.",
          sender: 'ai',
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleAttachFile = () => {
    // File attachment functionality would go here
  };

  const handleMicrophoneClick = () => {
    // Voice input functionality would go here
  };

  return (
    <ExpandableChat size='md' position='bottom-right' icon={<MachineryIcon className='h-6 w-6' />}>
      <ExpandableChatHeader className='flex-col text-center justify-center'>
        <h1 className='text-lg font-semibold'>Equipment Chat ✨</h1>
        <p className='text-xs text-muted-foreground'>Ask me anything about our equipment</p>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ChatMessageList>
          {messages.map(message => (
            <ChatBubble key={message.id} variant={message.sender === 'user' ? 'sent' : 'received'}>
              <ChatBubbleAvatar
                className='h-8 w-8 shrink-0'
                src={
                  message.sender === 'user'
                    ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop'
                    : undefined
                }
                icon={message.sender === 'ai' ? <MachineryIcon className='h-5 w-5' /> : undefined}
                fallback={message.sender === 'user' ? 'US' : 'AI'}
              />
              <ChatBubbleMessage variant={message.sender === 'user' ? 'sent' : 'received'}>
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant='received'>
              <ChatBubbleAvatar
                className='h-8 w-8 shrink-0'
                icon={<MachineryIcon className='h-5 w-5' />}
                fallback='AI'
              />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <form
          onSubmit={handleSubmit}
          className='relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1'
        >
          <ChatInput
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Type your message...'
            className='min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0'
          />
          <div className='flex items-center p-3 pt-0 justify-between'>
            <div className='flex'>
              <Button variant='ghost' size='icon' type='button' onClick={handleAttachFile}>
                <Paperclip className='size-4' />
              </Button>

              <Button variant='ghost' size='icon' type='button' onClick={handleMicrophoneClick}>
                <Mic className='size-4' />
              </Button>
            </div>
            <Button type='submit' size='sm' className='ml-auto gap-1.5'>
              Send Message
              <CornerDownLeft className='size-3.5' />
            </Button>
          </div>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
