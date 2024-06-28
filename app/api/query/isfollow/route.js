import { NextResponse } from "next/server";
// import { Pool } from "pg";

// const db = new Pool({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   port: 5432,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });
import { db } from '@vercel/postgres';

export const POST = async (request) => {
  const data = await request.json();
const client = await db.connect();
  try {
    console.log("Checking if followed");

    const isFollowing = await client.query(
      "SELECT EXISTS(SELECT 1 FROM followers WHERE follower_id = $1 AND following_id = $2)",
      [data.userId, data.postId]
    );
    console.log(isFollowing.rows[0].exists);

    if (isFollowing.rows[0].exists) {
      // User is already following
      console.log("Already Following");
      return new NextResponse(
        JSON.stringify({ followed: true }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Not following");
    return new NextResponse(
      JSON.stringify({ followed: false }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error checking followers:", error.message);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }finally{
    await client.release();
  }
};
