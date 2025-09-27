'use client';

import { useState, memo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Search, Menu, X, MapPin, Phone, User, Heart, ChevronDown, Settings } from 'lucide-react';
import { siteConfig, contactInfo } from '@/shared/constants';

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBuyDropdown, setShowBuyDropdown] = useState(false);
  const [showRentDropdown, setShowRentDropdown] = useState(false);
  const router = useRouter();

  const toggleMenu = useCallback(() => setIsMenuOpen(!isMenuOpen), [isMenuOpen]);

  const handleQuickSearch = useCallback(() => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  }, [searchQuery, router]);

  // Commented out unused functions - can be re-enabled when needed
  // const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  // }, []);

  // const handleSearchKeyPress = useCallback(
  //   (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === 'Enter') {
 //       handleQuickSearch();
  //     }
  //   },
  //   [handleQuickSearch]
  // );

  // const toggleBuyDropdown = useCallback(() => {
  //   setShowBuyDropdown(!showBuyDropdown);
  //   setShowRentDropdown(false);
  // }, [showBuyDropdown]);

  // const toggleRentDropdown = useCallback(() => {
  //   setShowRentDropdown(!showRentDropdown);
  //   setShowBuyDropdown(false);
  // }, [showRentDropdown]);

  return (
    <header className='bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm'>
      {/* Top Bar */}
      <div className='border-b border-border bg-muted/50'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between h-10 text-sm'>
            <div className='flex items-center space-x-6 text-muted-foreground'>
              <div className='flex items-center space-x-1'>
                <MapPin className='h-3 w-3' />
                <span>{contactInfo.locations.join(', ')}</span>
              </div>
              <div className='flex items-center space-x-1'>
                <Phone className='h-3 w-3' />
                <span>{contactInfo.phone}</span>
              </div>
            </div>
            <div className='flex items-center space-x-4 text-muted-foreground'>
              <span>العربية</span>
              <span>|</span>
              <span>English</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center'>
              <Settings className='h-6 w-6 text-primary-foreground' />
            </div>
            <div className='text-2xl font-display font-bold'>{siteConfig.name}</div>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden lg:flex items-center space-x-1'>
            <Button
              variant='ghost'
              className='text-foreground hover:text-primary hover:bg-primary/5 font-medium px-4'
              asChild
            >
              <Link href='/'>Home</Link>
            </Button>

            {/* Buy Equipment Dropdown */}
            <div
              className='relative'
              onMouseEnter={() => setShowBuyDropdown(true)}
              onMouseLeave={() => setShowBuyDropdown(false)}
            >
              <Button
                variant='ghost'
                className='text-foreground hover:text-primary hover:bg-primary/5 font-medium px-4'
              >
                Buy Equipment
                <ChevronDown className='h-4 w-4 ml-1' />
              </Button>
              {showBuyDropdown && (
                <div className='absolute top-full left-0 mt-1 w-64 bg-background border border-border rounded-xl shadow-xl z-50 py-2'>
                  <Link
                    href='/search?type=sale&category=excavators'
                    className='block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors'
                  >
                    Excavators
                  </Link>
                  <Link
                    href='/search?type=sale&category=cranes'
                    className='block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors'
                  >
                    Cranes
                  </Link>
                  <Link
                    href='/search?type=sale&category=loaders'
                    className='block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors'
                  >
                    Loaders
                  </Link>
                  <Link
                    href='/search?type=sale'
                    className='block px-4 py-3 text-sm text-primary font-medium hover:bg-primary/5 transition-colors border-t border-border mt-2'
                  >
                    View All Equipment for Sale
                  </Link>
                </div>
              )}
            </div>

            {/* Rent Equipment Dropdown */}
            <div
              className='relative'
              onMouseEnter={() => setShowRentDropdown(true)}
              onMouseLeave={() => setShowRentDropdown(false)}
            >
              <Button
                variant='ghost'
                className='text-foreground hover:text-primary hover:bg-primary/5 font-medium px-4'
              >
                Rent Equipment
                <ChevronDown className='h-4 w-4 ml-1' />
              </Button>
              {showRentDropdown && (
                <div className='absolute top-full left-0 mt-1 w-64 bg-background border border-border rounded-xl shadow-xl z-50 py-2'>
                  <Link
                    href='/search?type=rent&category=excavators'
                    className='block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors'
                  >
                    Excavators for Rent
                  </Link>
                  <Link
                    href='/search?type=rent&category=cranes'
                    className='block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors'
                  >
                    Cranes for Rent
                  </Link>
                  <Link
                    href='/search?type=rent&category=loaders'
                    className='block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors'
                  >
                    Loaders for Rent
                  </Link>
                  <Link
                    href='/search?type=rent'
                    className='block px-4 py-3 text-sm text-primary font-medium hover:bg-primary/5 transition-colors border-t border-border mt-2'
                  >
                    View All Equipment for Rent
                  </Link>
                </div>
              )}
            </div>

            <Button
              variant='ghost'
              className='text-foreground hover:text-primary hover:bg-primary/5 font-medium px-4'
            >
              Vendors
            </Button>
            <Button
              variant='ghost'
              className='text-foreground hover:text-primary hover:bg-primary/5 font-medium px-4'
            >
              Categories
            </Button>
            <Button
              variant='ghost'
              className='text-foreground hover:text-primary hover:bg-primary/5 font-medium px-4'
            >
              About
            </Button>
          </nav>

          {/* Quick Search */}
          <div className='hidden md:flex items-center space-x-2 bg-muted/50 border border-border rounded-xl px-4 py-3 min-w-[300px]'>
            <Search
              className='h-4 w-4 text-muted-foreground cursor-pointer'
              onClick={handleQuickSearch}
            />
            <Input
              placeholder='Search equipment, brands, locations...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleQuickSearch()}
              className='border-0 bg-transparent focus-visible:ring-0 h-auto p-0 text-foreground placeholder:text-muted-foreground'
            />
          </div>

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

            {/* Mobile Menu Toggle */}
            <Button variant='ghost' size='sm' className='lg:hidden ml-2' onClick={toggleMenu}>
              {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='lg:hidden border-t border-border bg-background'>
          <div className='container mx-auto px-4 py-4'>
            {/* Mobile Search */}
            <div className='flex items-center space-x-2 bg-muted rounded-lg px-3 py-2 mb-4'>
              <Search className='h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search equipment...'
                className='border-0 bg-transparent focus-visible:ring-0 h-auto p-0'
              />
            </div>

            {/* Mobile Navigation */}
            <nav className='space-y-3'>
              <a
                href='#'
                className='block text-foreground hover:text-secondary transition-colors font-medium py-2'
              >
                Home
              </a>
              <a
                href='#'
                className='block text-foreground hover:text-secondary transition-colors font-medium py-2'
              >
                Buy Equipment
              </a>
              <a
                href='#'
                className='block text-foreground hover:text-secondary transition-colors font-medium py-2'
              >
                Rent Equipment
              </a>
              <a
                href='#'
                className='block text-foreground hover:text-secondary transition-colors font-medium py-2'
              >
                Vendors
              </a>
              <a
                href='#'
                className='block text-foreground hover:text-secondary transition-colors font-medium py-2'
              >
                Categories
              </a>
              <a
                href='#'
                className='block text-foreground hover:text-secondary transition-colors font-medium py-2'
              >
                About
              </a>
              <div className='border-t border-border pt-3 mt-3'>
                <a
                  href='#'
                  className='block text-foreground hover:text-secondary transition-colors font-medium py-2'
                >
                  Login / Register
                </a>
                <a
                  href='#'
                  className='block text-foreground hover:text-secondary transition-colors font-medium py-2'
                >
                  My Favorites
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
