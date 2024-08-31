import UserProfile from "@/components/UserProfile";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
  async function getData(username) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/query/profile/${username}`);
    if (response.status === 404) {
      notFound();
    }
    const profile = await response.json();
    return profile;
  }

  const profile = await getData(params.username);

  return {
    title: `${profile.name} `,
    description: `${profile.name}'s profile on Xblog. ${profile.bio || 'Discover more about this user.'}`,
    openGraph: {
      title: `${profile.name} | Xblog`,
      description: profile.bio || 'Discover more about this user.',
      url: `${process.env.NEXT_PUBLIC_MAIN_URL}/profile/${params.username}`,
      images: [
        {
          url: profile.image,
          alt: `${profile.name}'s profile picture`,
        },
      ],
    },
  };
}

const Page = async ({ params }) => {
  async function getData(username) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/query/profile/${username}`);
    if (response.status === 404) {
      notFound();
    }
    const profile = await response.json();
    return profile;
  }

  const profile = await getData(params.username);

  return (
    <div className="">
      <UserProfile username={params.username} data={profile} />
    </div>
  );
};

export default Page;
