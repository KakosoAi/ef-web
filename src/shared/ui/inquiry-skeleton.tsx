import { Skeleton } from '@/shared/ui/skeleton';

// Skeleton for inquiry cards in grid view
export function InquiryCardSkeleton({
  featured = false,
  promoted = false,
}: {
  featured?: boolean;
  promoted?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${
        featured ? 'md:col-span-2 lg:col-span-2' : promoted ? 'md:col-span-1 lg:col-span-1' : ''
      }`}
    >
      {/* Header Section */}
      <div className='p-6 border-b border-gray-100'>
        <div className='flex items-center justify-center mb-4'>
          <Skeleton className='h-16 w-16 rounded-full' />
        </div>
        <div className='text-center'>
          <Skeleton className='h-6 w-24 mx-auto mb-2' />
        </div>
      </div>

      {/* Body Section */}
      <div className='p-6'>
        <div className='text-center mb-4'>
          <Skeleton className='h-6 w-3/4 mx-auto mb-2' />
          <Skeleton className='h-4 w-1/2 mx-auto mb-2' />
          <Skeleton className='h-4 w-2/3 mx-auto' />
        </div>

        <div className='space-y-3 mb-4'>
          <div className='flex items-center justify-center gap-2'>
            <Skeleton className='h-4 w-4' />
            <Skeleton className='h-4 w-20' />
          </div>
          <div className='flex items-center justify-center gap-2'>
            <Skeleton className='h-4 w-4' />
            <Skeleton className='h-4 w-24' />
          </div>
        </div>

        <div className='text-center mb-4'>
          <Skeleton className='h-8 w-24 mx-auto' />
        </div>
      </div>

      {/* Footer Section */}
      <div className='px-6 py-4 bg-gray-50 border-t border-gray-100'>
        <Skeleton className='h-4 w-20' />
      </div>
    </div>
  );
}

// Skeleton for inquiry cards in list view
export function InquiryListSkeleton() {
  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
      <div className='flex items-start gap-4 p-6'>
        {/* Category Icon */}
        <div className='flex-shrink-0'>
          <Skeleton className='h-12 w-12 rounded-full' />
        </div>

        {/* Main Content */}
        <div className='flex-1 min-w-0'>
          {/* Header */}
          <div className='flex items-start justify-between mb-3'>
            <div className='flex-1'>
              <Skeleton className='h-6 w-3/4 mb-2' />
              <Skeleton className='h-4 w-20 mb-1' />
            </div>
            <Skeleton className='h-8 w-24 ml-4' />
          </div>

          {/* Body */}
          <div className='space-y-2 mb-4'>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-4' />
              <Skeleton className='h-4 w-32' />
            </div>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-4' />
              <Skeleton className='h-4 w-28' />
            </div>
          </div>

          {/* Footer */}
          <div className='flex items-center justify-between'>
            <Skeleton className='h-4 w-24' />
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-8' />
              </div>
              <div className='flex items-center gap-1'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-8' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton for inquiry detail page
export function InquiryDetailSkeleton() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        {/* Breadcrumb */}
        <div className='mb-6'>
          <Skeleton className='h-4 w-64' />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Header Card */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <div className='flex items-start gap-4 mb-6'>
                <Skeleton className='h-16 w-16 rounded-full' />
                <div className='flex-1'>
                  <Skeleton className='h-8 w-3/4 mb-2' />
                  <Skeleton className='h-4 w-32 mb-2' />
                  <div className='flex items-center gap-4'>
                    <Skeleton className='h-4 w-20' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className='text-center'>
                    <Skeleton className='h-8 w-full mb-1' />
                    <Skeleton className='h-4 w-16 mx-auto' />
                  </div>
                ))}
              </div>
            </div>

            {/* Description Card */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <Skeleton className='h-6 w-32 mb-4' />
              <div className='space-y-3'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-3/4' />
              </div>
            </div>

            {/* Equipment Details Card */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <Skeleton className='h-6 w-40 mb-4' />
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className='h-4 w-24 mb-2' />
                    <Skeleton className='h-4 w-32' />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Contact Card */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <Skeleton className='h-6 w-32 mb-4' />
              <div className='space-y-4'>
                <div>
                  <Skeleton className='h-4 w-20 mb-2' />
                  <Skeleton className='h-4 w-32' />
                </div>
                <div>
                  <Skeleton className='h-4 w-16 mb-2' />
                  <Skeleton className='h-4 w-40' />
                </div>
                <div>
                  <Skeleton className='h-4 w-20 mb-2' />
                  <Skeleton className='h-4 w-36' />
                </div>
              </div>
              <Skeleton className='h-10 w-full mt-6' />
            </div>

            {/* Project Details Card */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <Skeleton className='h-6 w-32 mb-4' />
              <div className='space-y-4'>
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className='h-4 w-20 mb-2' />
                    <Skeleton className='h-4 w-28' />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
