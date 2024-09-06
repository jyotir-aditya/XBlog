// import { getServerSession } from "next-auth/next";
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
import { db } from "@vercel/postgres";

export async function GET(request, { params }) {
  const client = await db.connect();

  try {
    const data = await client.query(
      "SELECT u.id AS user_id, u.name, u.email, u.image, p.id AS post_id, p.title, p.picture, p.description, p.content, p.tags, p.category_id, p.created_at, p.slug, COUNT(DISTINCT c.id) AS comment_count, COUNT(DISTINCT s.id) AS share_count, COUNT(DISTINCT pv.id) AS views_count, COUNT(DISTINCT pl.id) AS likes_count FROM xusers u INNER JOIN posts p ON u.id = p.user_id LEFT JOIN comments c ON p.id = c.post_id LEFT JOIN post_shares s ON p.id = s.post_id LEFT JOIN post_views pv ON p.id = pv.post_id LEFT JOIN post_likes pl ON p.id = pl.post_id WHERE p.slug = $1 GROUP BY u.id, u.name, u.email, u.image, p.id, p.title, p.picture, p.description, p.content, p.tags, p.category_id, p.created_at, p.slug;",
      [params.post]
    );
    const dat = await client.query(
      "SELECT u.id AS user_id, u.name, u.email, u.image,p.id AS post_id, p.title, p.picture, p.description, p.content, p.tags,p.category_id, p.created_at, p.slug FROM xusers u INNER JOIN posts p ON u.id = p.user_id WHERE p.slug = $1",
      [params.post]
    );
    // console.log(data.rows[0]);
    console.log(data.rows);
    if (data.rows[0] == undefined) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(JSON.stringify(data.rows[0]), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
