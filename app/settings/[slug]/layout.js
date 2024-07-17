"use client"
import { usePathname } from "next/navigation";
import React from "react";

export default function Layout({youraccount, children }) {
    const pathname = usePathname()
    return (
      <>
      <div className="flex">
      <div className=" w-fit">{children}</div>
      {pathname === "/settings/youraccount"&&
      <div className="">{youraccount}</div>}
      {/* <div className="mt-56">{pathname}</div> */}
        </div>
      </>
    )
  }