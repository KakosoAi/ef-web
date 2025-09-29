import Image from 'next/image';
import { memo } from 'react';

const BannerIraqConstruct = memo(() => {
  return (
    <div className='flex justify-center py-4'>
      <div className='relative w-full max-w-6xl h-48 md:h-56 lg:h-64 overflow-hidden rounded-lg'>
        <Image
          src='https://www.equipmentsfinder.com/_next/image?url=%2Fbanner%2Fconstruct-iraq.png&w=3840&q=75'
          alt='Construction Iraq Banner'
          fill
          className='object-cover'
          priority={false}
          sizes='(max-width: 1280px) 100vw, 1280px'
        />
      </div>
    </div>
  );
});

BannerIraqConstruct.displayName = 'BannerIraqConstruct';

export { BannerIraqConstruct };
