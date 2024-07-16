import React, { useEffect, useState } from "react";
import Image from "next/image";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import {
  permanentRedirect,
  RedirectType,
  usePathname,
  useRouter,
} from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ProfileFeed = ({ userId }) => {
  const [Posts, setPosts] = useState();
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  function checkDevice(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      return "mobile";
    }else{
      return "not mobile";
    }
    return "not found";
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/query/allposts/${userId}`);
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleMenuToggle = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const deletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        setLoading(true);
        const response = await fetch(`/api/query/deletepost/${postId}`);
        const data = await response.json();
        console.log("Deleted:", data);
        router.refresh();
        // Optionally update state or fetch posts again after deletion
        // fetchProfile(); // Example: Re-fetch posts after deletion
      } catch (error) {
        console.error("Error deleting post:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  function editClickHandler(slug) {
    console.log("edit url", slug);
    router.push(`${pathname}/editpost/${slug}`, "push");
  }

  return (
    <div className="">
      <div className="TopMenu w-full h-[5vh] mt-[2vh] flex justify-between px-[1vw] border-b">
        <button className="font-semibold font-robo h-full flex flex-col justify-between items-center">
          Posts
          <div className="w-full border-[2px] sm:border-[3px] border-black rounded-full" />
        </button>
      </div>
      {Posts &&
        Posts.length > 0 &&
        Posts.map((post, index) => (
          <div
            key={index}
            className="Card rounded-md shadow-md bottom-2 sm:w-[50vw] w-[90vw] mt-[2vw] h-fit p-[1vw] bg-white"
          >
            <div className="PostTextandPicture sm:flex overflow-hidden w-full">
              {/* For mobile Top Element userpic and name */}
              <div className="sm:hidden ">
                <div className="TopElement flex gap-4 align-middle content-center h-fit items-center mb-2">
                  <Image
                    src={post.user_picture}
                    width={30}
                    height={30}
                    alt="user picture"
                    className="rounded-full"
                  />
                  <h1 className="font-medium font-robo">{post.user_name}</h1>
                  <div className="text-gray-400 font-robo text-sm font-medium">
                    {formatDate(post.created_at)}
                  </div>
                </div>
              </div>

              <div className="inner-element w-full">
                <div className="TextandTags w-full  flex flex-col h-full justify-between">
                  {/* For Dekstop Top Element */}
                  <div className="TopElement hidden sm:flex gap-4 align-middle content-center h-fit items-center mb-2">
                    <Image
                      src={post.user_picture}
                      width={30}
                      height={30}
                      alt="user picture"
                      className="rounded-full"
                    />
                    <h1 className="font-medium font-robo">{post.user_name}</h1>
                    <div className="text-gray-400 font-robo text-sm font-medium">
                      {formatDate(post.created_at)}
                    </div>
                  </div>
                  <Link href={`/post/${post.slug}`}>
                  <div className="TextandPicture sm:w-[100%] w-full flex justify-between">
                    <div>
                      <h1 className="text-2xl line-clamp-2 sm:mb-2 tracking-tight sm:leading-[2.2vw] font-slab font-bold">
                        {post.title}
                      </h1>
                      <p className="text-base line-clamp-3 sm:line-clamp-4 mb-2 text-gray-500">
                        {post.description}
                      </p>
                    </div>
                    <div className="Picture ">
                      <div className="Picture flex align-middle  items-center sm:py-0 h-full ">
                        <div className="PostPicture w-[120px] h-[120px] sm:w-[9vw] sm:h-[9vw] sm:mb-2 flex align-middle">
                          <Image
                            src={post.picture}
                            alt="post picture"
                            width={140}
                            height={140}
                            className=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                  <div className="flex  justify-between items-center">
                    <div className="Tags flex mt-2 gap-4">
                      {post.tags.slice(0, 4).map((tag, tagIndex) => (
                        <div
                          key={tagIndex}
                          className="py-[3px] sm:text-[1vw] text-sm font-robo px-[8px] bg-gray-100 w-fit rounded-2xl"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                    {status === "authenticated" &&
                      pathname === `/${session.user.username}` && (
                        <div className="  ">
                          <EllipsisHorizontalIcon
                            className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]  cursor-pointer"
                            onClick={() => handleMenuToggle(index)}
                          />
                          {openMenuIndex === index && (
                            <div className="absolute z-50 mt-2  w-[150px] -translate-x-[110px] bg-white border rounded-md shadow-lg">
                              <div
                                onClick={() => editClickHandler(post.slug)}
                                className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                              >
                                Edit
                              </div>
                              <div
                                onClick={() => deletePost(post.post_id)}
                                className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                              >
                                {loading ? (
                                  <div className="flex gap-2">
                                    <div role="status">
                                      <svg
                                        aria-hidden="true"
                                        class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                          fill="currentColor"
                                        />
                                        <path
                                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                          fill="currentFill"
                                        />
                                      </svg>
                                      <span class="sr-only">Loading...</span>
                                    </div>
                                    Deleting...
                                  </div>
                                ) : (
                                  "Delete"
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="Picture hidden  bg-slate-500 sm:hidden align-middle  items-center py-[2vh]">
                <div className="PostPicture w-[100px] h-[100px] sm:w-[9vw] sm:h-[9vw] flex align-middle">
                  <Image
                    src={post.picture}
                    alt="post picture"
                    width={140}
                    height={140}
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProfileFeed;
