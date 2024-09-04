import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

const PostComment =({setIsCommentOpen,postId}) => {
  const [NoofComments, setNoofComments] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
      const res = await fetch(`/api/post/query/noofcomments?postId=${postId}`)
      const response = await res.json();
      setNoofComments(response.count);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    }
    fetchData();
  }, [])
  
  return (
    <div className='flex sm:block items-center gap-2'>
      <button onClick={()=>setIsCommentOpen((prev)=>!prev)}>
      <ChatBubbleBottomCenterIcon className='w-[25px] h-[25px] text-gray-400'/>
      </button>
      <div className="text-[13px] w-full flex justify-center text-gray-400 mb-1">
          {NoofComments !== null ? (
            NoofComments
          ) : (
            <div className="bg-gray-300 animate-pulse rounded-md h-[10px] w-[20px]"></div>
          )}
        </div>
    </div>
    
  )
}

export default PostComment