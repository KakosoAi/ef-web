'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./ContactMap'), {
  ssr: false,
  loading: () => (
    <div className='w-full h-[380px] rounded-3xl overflow-hidden border ring-1 ring-black/5 bg-gray-100 animate-pulse' />
  ),
});

export default function MapClient() {
  return <Map />;
}
