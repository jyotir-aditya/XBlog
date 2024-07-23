"use client"
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

const TopLike = ({ postId }) => {
  const { data: session, status } = useSession();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (status === "authenticated") {
        const userId = session.user.id;
        try {
          const response = await fetch(
            `/api/query/likestatus?postId=${postId}&userId=${userId}`
          );
          const data = await response.json();
          setLiked(data.liked);
        } catch (error) {
          console.error("Error fetching like status:", error);
        }
      }
    };
    fetchLikeStatus();
  }, [postId, status, session]);

  const toggleLike = async () => {
    if (status === "authenticated") {
      const userId = session.user.id;
      // Optimistically update the UI
      setLiked((prevLiked) => !prevLiked);

      try {
        const response = await fetch("/api/query/togglelike", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId, userId }),
        });

        if (!response.ok) {
          // Revert the UI update if the request fails
          setLiked((prevLiked) => !prevLiked);
          console.error("Error toggling like");
        }
      } catch (error) {
        // Revert the UI update if the request fails
        setLiked((prevLiked) => !prevLiked);
        console.error("Error toggling like:", error);
      }
    }
  };

  return (
    <div>
      <div className="pt-1 px-2 border-y-2 border-r-2  border-gray-300 rounded-tr-md rounded-br-md h-fit w-fit">
        <button onClick={toggleLike}>
          {liked ? (
            <HeartIconSolid className="w-[25px] h-[25px] text-red-400" />
          ) : (
            <HeartIconOutline className="w-[25px] h-[25px] text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TopLike;
