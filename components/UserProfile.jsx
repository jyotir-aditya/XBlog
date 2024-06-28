"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProfileFeed from "./subComponents/ProfileFeed";
import RightSection from "./RightSection";
import Search from "./Search";

const UserProfile = ({ username }) => {
  const [Profile, setProfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="ml-[10vw]">
      {isLoading && <div className="w-[50vw] h-[100vh]">Loading</div>}
      {Profile && (
        <div className="flex">
          <div className="OutertStructure w-[50vw] mt-[10vh] min-h-[100vh]">
            <div className="bg-slate-300 relative rounded-lg h-[30vh] w-[50vw] ">
              {Profile.coverimageurl&&<Image
                src={Profile.coverimageurl}
                layout="fill"
                className="rounded-lg"
                alt="coverpic"
              />}
              
              <Image
                src={Profile.image}
                height={150}
                width={150}
                alt="user picture"
                className="rounded-full absolute ml-[2vw] bottom-0 translate-y-[50%] border-2 border-white"
              />
            </div>
            <div className="UserDetails ml-[2vw]">
              <h1 className="mt-[11vh] font-semibold font-slab text-[2.5vw]">
                {Profile.name}
              </h1>
              <h2 className="text-xl font-medium text-gray-500">
                {Profile.bio}
              </h2>
            </div>
            <div>
              <ProfileFeed userId={Profile.id} />
            </div>
          </div>
          <div className=" w-[30vw] border-l mt-[7.5vh]   ml-[4vw]">
            <div className="z-50 ml-10">
              <Search />
            </div>

            <div className="sticky w-[25vw] ml-10 h-fit mt-[9vh] top-0 ">
              <RightSection />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
