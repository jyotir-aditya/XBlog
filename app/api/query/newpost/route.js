
import { Pool } from "pg"
 //   CREATE TABLE posts (
//     id SERIAL PRIMARY KEY,
//     title TEXT NOT NULL,
//     picture TEXT NOT NULL,
//     description TEXT NOT NULL,
//     content TEXT NOT NULL,
//     tags TEXT[] NOT NULL DEFAULT '{}', -- Array of text with default value empty array
//     created_at TIMESTAMP NOT NULL DEFAULT NOW(),
//     slug TEXT UNIQUE NOT NULL,
//     user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
// );
const db = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port:5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

function generateSlug(title) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const uniqueString = Date.now().toString(36);
  return `${slug}-${uniqueString}`;
}

export async function POST(request) {
  const client = await db.connect();

  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const picture = formData.get("picture");
    const desc = formData.get("description");
    const content = formData.get("content");
    const tags = formData.get("tags").split(",").map((tag) => tag.trim());
    const userId = formData.get("userId");
    const slug = generateSlug(title); // Generate slug
    const category= formData.get("category");

    console.log(title, picture, desc, content, tags, userId, slug,category);

    const result = await client.query(
      "INSERT INTO posts (title, picture, description, content, tags, slug, user_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7 , $8 ) RETURNING *",
      [title, picture, desc, content, tags, slug, userId,category]
    );

    console.log(result.rows[0]);
    return new Response(JSON.stringify(result.rows[0]), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200
    });
  } catch (error) {
    console.error("Error executing query:", error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    await client.release();
  }
}
