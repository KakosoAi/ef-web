'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
  return (
    <div className='w-full h-[380px] rounded-3xl overflow-hidden border shadow-xl'>
      <MapContainer center={center} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={center}>
          <Popup>
            <div className='space-y-1'>
              <div className='font-medium'>Capital Golden Tower, Dubai</div>
              <Link
                href={'https://www.google.com/maps?q=Capital+Golden+Tower,+Dubai'}
                target='_blank'
                className='text-blue-600 hover:underline text-sm'
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
