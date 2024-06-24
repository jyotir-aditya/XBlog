import { getServerSession } from "next-auth/next";


import { Pool } from "pg";

const db = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 20000,
  connectionTimeoutMillis: 1000,
});

export async function GET(request, { params }) {
  const client = await db.connect();
  const session = await getServerSession();
  
  // Log the session object to check its structure
  console.log("Session object:");
  console.log(session);
  
  if (session && session.user) {
    const userEmail = session.user.email;  // Use session user ID
    
    // Log the userId to check if it's defined
    console.log("This is userEmail inside GET function:");
    console.log(userEmail);
    
    try {
      const data = await client.query("SELECT * FROM xusers WHERE email = $1", [userEmail]);
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
  } else {
    console.log("Session or session.user is undefined");
  }
  
  return new Response("Access denied", { status: 403 });
}