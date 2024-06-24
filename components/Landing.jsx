"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Landing = () => {
  const { data: session } = useSession();
  return (
    <div className="w-full h-full border-t bg-gradient-to-l from-sky-100 to-green-100">
      <div className="w-full h-[100vh]  ">
        <div className="mt-[18vh] ml-[5vw]">
          <div className="Heading text-[9vw] font-slab  tracking-tight leading-[8.5vw]">
            <h1>Embrace </h1>
            <h1>Extraordinary </h1>
          </div>
          <div className="text-[2vw] font-robo tracking-tighter mt-[4vh]">
            <p>Join a Community of Curious Minds and Passionate Thinkers.</p>
          </div>
          <div className="button">
            <button onClick={() => signIn("google")}>
              <div className="border-[2px] bg-black text-white py-[1vw] mt-[5vh] px-[1.5vw] text-[1.5vw] rounded-full ">
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
