import { Modal } from "@/components/Modal";
import EditProfileForm from "@/components/Settings/EditProfileForm";
import EditProfile from "@/components/editProfile/EditProfile";
import React from "react";

const page = () => {
  return (<div>
    <div className="fixed z-50 h-full top-0 w-full backdrop-blur-md hidden sm:flex justify-center items-center">
      <div className="mt-[2vh] w-[35vw]">
      <Modal><EditProfileForm/></Modal>
      </div>
    </div>
   <div className="block sm:hidden">
   <EditProfile/>
   </div>
</div>
  );
};

export default page;
