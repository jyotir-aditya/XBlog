"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SkeletonCard from "./subComponents/SkeletonCard";

// Import the SkeletonCard component

const Feed = ({ selectedCategory }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  }

  async function fetchPosts() {
    console.log("inside fetch posts");
    setLoading(true);
    try {
      const response = await fetch(
        `/api/query/allposts?category=${selectedCategory}`
      );
      const posts = await response.json();
      console.log("inside fetchPosts:", posts);
      setAllPosts(posts);
      setLoading(false); // Set loading to false after fetching posts
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  return (
    <div className="MainFeed w-[100vw] sm:w-[55vw]  ">
      {loading ? (
        // Show skeleton loaders while loading
        <div className="flex flex-col sm:gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        allPosts.map((post, index) => (
          <div
            key={index}
            className="Card rounded-md border shadow-md bottom-2 mx-4 sm:mx-0 sm:w-[50vw] mt-[10px]  sm:mt-[2vw] h-fit p-[1vw] backdrop-blur-md "
          >
            <div className="UserTextandPicture overflow-hidden   w-full">
                <div className="TopElement flex gap-4 align-middle content-center h-fit  items-center mb-2">
                  <Image
                    src={post.user_picture}
                    width={30}
                    height={30}
                    alt="user picture"
                    className="rounded-lg"
                  />
                  <h1 className=" font-medium font-robo">{post.user_name}</h1>
                  <div className="text-gray-400 font-robo  text-sm font-medium">
                    {formatDate(post.created_at)}
                  </div>
                </div>
              <div className="Structure overflow-hidden w-full flex justify-between">
                <div className="inner-element ">
                  <div className="TextandTags flex flex-col h-fit justify-between">
                    <Link href={`/${post.username}`}></Link>
                    <Link href={`/post/${post.slug}`}>
                      <div className="Text sm:w-[35vw]">
                        <h1 className="text-2xl line-clamp-2 mb-2 tracking-tight sm:leading-[2.2vw] pt-2 font-slab font-bold">
                          {post.title}
                        </h1>
                        <p className="text-base line-clamp-2 sm:line-clamp-3 mb-2 text-gray-500">
                          {post.description}
                        </p>
                      </div>
                    </Link>
                    
                  </div>
                </div>
                <div className=" Picture flex sm:absolute sm:end-0 sm:-translate-y-[3.5vw] h-full mr-2  align-middle items-center ">
                  <Link href={`/post/${post.slug}`}>
                    <div className="PostPicture w-[130px] h-[130px] sm:w-[9vw] sm:h-[9vw] flex align-middle ">
                      <Image
                        src={post.picture}
                        alt="post picture"
                        width={140}
                        height={140}
                        className="rounded-xl bg-slate-600  border-2 shadow-lg"
                      ></Image>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="Tags  flex mt-2 gap-4">
                      {post.tags.slice(0, 4).map(
                        (
                          tag,
                          index //post.category_name
                        ) => (
                          <div
                            key={index}
                            className="py-[3px] text-sm font-robo px-[8px] bg-gray-100 w-fit rounded-2xl"
                          >
                            {tag}
                          </div>
                        )
                      )}
                    </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
