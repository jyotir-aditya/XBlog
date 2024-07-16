"use client"
import { UserIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const YourAccount = () => {
  return (
    <div className="mt-[9vh] ml-[5vw]">
      <div className="text-5xl font-medium tracking-tighter font-robo">Your Account</div>
      <div className="Content mt-[5.5vh]">
        <Link href={"/settings/editprofile"} ><motion.div whileHover={{scale:1.1}} className="flex gap-2 ml-4 py-2 hover:text-stone-700 "><UserIcon className="w-[25px] h-[25px] " /><div className="text-xl font-robo ">Account Information</div> </motion.div></Link>
      </div>
    </div>
  );
};

export default YourAccount;
