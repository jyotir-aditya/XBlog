"use client";
import React from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse rounded-md border shadow-md  mx-4 sm:mx-0 sm:w-[50vw] mt-[5px] sm:mt-[0vw] h-fit p-[1vw] backdrop-blur-md flex">
      <div>
      <div className="flex gap-4 align-middle content-center h-fit items-center mb-2">
        <div className="bg-gray-300 rounded-lg w-8 h-8"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
      <div className="Structure overflow-hidden w-full flex justify-between">
        <div className="inner-element w-full">
          <div className="TextandTags flex flex-col h-fit justify-between">
            <div className="Text sm:w-[35vw] mb-4">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-[90%] mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-[90%] mb-2"></div>
            </div>
            <div className="Tags w-[60vw] flex mt-2 gap-4 ">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="py-[3px] px-[8px] bg-gray-300 w-16 h-6 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
      </div>
      <div className="Picture flex sm:absolute sm:end-0 sm:-translate-y-[3.5vw] h-full mr-2 -translate-x-2 align-middle mt-7 items-center">
          <div className="PostPicture w-[120px] h-[120px] sm:w-[9vw] sm:h-[9vw] flex align-middle bg-gray-300 rounded-xl"></div>
        </div>
    </div>
  );
};

export default SkeletonCard;
