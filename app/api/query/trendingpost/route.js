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

export async function GET() {
    const client = await db.connect();
    try {
        let query = `
            SELECT p.id AS post_id, p.title, p.picture, p.description, p.slug, p.tags, p.created_at, p.category_id, c.name AS category_name,username, u.name AS user_name, u.image AS user_picture 
            FROM posts p 
            INNER JOIN xusers u ON p.user_id = u.id 
            LEFT JOIN categories c ON p.category_id = c.id 
        `;
        
        query += `ORDER BY p.created_at DESC LIMIT 4;`;

        const data = await client.query(query);
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
        await client.release(true);
    }
}