"use client";
import {
  UserIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import {
  UserIcon as UserIconOutline,
  Cog6ToothIcon as Cog6ToothIconOutline,
  MagnifyingGlassIcon as MagnifyingGlassIconOutline,
  BookmarkIcon as BookmarkIconOutline,
  HomeIcon as HomeIconOutline,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const TabBar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <div className="w-[100vw] bg-white h-[8vh] bottom-0 fixed z-50">
      <div className="Structure w-full h-full flex justify-between items-center px-4">
        <Link href={`/${status === "authenticated" ? session.user.username : ""}`}>
          <div>
            {pathname === `/${session?.user?.username || ""}` ? (
              <UserIcon className="w-[4vh] h-[4vh] text-gray-800" />
            ) : (
              <UserIconOutline className="w-[4vh] h-[4vh] text-gray-800" />
            )}
          </div>
        </Link>
        <Link href={"/search"}>
          <div>
            {pathname === "/search" ? (
              <MagnifyingGlassIcon className="w-[4vh] h-[4vh] text-gray-800" />
            ) : (
              <MagnifyingGlassIconOutline className="w-[4vh] h-[4vh] text-gray-800" />
            )}
          </div>
        </Link>
        <Link href={"/"}>
          <div>
            {pathname === "/" ? (
              <HomeIcon className="w-[4vh] h-[4vh] text-gray-800" />
            ) : (
              <HomeIconOutline className="w-[4vh] h-[4vh] text-gray-800" />
            )}
          </div>
        </Link>
        <div>
          <BookmarkIconOutline className="w-[4vh] h-[4vh] text-gray-800" />
        </div>
        <Link href={"/settings"}>
          <div>
            {pathname === "/settings" ? (
              <Cog6ToothIcon className="w-[4vh] h-[4vh] text-gray-800" />
            ) : (
              <Cog6ToothIconOutline className="w-[4vh] h-[4vh] text-gray-800" />
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TabBar;
