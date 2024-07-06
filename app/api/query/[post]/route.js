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
import { db } from '@vercel/postgres';

export async function GET(request, { params }) {
  const client = await db.connect();
    
    try {
      const dat = await client.query("SELECT * FROM posts WHERE slug = $1", [params.post]);
      const data = await client.query("SELECT u.id AS user_id, u.name, u.email, u.image,p.id AS post_id, p.title, p.picture, p.description, p.content, p.tags,p.category_id, p.created_at, p.slug FROM xusers u INNER JOIN posts p ON u.id = p.user_id WHERE p.slug = $1", [params.post]);
      console.log(data.rows[0]);
      return new Response(JSON.stringify(data.rows[0]), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      return new Response("Internal Server Error", { status: 500 });
    }finally{
      await client.release();
    }
 
  
 
}