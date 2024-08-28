import UserProfile from "@/components/UserProfile";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }) => {
  async function getData(username) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/query/profile/${username}`);
    if(response.status === 404){
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

export default page;
