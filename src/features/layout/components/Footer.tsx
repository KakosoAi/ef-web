import { contactInfo, equipmentCategories, siteConfig } from '@/shared/constants';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
  ArrowRight,
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  MessageCircle,
} from 'lucide-react';
import { memo, useMemo } from 'react';

const Footer = memo(() => {
  const quickLinks = useMemo(() => ['home', 'rent', 'buy', 'stores', 'brands', 'contact us'], []);

  const services = useMemo(() => ['Terms and Conditions', 'Privacy Policy', 'Contact Now'], []);

  const categories = useMemo(() => equipmentCategories.slice(0, 6), []);

  const locations = useMemo(() => contactInfo.locations, []);

  return (
    <footer className='bg-black text-white'>
      {/* Newsletter Section */}
      <div className='border-b border-gray-800'>
        <div className='container mx-auto px-4 py-12'>
          <div className='max-w-4xl mx-auto text-center'>
            <h3 className='text-3xl font-display font-bold mb-4 text-white'>
              Let&apos;s get in touch
            </h3>
            <p className='text-gray-300 mb-8 max-w-2xl mx-auto'>Sign up for our Newsletter</p>

            <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
              <Input
                placeholder='Enter your email address'
                className='flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400'
              />
              <Button className='bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6'>
                Subscribe
                <ArrowRight className='h-4 w-4 ml-2' />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className='container mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
          {/* Company Info */}
          <div className='lg:col-span-1'>
            <div className='flex items-center space-x-2 mb-6'>
              <Building2 className='h-8 w-8 text-orange-500' />
              <div className='text-2xl font-display font-bold text-white'>{siteConfig.name}</div>
            </div>

            <p className='text-gray-300 mb-6 leading-relaxed'>{siteConfig.description}</p>

            {/* Contact Info */}
            <div className='space-y-3'>
              <div className='flex items-center space-x-3'>
                <MapPin className='h-4 w-4 text-orange-500' />
                <span className='text-sm text-gray-300'>{contactInfo.address}</span>
              </div>
              <div className='flex items-center space-x-3'>
                <Phone className='h-4 w-4 text-orange-500' />
                <span className='text-sm text-gray-300'>{contactInfo.phone}</span>
              </div>
              <div className='flex items-center space-x-3'>
                <Mail className='h-4 w-4 text-orange-500' />
                <span className='text-sm text-gray-300'>{contactInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className='text-lg font-semibold mb-6 text-white'>Quick Links</h4>
            <ul className='space-y-3'>
              {services.map(service => (
                <li key={service}>
                  <a
                    href='#'
                    className='text-gray-300 hover:text-orange-500 transition-colors text-sm'
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold mb-6 text-white'>Pages</h4>
            <ul className='space-y-3'>
              {quickLinks.map(link => (
                <li key={link}>
                  <a
                    href='#'
                    className='text-gray-300 hover:text-orange-500 transition-colors text-sm'
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className='text-lg font-semibold mb-6 text-white'>Equipment Categories</h4>
            <ul className='space-y-3'>
              {categories.map(category => (
                <li key={category}>
                  <a
                    href='#'
                    className='text-gray-300 hover:text-orange-500 transition-colors text-sm'
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className='text-lg font-semibold mb-6 text-white'>Coverage Areas</h4>
            <ul className='space-y-3 mb-6'>
              {locations.map(location => (
                <li key={location}>
                  <a
                    href='#'
                    className='text-gray-300 hover:text-orange-500 transition-colors text-sm'
                  >
                    {location}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h5 className='text-sm font-semibold mb-3 text-white'>
                For Inquiry and Advertisement Support
              </h5>
              <div className='flex space-x-3'>
                <Button
                  key='instagram'
                  size='sm'
                  variant='ghost'
                  className='p-2 hover:bg-gray-800 text-gray-300 hover:text-orange-500'
                  asChild
                >
                  <a
                    href='https://www.instagram.com/equipmentsfinder'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Instagram className='h-4 w-4' />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800'>
        <div className='container mx-auto px-4 py-6'>
          <div className='flex flex-col md:flex-row items-center justify-between'>
            <div className='text-sm text-gray-400 mb-4 md:mb-0'>
              © 2024 {siteConfig.name}. All rights reserved.
            </div>

            <div className='flex items-center space-x-6 text-sm'>
              <a href='#' className='text-gray-400 hover:text-orange-500 transition-colors'>
                Terms of Service
              </a>
              <a href='#' className='text-gray-400 hover:text-orange-500 transition-colors'>
                Privacy Policy
              </a>
              <a href='#' className='text-gray-400 hover:text-orange-500 transition-colors'>
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
