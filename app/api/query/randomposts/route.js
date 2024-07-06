import { db } from '@vercel/postgres';

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const category_id = searchParams.get('category');
    console.log(category_id);
    const client = await db.connect();
    try {
        let query = `
            SELECT p.id AS post_id, p.title, p.picture, p.description, p.content, p.slug, p.tags, p.created_at, p.category_id, c.name AS category_name,username, u.name AS user_name, u.image AS user_picture 
            FROM posts p 
            INNER JOIN xusers u ON p.user_id = u.id 
            LEFT JOIN categories c ON p.category_id = c.id 
        `;
        const values = [];
        if (category_id) {
            query += `WHERE p.category_id = $1 `;
            values.push(category_id);
        }
        query += `ORDER BY RANDOM() LIMIT 15;`;

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
        await client.release(true);
    }
}