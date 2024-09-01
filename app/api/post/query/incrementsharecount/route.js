// pages/api/sharePost.js

import { db } from "@vercel/postgres";

export async function POST(req) {
  const { postId, userId } = await req.json(); // Parse the request body

  if (!postId || !userId) {
    return new Response("Post Id and User Id are required", { status: 400 });
  }

  try {
    const client = await db.connect();

    // Check if the user has already shared this post
    const existingShare = await client.query(
      `SELECT share_count, last_shared_at 
       FROM post_shares 
       WHERE post_id = $1 AND user_id = $2`,
      [postId, userId]
    );

    if (existingShare.rows.length > 0) {
      const { share_count } = existingShare.rows[0];
      console.log(share_count);

      // Check if the user has exceeded the share limit (5 times)
      if (share_count >= 5) {
        return new Response("Share limit reached for this post", {
          status: 403,
        });
      }


      // Update the share count and last shared timestamp
      await client.query(
        `UPDATE post_shares 
         SET share_count = share_count + 1, last_shared_at = CURRENT_TIMESTAMP 
         WHERE post_id = $1 AND user_id = $2`,
        [postId, userId]
      );

      return new Response("Post shared successfully!", { status: 200 });
    } else {
      // Insert a new record if it's the first time the user shares this post
      await client.query(
        `INSERT INTO post_shares (post_id, user_id, share_count, last_shared_at) 
         VALUES ($1, $2, 1, CURRENT_TIMESTAMP)`,
        [postId, userId]
      );

      return new Response("Post shared successfully!", { status: 201 });
    }
  } catch (error) {
    console.error("Error handling share:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
