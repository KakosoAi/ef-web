import { memo, useMemo } from 'react';
import Image from 'next/image';
import { Category } from '@/shared/types';

interface CategoryWithImage {
  name: string;
  image: string;
  count: string;
  description: string;
}

const Categories = memo(() => {
  const categories: CategoryWithImage[] = useMemo(
    () => [
      {
        name: 'PLANT & FACILITY EQUIPMENT',
        image: '/assets/categories/plant-facility.svg',
        count: '1,245',
        description: 'Plant and facility equipment',
      },
      {
        name: 'INDUSTRIAL PARTS',
        image: '/assets/categories/industrial-parts.svg',
        count: '887',
        description: 'Industrial parts and components',
      },
      {
        name: 'PROCESS EQUIPMENT',
        image: '/assets/categories/process-equipment.svg',
        count: '672',
        description: 'Process equipment and systems',
      },
      {
        name: 'INDUSTRIAL ROBOTS',
        image: '/assets/categories/industrial-robots.svg',
        count: '1,156',
        description: 'Industrial robots and automation',
      },
      {
        name: 'CONSTRUCTION EQUIPMENT',
        image: '/assets/categories/construction-equipment.svg',
        count: '423',
        description: 'Construction equipment and machinery',
      },
      {
        name: 'MATERIAL HANDLING EQUIPMENT',
        image: '/assets/categories/material-handling.svg',
        count: '534',
        description: 'Material handling equipment',
      },
      {
        name: 'MACHINING EQUIPMENT',
        image: '/assets/categories/machining-equipment.svg',
        count: '298',
        description: 'Machining equipment and tools',
      },
      {
        name: 'COMMERCIAL TRUCKS',
        image: '/assets/categories/commercial-trucks.svg',
        count: '187',
        description: 'Commercial trucks and vehicles',
      },
    ],
    []
  );

  return (
    <section className='py-12 bg-white'>
      <div className='container mx-auto px-4'>
        {/* Categories Grid - Show all 8 categories in horizontal layout */}
        <div className='grid grid-cols-4 lg:grid-cols-8 gap-6 max-w-7xl mx-auto'>
          {categories.map(category => (
            <div key={category.name} className='group cursor-pointer'>
              <div className='flex flex-col items-center text-center space-y-3'>
                {/* Circular image background */}
                <div className='w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-105 transition-all duration-300 overflow-hidden'>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={80}
                    height={80}
                    className='w-full h-full object-cover'
                  />
                </div>
                {/* Category name */}
                <div>
                  <h3 className='text-xs font-medium text-gray-800 leading-tight'>
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Categories.displayName = 'Categories';

export default Categories;
