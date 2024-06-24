"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Feed from "./Feed";
import RightSection from "./RightSection";
import FilterCategories from "./subComponents/FilterCategories";
import Search from "./Search";

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: session, status } = useSession();
  // const [scrollY, setScrollY] = useState(0);
  // const [prevScrollY, setPrevScrollY] = useState(0);
  // const [offset, setOffset] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     const scrollDiff = currentScrollY - prevScrollY;

  //     setOffset((prevOffset) => {
  //       const newOffset = prevOffset - scrollDiff;
  //       return Math.max(Math.min(newOffset, 0), -60); // Limit offset between -60 and 0
  //     });

  //     setPrevScrollY(currentScrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [prevScrollY]);

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="flex min-h-[100vh]  bg-white ">
          <div>
            <div className="Filter mt-[7.5vh] fixed z-50 ">
              <FilterCategories
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
            <div className="Feed mt-[18vh]">
              <Feed selectedCategory={selectedCategory} />
            </div>
          </div>
          <div className="Structure w-[30vw] mt-[7.8vh] ">
            {/* <div
              className="mb-5 fixed z-50 w-[30vw] "
              style={{ transform: `translateY(${offset}px)`}}
            > */}
              <Search />
            {/* </div> */}
            <div className="RightSection sticky  top-10 mt-[9vh] h-[80vh]  w-[25vw] ml-10">
              <RightSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
