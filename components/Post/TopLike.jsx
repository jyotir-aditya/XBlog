"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useDebouncedCallback } from "use-debounce";

const TopLike = ({ postId }) => {
  const { data: session, status } = useSession();
  const [liked, setLiked] = useState(false);
  const [noOfLikes, setNoOfLikes] = useState(null);
  const initialLikedState = useRef(false); // Track the initial liked state
  const [isSyncing, setIsSyncing] = useState(false);

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
          initialLikedState.current = data.liked; // Set the initial liked state
        } catch (error) {
          console.error("Error fetching like status:", error);
        }
      }
    };

    const fetchNoOfLikes = async () => {
      try {
        const response = await fetch(`/api/query/noOfLikes?postId=${postId}`);
        const data = await response.json();
        setNoOfLikes(parseInt(data, 10));
      } catch (error) {
        console.error("Error fetching number of likes:", error);
      }
    };

    fetchLikeStatus();
    fetchNoOfLikes();
  }, [postId, status, session]);

  const debouncedApiCall = useDebouncedCallback(async () => {
    if (status === "authenticated" && liked !== initialLikedState.current) {
      const userId = session.user.id;
      setIsSyncing(true);
      console.log("calling api");
      try {
        const response = await fetch("/api/query/togglelike", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId, userId }),
        });

        if (!response.ok) {
          console.error("Error toggling like");
          // Revert the changes if there's an error
          setLiked(initialLikedState.current);
          setNoOfLikes(noOfLikes + (initialLikedState.current ? 1 : -1));
        } else {
          // Update the initial liked state to the current state after successful sync
          initialLikedState.current = liked;
        }
      } catch (error) {
        console.error("Error toggling like:", error);
        // Revert the changes if there's an error
        setLiked(initialLikedState.current);
        setNoOfLikes(noOfLikes + (initialLikedState.current ? 1 : -1));
      } finally {
        setIsSyncing(false);
      }
    }
  }, 500);

  const toggleLike = () => {
    if (status === "authenticated" && !isSyncing) {
      const newLikedState = !liked;
      const likeChange = newLikedState ? 1 : -1;

      setLiked(newLikedState);
      setNoOfLikes(noOfLikes + likeChange);

      debouncedApiCall();
    }
  };

  return (
    <div>
      <div className="pt-1 px-2 border-y-2 border-r-2 flex flex-col border-gray-300 rounded-tr-md rounded-br-md h-fit w-fit">
        <button className="" onClick={toggleLike}>
          {liked ? (
            <HeartIconSolid className="w-[25px] h-[25px] text-red-400" />
          ) : (
            <HeartIconOutline className="w-[25px] h-[25px] text-gray-400" />
          )}
        </button>
        <div className="text-[13px] w-full flex justify-center text-gray-400">
          {noOfLikes !== null ? (
            noOfLikes
          ) : (
            <div className="bg-gray-300 animate-pulse rounded-md h-[10px] w-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopLike;
