import Follow from "@/components/Follow";
import NoOfViews from "@/components/Post/NoOfViews";
import PostView from "@/components/PostView";
import ContentTiptap from "@/components/subComponents/ContentTiptap";
import NoOfFollowers from "@/components/subComponents/NoOfFollowrs";
import { ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let posts = [];

  try {
    const response = await fetch(`${apiUrl}/api/query/slugs`);
    if (!response.ok) {
      console.error(`Error fetching slugs: ${response.statusText}`);
      return [];
    }
    posts = await response.json();
  } catch (error) {
    console.error(`Error fetching slugs: ${error.message}`);
    // Use fallback data if API request fails
    posts = [{ slug: "example-slug-1" }, { slug: "example-slug-2" }];
  }

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
async function getData(slug) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/query/${slug}`, {
    next: { revalidate: 3600 },
  });

  async function follow() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  }
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async ({ params }) => {
  const data = await getData(params.slug);
  console.log(data);
  return (
    <div className="w-full flex justify-center">
      <div className="Main w-full mx-[1vw] sm:mx-0 sm:max-w-[50vw] mt-[10vh] mb-[55px] flex flex-col gap-6 sm:border-2 p-[2vw] rounded-xl">
        <div className="Header flex flex-col gap-4">
          <div className="Heading">
            <h1 className=" text-4xl sm:text-[3vw] tracking-tighter sm:leading-[3vw] font-bold ">
              {data.title}
              {console.log(data)}
            </h1>
          </div>
          <div className="Description">
            <h2 className="sm:text-[1.5vw] text-lg tracking-tighter text-gray-400 font-robo">
              {data.description}
            </h2>
          </div>
        </div>
        <div className="UserInfo">
          <div className="flex p-3 rounded-xl sm:rounded-3xl border sm:shadow-md">
            <Image
              src={data.image}
              width={50}
              alt="profile"
              height={50}
              className="rounded-full"
            />
            <div className="Infotext  w-full ml-5 flex flex-col">
              <div className="flex  justify-between gap-8">
                <div className="font-robo font-medium">{data.name}</div>
                <div className="text-gray-400  flex text-sm sm:text-base font-robo  sm:flex align-middle content-center items-center gap-1 sm:gap-3">
                  <div className="hidden sm:flex items-center gap-3">
                    Publised on{" "}
                    <div className="bg-gray-400 rounded-full h-[5px] w-[5px]"></div>
                  </div>
                  <ClockIcon className="w-[15px] h-[15px] sm:hidden block" />
                  {formatDate(data.created_at)}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="Downelements w-fit ">
                  <Follow id={data.user_id} />
                </div>
                <div></div>
                <div className="flex gap-4 items-center sm:text-sm text-base ">
                  {/* <NoOfFollowers id={data.user_id} /> */}
                  <NoOfViews postId={data.post_id} />
                </div>
              </div>
              <PostView postId={data.post_id} />
            </div>
          </div>
        </div>
        <div className="Image mt-[2vh]">
          <div className="flex justify-center ">
            <Image
              src={data.picture}
              alt="Post image"
              width={750}
              height={200}
              className="rounded-xl h-[35vh]  sm:h-[60vh] sm:w-[45vw] w-full"
            />
          </div>
        </div>
        <div className="Content mt-[4vh]">
          {/* <p className="text-[1.6vw] font-robo leading-[2.5vw] tracking-widest">
            {data.content}
          </p> */}
          <ContentTiptap content={data.content} />
        </div>
        <div className="Tags mt-[2vw]">
          <div className="flex gap-6">
            {data.tags.slice(0, 4).map((tag, index) => (
              <div
                key={index}
                className="py-[4px] text-[11px] sm:text-[1.4vw] font-robo px-[20px] bg-fuchsia-200 w-fit h-fit rounded-full"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* <div>{data.user_id}</div> */}
      </div>
    </div>
  );
};

export default page;
