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
      // Row 1 - Original categories
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
      // Row 2 - Additional categories
      {
        name: 'MINING EQUIPMENT',
        image: '/assets/categories/plant-facility.svg',
        count: '892',
        description: 'Mining and quarrying equipment',
      },
      {
        name: 'AGRICULTURAL EQUIPMENT',
        image: '/assets/categories/industrial-parts.svg',
        count: '1,134',
        description: 'Farm and agricultural machinery',
      },
      {
        name: 'FORESTRY EQUIPMENT',
        image: '/assets/categories/process-equipment.svg',
        count: '456',
        description: 'Forestry and logging equipment',
      },
      {
        name: 'WELDING EQUIPMENT',
        image: '/assets/categories/industrial-robots.svg',
        count: '789',
        description: 'Welding and cutting equipment',
      },
      {
        name: 'POWER GENERATION',
        image: '/assets/categories/construction-equipment.svg',
        count: '623',
        description: 'Generators and power systems',
      },
      {
        name: 'COMPRESSORS & PUMPS',
        image: '/assets/categories/material-handling.svg',
        count: '967',
        description: 'Air compressors and industrial pumps',
      },
      {
        name: 'OIL & GAS EQUIPMENT',
        image: '/assets/categories/machining-equipment.svg',
        count: '334',
        description: 'Oil field and gas equipment',
      },
      {
        name: 'MARINE EQUIPMENT',
        image: '/assets/categories/commercial-trucks.svg',
        count: '278',
        description: 'Marine and offshore equipment',
      },
      // Row 3 - More specialized categories
      {
        name: 'CONCRETE EQUIPMENT',
        image: '/assets/categories/plant-facility.svg',
        count: '512',
        description: 'Concrete mixers and pumps',
      },
      {
        name: 'ASPHALT EQUIPMENT',
        image: '/assets/categories/industrial-parts.svg',
        count: '389',
        description: 'Asphalt pavers and equipment',
      },
      {
        name: 'DRILLING EQUIPMENT',
        image: '/assets/categories/process-equipment.svg',
        count: '445',
        description: 'Drilling rigs and equipment',
      },
      {
        name: 'CRUSHING EQUIPMENT',
        image: '/assets/categories/industrial-robots.svg',
        count: '267',
        description: 'Crushers and screening equipment',
      },
      {
        name: 'TUNNELING EQUIPMENT',
        image: '/assets/categories/construction-equipment.svg',
        count: '198',
        description: 'Tunnel boring and equipment',
      },
      {
        name: 'RAILWAY EQUIPMENT',
        image: '/assets/categories/material-handling.svg',
        count: '156',
        description: 'Railway maintenance equipment',
      },
      {
        name: 'BRIDGE EQUIPMENT',
        image: '/assets/categories/machining-equipment.svg',
        count: '234',
        description: 'Bridge construction equipment',
      },
      {
        name: 'DEMOLITION EQUIPMENT',
        image: '/assets/categories/commercial-trucks.svg',
        count: '345',
        description: 'Demolition and recycling equipment',
      },
    ],
    []
  );

  return (
    <section className='py-12 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>Equipment Categories</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Browse our extensive selection of industrial equipment across multiple categories
          </p>
        </div>

        {/* Categories Grid - Show all 24 categories in 3 rows */}
        <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 max-w-7xl mx-auto'>
          {categories.map((category, index) => (
            <div key={`${category.name}-${index}`} className='group cursor-pointer'>
              <div className='flex flex-col items-center text-center space-y-2 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300'>
                {/* Circular image background */}
                <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center group-hover:scale-105 transition-all duration-300 overflow-hidden bg-gray-100'>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={80}
                    height={80}
                    className='w-full h-full object-cover'
                  />
                </div>
                {/* Category name */}
                <div className='min-h-[2.5rem] flex items-center'>
                  <h3 className='text-xs font-medium text-gray-800 leading-tight line-clamp-2'>
                    {category.name}
                  </h3>
                </div>
                {/* Equipment count */}
                <div className='text-xs text-gray-500 font-medium'>{category.count}</div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className='text-center mt-8'>
          <button className='inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200'>
            View All Categories
            <svg className='ml-2 w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
});

Categories.displayName = 'Categories';

export default Categories;
