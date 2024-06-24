// import React, { useState } from "react";
// import Image from "next/image";
// import logo from "../public/Images/icon.png";
// import PriamaryButton from "./subComponents/PriamaryButton";
// import { useSession, signIn, signOut } from "next-auth/react";
// import Dropdown from "./subComponents/Dropdown";
// import { getServerSession } from "next-auth/next";

// const Navbar = async () => {
//   //dropdown menu state
//   const [isVisible, setVisible] = useState(false);
//   function clickHandler() {
//     setVisible((prev) => !prev);
//   }

//   const { data: session, status } = useSession();
//   const SeverSession = await getServerSession();
//   return (
//     <div>
//       <div className="w-full border-b-[2px] px-[2vw]">
//         <div className="flex justify-between h-full">
//           <div className="div p-2 h-[9vh] w-[9vh] ">
//             <Image
//               alt="logo"
//               src={logo}
//               style={{ objectFit: "cover" }}
//               priority="false"
//             />
//           </div>
//           <div className="flex justify-center align-middle items-center  ">
//             {status == "authenticated" && (
//               <div className="flex">
//                 <PriamaryButton text="Sign out" onClick={signOut} />{" "}
//                 <div className="p-2 h-[9vh] w-[9vh] content-center">
//                   <div
//                     className=" cursor-pointer"
//                     onClick={() => {
//                       clickHandler();
//                     }}
//                   >
//                     <Image
//                       alt="profile pic"
//                       src={session.user.image}
//                       style={{ objectFit: "cover", borderRadius: 50 }}
//                       priority="false"
//                       height={40}
//                       width={40}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//             {status === "unauthenticated" && (
//               <PriamaryButton text="Sign in" onClick={() => signIn("google")} />
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="Dropdown flex justify-end">
//       {isVisible && (
//         <div className="absolute  mr-[1vw] ">
//           <Dropdown />
//         </div>
//       )}</div>
//     </div>
//   );
// };

// export default Navbar;
"use client"
import logo from "../public/Images/icon.png";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import PriamaryButton from "./subComponents/PriamaryButton";
import { useSession, signIn, signOut } from "next-auth/react";

async function getSession(){
  const session = await getServerSession();
  return session
}

const  Header = () => {
  const headerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); // Track visibility state
  const prevScrollY = useRef(0); // Track previous scroll position
  const [isMenu, setMenu] = useState(false);


  function menuHandler() {
    setMenu((prev) => !prev);
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isScrollingUp = scrollY < prevScrollY.current; // Check for upward scroll

      // Update visibility based on scroll direction and slight upward scroll
      setIsVisible(isScrollingUp || scrollY === 0);
      isVisible && setMenu(false);

      prevScrollY.current = scrollY; // Update previous scroll position
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const links = ["Services", "Our Work", "About Us", "Contact Us"];

  return (
    <div>
      <motion.div
        ref={headerRef}
        className="fixed border-b-2 shadow-sm top-0 z-[999] w-full sm:px-20 py-2 backdrop-blur-sm flex justify-between items-center overflow-hidden"
        animate={{
          y: isVisible ? 0 : "-100vh", // Animate y-position on visibility change
          transition: { duration: 0.3 }, // Adjust transition duration as needed
        }}
      >
        <Image
          alt="logo"
          src={logo}
          style={{ objectFit: "cover" }}
          priority="false"
          height={60}
          width={60}
        />

        <div className="flex gap-8">
          <div className="text-[1.2vw] font-robo flex gap-8 justify-between ">
            <button onClick={()=>signIn('google')} className="">Sign in</button>
            <button onClick={()=>signIn('google',{callbackUrl: '/profile'})} className="">Write</button>
            <button className="">About us</button>
          </div>

          <PriamaryButton onClick={()=>signIn('google')} text="Get Started" />
        </div>

        {/* Mobile */}
        {/* <div className="sm:hidden">
          <div className="w-full flex justify-end">
            <IoMenu
              size={40}
              onClick={() => {
                menuHandler();
              }}
            />
          </div>
        </div>
        Desktop */}
        {/* <div className="links hidden  sm:visible sm:flex  gap-10">
          {links.map((item, index) => (
            <motion.button
              whileHover={{ scale: 1.3 }}
              transition={{ duration: 0.8, stiffness: 200 }}
              animate={{ rotate: 0 }}
              key={index}
              className={`text-[1.2rem]  font-normal `}
            >
              {item}
            </motion.button>
          ))}
        </div> */}
      </motion.div>
      {isVisible && isMenu && (
        <div
          style={{
            backgroundColor: "transparent",
            backdropFilter: "blur(20px)",
            backgroundImage: `linear-gradient(120deg, rgba(191, 246, 195, 0.7), rgba(172, 225, 175, 0.5))`,
          }}
          className="fixed z-50 sm:hidden mt-[14vh] p-4 rounded-lg ml-[20vh]  w-fit flex flex-col gap-[2vh]"
        >
          {/* {links.map((item, index) => {
            return (
              <div
                key={index}
                className="Links w-[40vw] font-medium  rounded-lg "
              >
                <p className="text-[3vh] text-center ">{item}</p>
                <div className="border-[1px] border-green-700 " />
              </div>
            );
          })} */}
        </div>
      )}
    </div>
  );
};

export default Header;
