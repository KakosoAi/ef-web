'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { RainbowButton } from '@/shared/ui/rainbow-borders-button';
import { MapPin, Phone, User, Heart, ChevronDown, Bot, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { siteConfig, contactInfo } from '@/shared/constants';
import { ToggleTheme } from '@/shared/ui/toggle-theme';
import { ToggleLanguage } from '@/shared/ui/toggle-language';
import { NavigationMenu } from './NavigationMenu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

// Available locations
const locations = [
  { code: 'UAE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
];

const Header = memo(() => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <header className='bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm'>
      {/* Top Bar */}
      <div className='border-b border-border bg-muted/50'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between h-8 text-xs'>
            <div className='flex items-center space-x-2 text-muted-foreground'>
              {/* Location Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='flex items-center space-x-1 h-6 px-2 text-muted-foreground hover:text-foreground'
                  >
                    <MapPin className='h-3 w-3 text-orange-500' />
                    <span className='font-medium text-[10px] sm:text-xs'>
                      {selectedLocation.flag} {selectedLocation.code}
                    </span>
                    <ChevronDown className='h-3 w-3' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start' className='w-48'>
                  {locations.map(location => (
                    <DropdownMenuItem
                      key={location.code}
                      onClick={() => setSelectedLocation(location)}
                      className='flex items-center space-x-2'
                    >
                      <span>{location.flag}</span>
                      <span className='text-sm'>{location.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Simplified Phone Display */}
              <div className='flex items-center space-x-1'>
                <Phone className='h-3 w-3 text-green-500' />
                <span className='font-medium text-[10px] sm:text-xs'>{contactInfo.phone}</span>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              {/* Login Icon */}
              <Button
                variant='ghost'
                size='sm'
                className='text-muted-foreground hover:text-foreground h-6 px-2'
                asChild
              >
                <Link href='/login'>
                  <User className='h-3 w-3' />
                </Link>
              </Button>
              {/* Theme Toggle */}
              <ToggleTheme />
              {/* Language Toggle */}
              <ToggleLanguage />
              {/* Favorites Button */}
              <Button
                variant='ghost'
                size='sm'
                className='text-muted-foreground hover:text-foreground h-6 px-2'
                asChild
              >
                <Link href='/favorites'>
                  <Heart className='h-3 w-3' />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <Image
              src='/assets/ef-logo.svg'
              alt='EF Logo'
              width={120}
              height={40}
              className='w-auto h-10'
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu />

          {/* User Actions */}
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              className='hidden md:flex border-border text-foreground hover:bg-muted relative ai-glow'
              asChild
            >
              <Link href='/ai-map-search'>
                <div className='relative'>
                  <Bot className='h-4 w-4 mr-2' />
                  <Sparkles className='h-2.5 w-2.5 text-yellow-500 absolute -top-0.5 -right-0.5' />
                </div>
                AI Map Search
              </Link>
            </Button>
            <RainbowButton>Post Now</RainbowButton>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
