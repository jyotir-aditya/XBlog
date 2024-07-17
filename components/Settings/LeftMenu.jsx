"use client"
import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const LeftMenu = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [messagePosition, setMessagePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (item) => {setHoveredItem(item);
    setTimeout(() => {
        setHoveredItem(null);
    }, 2000);
  };


  const renderMenuItem = (label, isClickable) => (
    <div
      className={`text-xl font-robo py-2 pl-2 flex font-medium items-center justify-between cursor-${isClickable ? 'pointer' : 'not-allowed'} ${isClickable ? 'sm:bg-slate-100' : ''}`}
      onClick={() => !isClickable && handleMouseEnter(label)}
    //   onClick={(event) => !isClickable && handleClick(label, event)}
    >
      <div>{label}</div>
      <ChevronRightIcon className="w-[20px] h-[20px] mr-2" />
    </div>
  );

  return (
    <div className="LeftMenu w-full sm:w-[30vw] border-r-2 h-full border-t relative">
      <div className="text-3xl sm:text-5xl font-medium font-robo mt-[9vh]">Settings</div>
      <div className="Content flex flex-col gap-4 mt-[5vh] sm:ml-[2vw]">
        <Link href={"/settings/youraccount"}>
          {renderMenuItem("Your Account", true)}
        </Link>
        {renderMenuItem("Notification", false)}
        {renderMenuItem("Membership")}
        {renderMenuItem("Accessibility")}
        {renderMenuItem("Additional resources")}
        {renderMenuItem("Privacy")}
        {renderMenuItem("Help")}
      </div>
      {hoveredItem && (
        <div className="fixed top-16 -translate-x-[5vw] w-[100vw] flex justify-center">
          <div className="bg-gray-800 text-white text-sm p-2  rounded shadow-lg">{hoveredItem} is currently under development.</div>
        </div>
      )}
      
    </div>
  );
};

export default LeftMenu;
