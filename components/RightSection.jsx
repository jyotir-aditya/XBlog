import React, { useEffect, useState } from "react";
import FeedUsers from "./subComponents/FeedUsers";
import Search from "./Search";
import Trending from "./subComponents/Trending";
import Footer from "./subComponents/Footer";

const RightSection = () => {

  return (
    <div className="Structure">
      <div className="">
        <FeedUsers />
        <Trending/>
        <Footer/>
      </div>
    </div>
  );
};

export default RightSection;
