'use client';

import { useState, FormEvent } from 'react';
import { Send, Bot, Mic, CornerDownLeft } from 'lucide-react';
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

interface ChatWidgetProps {
  websiteMode?: 'general' | 'agricultural';
}

export function ChatWidget({ websiteMode = 'general' }: ChatWidgetProps) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: 'Hello! How can I help you with our equipment today?',
      sender: 'ai',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!input.trim() || isLoading) return;

      // Create a synthetic form event
      const syntheticEvent = {
        preventDefault: () => {},
      } as FormEvent;

      handleSubmit(syntheticEvent);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        content: userMessage,
        sender: 'user',
      },
    ]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/site-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          content: data.reply || "I'm sorry, I couldn't process your request right now.",
          sender: 'ai',
        },
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          sender: 'ai',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttachFile = () => {
    // File attachment functionality would go here
  };

  const handleMicrophoneClick = () => {
    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert('Voice input is not supported in this browser. Please use Chrome.');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.continuous = false;

      let finalTranscript = '';

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        // Update input with interim or final transcript
        setInput(finalTranscript || interimTranscript);
      };

      recognition.onerror = (e: any) => {
        console.error('Voice recognition error:', e);
        alert('Voice recognition error. Please check microphone permissions.');
      };

      recognition.onend = () => {
        // Keep final transcript in the input; user can press Send
      };

      recognition.start();
    } catch (err) {
      console.error('Failed to start voice input:', err);
      alert('Unable to start voice input.');
    }
  };

  return (
    <ExpandableChat
      size='md'
      position='bottom-right'
      icon={<MachineryIcon className='h-6 w-6' />}
      websiteMode={websiteMode}
    >
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
            onKeyDown={handleKeyDown}
            placeholder='Type your message...'
            className='min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0'
          />
          <div className='flex items-center p-3 pt-0 justify-between'>
            <div className='flex'>
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
