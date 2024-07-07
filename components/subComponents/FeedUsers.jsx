"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Follow from "../Follow";
import Link from "next/link";
import NoOfFollowrs from "./NoOfFollowrs";

const FeedUsers = () => {
  const [topAuthors, setTopAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTopAuthors() {
    console.log("inside fetch posts");
    try {
      const response = await fetch(`/api/query/topauthors`);
      const res = await response.json();
      console.log("inside topauthors:", res);
      setTopAuthors(res);
      setLoading(false); // Set loading to false after fetching posts
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  useEffect(() => {
    fetchTopAuthors();
  }, [topAuthors]);

  return (
    <div>
      <div className="bg-white min-h-[20vh] px-2 pb-4 pt-2  border-gray-200 rounded-xl ">
        <h1 className="text-xl font-robo font-bold"> Top Authors </h1>
        <div>
          {topAuthors.map((item, index) => (
            <div key={index}>
              <div className="Card  flex h-full  mt-2 bg-white border p-2 rounded-full ">
                <div className="h-full flex  self-center ">
                  <Link href={`/${item.username}`}>
                    <Image
                      src={item.image}
                      alt="user picture"
                      width={45}
                      height={45}
                      className=" rounded-full"
                    />
                  </Link>
                </div>
                <div className="InnerStructure flex w-full justify-between ml-2">
                  <Link href={`/${item.username}`}>
                    <div className="Textstructure ">
                      <p className="text-base font-robo">{item.name}</p>
                      <p className="text-sm font-robo">
                        <NoOfFollowrs id={item.id} />
                      </p>
                    </div>
                  </Link>
                  <div className="ButtonStucture  flex align-middle content-center items-center">
                    <div className="border-[2px]  rounded-full py-2 px-4">
                      <Follow id={item.id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedUsers;
