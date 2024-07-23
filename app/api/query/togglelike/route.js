import { db } from '@vercel/postgres';

export async function POST(request) {
  const { postId, userId } = await request.json();

  if (!postId || !userId) {
    return new Response("Post Id & User Id are required", { status: 400 });
  }

  try {
    const client = await db.connect();

    // Check if the like already exists
    const existingLike = await client.query(
      'SELECT * FROM post_likes WHERE post_id = $1 AND user_id = $2',
      [postId, userId]
    );

    if (existingLike.rows.length > 0) {
      // If the like exists, remove it
      await client.query(
        'DELETE FROM post_likes WHERE post_id = $1 AND user_id = $2',
        [postId, userId]
      );
      return new Response("Post like removed", { status: 200 });
    } else {
      // If the like doesn't exist, add it
      await client.query(
        'INSERT INTO post_likes (post_id, user_id) VALUES ($1, $2)',
        [postId, userId]
      );
      return new Response("Post like logged", { status: 200 });
    }
  } catch (error) {
    console.error('Error toggling post like:', error);
    return new Response("Internal Server Error", { status: 500 });
  } 
}
