'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Building2,
  Truck,
  Wrench,
  Users,
  Phone,
  Mail,
  Heart,
  User,
  Menu,
  X,
  Construction,
  Hammer,
} from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavGridCard,
  NavSmallItem,
  NavLargeItem,
  NavItemMobile,
  type NavItemType,
} from '@/shared/ui/navigation-menu';
import { Button } from '@/shared/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';

// Equipment links for Buy Equipment dropdown
const equipmentLinks: NavItemType[] = [
  {
    title: 'Excavators',
    href: '/search?type=sale&category=excavators',
    description: 'Heavy-duty excavators for construction and mining',
    icon: Construction,
  },
  {
    title: 'Cranes',
    href: '/search?type=sale&category=cranes',
    description: 'Tower cranes, mobile cranes, and lifting equipment',
    icon: Building2,
  },
  {
    title: 'Loaders',
    href: '/search?type=sale&category=loaders',
    description: 'Wheel loaders, skid steers, and material handling',
    icon: Hammer,
  },
  {
    title: 'Bulldozers',
    href: '/search?type=sale&category=bulldozers',
    description: 'Track dozers and wheel dozers for earthmoving',
    icon: Truck,
  },
];

// Rental links for Rent Equipment dropdown
const rentalLinks: NavItemType[] = [
  {
    title: 'Excavators for Rent',
    href: '/search?type=rent&category=excavators',
    description: 'Short and long-term excavator rentals',
    icon: Construction,
  },
  {
    title: 'Cranes for Rent',
    href: '/search?type=rent&category=cranes',
    description: 'Professional crane rental services',
    icon: Building2,
  },
  {
    title: 'Loaders for Rent',
    href: '/search?type=rent&category=loaders',
    description: 'Flexible loader rental options',
    icon: Hammer,
  },
  {
    title: 'All Rentals',
    href: '/search?type=rent',
    description: 'Browse all available equipment for rent',
    icon: Wrench,
  },
];

// Company/About links
const companyLinks: NavItemType[] = [
  {
    title: 'About Us',
    href: '/about',
    description: 'Learn about our company and mission',
    icon: Building2,
  },
  {
    title: 'Contact',
    href: '/contact',
    description: 'Get in touch with our team',
    icon: Phone,
  },
  {
    title: 'Vendors',
    href: '/vendors',
    description: 'Partner with us as an equipment vendor',
    icon: Users,
  },
  {
    title: 'Support',
    href: '/support',
    description: 'Customer support and help center',
    icon: Mail,
  },
];

function DesktopMenu() {
  return (
    <NavigationMenu className='hidden lg:flex'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href='/'
              className='group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50'
            >
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Buy Equipment</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className='grid w-[600px] grid-cols-2 gap-3 p-4'>
              {equipmentLinks.map(link => (
                <NavGridCard key={link.href} link={link} />
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Rent Equipment</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className='grid w-[600px] grid-cols-2 gap-3 p-4'>
              {rentalLinks.map(link => (
                <NavGridCard key={link.href} link={link} />
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Company</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className='w-[400px] p-4'>
              <div className='grid gap-3'>
                {companyLinks.map(link => (
                  <NavSmallItem key={link.href} item={link} />
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href='/categories'
              className='group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50'
            >
              Categories
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNav() {
  const [open, setOpen] = React.useState(false);

  const allLinks = [
    { title: 'Home', href: '/', icon: Building2 },
    ...equipmentLinks,
    ...rentalLinks,
    ...companyLinks,
    { title: 'Categories', href: '/categories', icon: Wrench },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' size='sm' className='lg:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
        <div className='flex flex-col gap-4 py-4'>
          <div className='px-2'>
            <h2 className='text-lg font-semibold'>Navigation</h2>
          </div>
          <div className='grid gap-2'>
            {allLinks.map(item => (
              <NavItemMobile
                key={item.href}
                item={item}
                href={item.href}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>
          <div className='border-t pt-4'>
            <div className='grid gap-2'>
              <Button variant='outline' className='justify-start' asChild>
                <Link href='/login'>
                  <User className='mr-2 h-4 w-4' />
                  Login
                </Link>
              </Button>
              <Button variant='outline' className='justify-start' asChild>
                <Link href='/favorites'>
                  <Heart className='mr-2 h-4 w-4' />
                  Favorites
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function NavigationMenuDemo() {
  return (
    <div className='flex items-center gap-2'>
      <DesktopMenu />
      <MobileNav />
    </div>
  );
}
