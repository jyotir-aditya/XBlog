"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProfileFeed from "./subComponents/ProfileFeed";
import RightSection from "./RightSection";
import Search from "./Search";

const UserProfile = ({ username , data }) => {
  const [deviceType, setdeviceType] = useState("");
  useEffect(() => {
    function checkDevice(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      return "mobile";
    }else{
      return "not mobile";
    }
    return "not found";
  }
  setdeviceType(checkDevice());
  }, [])
  

  return (
    <div className="sm:ml-[10vw] ml-[5vw]">
      {data && (
        <div className="flex">
          <div className="OutertStructure w-[100vw] sm:w-[50vw] mt-[10vh] min-h-[100vh]">
            <div className="bg-slate-300 relative rounded-lg sm:h-[30vh] h-[150px] sm:w-[50vw] w-[90vw] ">
              {data.coverimageurl&&<Image
                src={data.coverimageurl}
                height={300}
                width={300}
                className="rounded-lg h-full w-full"
                alt="coverpic"
              />}
              
              <Image
                src={data.image}
                height={150}
                width={150}
                alt="user picture"
                className="rounded-full hidden sm:block absolute ml-[2vw] bottom-0 translate-y-[50%] border-2 border-white"
              />
              {/* for mobile */}
              <Image
                src={data.image}
                height={100}
                width={100}
                alt="user picture"
                className="rounded-full  sm:hidden absolute ml-[2vw] bottom-0 translate-y-[50%] border-2 border-white"
              />
            </div>
            <div className="UserDetails h-fit ml-[2vw] mb-[30px]">
              <h1 className="sm:mt-[11vh] mt-[3.5rem] font-semibold font-slab text-3xl sm:text-[2.5vw]">
                {data.name}
              </h1>
              <h2 className="sm:text-xl text-lg  font-medium text-gray-500">
                {data.bio}
              </h2>
            </div>
            <div className="mb-[70px]">
              <ProfileFeed userId={data.id} />
            </div>
          </div>
          <div className=" hidden sm:block w-[30vw] border-l mt-[7.5vh]   ml-[4vw]">
            <div className="z-50 ml-10">
              <Search />
            </div>

            <div className="RightSection sticky -top-20  mt-[9vh] h-fit  w-[25vw] ml-10 overflow-hidden">
              {deviceType =="not mobile"&&<RightSection />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
