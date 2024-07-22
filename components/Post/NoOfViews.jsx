"use client"
import React, { useEffect, useState } from 'react';

const NoOfViews = ({ postId }) => {
  const [views, setViews] = useState(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch(`/api/query/noofviews?postId=${postId}`);
        if (!res.ok) {
          console.log("Error");
          return;
        }
        const data = await res.json();
        setViews(data);
      } catch (error) {
        console.error("Error fetching views:", error);
      }
    };

    fetchViews();
  }, [postId]);

  return (
    <div className='text-base text-gray-400'>{views !== null ? `${views} views` : 'Loading...'}</div>
  );
}

export default NoOfViews;
