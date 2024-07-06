import Link from "next/link";
import React from "react";

const YourAccount = () => {
  return (
    <div className="mt-[9vh] ml-[5vw]">
      <div className="text-5xl font-medium tracking-tighter font-robo">Your Account</div>
      <div className="Content mt-[5vh]">
        <div className="text-xl ml-[2vw] font-robo"><Link href={"/settings/editprofile"} >Account Information</Link></div>
      </div>
    </div>
  );
};

export default YourAccount;
