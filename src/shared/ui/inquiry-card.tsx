'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Eye,
  MessageCircle,
  Building2,
  Clock,
  Flame,
  AlertTriangle,
  BadgeCheck,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';

// Define the props interface based on the inquiry data structure
interface InquiryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  inquiry: {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    urgency: 'Low' | 'Medium' | 'High' | 'Urgent';
    budget: string;
    postedDate: string;
    views: number;
    responses: number;
    company: string;
    rating: number;
    verified: boolean;
    promoted?: boolean;
    featured?: boolean;
    contactInfo: {
      name: string;
      email: string;
      phone: string;
    };
    equipmentDetails?: {
      category: string;
      subCategory?: string;
      purpose?: string;
      modelsOfInterest?: string[];
      quantity?: number;
      duration?: string;
      startDate?: string;
      workingHours?: string;
      siteConditions?: string;
      budgetRange?: string;
    };
  };
  onAiMapClick?: () => void;
  showAiMapButton?: boolean;
  onClick?: () => void;
}

// Define stat item component for DRY principle
const StatItem = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => (
  <div className='flex flex-col items-center'>
    <div className='flex items-center space-x-1'>
      {Icon && <Icon className='w-3 h-3 text-muted-foreground' />}
      <span className='text-sm font-semibold text-foreground'>{value}</span>
    </div>
    <span className='text-xs text-muted-foreground text-center'>{label}</span>
  </div>
);

// Get urgency color styling
const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case 'Urgent':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'High':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Get category image path
const getCategoryImage = (category: string) => {
  const categoryMap: { [key: string]: string } = {
    'Backhoe Loaders': '/assets/categories/backhoe-loaders.png',
    Attachments: '/assets/categories/attachments.png',
    'General Equipment': '/assets/categories/other-equipments.png',
    Cranes: '/assets/categories/cranes.png',
    'Motor Graders': '/assets/categories/motor-graders.png',
    Excavators: '/assets/categories/excavators.png',
    Bulldozers: '/assets/categories/dozers.png',
    'Wheel Loaders': '/assets/categories/wheel-loaders.png',
    Forklifts: '/assets/categories/forklifts.png',
    Trucks: '/assets/categories/trucks.png',
    Generators: '/assets/categories/generators.png',
    Compactors: '/assets/categories/compactors.png',
    'Skid Steers': '/assets/categories/skid-steers.png',
    Trailers: '/assets/categories/trailers.png',
    Compressors: '/assets/categories/compressors.png',
  };

  return categoryMap[category] || '/assets/categories/other-equipments.png';
};

// Get category icon (simplified version)
const getCategoryIcon = (category: string) => {
  // This would be expanded based on your category icons
  return <Building2 className='w-8 h-8 text-orange-500' />;
};

const InquiryCard = React.forwardRef<HTMLDivElement, InquiryCardProps>(
  ({ className, inquiry, onAiMapClick, showAiMapButton = true, onClick, ...props }, ref) => {
    const hasLocation = inquiry.location && inquiry.location !== 'Location not specified';

    return (
      <motion.div
        ref={ref}
        className={cn(
          'w-full max-w-sm overflow-hidden rounded-[18px] bg-white text-card-foreground border border-gray-100 shadow-[0_6px_18px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.14)] transition-shadow',
          onClick ? 'cursor-pointer' : '',
          className
        )}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        onClick={onClick}
      >
        {/* Top section with category image background and content */}
        <div className='relative h-72 w-full overflow-hidden'>
          {/* Category background image */}
          <div className='absolute inset-0'>
            <Image
              src={getCategoryImage(inquiry.category)}
              alt={`${inquiry.category} equipment`}
              fill
              className='object-cover object-center'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>

          {/* Gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent' />

          {/* Category badge in top right */}
          <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full border border-white/60 px-3 py-1.5 shadow-sm inline-flex items-center gap-1.5'>
            <Building2 className='w-3.5 h-3.5 text-gray-700' />
            <span className='text-xs font-medium text-gray-900'>{inquiry.category}</span>
          </div>

          {/* Urgency badge in top left */}
          <div className='absolute top-4 left-4'>
            <div
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold border',
                inquiry.urgency === 'Urgent'
                  ? 'bg-red-100 text-red-800 border-red-200'
                  : inquiry.urgency === 'High'
                    ? 'bg-orange-100 text-orange-800 border-orange-200'
                    : inquiry.urgency === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      : 'bg-green-100 text-green-800 border-green-200'
              )}
            >
              {inquiry.urgency === 'Urgent' ? (
                <AlertTriangle className='w-3.5 h-3.5' />
              ) : inquiry.urgency === 'High' ? (
                <Flame className='w-3.5 h-3.5' />
              ) : inquiry.urgency === 'Medium' ? (
                <Clock className='w-3.5 h-3.5' />
              ) : (
                <CheckCircle className='w-3.5 h-3.5' />
              )}
              {inquiry.urgency}
            </div>
          </div>

          <div className='absolute bottom-0 left-0 flex w-full items-end justify-between p-4'>
            <div className='text-white flex-1'>
              <h3 className='text-xl font-semibold tracking-tight mb-1 line-clamp-2'>
                {inquiry.title}
              </h3>
              <div className='flex items-center space-x-1 mb-2'>
                <MapPin className='w-3.5 h-3.5' />
                <p className='text-sm text-white/90'>{inquiry.location}</p>
              </div>
              <div className='flex items-center space-x-1'>
                <Building2 className='w-3.5 h-3.5' />
                <p className='text-sm text-white/90'>{inquiry.company}</p>
              </div>
            </div>

            {/* AI Map button - shows on hover */}
            {showAiMapButton && hasLocation && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileHover={{ opacity: 1, x: 0 }}
                animate={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <Button
                  variant='secondary'
                  size='sm'
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onAiMapClick) {
                      onAiMapClick();
                    } else {
                      // Navigate to AI map search with inquiry parameters
                      const url = `/ai-map-search?location=${encodeURIComponent(inquiry.location)}&inquiry=${inquiry.id}&category=${encodeURIComponent(inquiry.category)}`;
                      window.location.href = url;
                    }
                  }}
                  aria-label={`View ${inquiry.title} on AI Map`}
                  className='bg-white/90 hover:bg-white text-gray-900 shadow-sm'
                >
                  AI Map
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom section with inquiry details */}
        <div className='p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex-1'>
              <p className='font-semibold text-foreground text-lg'>{inquiry.budget}</p>
              <p className='text-sm text-muted-foreground'>{inquiry.category}</p>
            </div>

            {/* Rating and verification */}
            <div className='flex flex-col items-end'>
              {inquiry.verified && (
                <Badge
                  variant='outline'
                  className='text-xs inline-flex items-center gap-1.5 rounded-full bg-green-100 text-green-700 border-green-200 px-2.5 py-0.5'
                >
                  <BadgeCheck className='w-3.5 h-3.5' /> Verified
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          <p className='text-base text-muted-foreground mb-4 line-clamp-2'>{inquiry.description}</p>

          <div className='my-4 h-px w-full bg-border' />

          {/* Stats */}
          <div className='flex justify-between'>
            <StatItem label='ID' value={inquiry.id.slice(0, 8)} />
            <StatItem label='Category' value={inquiry.category} icon={Building2} />
            <StatItem
              label='Posted'
              value={new Date(inquiry.postedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
              icon={Clock}
            />
          </div>
        </div>
      </motion.div>
    );
  }
);

InquiryCard.displayName = 'InquiryCard';

export { InquiryCard };
