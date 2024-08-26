"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import About from "./LandingPage/About";
import { motion } from "framer-motion";
import Footer from "./subComponents/Footer";
import Image from "next/image";
// border-t bg-gradient-to-l from-sky-100 to-green-100
const Landing = () => {
  const { data: session } = useSession();
  return (
    <div className="">
      <div className="w-full h-[100vh]  overflow-hidden">
        <div className="w-full h-fit flex justify-between items-center ">
          <div className="sm:mt-[18vh] flex flex-col justify-center  mt-[15vh] ml-[5vw]">
            <div className="Heading sm:text-[9vw] text-5xl font-slab tracking-tighter  sm:tracking-tight leading-[3rem] sm:leading-[8.5vw]">
              {/* <h1>Embrace </h1> */}
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
                // className=" uppercase text-[8vw] leading-[7vw] tracking-tighter font-bold"
              >
                Embrace
              </motion.h1>
              {/* <h1>Extraordinary </h1> */}
              <div className="flex overflow-hidden pb-2 sm:pb-6 ">
                {[
                  "E",
                  "x",
                  "t",
                  "r",
                  "a",
                  "o",
                  "r",
                  "d",
                  "i",
                  "n",
                  "a",
                  "r",
                  "y",
                ].map((item, index) => {
                  return (
                    <motion.h1
                      key={index}
                      initial={{ y: "120%" }}
                      animate={{ y: 0 }}
                      transition={{
                        ease: [0.65, 0, 0.35, 1],
                        delay: index * 0.1,
                      }}
                      //  className=" leading-[7vw] "
                    >
                      {item}
                    </motion.h1>
                  );
                })}
              </div>
            </div>
            <div className="sm:text-[2vw] text-xl font-robo tracking-tighter mt-[2vh] mr-[5vw] sm:mt-[2vh]">
              <div className="Masker flex overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ ease: [0.65, 0, 0.35, 1], delay: " 1.6" }}
                  // className="uppercase text-[4vw] leading-[7vw] tracking-tighter font-bold"
                >
                  Join a Community of Curious Minds and Passionate Thinkers.
                </motion.h1>
              </div>
              {/* <p>Join a Community of Curious Minds and Passionate Thinkers.</p> */}
            </div>
            <div className="button">
              <motion.button
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  ease: [0.65, 0, 0.35, 1],
                  delay: " 1.9",
                  duration: 1,
                }}
                onClick={() => signIn("google")}
              >
                <div className="border-[2px] border-black hover:text-white relative text-black py-[1vw] mt-[4vh] sm:mt-[5vh] px-4 sm:px-[1.5vw] text-lg font-robo sm:text-[1.5vw] rounded-full overflow-hidden after:h-[100%] after:w-[100%] after:bg-black after:absolute after:left-0 after:bottom-[-100%] after:rounded-[50%] after:transition-all transition-all after:ease-in ease-in after:duration-300 duration-300 hover:after:bottom-0 hover:after:rounded-none ">
                  <div className="z-10 relative ">Explore Now</div>
                </div>
              </motion.button>
            </div>
            <div className="Image sm:hidden">
              <div className="mt-[5vh] flex justify-center -ml-[5vw]">
                <Image
                  // src={
                  //   "https://i1lk4br1qfv0t4kf.public.blob.vercel-storage.com/landingpic-YZDb5ueLCDMcaxaF7wWnb0nOWmMJlL.webp"
                  // }
                  src={
                    "https://i1lk4br1qfv0t4kf.public.blob.vercel-storage.com/leafdesign-removebg-preview-tClZ2kSzJDj10GKkXBm0XiTulTrIsw.png"
                  }
                  height={250}
                  width={250}
                  alt="Xblog landing picture"
                  className=" w-full rounded-sm "
                />
              </div>
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
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
