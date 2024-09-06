"use client";
import React, { useState, useCallback } from "react";
import TopLike from "@/components/Post/TopLike";
import PostComment from "@/components/Post/PostComment";
import CommentPage from "@/components/Post/CommentPage";
import SharePost from "@/components/Post/SharePost";

const SideControls = ({ data, baseurl }) => {
  console.log(data);
  //Comment
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [noOfComments, setNoOfComments] = useState(data.comment_count || 0);
  const incrementCommentCount = useCallback(() => {
    setNoOfComments((prev) => prev + 1);
  }, []);

  const decrementCommentCount = useCallback(() => {
    setNoOfComments((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);
  //Like
  const [noOfLikes, setNoOfLikes] = useState(parseInt(data.likes_count) || 0);
  //Share
  const [totalShares, setTotalShares] = useState(parseInt(data.share_count));

  return (
    <div className="sm:sticky sm:top-16">
      <div className="pt-1 px-2 sm:border-y-2 sm:border-r-2 flex sm:flex-col justify-between w-full items-center sm:gap-4 sm:border-gray-300 sm:rounded-tr-md sm:rounded-br-md h-fit sm:w-fit">
        <TopLike postId={data.post_id} noOfLikes={noOfLikes} setNoOfLikes={setNoOfLikes} />
        <SharePost title={data.title} text={data.description} baseurl={baseurl} postId={data.post_id} totalShares={totalShares} setTotalShares={setTotalShares} />
        <PostComment
          postId={data.post_id}
          setIsCommentOpen={setIsCommentOpen}
          noOfComments={noOfComments}
        />
      </div>
      <div>
        {isCommentOpen && (
          <CommentPage
            postId={data.post_id}
            incrementCommentCount={incrementCommentCount}
            decrementCommentCount={decrementCommentCount}
          />
        )}
      </div>
    </div>
  );
};

export default SideControls;
