import { db } from '@vercel/postgres';

export async function GET(request) {
    const client = await db.connect();
    try {
      const data = await client.query("SELECT username FROM xusers;");
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