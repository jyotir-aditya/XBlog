import {
  UserIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import React from "react";

const TabBar = () => {
  return (
    <div className="w-[100vw] bg-white h-[8vh] bottom-0 fixed z-50">
      <div className="Structure w-full h-full flex justify-between items-center px-4">
        <div>
          <UserIcon className="w-[4vh] h-[4vh] text-gray-800" />
        </div>
        <div>
          <MagnifyingGlassIcon className="w-[4vh] h-[4vh] text-gray-800" />
        </div>
        <div>
          <HomeIcon className="w-[4vh] h-[4vh] text-gray-800" />
        </div>
        <div>
          <BookmarkIcon className="w-[4vh] h-[4vh] text-gray-800" />
        </div>
        <div>
          <Cog6ToothIcon className="w-[4vh] h-[4vh] text-gray-800" />
        </div>
      </div>
    </div>
  );
};

export default TabBar;
