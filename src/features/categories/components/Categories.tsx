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
        // eslint-disable-next-line no-console
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
    <section className='py-4 bg-background'>
      <div className='container mx-auto px-4'>
        {/* Categories Grid - First 2 rows (always visible) */}
        {loading && (
          <div className='text-center py-8 text-sm text-muted-foreground'>
            Loading categories...
          </div>
        )}

        {!loading && error && (
          <div className='text-center py-8 text-sm text-destructive'>{error}</div>
        )}

        {!loading && !error && (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto'>
            {visibleCategories.map((category, index) => (
              <div key={`${category.name}-${index}`} className='group cursor-pointer'>
                <div className='flex flex-col items-center text-center space-y-3 p-4 rounded-xl hover:bg-muted/80 hover:shadow-md transition-all duration-300 border border-transparent hover:border-border/50'>
                  {/* Professional icon container */}
                  <div className='w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center bg-card rounded-xl group-hover:scale-105 transition-all duration-300'>
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={112}
                      height={112}
                      className='w-24 h-24 sm:w-28 sm:h-28 object-contain'
                    />
                  </div>
                  {/* Category name and count */}
                  <div className='min-h-[2.5rem] flex flex-col items-center justify-center'>
                    <h3 className='text-sm font-semibold text-foreground leading-tight break-words text-center px-1'>
                      {category.name}
                    </h3>
                    {category.count && (
                      <div className='text-xs text-muted-foreground font-medium mt-1'>
                        {category.count}
                      </div>
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
                    <div className='flex flex-col items-center text-center space-y-3 p-4 rounded-xl hover:bg-gray-50/80 hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-200/50'>
                      {/* Professional icon container */}
                      <div className='w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center bg-white rounded-xl group-hover:scale-105 transition-all duration-300'>
                        <Image
                          src={category.image}
                          alt={category.name}
                          width={112}
                          height={112}
                          className='w-24 h-24 sm:w-28 sm:h-28 object-contain'
                        />
                      </div>
                      {/* Category name and count */}
                      <div className='min-h-[2.5rem] flex flex-col items-center justify-center'>
                        <h3 className='text-sm font-semibold text-gray-900 leading-tight break-words text-center px-1'>
                          {category.name}
                        </h3>
                        {category.count && (
                          <div className='text-xs text-gray-600 font-medium mt-1'>
                            {category.count}
                          </div>
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
              className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-50 to-orange-100 backdrop-blur-sm text-orange-700 text-sm font-semibold rounded-lg hover:from-orange-100 hover:to-orange-200 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-orange-200 shadow-md hover:border-orange-300 hover:text-orange-800'
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
