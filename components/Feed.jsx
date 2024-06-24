"use client"
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SkeletonCard from "./subComponents/Skeletoncard";


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
      const response = await fetch(`/api/query/allposts?category=${selectedCategory}`);
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
      <div className="MainFeed w-[55vw]  ">
        
        
        {loading
          ? // Show skeleton loaders while loading
        <div className="flex flex-col gap-12">{Array.from({ length: 4 }).map((_, index) => (
            
                <SkeletonCard key={index} />
          ))}</div>
            
          : allPosts.map((post, index) => (
              <Link key={index} href={`/post/${post.slug}`}>
                <div className="Card rounded-md shadow-md bottom-2 w-[50vw]  mt-[2vw] h-fit p-[1vw] backdrop-blur-md ">
                  <div className="PostTextandPicture overflow-hidden  flex justify-between w-full">
                    <div className="inner-element ">
                      <div className="TextandTags flex flex-col h-full justify-between">
                        <div className="TopElement flex gap-4 align-middle content-center h-fit items-center mb-2">
                          <Image
                            src={post.user_picture}
                            width={30}
                            height={30}
                            alt="user picture"
                            className="rounded-lg"
                          />
                          <h1 className=" font-medium font-robo">{post.user_name}</h1>
                          <div className="text-gray-400 font-robo text-sm font-medium">{formatDate(post.created_at)}</div>
                        </div>
                        <div className="Text  w-[35vw]">
                          <h1 className="text-2xl line-clamp-2 mb-2 tracking-tight leading-[2.2vw] font-slab font-bold">
                            {post.title}
                          </h1>
                          <p className="text-base line-clamp-4 mb-2 text-gray-500">{post.description}</p>
                        </div>

                        <div className="Tags  flex mt-2 gap-4">
                          {post.tags.slice(0, 4).map((tag, index) => (//post.category_name
                            <div
                              key={index}
                              className="py-[3px] text-[1vw] font-robo px-[8px] bg-gray-100 w-fit rounded-2xl"
                            >
                             {tag}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className=" Picture flex align-middle items-center py-[2vh]">
                      <div className="PostPicture w-[9vw] h-[9vw] flex align-middle ">
                        <Image
                          src={post.picture}
                          alt="post picture"
                          width={140}
                          height={140}
                          className="rounded-xl border-2 shadow-lg"
                        ></Image>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
       </div>
      
  );
};

export default Feed;
