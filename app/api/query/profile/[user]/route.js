import { getServerSession } from "next-auth/next";
import { Pool } from "pg";

const db = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});


export async function GET(request, { params }) {
  const client = await db.connect();
    try {
      const data = await client.query("SELECT id,name,image,username,bio, coverimageurl FROM xusers WHERE username = $1", [params.user]);
      const dat = await client.query("SELECT u.id AS user_id, u.name, u.email, u.image,p.id AS post_id, p.title, p.picture, p.description, p.content, p.tags, p.created_at, p.slug FROM xusers u INNER JOIN posts p ON u.id = p.user_id WHERE u.username = $1", [params.user]);
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