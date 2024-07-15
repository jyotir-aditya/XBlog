"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Landing = () => {
  const { data: session } = useSession();
  return (
    <div className="w-full h-full border-t bg-gradient-to-l from-sky-100 to-green-100 overflow-hidden">
      <div className="w-full h-full  ">
        <div className="sm:mt-[18vh] mt-[25vh] ml-[5vw]">
          <div className="Heading sm:text-[9vw] text-6xl font-slab  tracking-tight leading-[4rem] sm:leading-[8.5vw]">
            <h1>Embrace </h1>
            <h1>Extraordinary </h1>
          </div>
          <div className="sm:text-[2vw] text-2xl font-robo tracking-tighter mt-[2vh] mr-[5vw] sm:mt-[4vh]">
            <p>Join a Community of Curious Minds and Passionate Thinkers.</p>
          </div>
          <div className="button">
            <button onClick={() => signIn("google")}>
              <div className="border-[2px] bg-black text-white py-[1vw] mt-[10vh] sm:mt-[5vh] px-4 sm:px-[1.5vw] text-xl sm:text-[1.5vw] rounded-full ">
                Explore Now
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
