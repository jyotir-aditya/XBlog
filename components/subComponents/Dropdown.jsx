"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  BellIcon,
  BookmarkIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const Dropdown = ({ onLinkClick }) => {
  const { data: session, status } = useSession();

  return (
    <div className="h-fit w-[18vw] bg-white border shadow-md fixed end-5 z-[99] mt-[9vh]">
      <div className="ml-6 my-6 flex flex-col gap-6">
        <Link
          href={`/${status === "authenticated" ? session.user.username : ""}`}
        >
          <div
            onClick={onLinkClick}
            className="text-xl flex gap-2 items-center hover:text-gray-400 cursor-pointer"
          >
            <UserIcon className="w-5 h-5 " /> Profile
          </div>
        </Link>
        <Link href={"/search"}>
          <div
            onClick={onLinkClick}
            className="text-xl flex gap-2 items-center hover:text-gray-400 cursor-pointer"
          >
            <MagnifyingGlassIcon className="w-5 h-5 " />
            Explore
          </div>
        </Link>
        <div className="text-xl flex gap-2 items-center hover:text-gray-400 cursor-pointer">
          <BellIcon className="w-5 h-5 " />
          Notification
        </div>
        <div className="text-xl flex gap-2 items-center hover:text-gray-400 cursor-pointer">
          <BookmarkIcon className="w-5 h-5 " />
          Bookmarks
        </div>
        <Link href={"/settings"}>
          <div
            onClick={onLinkClick}
            className="text-xl flex gap-2 items-center hover:text-gray-400 cursor-pointer"
          >
            <Cog6ToothIcon className="w-5 h-5 " />
            Settings
          </div>
        </Link>
      </div>
      <div className="border mb-4 mx-8 border-black"></div>
      <div className="mb-6 flex flex-col justify-center items-center">
        <div className="text-green-600 text-sm font-robo cursor-default mb-1">
          {status === "authenticated" && session.user.email}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
          className="hover:text-gray-400"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
