import React, { useState } from 'react';
import { BellIcon, BookmarkIcon, HomeIcon, MagnifyingGlassIcon,Cog6ToothIcon,UserIcon } from '@heroicons/react/24/outline';

const Dropdown = () => {
   
  return (
    <div className='h-fit w-[18vw] bg-white border shadow-md fixed end-5 z-[99] mt-[9vh]'>
      <div className='ml-6 my-6 flex flex-col gap-6'>
        <div className='text-xl flex gap-2 items-center hover:text-gray-400 cursor-pointer'><HomeIcon className='w-5 h-5 '/>Home</div>
        <div className='text-xl flex gap-2 items-center hover:text-gray-400 cursor-pointer'><UserIcon className='w-5 h-5 '/>Profile</div>
        <div className='text-xl flex gap-2 items-center hover:text-gray-400 cursor-pointer'><MagnifyingGlassIcon className='w-5 h-5 '/>Explore</div>
        <div className='text-xl flex gap-2 items-center hover:text-gray-400 cursor-pointer'><BellIcon className='w-5 h-5 '/>Notification</div>
        <div className='text-xl flex gap-2 items-center hover:text-gray-400 cursor-pointer'><BookmarkIcon className='w-5 h-5 '/>Bookmarks</div>
        <div className='text-xl flex gap-2 items-center hover:text-gray-400 cursor-pointer'><Cog6ToothIcon className='w-5 h-5 '/>Settings</div>
      </div>
    </div>
  )
}

export default Dropdown;