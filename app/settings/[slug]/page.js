import LeftMenu from "@/components/Settings/LeftMenu";
import YourAccount from "@/components/Settings/YourAccount";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const page = ({params}) => {
  return (<div className="sm:block hidden ml-[5vw] h-[100vh]">
    <LeftMenu/>
    </div>
  );
};

export default page;