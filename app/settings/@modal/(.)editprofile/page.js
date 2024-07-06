import { Modal } from "@/components/Modal";
import EditProfileForm from "@/components/Settings/EditProfileForm";
import React from "react";

const page = () => {
  return (
    <div className="fixed z-50 h-full top-0 w-full backdrop-blur-md flex justify-center items-center">
      <div className="mt-[2vh] w-[35vw]">
      <Modal><EditProfileForm/></Modal>
      </div>
    </div>
  );
};

export default page;
