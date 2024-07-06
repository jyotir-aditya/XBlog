"use client";
import EditPostForm from "@/components/EditPost/EditPostForm";
import { useSession } from "next-auth/react";
import React from "react";

const Page = ({ params }) => {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        <div className="text-3xl font-medium">Loading...</div>
      </div>
    );
  }

  if (status === "authenticated" && session.user.username === params.username) {
    return (
      <div>
        <EditPostForm slug={params.slug} />
      </div>
    );
  }

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="text-3xl text-red-600 font-medium">
        You are not authorized.
      </div>
    </div>
  );
};

export default Page;
