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

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const category_id = searchParams.get('category');
    console.log(category_id);
    const client = await db.connect();
    try {
        let query = `
            SELECT p.id AS post_id, p.title, p.picture, p.description, p.content, p.slug, p.tags, p.created_at, p.category_id, c.name AS category_name, u.name AS user_name, u.image AS user_picture 
            FROM posts p 
            INNER JOIN xusers u ON p.user_id = u.id 
            LEFT JOIN categories c ON p.category_id = c.id 
        `;
        const values = [];
        if (category_id) {
            query += `WHERE p.category_id = $1 `;
            values.push(category_id);
        }
        query += `ORDER BY p.created_at DESC;`;

        const data = await client.query(query, values);
        return new Response(JSON.stringify(data.rows), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return new Response("Internal Server Error", { status: 500 });
    } finally {
        await client.release();
    }
}








 // const session = await getServerSession();
  //SELECT *
// FROM posts
// WHERE created_at > '2024-06-10 14:48:02'  
// ORDER BY created_at ASC
// LIMIT 10;
 
    
  //   try {
  //     const data = await db.query("SELECT * FROM users WHERE email = $1", [userEmail]);
  //     console.log(data.rows[0]);
  //     return new Response(JSON.stringify(data.rows[0]), {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //     return new Response("Internal Server Error", { status: 500 });
  //   }
  // } else {
  //   console.log("Session or session.user is undefined");
  // }
  
  // return new Response("Access denied", { status: 403 });
