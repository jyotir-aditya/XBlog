"use client";
import React, { useState } from "react";
import TopLike from "@/components/Post/TopLike";
import PostComment from "@/components/Post/PostComment";
import CommentPage from "@/components/Post/CommentPage";
import SharePost from "@/components/Post/SharePost";

const SideControls = ({ data, baseurl }) => {
  const [IsCommentOpen, setIsCommentOpen] = useState(false);
  return (
    <div className=" sm:sticky sm:top-16 ">
      <div className="pt-1 px-2 sm:border-y-2 sm:border-r-2 flex sm:flex-col justify-between w-full items-center sm:gap-4 sm:border-gray-300 sm:rounded-tr-md sm:rounded-br-md h-fit sm:w-fit">
        <TopLike postId={data.post_id} />
        <SharePost
          title={data.title}
          text={data.description}
          baseurl={baseurl}
          postId={data.post_id}
        />
        <PostComment postId={data.post_id} setIsCommentOpen={setIsCommentOpen} />
      </div>
      <div className="">
      {IsCommentOpen && <CommentPage postId={data.post_id} />}
      </div>
    </div>
  );
};

export default SideControls;
