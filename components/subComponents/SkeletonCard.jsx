import React from "react";

const SkeletonCard = () => {
  return (
    <div className="Card w-[50vw]">
      <div className="PostTextandPicture overflow-hidden flex justify-between w-full">
        <div className="inner-element">
          <div className="TextandTags flex flex-col h-full justify-between">
            <div className="TopElement flex gap-4 align-middle content-center h-fit items-center mb-2">
              <div className="bg-gray-300 rounded-lg w-8 h-8"></div>
              <div className="bg-gray-300 rounded w-24 h-6"></div>
              <div className="bg-gray-300 rounded w-16 h-4"></div>
            </div>
            <div className="Text w-[35vw]">
              <div className="bg-gray-300 rounded w-full h-8 mb-2"></div>
              <div className="bg-gray-300 rounded w-full h-16 mb-2"></div>
            </div>
            <div className="Tags flex mt-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-gray-300 rounded-2xl py-[3px] px-[8px] w-16 h-6"></div>
              ))}
            </div>
          </div>
        </div>
        <div className="Picture flex align-middle items-center py-[2vh]">
          <div className="PostPicture w-[9vw] h-[9vw] flex align-middle">
            <div className="bg-gray-300 rounded-xl border-2 shadow-lg w-36 h-36"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
