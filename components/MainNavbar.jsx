"use client";
import logo from "../public/Images/icon.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const MainNavbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [offset, setOffset] = useState(0);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - prevScrollY;

      setOffset(prevOffset => {
        const newOffset = prevOffset - scrollDiff;
        return Math.max(Math.min(newOffset, 0), -60); // Limit offset between -60 and 0
      });

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);
 
  return (
    <div
      className="fixed top-0 z-[999] w-full sm:px-5 bg-white flex justify-between items-center overflow-hidden border-b-2"
      style={{ transform: `translateY(${offset}px)` }}
    >
      <Link href={"/"}>
        <Image
          alt="logo"
          src={logo}
          style={{ objectFit: "cover" }}
          priority="false"
          height={60}
          width={60}
        />
      </Link>

      <div className="flex gap-8">
        <div className="text-lg text-gray-600 font-medium font-robo flex gap-8 justify-between">
          <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })} className="">
            Sign out
          </button>
          <button
            //onClick={() => signIn("google", { callbackUrl: "/profile" })}
            className=""
          >
            <Link href={`/${status=="authenticated"&&session.user.username}`}>Profile</Link>
          </button>
          <button>
            <Link href={"/newpost"}>Write</Link>
          </button>
          <button className="">About us</button>
        </div>
        {status === "authenticated" && (
          <Image
            alt="profile pic"
            src={session.user.image}
            style={{ objectFit: "cover", borderRadius: 50 }}
            priority="false"
            height={40}
            width={40}
          />
        )}
      </div>
    </div>
  );
};

export default MainNavbar;




// "use client";
// import logo from "../public/Images/icon.png";
// import Image from "next/image";
// import { useRef, useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import PriamaryButton from "./subComponents/PriamaryButton";
// import { useSession, signIn,signOut } from "next-auth/react";
// import Link from "next/link";

// const MainNavbar = () => {
//   const headerRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(true); // Track visibility state
//   const prevScrollY = useRef(0); // Track previous scroll position
//   const [isMenu, setMenu] = useState(false);
//   const { data: session, status } = useSession();

//   function menuHandler() {
//     setMenu((prev) => !prev);
//   }
//   const handleSignOut = async () => {
//     const res=fetch("/api/auth/signout")
//     const data =(await res).status;


//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       const isScrollingUp = scrollY < prevScrollY.current; // Check for upward scroll

//       // Update visibility based on scroll direction and slight upward scroll
//       setIsVisible(isScrollingUp || scrollY === 0);
//       isVisible && setMenu(false);

//       prevScrollY.current = scrollY; // Update previous scroll position
//     };

//     window.addEventListener("scroll", handleScroll);

//     // Cleanup function to remove event listener on unmount
//     return () => window.removeEventListener("scroll", handleScroll);
//   });

//   const links = ["Services", "Our Work", "About Us", "Contact Us"];

//   return (
//     <div>
//       <motion.div
//         ref={headerRef}
//         className="fixed border-b-2 shadow-sm top-0 z-[999] w-full sm:px-5 py-2 bg-white flex justify-between items-center overflow-hidden"
//         animate={{
//           y: isVisible ? 0 : "-10vh", // Animate y-position on visibility change
//           transition: { duration: 0.3 }, // Adjust transition duration as needed
//         }}
//       ><Link href={"/"}>
//         <Image
//           alt="logo"
//           src={logo}
//           style={{ objectFit: "cover" }}
//           priority="false"
//           height={60}
//           width={60}
//         /></Link>

//         <div className="flex gap-8">
//           <div className="text-[1.2vw] font-robo flex gap-8 justify-between ">
//             <button onClick={()=>signOut()} className="">
//               Sign out
//             </button>
//             <button
//               onClick={() => signIn("google", { callbackUrl: "/profile" })}
//               className=""
//             >
//               Profile
//             </button>
//             <button><Link href={"/newpost"}>Write</Link></button>
//             <button className="">About us</button>
            
            
//           </div>
//           {status === "authenticated" && (
//             <Image
//               alt="profile pic"
//               src={session.user.image}
//               style={{ objectFit: "cover", borderRadius: 50 }}
//               priority="false"
//               height={40}
//               width={40}
//             />
//           )}
//         </div>

//         {/* Mobile */}
//         {/* <div className="sm:hidden">
//           <div className="w-full flex justify-end">
//             <IoMenu
//               size={40}
//               onClick={() => {
//                 menuHandler();
//               }}
//             />
//           </div>
//         </div>
//         Desktop */}
//         {/* <div className="links hidden  sm:visible sm:flex  gap-10">
//           {links.map((item, index) => (
//             <motion.button
//               whileHover={{ scale: 1.3 }}
//               transition={{ duration: 0.8, stiffness: 200 }}
//               animate={{ rotate: 0 }}
//               key={index}
//               className={`text-[1.2rem]  font-normal `}
//             >
//               {item}
//             </motion.button>
//           ))}
//         </div> */}
//       </motion.div>
//       {/* {isVisible && isMenu && (
//         <div
//           style={{
//             backgroundColor: "transparent",
//             backdropFilter: "blur(20px)",
//             backgroundImage: `linear-gradient(120deg, rgba(191, 246, 195, 0.7), rgba(172, 225, 175, 0.5))`,
//           }}
//           className="fixed z-50 sm:hidden mt-[14vh] p-4 rounded-lg ml-[20vh]  w-fit flex flex-col gap-[2vh]"
//         > */}
//           {/* {links.map((item, index) => {
//             return (
//               <div
//                 key={index}
//                 className="Links w-[40vw] font-medium  rounded-lg "
//               >
//                 <p className="text-[3vh] text-center ">{item}</p>
//                 <div className="border-[1px] border-green-700 " />
//               </div>
//             );
//           })} */}
//         </div>
//     //   )}
//     // </div>
//   );
// };

// export default MainNavbar;
