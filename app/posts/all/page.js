import Head from 'next/head';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Controls from '@/components/Posts/all/Controls';
import { Metadata } from 'next';
import { revalidatePath } from 'next/cache';

export async function generateMetadata({ searchParams }) {
  const page = searchParams['page'] ?? "1";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/query/posts/all?page=${page}`);
  const data = await res.json();
  
  return {
    title: `Posts - Page ${data.currentPage}`,
    description: `Browse through page ${data.currentPage} of posts. Xblog provides quality content and updates on various topics.`,
    openGraph: {
      title: `Posts - Page ${data.currentPage}`,
      description: `Browse through page ${data.currentPage} of posts. Xblog provides quality content and updates on various topics.`,
      url: `https://xblog.co.in/posts/all?page=${data.currentPage}`,
    },
    twitter: {
      title: `Posts - Page ${data.currentPage}`,
      description: `Browse through page ${data.currentPage} of posts. Xblog provides quality content and updates on various topics.`,
      card: 'summary_large_image'
    }
  };
}


const Page = async({ searchParams }) => {
  const page = searchParams['page'] ?? "1";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/query/posts/all?page=${page}`,{revalidatePath:300,cache:"no-cache"});
  const data = await res.json();

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <div className="pt-[8vh] w-full flex justify-center">
      
      <Head>
        {data.currentPage > 1 && (
          <link rel="prev" href={`https://xblog.co.in/posts/all?page=${data.currentPage - 1}`} />
        )}
        {data.currentPage < data.totalPages && (
          <link rel="next" href={`https://xblog.co.in/posts/all?page=${data.currentPage + 1}`} />
        )}
      </Head>
      <div className="MainFeed w-[100vw] sm:w-[55vw] flex justify-center flex-col items-center">
        {data.posts.map((post, index) => (
          <article key={index} className="Card rounded-md border shadow-md p-2 bottom-2 w-[90vw] mx-4 sm:mx-0 sm:w-[50vw] mt-[10px] sm:mt-[2vw] h-fit sm:p-[1vw] backdrop-blur-md">
            <div className="PostTextandPicture overflow-hidden w-full">
              <Link href={`/${post.username}`}>
                <div className="TopElement flex gap-4 align-middle content-center h-fit items-center mb-2">
                  <Image
                    src={post.user_picture}
                    width={30}
                    height={30}
                    alt={`${post.user_name}'s profile picture`}
                    className="rounded-full"
                  />
                  <h1 className="font-medium font-robo">{post.user_name}</h1>
                  <div className="text-gray-400 font-robo text-sm font-medium">
                    {formatDate(post.created_at)}
                  </div>
                </div>
              </Link>
              <div className="Structure overflow-hidden w-full flex justify-between">
                <div className="inner-element">
                  <div className="Text flex flex-col h-fit justify-between">
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
                <div className="Picture flex sm:absolute sm:end-0 sm:-translate-y-[3.5vw] h-full mr-2 align-middle items-center">
                  <Link href={`/post/${post.slug}`}>
                    <div className="PostPicture w-[130px] h-[130px] sm:w-[9vw] sm:h-[9vw] flex align-middle">
                      <Image
                        src={post.picture}
                        alt={`${post.title} image`}
                        width={140}
                        height={140}
                        className="bg-slate-600"
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="Tags flex mt-2 gap-4">
                {post.tags.slice(0, 4).map((tag, index) => (
                  <span key={index} className="py-[3px] text-sm font-robo px-[8px] bg-gray-100 w-fit rounded-2xl">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
        <Controls currentPage={data.currentPage} totalPages={data.totalPages} />
      </div>
    </div>
  );
};

export default Page;
