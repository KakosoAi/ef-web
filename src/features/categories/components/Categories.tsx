import Image from 'next/image';
import { memo, useMemo, useState } from 'react';

interface CategoryWithImage {
  name: string;
  image: string;
  count: string;
  description: string;
}

const Categories = memo(() => {
  const [isExpanded, setIsExpanded] = useState(false);

  const allCategories: CategoryWithImage[] = useMemo(
    () => [
      // Row 1 - Original categories (always visible)
      {
        name: 'Ariel Platforms',
        image: '/assets/categories/ariel-platforms.png',
        count: '1,245',
        description: 'Aerial work platforms and lifts',
      },
      {
        name: 'Attachments',
        image: '/assets/categories/attachments.png',
        count: '887',
        description: 'Equipment attachments and accessories',
      },
      {
        name: 'Backhoe Loaders',
        image: '/assets/categories/backhoe-loaders.png',
        count: '672',
        description: 'Backhoe loaders and excavators',
      },
      {
        name: 'Boom Loaders',
        image: '/assets/categories/boom-loader.png',
        count: '1,156',
        description: 'Boom loaders and telehandlers',
      },
      {
        name: 'Compactors',
        image: '/assets/categories/compactors.png',
        count: '423',
        description: 'Compaction equipment and rollers',
      },
      {
        name: 'Compressors',
        image: '/assets/categories/compressors.png',
        count: '534',
        description: 'Air compressors and pneumatic systems',
      },
      {
        name: 'Container Stackers',
        image: '/assets/categories/container-stackers.png',
        count: '298',
        description: 'Container handling equipment',
      },
      {
        name: 'Cranes',
        image: '/assets/categories/cranes.png',
        count: '187',
        description: 'Mobile and tower cranes',
      },
      // Row 2 - Additional categories (collapsible)
      {
        name: 'Crushers',
        image: '/assets/categories/crushers.png',
        count: '892',
        description: 'Crushing and screening equipment',
      },
      {
        name: 'Dozers',
        image: '/assets/categories/dozers.png',
        count: '1,134',
        description: 'Bulldozers and crawler tractors',
      },
      {
        name: 'Excavators',
        image: '/assets/categories/excavators.png',
        count: '456',
        description: 'Hydraulic excavators and diggers',
      },
      {
        name: 'Forklifts',
        image: '/assets/categories/forklifts.png',
        count: '789',
        description: 'Forklifts and material handling',
      },
      {
        name: 'Generators',
        image: '/assets/categories/generators.png',
        count: '623',
        description: 'Power generators and diesel sets',
      },
      {
        name: 'Motor Graders',
        image: '/assets/categories/motor-graders.png',
        count: '967',
        description: 'Motor graders and road equipment',
      },
      {
        name: 'Other Equipment',
        image: '/assets/categories/other-equipments.png',
        count: '334',
        description: 'Specialized equipment and tools',
      },
      {
        name: 'Skid Steers',
        image: '/assets/categories/skid-steers.png',
        count: '278',
        description: 'Skid steer loaders and attachments',
      },
      // Row 3 - More specialized categories (collapsible)
      {
        name: 'Trailers',
        image: '/assets/categories/trailers.png',
        count: '512',
        description: 'Equipment trailers and haulers',
      },
      {
        name: 'Trucks',
        image: '/assets/categories/trucks.png',
        count: '389',
        description: 'Commercial trucks and vehicles',
      },
      {
        name: 'Vehicle Buses',
        image: '/assets/categories/vehicle-buses.png',
        count: '445',
        description: 'Passenger buses and transport',
      },
      {
        name: 'Wheel Loaders',
        image: '/assets/categories/wheel-loaders.png',
        count: '267',
        description: 'Wheel loaders and front loaders',
      },
      // Additional categories to fill up to 20
      {
        name: 'Concrete Equipment',
        image: '/assets/categories/other-equipments.png',
        count: '198',
        description: 'Concrete mixers and pumps',
      },
      {
        name: 'Asphalt Equipment',
        image: '/assets/categories/other-equipments.png',
        count: '156',
        description: 'Asphalt pavers and equipment',
      },
      {
        name: 'Drilling Equipment',
        image: '/assets/categories/other-equipments.png',
        count: '234',
        description: 'Drilling rigs and equipment',
      },
      {
        name: 'Tunneling Equipment',
        image: '/assets/categories/other-equipments.png',
        count: '345',
        description: 'Tunnel boring and equipment',
      },
    ],
    []
  );

  // Split categories into visible and collapsible sections
  const visibleCategories = allCategories.slice(0, 12); // First 2 rows (always visible)
  const collapsibleCategories = allCategories.slice(12); // Remaining categories (collapsible)

  return (
    <section className='py-4 bg-white'>
      <div className='container mx-auto px-4'>
        {/* Categories Grid - First 2 rows (always visible) */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto'>
          {visibleCategories.map((category, index) => (
            <div key={`${category.name}-${index}`} className='group cursor-pointer'>
              <div className='flex flex-col items-center text-center space-y-2 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300'>
                {/* Square image - 50% larger size */}
                <div className='w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center group-hover:scale-105 transition-all duration-300'>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={144}
                    height={144}
                    className='w-full h-full object-contain'
                  />
                </div>
                {/* Category name and count - No gap */}
                <div className='min-h-[2rem] flex flex-col items-center justify-center'>
                  <h3 className='text-sm font-medium text-gray-800 leading-tight line-clamp-2'>
                    {category.name}
                  </h3>
                  <div className='text-xs text-gray-500 font-medium'>{category.count}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collapsible section for remaining categories */}
        <div
          className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className='min-h-0'>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto'>
              {collapsibleCategories.map((category, index) => (
                <div key={`${category.name}-${index + 8}`} className='group cursor-pointer'>
                  <div className='flex flex-col items-center text-center space-y-2 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300'>
                    {/* Square image - 50% larger size */}
                    <div className='w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center group-hover:scale-105 transition-all duration-300'>
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={144}
                        height={144}
                        className='w-full h-full object-contain'
                      />
                    </div>
                    {/* Category name and count - No gap */}
                    <div className='min-h-[2rem] flex flex-col items-center justify-center'>
                      <h3 className='text-sm font-medium text-gray-800 leading-tight line-clamp-2'>
                        {category.name}
                      </h3>
                      <div className='text-xs text-gray-500 font-medium'>{category.count}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View More / View Less Button */}
        <div className='text-center mt-8'>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200'
          >
            {isExpanded ? 'View Less' : `View More (${collapsibleCategories.length} more)`}
            <svg
              className={`ml-2 w-4 h-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              strokeWidth={2}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
});

Categories.displayName = 'Categories';

export default Categories;
