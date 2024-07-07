"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import FollowSkelton from"./subComponents/FollowSkeleton";
import Link from "next/link";

const Follow = ({ id }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const { data: session, status } = useSession();

  async function checkFollowing() {
    if (status === "unauthenticated") {
      console.log(status);
      setIsFollowed(false);
      setLoading(false); // Set loading to false when unauthenticated
      return;
    }

    if (status === "authenticated") {
      try {
        const response = await fetch("/api/query/isfollow", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId: id,
            userId: session.user.id,
          }),
        });

        if (!response.ok) {
          setIsFollowed(false);
        } else {
          const result = await response.json();
          console.log(result.followed);
          setIsFollowed(result.followed);
        }
      } catch (error) {
        console.error("Error checking follow status:", error);
      } finally {
        setLoading(false); // Set loading to false after the check
      }
    }
  }

  useEffect(() => {
    checkFollowing();
  }, [status]);

  const handleFollowClick = async () => {
    if (status !== "authenticated") {
      return;
    }

    try {
      const res = await fetch("/api/query/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: id,
          userId: session.user.id,
        }),
      });

      if (res.ok) {
        setIsFollowed(!isFollowed);
      } else {
        console.error("Failed to update follow status:", await res.text());
      }
    } catch (error) {
      console.error("An error occurred during follow/unfollow:", error);
    }
  };

  if (loading) {
    return <FollowSkelton />; // Show skeleton component while loading
  }

  if (status === "authenticated" && session.user.id == id) {
    return <Link href={`/${session.user.username}`}><div className="text-gray-500 hover:text-black font-robo">Profile</div></Link>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <div
          onClick={handleFollowClick}
          className={`font-robo text-gray-500 hover:text-black cursor-pointer`}
        >
          {isFollowed ? "Following" : "Follow"}
        </div>
      </div>
    );
  }

  return null;
};

export default Follow;
