"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Feed from "./Feed";
import RightSection from "./RightSection";
import FilterCategories from "./subComponents/FilterCategories";
import Search from "./Search";
import { FunnelIcon } from "@heroicons/react/24/outline";

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: session, status } = useSession();

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="flex min-h-[100vh]  bg-white ">
          <div>
            {/* <div className="Filter mt-[50px] sm:mt-[7.5vh] fixed z-50 ">
              <FilterCategories
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div> */}
            <div className="Feed mt-[58px] sm:mt-[80px] mb-[9vh] sm:mb-4">
              <Feed selectedCategory={selectedCategory} />
            </div>
          </div>
          <div className="Structure hidden sm:block  border-l w-full sm:w-[30vw] mt-[7.8vh] ">
            {/* <div
              className="mb-5 fixed z-50 w-[30vw] "
              style={{ transform: `translateY(${offset}px)`}}
            > */}
            <div className="pl-10">
              <Search
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>

            {/* </div> */}
            <div className="RightSection sticky -top-16  mt-[9vh] h-fit  w-[25vw] ml-10 overflow-hidden">
              <RightSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
