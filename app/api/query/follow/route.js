// CREATE TABLE followers (
//     follower_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//     following_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//     created_at TIMESTAMP NOT NULL DEFAULT NOW(),
//     PRIMARY KEY (follower_id, following_id)
// );
// import { Pool } from "pg";
// const db = new Pool({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     port:5432,
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
//   })
import { db } from '@vercel/postgres';

  export const POST = async (request) => {
    const data = await request.json();
  const client = await db.connect();
    try {
  
      // Determine follow/unfollow based on existing follow record (optional)
      const isFollowing = await client.query(
        "SELECT 1 FROM followers WHERE follower_id = $1 AND following_id = $2",
        [data.userId, data.postId]
      );
  
      const followAction = isFollowing.rows.length > 0 ? "DELETE" : "INSERT";
      const query = followAction === "INSERT"
        ? "INSERT INTO followers (follower_id, following_id) VALUES ($1, $2)"
        : "DELETE FROM followers WHERE follower_id = $1 AND following_id = $2";
  
      await client.query(query, [data.userId, data.postId]);
      console.log(query,data.userId,data.postId);
  
      return new Response({ status: 200 });
    } catch (error) {
      console.error("Error updating followers:", error.message);
      return new Response({ status: 500 });
    }finally{
      await client.release();
    }
  };