import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline'
import React from 'react'

const PostComment = () => {
  return (
    <div>
      <ChatBubbleBottomCenterIcon className='w-[25px] h-[25px] text-gray-400'/>
      <div className="text-[13px] w-full flex justify-center text-gray-400 mb-1">
          {/* {noOfLikes !== null ? (
            noOfLikes
          ) : (
            <div className="bg-gray-300 animate-pulse rounded-md h-[10px] w-full"></div>
          )} */}
          0
        </div>
    </div>
    
  )
}

export default PostComment