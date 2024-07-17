import LeftMenu from "@/components/Settings/LeftMenu";
import YourAccount from "@/components/Settings/YourAccount";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="ml-[5vw] h-[100vh]">
      <div className="Structure h-full flex">
        {/* <Link href="/settings/editprofile">Open modal</Link>
        <div className="mt-[2vh]">This is content of settings.</div> */}
       <LeftMenu/>
        <div className="hidden sm:block">
          <YourAccount />
        </div>
      </div>
    </div>
  );
};

export default page;
