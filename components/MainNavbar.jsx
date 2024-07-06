"use client";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { HomeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Dropdown from "./subComponents/Dropdown";
import logo from "../public/Images/icon.png";
import { usePathname } from "next/navigation";

const MainNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [offset, setOffset] = useState(0);
  const { data: session, status } = useSession();
  const dropdownRef = useRef(null);
  const profilePicRef = useRef(null);
  const pathname =usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - prevScrollY;

      setOffset((prevOffset) => {
        const newOffset = prevOffset - scrollDiff;
        if (newOffset < -59) {
          setShowDropdown(false); // Hide Dropdown when navbar is not visible
        }
        return Math.max(Math.min(newOffset, 0), -60); // Limit offset between -60 and 0
      });

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  const handleProfilePicClick = () => {
    setShowDropdown((prev) => !prev); // Toggle Dropdown visibility
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      profilePicRef.current &&
      !profilePicRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };
  function LinkClickedInDropdown() {
    setShowDropdown(false);
  }
//pathname change deltect
  useEffect(() => {
    setShowDropdown(false); // Hide dropdown when the route changes
  }, [pathname]);


  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  const profileImageUrl = useMemo(() => session?.user?.image, [session]);

  return (
    <div>
      <div
        className="fixed top-0 z-[999] w-full sm:px-5 bg-white flex justify-between items-center overflow-hidden border-b-2"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <Link href="/">
          <Image
            alt="logo"
            src={logo}
            style={{ objectFit: "cover" }}
            priority={true} // Load logo eagerly
            height={60}
            width={60}
          />
        </Link>

        <div className="flex gap-8">
          <div className="text-lg text-gray-600 font-medium font-robo flex gap-8 justify-between items-center">
            <Link href={"/"}>
              <button className="flex gap-2 items-center">
                <HomeIcon className="w-[20px] h-[20px]" />
                Home
              </button>
            </Link>
            <button>
              <Link href="/newpost" className="flex gap-2 items-center">
                <PencilSquareIcon className="w-[20px] h-[20px]" /> Write
              </Link>
            </button>
            {/* <button
              onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
              className=""
            >
              Sign out
            </button> */}
          </div>
          {status === "loading" && (
            <div className="h-[40px] w-[40px] rounded-full bg-gray-400 animate-pulse"></div>
          )}
          {status === "authenticated" && profileImageUrl && (
            <Image
              ref={profilePicRef}
              alt="profile pic"
              src={profileImageUrl}
              style={{
                objectFit: "cover",
                borderRadius: 50,
                cursor: "pointer",
              }}
              priority={true} // Defer loading of profile image
              height={40}
              width={40}
              onClick={handleProfilePicClick}
            />
          )}
        </div>
      </div>
      {showDropdown && (
        <div ref={dropdownRef}>
          <Dropdown onLinkClick={LinkClickedInDropdown} />
        </div>
      )}
    </div>
  );
};

export default MainNavbar;
