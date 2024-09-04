import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const AddComment = ({ postId, onCommentSubmit }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const commentInputRef = useRef(null); // Ref to access the input element

  async function submit(event) {
    event.preventDefault();
    if (status === "unauthenticated") {
      alert("Sign in to Comment!");
      return;
    }

    if (session) {
      setLoading(true);
      const userId = session.user.id;
      const content = commentInputRef.current.value; // Get the value from the ref

      try {
        const response = await fetch("/api/post/query/addcomment", {
          method: "POST",
          body: JSON.stringify({
            post_id: postId,
            user_id: userId,
            content: content,
            parent_comment_id: null,
          }),
        });

        if (response.ok) {
          onCommentSubmit(); // Refresh comments after submission
          commentInputRef.current.value = ""; // Clear the input value on success
        } else {
          console.error("Failed to submit comment");
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <div className="CardComment bg-white p-2 w-full flex items-center gap-2">
        <div>
          {status === "authenticated" ? (
            <Image
              src={session.user.image}
              height={35}
              width={35}
              alt="profile"
              className="rounded-full"
            />
          ) : (
            <div className="h-[28px] w-[28px] rounded-full bg-gray-400"></div>
          )}
        </div>

        <div className="w-full">
          <form onSubmit={submit}>
            <div className="flex">
              <input
                ref={commentInputRef} // Attach the ref to the input
                name="comment"
                className="w-full outline-none rounded p-2"
                rows="2"
                placeholder="Add a comment..."
                required
              />
              <button type="submit" disabled={loading}>
                <PaperAirplaneIcon
                  height={25}
                  width={25}
                  className={`text-gray-500 ${loading ? "opacity-50" : ""}`}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
