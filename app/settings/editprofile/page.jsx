import EditProfileForm from "@/components/Settings/EditProfileForm";
import React from "react";

const page = () => {
  return (
    <div className="flex h-full">
      <div className="ml-[5vw] w-[30vw] h-[100vh] border-r-2">
        <h1 className="mt-[9vh] text-5xl tracking-tighter font-robo">
          Account Information
        </h1>
      </div>
      <div className="mt-[9vh] ml-[5vw] w-[50vw]">
        <EditProfileForm />
      </div>
    </div>
  );
};

export default page;
