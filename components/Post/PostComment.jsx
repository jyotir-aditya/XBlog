import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import React from 'react';

const PostComment = ({ setIsCommentOpen, noOfComments }) => {
  return (
    <div className='flex sm:block items-center gap-2'>
      <button onClick={() => setIsCommentOpen((prev) => !prev)}>
        <ChatBubbleBottomCenterIcon className='w-[25px] h-[25px] text-gray-400' />
      </button>
      <div className="text-[13px] w-full flex justify-center text-gray-400 mb-1">
        {noOfComments !== null ? (
          noOfComments
        ) : (
          <div className="bg-gray-300 animate-pulse rounded-md h-[10px] w-[20px]"></div>
        )}
      </div>
    </div>
  );
};

export default PostComment;
