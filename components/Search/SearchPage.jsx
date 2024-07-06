"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import RightSection from "../RightSection";
import SearchBar from "./SearchBar";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";
import SkeletonCard from "../subComponents/SkeletonCard";
import Link from "next/link";
import Image from "next/image";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [allPosts, setAllPosts] = useState([]);
  const search = searchParams.get("x");

  async function handleSearch(searchTerm) {
    if (!searchTerm) {
      try {
        const response = await fetch(`/api/query/randomposts`);
        const res = await response.json();
        console.log("inside topauthors:", res);
        setAllPosts(res);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }

      return;
    }

    console.log(`Searching... ${searchTerm}`);
    setLoading(true);
    try {
      console.log("inside serch feed api");
      const response = await fetch(
        `/api/query/search?term=${encodeURIComponent(searchTerm)}`
      );
      const result = await response.json();
      setAllPosts(result);
      console.log(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setAllPosts([]); // Clear results on error
    }
  }

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  }

  return (
    <div className="flex justify-center">
      <div className=" w-[55vw] h-full mt-[9vh]">
        <div className="InnerStructure h-full w-[50vw] border-t ">
          <div className="w-[35vw] z-50 ml-[5vw] mt-2">
            <SearchBar />
          </div>

          {/* Search Feed */}
          <div className="w-full h-full ">
            {allPosts &&
              (loading ? (
                // Show skeleton loaders while loading
                <div className="flex flex-col gap-12 mt-8">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              ) : (
                allPosts.map((post, index) => (
                  <div
                    key={index}
                    className="Card rounded-md shadow-md bottom-2 w-[50vw]  mt-[2vw] h-fit p-[1vw] backdrop-blur-md "
                  >
                    <div className="PostTextandPicture overflow-hidden  flex justify-between w-full">
                      <div className="inner-element ">
                        <div className="TextandTags flex flex-col h-full justify-between">
                          {/* <Link href={`/${post.username}`}> */}
                          <div className="TopElement flex gap-4 align-middle content-center h-fit items-center mb-2">
                            <Image
                              src={post.user_picture}
                              width={30}
                              height={30}
                              alt="user picture"
                              className="rounded-lg"
                            />
                            <h1 className=" font-medium font-robo">
                              {post.user_name}
                            </h1>
                            <div className="text-gray-400 font-robo text-sm font-medium">
                              {formatDate(post.created_at)}
                            </div>
                          </div>
                          {/* </Link> */}
                          <Link href={`/post/${post.slug}`}>
                            <div className="Text  w-[35vw]">
                              <h1 className="text-2xl line-clamp-2 mb-2 tracking-tight leading-[2.2vw] font-slab font-bold">
                                {post.title}
                              </h1>
                              <p className="text-base line-clamp-4 mb-2 text-gray-500">
                                {post.description}
                              </p>
                            </div>
                          </Link>
                          <div className="Tags  flex mt-2 gap-4">
                            {post.tags.slice(0, 4).map(
                              (
                                tag,
                                index //post.category_name
                              ) => (
                                <div
                                  key={index}
                                  className="py-[3px] text-[1vw] font-robo px-[8px] bg-gray-100 w-fit rounded-2xl"
                                >
                                  {tag}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <div className=" Picture flex align-middle items-center py-[2vh]">
                        <Link href={`/post/${post.slug}`}>
                          <div className="PostPicture w-[9vw] h-[9vw] flex align-middle ">
                            <Image
                              src={post.picture}
                              alt="post picture"
                              width={140}
                              height={140}
                              className="rounded-xl border-2 shadow-lg"
                            ></Image>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ))}
          </div>
        </div>
      </div>
      {/* Right section */}
      <div className="Structure border-l   w-[30vw]  ">
        <div className="RightSection sticky top-0 mt-[9vh] h-fit  w-[25vw] ml-10">
          <RightSection />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
