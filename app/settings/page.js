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
        <div className="LeftMenu w-full sm:w-[30vw] border-r-2 h-full border-t ">
          <div className="text-3xl sm:text-5xl font-medium font-robo mt-[9vh]">Settings</div>
          <div className="Content mt-[5vh] sm:ml-[2vw]">
            <div className="text-xl bg-slate-100 font-robo py-2 pl-2 flex font-medium items-center justify-between cursor-pointer"> <div className="">Your Account </div><ChevronRightIcon className="w-[20px] h-[20px] mr-2"/></div>
          </div>
        </div>
        <div className="hidden sm:block">
          <YourAccount/>
        </div>
      </div>
    </div>
  );
};

export default page;
