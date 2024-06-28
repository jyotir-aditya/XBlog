import { db } from '@vercel/postgres';

// import { Pool } from "pg";
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

export async function GET(request) {
  const client = await db.connect();
  try {
    const data = await client.query("SELECT slug  FROM posts;");
    console.log("in server",data.rows);
    return new Response(JSON.stringify(data.rows), {status:200,
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