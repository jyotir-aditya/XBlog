"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import About from "./LandingPage/About";
import {motion} from "framer-motion"
import Footer from "./subComponents/Footer";
// border-t bg-gradient-to-l from-sky-100 to-green-100
const Landing = () => {
  const { data: session } = useSession();
  return (
    <div className="">
      <div className="w-full h-[100vh]  overflow-hidden">
        <div className="w-full h-fit flex justify-between items-center ">
          <div className="sm:mt-[18vh] flex flex-col justify-center  mt-[20vh] ml-[5vw]">
            <div className="Heading sm:text-[9vw] text-5xl font-slab tracking-tighter  sm:tracking-tight leading-[3rem] sm:leading-[8.5vw]">
              <h1>Embrace </h1>
              <h1>Extraordinary </h1>
            </div>
            <div className="sm:text-[2vw] text-xl font-robo tracking-tighter mt-[2vh] mr-[5vw] sm:mt-[4vh]">
              <p>Join a Community of Curious Minds and Passionate Thinkers.</p>
            </div>
            <div className="button">
              <button onClick={() => signIn("google")}>
                <div className="border-[2px] border-black hover:text-white relative text-black py-[1vw] mt-[30vh] sm:mt-[5vh] px-4 sm:px-[1.5vw] text-lg font-robo sm:text-[1.5vw] rounded-full overflow-hidden after:h-[100%] after:w-[100%] after:bg-black after:absolute after:left-0 after:bottom-[-100%] after:rounded-[50%] after:transition-all transition-all after:ease-in ease-in after:duration-300 duration-300 hover:after:bottom-0 hover:after:rounded-none ">
                  <div className="z-10 relative ">Explore Now</div>
                </div>
              </button>
            </div>
          </div>
              
          {/* <div className="relative w-[30rem] flex justify-center items-center  translate-y-20  h-[30rem]">
          <motion.div initial={{rotate:0}} animate={{height:[100,40,100] , width:[100,300,100],rotate:[0,45,90]}}  transition={{repeat:Infinity,duration:8}} className="absolute rounded-full right-0  h-[10vw] w-[10vw] bg-black  mr-[10vw]"></motion.div>
          <motion.div initial={{rotate:0}} animate={{height:[100,40,100] , width:[100,300,100],rotate:[0,-45,-90]}} transition={{repeat:Infinity,duration:8}} className="absolute rounded-full right-0 h-[10vw] w-[10vw] bg-black  mr-[10vw]"></motion.div>
          </div> */}
        </div>
      </div>
      <About />
      <div className="w-full ">
      <Footer/>
      </div>
    </div>
  );
};

export default Landing;
