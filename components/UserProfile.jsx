"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProfileFeed from "./subComponents/ProfileFeed";
import RightSection from "./RightSection";
import Search from "./Search";

const UserProfile = ({ username }) => {
  const [Profile, setProfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function checkDevice(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      return "mobile";
    }else{
      return "not mobile";
    }
    return "not found";
  }

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/query/profile/${username}`);
        const profile = await response.json();
        setProfile(profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="sm:ml-[10vw] ml-[5vw] mr-">
      {isLoading && <div className="w-[50vw] h-[100vh]">Loading</div>}
      {Profile && (
        <div className="flex">
          <div className="OutertStructure w-[100vw] sm:w-[50vw] mt-[10vh] min-h-[100vh]">
            <div className="bg-slate-300 relative rounded-lg sm:h-[30vh] h-[150px] sm:w-[50vw] w-[90vw] ">
              {Profile.coverimageurl&&<Image
                src={Profile.coverimageurl}
                height={300}
                width={300}
                className="rounded-lg h-full w-full"
                alt="coverpic"
              />}
              
              <Image
                src={Profile.image}
                height={150}
                width={150}
                alt="user picture"
                className="rounded-full hidden sm:block absolute ml-[2vw] bottom-0 translate-y-[50%] border-2 border-white"
              />
              {/* for mobile */}
              <Image
                src={Profile.image}
                height={100}
                width={100}
                alt="user picture"
                className="rounded-full  sm:hidden absolute ml-[2vw] bottom-0 translate-y-[50%] border-2 border-white"
              />
            </div>
            <div className="UserDetails h-fit ml-[2vw] mb-[30px]">
              <h1 className="sm:mt-[11vh] mt-[3.5rem] font-semibold font-slab text-3xl sm:text-[2.5vw]">
                {Profile.name}
              </h1>
              <h2 className="sm:text-xl text-lg  font-medium text-gray-500">
                {Profile.bio}
              </h2>
            </div>
            <div className="mb-[60px]">
              <ProfileFeed userId={Profile.id} />
            </div>
          </div>
          <div className=" hidden sm:block w-[30vw] border-l mt-[7.5vh]   ml-[4vw]">
            <div className="z-50 ml-10">
              <Search />
            </div>

            <div className="RightSection sticky -top-16  mt-[9vh] h-fit  w-[25vw] ml-10 overflow-hidden">
              {checkDevice()=="not mobile"&&<RightSection />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
