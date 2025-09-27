import { memo, useMemo } from 'react';
import { Button } from '@/shared/ui/button';
// Test comment for pre-commit hook
import {
  Truck,
  Settings,
  Building2,
  Zap,
  Wrench,
  Package,
  Mountain,
  ArrowRight,
} from 'lucide-react';
import { Category } from '@/shared/types';

const Categories = memo(() => {
  const categories: Category[] = useMemo(
    () => [
      {
        name: 'Excavators',
        icon: Settings,
        count: '1,245',
        description: 'Heavy-duty excavators for construction and mining',
      },
      {
        name: 'Cranes',
        icon: Building2,
        count: '887',
        description: 'Mobile and tower cranes for lifting operations',
      },
      {
        name: 'Loaders',
        icon: Package,
        count: '672',
        description: 'Wheel and track loaders for material handling',
      },
      {
        name: 'Trucks',
        icon: Truck,
        count: '1,156',
        description: 'Dump trucks and commercial vehicles',
      },
      {
        name: 'Bulldozers',
        icon: Mountain,
        count: '423',
        description: 'Track-type tractors for earthmoving',
      },
      {
        name: 'Aerial Platforms',
        icon: Zap,
        count: '534',
        description: 'Scissor lifts and boom lifts',
      },
      {
        name: 'Generators',
        icon: Zap,
        count: '298',
        description: 'Portable and stationary power generators',
      },
      {
        name: 'Compactors',
        icon: Wrench,
        count: '187',
        description: 'Soil and asphalt compaction equipment',
      },
    ],
    []
  );

  return (
    <section className='py-12 bg-white'>
      <div className='container mx-auto px-4'>
        {/* Categories Grid - Only show first 4 */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
          {categories.slice(0, 4).map(category => (
            <div key={category.name} className='group cursor-pointer'>
              <div className='bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1'>
                <div className='flex flex-col items-center text-center space-y-4'>
                  <div className='relative'>
                    <div className='p-4 bg-gray-100 rounded-2xl group-hover:bg-gray-200 transition-all duration-300'>
                      <category.icon className='h-8 w-8 text-black' />
                    </div>
                    <div className='absolute -top-1 -right-1 w-6 h-6 bg-black rounded-full flex items-center justify-center'>
                      <span className='text-xs font-bold text-white'>
                        {category.count.toString().slice(-1)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className='font-semibold text-black mb-1 group-hover:text-gray-700 transition-colors'>
                      {category.name}
                    </h3>
                    <p className='text-sm text-gray-600'>{category.count}+ Available</p>
                  </div>
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
