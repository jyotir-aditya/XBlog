"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Feed from "./Feed";
import RightSection from "./RightSection";
import FilterCategories from "./subComponents/FilterCategories";
import Search from "./Search";

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [deviceType, setDeviceType] = useState("not found");
  const { data: session, status } = useSession();

  useEffect(() => {
    function checkDevice() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return "mobile";
      } else {
        return "not mobile";
      }
    }
    setDeviceType(checkDevice());
  }, []);

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="flex min-h-[100vh] bg-white">
          <div>
            <div className="Feed mt-[58px] sm:mt-[80px] mb-[9vh] sm:mb-4">
              <Feed selectedCategory={selectedCategory} />
            </div>
          </div>
          {deviceType === "not mobile" && (
            <div className="Structure hidden sm:block border-l w-full sm:w-[30vw] mt-[7.8vh]">
              <div className="pl-10">
                <Search
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
              <div className="RightSection sticky -top-16 mt-[9vh] h-fit w-[25vw] ml-10 overflow-hidden">
                <RightSection />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
