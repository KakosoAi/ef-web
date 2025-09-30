'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Brand {
  name: string;
  slug: string;
  imageUrl: string;
}

// Brands matching the navigation dropdown in the same order
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
    name: 'John Deere',
    slug: 'john-deere',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/john-deere.jpg',
  },
  {
    name: 'Bobcat',
    slug: 'bobcat',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/bobcat.jpg',
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
    name: 'Case',
    slug: 'case',
    imageUrl: 'https://images.equipmentsfinder.com/public/uploads/brands/case.jpg',
  },
];

export default function PopularBrands() {
  return (
    <section className='w-full py-12 bg-background'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4'>
            Popular <span className='text-primary'>Brands</span>
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            Browse equipment from top manufacturers
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {allBrands.map(brand => (
            <Link key={brand.slug} href={`/equipments/rent/${brand.slug}`} className='group block'>
              <div className='bg-card rounded-lg border border-border p-4 hover:border-primary hover:shadow-lg transition-all duration-200 group-hover:scale-105'>
                <div className='relative w-full h-16'>
                  <Image
                    src={brand.imageUrl}
                    alt={`${brand.name} logo`}
                    fill
                    className='object-contain'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw'
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
