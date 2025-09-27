import { memo, useMemo } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Building2,
} from 'lucide-react';
import { siteConfig, contactInfo, equipmentCategories } from '@/shared/constants';

const Footer = memo(() => {
  const quickLinks = useMemo(
    () => [
      'About Us',
      'How It Works',
      'Safety Guidelines',
      'Terms of Service',
      'Privacy Policy',
      'Contact Support',
    ],
    []
  );

  const categories = useMemo(() => equipmentCategories.slice(0, 6), []);

  const locations = useMemo(() => contactInfo.locations, []);

  return (
    <footer className='bg-primary text-primary-foreground'>
      {/* Newsletter Section */}
      <div className='border-b border-primary-foreground/10'>
        <div className='container mx-auto px-4 py-12'>
          <div className='max-w-4xl mx-auto text-center'>
            <h3 className='text-3xl font-display font-bold mb-4'>
              Stay Updated with Latest Equipment
            </h3>
            <p className='text-primary-foreground/80 mb-8 max-w-2xl mx-auto'>
              Get notified about new equipment listings, industry news, and exclusive deals from
              verified dealers
            </p>

            <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
              <Input
                placeholder='Enter your email address'
                className='flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60'
              />
              <Button className='bg-secondary hover:bg-secondary-hover text-secondary-foreground font-semibold px-6'>
                Subscribe
                <ArrowRight className='h-4 w-4 ml-2' />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className='container mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div className='lg:col-span-1'>
            <div className='flex items-center space-x-2 mb-6'>
              <Building2 className='h-8 w-8 text-secondary' />
              <div className='text-2xl font-display font-bold'>{siteConfig.name}</div>
            </div>

            <p className='text-primary-foreground/80 mb-6 leading-relaxed'>
              {siteConfig.description}
            </p>

            {/* Contact Info */}
            <div className='space-y-3'>
              <div className='flex items-center space-x-3'>
                <MapPin className='h-4 w-4 text-secondary' />
                <span className='text-sm'>{contactInfo.address}</span>
              </div>
              <div className='flex items-center space-x-3'>
                <Phone className='h-4 w-4 text-secondary' />
                <span className='text-sm'>{contactInfo.phone}</span>
              </div>
              <div className='flex items-center space-x-3'>
                <Mail className='h-4 w-4 text-secondary' />
                <span className='text-sm'>{contactInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold mb-6'>Quick Links</h4>
            <ul className='space-y-3'>
              {quickLinks.map(link => (
                <li key={link}>
                  <a
                    href='#'
                    className='text-primary-foreground/80 hover:text-secondary transition-colors text-sm'
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className='text-lg font-semibold mb-6'>Equipment Categories</h4>
            <ul className='space-y-3'>
              {categories.map(category => (
                <li key={category}>
                  <a
                    href='#'
                    className='text-primary-foreground/80 hover:text-secondary transition-colors text-sm'
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className='text-lg font-semibold mb-6'>Coverage Areas</h4>
            <ul className='space-y-3 mb-6'>
              {locations.map(location => (
                <li key={location}>
                  <a
                    href='#'
                    className='text-primary-foreground/80 hover:text-secondary transition-colors text-sm'
                  >
                    {location}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h5 className='text-sm font-semibold mb-3'>Follow Us</h5>
              <div className='flex space-x-3'>
                <Button
                  key='facebook'
                  size='sm'
                  variant='ghost'
                  className='p-2 hover:bg-primary-foreground/10'
                >
                  <Facebook className='h-4 w-4' />
                </Button>
                <Button
                  key='twitter'
                  size='sm'
                  variant='ghost'
                  className='p-2 hover:bg-primary-foreground/10'
                >
                  <Twitter className='h-4 w-4' />
                </Button>
                <Button
                  key='instagram'
                  size='sm'
                  variant='ghost'
                  className='p-2 hover:bg-primary-foreground/10'
                >
                  <Instagram className='h-4 w-4' />
                </Button>
                <Button
                  key='linkedin'
                  size='sm'
                  variant='ghost'
                  className='p-2 hover:bg-primary-foreground/10'
                >
                  <Linkedin className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-primary-foreground/10'>
        <div className='container mx-auto px-4 py-6'>
          <div className='flex flex-col md:flex-row items-center justify-between'>
            <div className='text-sm text-primary-foreground/60 mb-4 md:mb-0'>
              © 2024 {siteConfig.name}. All rights reserved.
            </div>

            <div className='flex items-center space-x-6 text-sm'>
              <a
                href='#'
                className='text-primary-foreground/60 hover:text-secondary transition-colors'
              >
                Terms of Service
              </a>
              <a
                href='#'
                className='text-primary-foreground/60 hover:text-secondary transition-colors'
              >
                Privacy Policy
              </a>
              <a
                href='#'
                className='text-primary-foreground/60 hover:text-secondary transition-colors'
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
