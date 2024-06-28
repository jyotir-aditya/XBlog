// import { Pool } from "pg";
// const db = new Pool({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     port: 5432,
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
// });
import { db } from '@vercel/postgres';

export async function GET(request,{params}) {
    const client = await db.connect();
    try {
        let query = `
            SELECT p.id AS post_id, p.title, p.picture, p.description, p.content, p.slug, p.tags, p.created_at, p.category_id, c.name AS category_name, u.name AS user_name, u.image AS user_picture 
            FROM posts p 
            INNER JOIN xusers u ON p.user_id = u.id 
            LEFT JOIN categories c ON p.category_id = c.id 
        `;
        const values = [];
            query += `WHERE p.user_id = $1 `;
            values.push(params.profilefeed);
        
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