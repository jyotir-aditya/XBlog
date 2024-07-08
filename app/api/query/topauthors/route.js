import { getServerSession } from "next-auth/next";
// import { Client, Pool } from "pg";

// const db = new Pool({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   port: 5432,
//   max: 20,
//   idleTimeoutMillis: 20000,
//   connectionTimeoutMillis: 1000,
// });
import { db } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const client = await db.connect();
  try {
    // SQL query to get users ordered by follower count
    const query = `
      SELECT xusers.*, COUNT(followers.follower_id) AS follower_count
      FROM xusers
      LEFT JOIN followers ON xusers.id = followers.following_id
      GROUP BY xusers.id
      ORDER BY follower_count DESC LIMIT 3;
    `;

    const data = await client.query(query);
    console.log("in server", data.rows);

    return new Response(JSON.stringify(data.rows), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);

    return new Response("Internal Server Error", { status: 500 });
  } finally {
    client.release(true);  // Ensure the client is released back to the pool
  }
}
