'use client';

import { useId } from 'react';
import { Input } from '@/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Button } from '@/shared/ui/button';
import { Search } from 'lucide-react';

export default function SearchWithCategory() {
  const id = useId();

  return (
    <div className='mx-auto max-w-4xl'>
      <div className='flex rounded-lg shadow-lg bg-white border border-gray-300 overflow-hidden'>
        {/* Category selector */}
        <Select>
          <SelectTrigger className='h-12 w-[180px] rounded-none border-0 text-sm bg-white shadow-none border-r border-gray-300 font-medium text-gray-700 hover:bg-gray-50 transition-colors'>
            <SelectValue placeholder='Category' />
          </SelectTrigger>
          <SelectContent className='border-gray-300'>
            <SelectItem value='all' className='text-sm'>
              All Equipment
            </SelectItem>
            <SelectItem value='excavators' className='text-sm'>
              Excavators
            </SelectItem>
            <SelectItem value='bulldozers' className='text-sm'>
              Bulldozers
            </SelectItem>
            <SelectItem value='cranes' className='text-sm'>
              Cranes
            </SelectItem>
            <SelectItem value='loaders' className='text-sm'>
              Loaders
            </SelectItem>
            <SelectItem value='trucks' className='text-sm'>
              Trucks
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Search input */}
        <Input
          id={id}
          type='text'
          placeholder='Search equipment, brand, or model...'
          className='h-12 flex-1 rounded-none text-sm border-0 shadow-none bg-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 font-normal px-4'
        />

        {/* Search button */}
        <Button
          type='submit'
          className='h-12 rounded-none px-6 text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white shadow-none border-0 transition-colors duration-200'
        >
          <Search className='h-4 w-4 mr-2' />
          Search
        </Button>
      </div>
    </div>
  );
}
