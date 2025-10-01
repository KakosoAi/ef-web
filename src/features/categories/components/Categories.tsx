import Image from 'next/image';
import { memo, useEffect, useMemo, useState } from 'react';

interface CategoryWithImage {
  name: string;
  image: string;
  count?: string;
  description?: string;
}

const Categories = memo(() => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dbCategories, setDbCategories] = useState<CategoryWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/categories', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Categories data is not available');
        }
        const json = await res.json();
        const categories: CategoryWithImage[] = json?.categories ?? [];
        if (mounted) {
          setDbCategories(categories.map(c => ({ ...c, count: '', description: '' })));
        }
      } catch (err) {
        console.error('Failed to load categories', err);
        if (mounted) setError('Categories data is not available');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const allCategories: CategoryWithImage[] = useMemo(() => dbCategories, [dbCategories]);

  // Split categories into visible and collapsible sections
  const visibleCategories = allCategories.slice(0, 12); // First 2 rows (always visible)
  const collapsibleCategories = allCategories.slice(12); // Remaining categories (collapsible)
  const moreCount = Math.max(0, allCategories.length - 12);

  return (
    <section className='py-4 bg-white'>
      <div className='container mx-auto px-4'>
        {/* Categories Grid - First 2 rows (always visible) */}
        {loading && (
          <div className='text-center py-8 text-sm text-gray-500'>Loading categories...</div>
        )}

        {!loading && error && <div className='text-center py-8 text-sm text-red-600'>{error}</div>}

        {!loading && !error && (
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
                    {category.count && (
                      <div className='text-xs text-gray-500 font-medium'>{category.count}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Collapsible section for remaining categories */}
        {!loading && !error && (
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
                        {category.count && (
                          <div className='text-xs text-gray-500 font-medium'>{category.count}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View More / View Less Button */}
        {!loading && !error && moreCount > 0 && (
          <div className='text-center mt-8'>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className='inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200'
            >
              {isExpanded ? 'View Less' : `View More (${moreCount} more)`}
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
        )}
      </div>
    </section>
  );
});

Categories.displayName = 'Categories';

export default Categories;
