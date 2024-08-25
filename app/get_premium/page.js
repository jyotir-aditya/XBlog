import React from "react";
import PayButton from "@/components/getPremium/PayButton";
import MembersipCard from "@/components/getPremium/MembersipCard";
import Button from "@/components/getPremium/Button";

const page = () => {
  const basicFeatures = ["Access to all Content", "Get a unique Basic Member tag", "Profile Customization", "Edit Published Posts","Share member-only posts up to 5 times per month"];
  return (
    <div className="pt-[11vh]">
      <div className="w-[100vw]">
        <div className="w-full flex flex-col items-center gap-2 justify-center">
          <div className="text-5xl font-robo font-semibold">
            Upgrade to Premium
          </div>
          <div className="text-xl font-slab">
            Enjoy an enhanced experience, exclusive creator tools, top-tier
            verification and security.
          </div>
          <div className="mt-4">
          <Button content={"Monthly"} size={"small"} onClick={null}/>
          </div>
        </div>
        <div className="CardContainer flex justify-center gap-4 items-center py-4 w-[100vw] ">
          <MembersipCard name={"Basic"} price={"399"} features={basicFeatures}/>
          <MembersipCard name={"Premium"} price={"999"} features={basicFeatures}/>
          <MembersipCard name={"Premium +"} price={"1499"} features={basicFeatures}/>
        </div>
        <div className="w-full text-center text-red-600">* Currently You will not be charged X Member Basic plan Features are free as we are in beta version these feateares are for tests and development.</div>
        <div className="w-full text-center text-red-600">* Currently Premium and Premium + is unavialable as these features are in beta version.</div>
      </div>
    </div>
  );
};

export default page;
