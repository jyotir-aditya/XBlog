import { db } from "@vercel/postgres";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page")) || 1;
  const pageSize = 10; // Set your desired page size

  const client = await db.connect();
  try {
    const query = `
            SELECT p.id AS post_id, p.title, p.picture, p.description, p.content, p.slug, p.tags, p.created_at, p.category_id, c.name AS category_name, username, u.name AS user_name, u.image AS user_picture 
            FROM posts p 
            INNER JOIN xusers u ON p.user_id = u.id 
            LEFT JOIN categories c ON p.category_id = c.id 
            ORDER BY p.created_at DESC 
            LIMIT $1 OFFSET $2
        `;

    const values = [pageSize, (page - 1) * pageSize];

    const data = await client.query(query, values);
    const countQuery = `SELECT COUNT(*) FROM posts`;
    const countData = await client.query(countQuery);
    const totalPosts = parseInt(countData.rows[0].count);
    const totalPages = Math.ceil(totalPosts / pageSize);

    return new Response(
      JSON.stringify({
        posts: data.rows,
        totalPages,
        currentPage: page,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    await client.release(true);
  }
}
