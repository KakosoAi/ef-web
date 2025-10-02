'use client';

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EquipmentAd } from '@/shared/data/equipmentData';
import { Badge } from '@/shared/ui/badge';
import { MapPin, Star, Shield } from 'lucide-react';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons for different equipment categories
const createCustomIcon = (category: string) => {
  const getColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'excavators':
        return '#ef4444'; // red
      case 'wheel loaders':
        return '#3b82f6'; // blue
      case 'skid steers':
        return '#10b981'; // green
      case 'backhoe loaders':
        return '#f59e0b'; // amber
      case 'bulldozers':
        return '#8b5cf6'; // purple
      case 'cranes':
        return '#ec4899'; // pink
      case 'dump trucks':
        return '#6b7280'; // gray
      default:
        return '#6366f1'; // indigo
    }
  };

  const color = getColor(category);

  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50% 50% 50% 0;
        border: 2px solid white;
        transform: rotate(-45deg);
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          color: white;
          font-size: 10px;
          font-weight: bold;
          transform: rotate(45deg);
        ">
          🚜
        </div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

interface MapControllerProps {
  selectedEquipment: EquipmentAd | null;
}

// Component to handle map interactions
function MapController({ selectedEquipment }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (selectedEquipment) {
      map.flyTo([selectedEquipment.location.lat, selectedEquipment.location.lng], 15, {
        duration: 1.5,
      });
    }
  }, [selectedEquipment, map]);

  return null;
}

interface EquipmentMapProps {
  equipment: EquipmentAd[];
  selectedEquipment: EquipmentAd | null;
  onMarkerClick: (equipment: EquipmentAd) => void;
  className?: string;
}

export default function EquipmentMap({
  equipment,
  selectedEquipment,
  onMarkerClick,
  className = '',
}: EquipmentMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  // Center map on NYC area
  const defaultCenter: [number, number] = [40.7128, -74.006];
  const defaultZoom = 11;

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        className='rounded-lg'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <MapController selectedEquipment={selectedEquipment} />

        {equipment.map(item => (
          <Marker
            key={item.id}
            position={[item.location.lat, item.location.lng]}
            icon={createCustomIcon(item.category)}
            eventHandlers={{
              click: () => onMarkerClick(item),
            }}
          >
            <Popup className='equipment-popup'>
              <div className='w-64 p-2'>
                <div className='flex items-start justify-between mb-2'>
                  <h3 className='font-semibold text-sm text-gray-900 leading-tight'>
                    {item.title}
                  </h3>
                  <Badge variant='secondary' className='ml-2 text-xs'>
                    {item.category}
                  </Badge>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-lg font-bold text-blue-600'>{item.price}</span>
                    <Badge
                      variant={item.condition === 'New' ? 'default' : 'outline'}
                      className='text-xs'
                    >
                      {item.condition}
                    </Badge>
                  </div>

                  <div className='flex items-center text-xs text-gray-600'>
                    <MapPin className='w-3 h-3 mr-1' />
                    {item.location.address}, {item.location.city}
                  </div>

                  <div className='flex items-center justify-between text-xs'>
                    <div className='flex items-center'>
                      <Star className='w-3 h-3 mr-1 text-yellow-400 fill-current' />
                      <span>{item.seller.rating}</span>
                      {item.seller.verified && <Shield className='w-3 h-3 ml-1 text-green-500' />}
                    </div>
                    <span className='text-gray-500'>{item.seller.name}</span>
                  </div>

                  {item.specifications.year && (
                    <div className='text-xs text-gray-600'>
                      {item.specifications.year} {item.specifications.brand}{' '}
                      {item.specifications.model}
                      {item.specifications.hours && ` • ${item.specifications.hours} hrs`}
                    </div>
                  )}

                  <p className='text-xs text-gray-700 line-clamp-2 mt-2'>{item.description}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div className='absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-[1000]'>
        <h4 className='text-xs font-semibold mb-2 text-gray-700'>Equipment Types</h4>
        <div className='space-y-1'>
          {['Excavators', 'Wheel Loaders', 'Skid Steers', 'Backhoe Loaders'].map(category => (
            <div key={category} className='flex items-center text-xs'>
              <div
                className='w-3 h-3 rounded-full mr-2 border border-white shadow-sm'
                style={{
                  backgroundColor:
                    category === 'Excavators'
                      ? '#ef4444'
                      : category === 'Wheel Loaders'
                        ? '#3b82f6'
                        : category === 'Skid Steers'
                          ? '#10b981'
                          : '#f59e0b',
                }}
              />
              <span className='text-gray-600'>{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
