import { db } from '@vercel/postgres';

export async function POST(request) {
  const {postId,userId}=await request.json();
 

    if (!postId) {
       return new Response("Post Id is required", { status: 400 });
    }

    try {
     const client = await db.connect();
      await client.query(
        'INSERT INTO post_views (post_id, user_id) VALUES ($1, $2)',
        [postId, userId]
      );

      return new Response("Post view logged", { status: 200 });
    } catch (error) {
      console.error('Error logging post view:', error);
      return new Response("Internal Server Error", { status: 500 });
    }
  
}
