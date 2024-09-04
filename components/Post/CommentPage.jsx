"use client";
import React, { useState, useEffect, useCallback } from "react";
import AddComment from "./AddComment";
import Image from "next/image";

const CommentPage = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  function formatDate(timestamp) {
    // console.log(timestamp);
    const date = new Date(timestamp);
    
    if (isNaN(date.getTime())) {
      return "Invalid date"; // Handle invalid date
    }
    
    const now = new Date();
    const diffInMilliseconds = now - date;
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  
    if (diffInHours < 24) {
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
        return diffInMinutes <= 1 ? "Just now" : `${diffInMinutes} minutes ago`;
      }
      return `${diffInHours} hours ago`;
    } else {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
      return formattedDate;
    }
  }
  


  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/post/query/fetchcomments?postId=${postId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="sm:w-[25vw] z-30 w-[95vw] bg-white flex-col absolute max-h-[55vh] mt-1 min-h-[45vh] border-r-2 border-y-2 rounded-r-lg">
      <div className="h-[42vh] border-b-2 overflow-y-scroll no-scrollbar">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse p-2 border-b">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-300 h-6 w-6"></div>
                  <div className="flex-grow">
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                  </div>
                  <div className="h-2 bg-gray-300 rounded w-1/4"></div>
                </div>
                <div className="mt-2 h-3 bg-gray-300 rounded w-full"></div>
                <div className="mt-2 h-3 bg-gray-300 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="p-2 border-b">
              <div className="flex items-center">
                <Image
                  priority="false"
                  width={25}
                  height={25}
                  src={comment.image}
                  alt={comment.name}
                  className="rounded-full mr-2"
                />
                <div className="flex justify-between w-full items-center">
                  <span className="font-slab text-base">{comment.name}</span>
                  <p className="text-xs text-gray-500">
                    {formatDate(comment.created_at_ist)}
                  </p>
                </div>
              </div>
              <p className="mt-2 font-robo text-sm">{comment.content}</p>
            </div>
          ))
        ) : (<div className="w-full h-full flex justify-center items-center">
          <p className="text-gray-400">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
      <AddComment postId={postId} onCommentSubmit={fetchComments} />
    </div>
  );
};

export default CommentPage;