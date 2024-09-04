"use client";
import { ShareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { RWebShare } from "react-web-share";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

//limit 5 shares per authenticated user

const SharePost = ({ title, text, baseurl, postId }) => {
  const { data: session, status } = useSession();
  const [totalShares, setTotalShares] = useState(null);
  const pathname = usePathname();
  const url = baseurl + pathname;
  const fetchShareCount = async () => {
    try {
      const response = await fetch(
        `/api/post/query/sharecount?postId=${postId}`
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setTotalShares(data);
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error("Error fetching share count:", error);
    }
  };
  useEffect(() => {
    fetchShareCount();
  }, [postId]);
  const clickHandler = async () => {
    if (status === "authenticated") {
      let userId = null;
      userId = session.user.id;

      try {
        const response = await fetch("/api/post/query/incrementsharecount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId, userId }),
        });

        const data = await response.text();
        if (response.ok) {
          console.log(data);
          fetchShareCount();
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error("Error sharing post:", error);
      }
    }
  };
  return (
    <RWebShare
      data={{
        text: text,
        url: url,
        title: title,
      }}
      onClick={clickHandler}
    >
      <button className="" disabled={status == "loading" ? true : false}>
        <div className="flex items-center sm:block gap-2">
          <ShareIcon className="sm:w-[23px] sm:h-[23px] h-[40px] w-[40px] text-gray-400" />
          <div className="text-[13px] w-full flex items-center mb-2 justify-center text-gray-400 mt-1">
            {totalShares !== null ? (
              totalShares
            ) : (
              <div className="bg-gray-300 animate-pulse rounded-md h-[10px] w-[20px]"></div>
            )}
          </div>
        </div>
      </button>
    </RWebShare>
  );
};

export default SharePost;
