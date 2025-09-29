'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Brand {
  name: string;
  slug: string;
  imageUrl: string;
}

const allBrands: Brand[] = [
  {
    name: 'Caterpillar',
    slug: 'caterpillar',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/caterpillar.jpg',
  },
  {
    name: 'JCB',
    slug: 'jcb',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/jcb.jpg',
  },
  {
    name: 'Volvo',
    slug: 'volvo',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/volvo.jpg',
  },
  {
    name: 'Other',
    slug: 'other',
    imageUrl:
      'https://images.equipmentsfinder.com/public/uploads/brands/2024409214818131_other.jpg',
  },
  {
    name: 'Komatsu',
    slug: 'komatsu',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/komatsu.jpg',
  },
  {
    name: 'Liebherr',
    slug: 'liebherr',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/liebherr.jpg',
  },
  {
    name: 'JLG',
    slug: 'jlg',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/jlg.jpg',
  },
  {
    name: 'Hyundai',
    slug: 'hyundai',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/hyundai.jpg',
  },
  {
    name: 'Bobcat',
    slug: 'bobcat',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/bobcat.jpg',
  },
  {
    name: 'John Deere',
    slug: 'john-deere',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/john-deere.jpg',
  },
  {
    name: 'Case',
    slug: 'case',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/case.jpg',
  },
  {
    name: 'New Holland',
    slug: 'new-holland',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/new-holland.jpg',
  },
  {
    name: 'Genie',
    slug: 'genie',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/genie.jpg',
  },
  {
    name: 'Haulotte',
    slug: 'haulotte',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/haulotte.jpg',
  },
  {
    name: 'Manitou',
    slug: 'manitou',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/manitou.jpg',
  },
  {
    name: 'Merlo',
    slug: 'merlo',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/merlo.jpg',
  },
  {
    name: 'Skyjack',
    slug: 'skyjack',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/skyjack.jpg',
  },
  {
    name: 'Snorkel',
    slug: 'snorkel',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/snorkel.jpg',
  },
  {
    name: 'Terex',
    slug: 'terex',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/terex.jpg',
  },
  {
    name: 'XCMG',
    slug: 'xcmg',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/xcmg.jpg',
  },
  {
    name: 'Sany',
    slug: 'sany',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/sany.jpg',
  },
  {
    name: 'Zoomlion',
    slug: 'zoomlion',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/zoomlion.jpg',
  },
  {
    name: 'Doosan',
    slug: 'doosan',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/doosan.jpg',
  },
  {
    name: 'Takeuchi',
    slug: 'takeuchi',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/takeuchi.jpg',
  },
];

export default function PopularBrands() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Show first 12 brands initially (2 rows of 6 on desktop)
  const visibleBrands = allBrands.slice(0, 12);
  const collapsibleBrands = allBrands.slice(12);

  return (
    <section className='w-full py-12 bg-background'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-foreground mb-2'>Popular Brands</h2>
          <p className='text-muted-foreground'>Browse equipment from top manufacturers</p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6'>
          {visibleBrands.map(brand => (
            <Link key={brand.slug} href={`/equipments/rent/${brand.slug}`} className='group block'>
              <div className='bg-card rounded-lg border border-border p-4 hover:border-primary hover:shadow-lg transition-all duration-200 group-hover:scale-105'>
                <div className='relative w-full h-16'>
                  <Image
                    src={brand.imageUrl}
                    alt={`${brand.name} logo`}
                    fill
                    className='object-contain'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 16vw'
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {isExpanded && (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6'>
            {collapsibleBrands.map(brand => (
              <Link
                key={brand.slug}
                href={`/equipments/rent/${brand.slug}`}
                className='group block'
              >
                <div className='bg-card rounded-lg border border-border p-4 hover:border-primary hover:shadow-lg transition-all duration-200 group-hover:scale-105'>
                  <div className='relative w-full h-16'>
                    <Image
                      src={brand.imageUrl}
                      alt={`${brand.name} logo`}
                      fill
                      className='object-contain'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 16vw'
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className='text-center'>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='inline-flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-hover transition-colors'
          >
            {isExpanded ? 'View Less' : `View More (${collapsibleBrands.length} more brands)`}
          </button>
        </div>
      </div>
    </section>
  );
}
