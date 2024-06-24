import UserProfile from "@/components/UserProfile";
import React from "react";

const page = ({ params }) => {
  return (
    <div className="">
      <UserProfile username={params.username} />
    </div>
  );
};

export default page;
