'use client';

import { MapContainer, TileLayer, Marker, Popup, Tooltip, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Link from 'next/link';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function ContactMap() {
  const center: [number, number] = [25.184242, 55.27243];
  const pinSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='44' viewBox='0 0 32 44'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stop-color='#f97316'/>
          <stop offset='100%' stop-color='#f59e0b'/>
        </linearGradient>
      </defs>
      <path d='M16 0C8 0 2 6.5 2 14.5c0 9.2 12.1 28.4 13.1 29.9.5.7 1.3.7 1.8 0C17.9 42.9 30 23.7 30 14.5 30 6.5 24 0 16 0z' fill='url(#g)'/>
      <circle cx='16' cy='14.5' r='5' fill='#ffffff'/>
    </svg>
  `;
  const orangeIcon = L.icon({
    iconUrl: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(pinSvg),
    iconSize: [32, 44],
    iconAnchor: [16, 42],
    popupAnchor: [0, -40],
  });
  return (
    <div className='w-full h-[820px] overflow-hidden saturate-125 [filter:hue-rotate(330deg)]'>
      <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        />
        <Circle
          center={center}
          radius={60}
          pathOptions={{ color: '#f97316', fillColor: '#f97316', fillOpacity: 0.1 }}
        />
        <Marker position={center} icon={orangeIcon}>
          <Tooltip direction='top' offset={[0, -40]} permanent>
            Capital Golden Tower, Dubai
          </Tooltip>
          <Popup>
            <div className='space-y-1'>
              <div className='font-medium'>Capital Golden Tower, Dubai</div>
              <Link
                href={'https://www.google.com/maps?q=Capital+Golden+Tower,+Dubai'}
                target='_blank'
                className='text-orange-600 hover:underline text-sm'
              >
                Open Google Maps
              </Link>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
