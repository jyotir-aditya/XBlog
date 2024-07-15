"use client";
import {
  UserIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const TabBar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="w-[100vw] bg-white h-[8vh] bottom-0 fixed z-50">
      <div className="Structure w-full h-full flex justify-between items-center px-4">
        <Link
          href={`/${status === "authenticated" ? session.user.username : ""}`}
        >
          <div>
            <UserIcon className="w-[4vh] h-[4vh] text-gray-800" />
          </div>
        </Link>
        <Link href={"/search"}>
          <div>
            <MagnifyingGlassIcon className="w-[4vh] h-[4vh] text-gray-800" />
          </div>
        </Link>
        <Link href={"/"}>
          <div>
            <HomeIcon className="w-[4vh] h-[4vh] text-gray-800" />
          </div>
        </Link>
        <div>
          <BookmarkIcon className="w-[4vh] h-[4vh] text-gray-800" />
        </div>
        <Link href={"/settings"}>
          <div>
            <Cog6ToothIcon className="w-[4vh] h-[4vh] text-gray-800" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TabBar;
