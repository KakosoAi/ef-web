'use client';

import { memo } from 'react';
import { Button } from '@/shared/ui/button';
import { MapPin, Phone, User, Heart, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { siteConfig, contactInfo } from '@/shared/constants';
import { ToggleTheme } from '@/shared/ui/toggle-theme';
import { NavigationMenuDemo } from './NavigationMenuDemo';

const Header = memo(() => {
  return (
    <header className='bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm'>
      {/* Top Bar */}
      <div className='border-b border-border bg-muted/50'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between h-8 text-xs'>
            <div className='flex items-center space-x-4 text-muted-foreground'>
              <div className='flex items-center space-x-1'>
                <MapPin className='h-2.5 w-2.5' />
                <span>{contactInfo.locations.join(', ')}</span>
              </div>
              <div className='flex items-center space-x-1'>
                <Phone className='h-2.5 w-2.5' />
                <span>{contactInfo.phone}</span>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              {/* Theme Toggle */}
              <ToggleTheme />
              {/* Language Selector */}
              <div className='flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-md px-2 py-1 hover:bg-primary/15 transition-colors cursor-pointer'>
                <span className='text-xs font-medium text-primary'>EN</span>
                <ChevronDown className='h-2.5 w-2.5 text-primary' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center space-x-3'>
            <Image
              src='/assets/ef-logo.svg'
              alt='EF Logo'
              width={40}
              height={40}
              className='w-10 h-10'
            />
            <div className='text-2xl font-display font-bold'>{siteConfig.name}</div>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenuDemo />

          {/* User Actions */}
          <div className='flex items-center space-x-2'>
            <Button
              variant='ghost'
              size='sm'
              className='hidden md:flex text-foreground hover:text-primary'
            >
              <Heart className='h-4 w-4 mr-2' />
              Favorites
            </Button>
            <Button
              variant='outline'
              size='sm'
              className='hidden md:flex border-border text-foreground hover:bg-muted'
            >
              <User className='h-4 w-4 mr-2' />
              Login
            </Button>
            <Button
              size='sm'
              className='bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-6'
            >
              Post Ad
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
