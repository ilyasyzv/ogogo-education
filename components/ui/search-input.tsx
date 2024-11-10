'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchInput = () => {
  const [search, setSearch] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (search !== '') {
      router.push(`/blogs?title=${search}`);
    } else {
      router.push('/blogs');
    }
  }, [search, router]);

  return (
    <div className='flex items-center justify-between gap-2 sm:justify-start sm:gap-4'>
      <div className='relative'>
        <span className='absolute left-0 h-full content-center'>
          <MagnifyingGlassIcon className='text-[#B0B0B0] ~w-5/6' />
        </span>

        <input
          className='h-full border-b border-grey-500 border-b-stone-500 py-2 text-sm outline-none ~ps-6/8 ~pe-1/2'
          type='search'
          name='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search...'
        />
      </div>
    </div>
  );
};
export default SearchInput;
