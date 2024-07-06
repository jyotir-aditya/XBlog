import YourAccount from "@/components/Settings/YourAccount";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="ml-[5vw] h-[100vh]">
      <div className="Structure h-full flex">
        {/* <Link href="/settings/editprofile">Open modal</Link>
        <div className="mt-[2vh]">This is content of settings.</div> */}
        <div className="LeftMenu w-[30vw] border-r-2 h-full border-t ">
          <div className="text-5xl font-medium font-robo mt-[9vh]">Settings</div>
          <div className="Content mt-[5vh] ml-[2vw]">
            <div className="text-xl font-robo font-medium cursor-pointer"> Your Account</div>
          </div>
        </div>
        <div>
          <YourAccount/>
        </div>
      </div>
    </div>
  );
};

export default page;
