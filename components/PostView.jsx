"use client";
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const PostView = ({ postId }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const timer = setTimeout(async () => {
      let userId = null;
      if (status === "authenticated") {
        userId = session.user.id;
      }
      const viewedPosts = JSON.parse(sessionStorage.getItem('viewedPosts')) || [];
      if (!viewedPosts.includes(postId)) {
        try {
          const response = await fetch('/api/query/postView', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postId, userId }),
          });

          if (!response.ok) {
            console.error('Failed to log post view');
          } else {
            viewedPosts.push(postId);
            sessionStorage.setItem('viewedPosts', JSON.stringify(viewedPosts));
          }
        } catch (error) {
          console.error('Error logging post view:', error);
        }
      }
    }, 5000); // 5000 ms = 5 seconds

    return () => clearTimeout(timer);
  }, [postId, status, session]);

  return null;
};

export default PostView;
