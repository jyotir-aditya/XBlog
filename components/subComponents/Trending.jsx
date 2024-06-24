import React, { useEffect, useState } from "react";
import Image from "next/image";

const Trending = () => {
  const [posts, setposts] = useState([]);
  async function fetchTrendingPosts() {
    console.log("inside fetch posts");
    try {
      const response = await fetch(`/api/query/trendingpost`);
      const res = await response.json();
      console.log("inside topauthors:", res);
      setposts(res);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    fetchTrendingPosts();
  }, []);
  return (
    <div>
      <div className="min-h-[55vh] max-h-[60vh] overflow-hidden mt-4 border border-green-200 rounded-xl w-full px-2 pb-2 pt-2">
        <h1 className="text-xl font-robo font-bold mb-2">Trending</h1>
        <div className="Posts">
          {posts.map((post,index) => (
            <div key={index} className=" py-1 my-2  px-2 shadow-md rounded-md">
                <div className="flex gap-4 items-center mb-2">
                <Image src={post.user_picture} height={25} width={25} alt="user pic" className="rounded-lg" />
                    <h2>{post.user_name}</h2>
                </div>
              <h1 className="text-lg text-gray-700 line-clamp-2 mb-2 tracking-tight leading-6 font-slab font-medium">
                {post.title}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
