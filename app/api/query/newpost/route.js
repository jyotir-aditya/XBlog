// import { Pool } from "pg";

// const db = new Pool({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   port: 5432,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });
import { db } from '@vercel/postgres';

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
    const content = JSON.parse(formData.get("content")); // Parse JSON content
    const tags = formData.get("tags").split(",").map((tag) => tag.trim());
    const userId = formData.get("userId");
    const slug = generateSlug(title); // Generate slug
    const category = formData.get("category");

    console.log(title, picture, desc, content, tags, userId, slug, category);

    const result = await client.query(
      "INSERT INTO posts (title, picture, description, content, tags, slug, user_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [title, picture, desc, JSON.stringify(content), tags, slug, userId, category]
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

export async function PUT(request) {
  const client = await db.connect();

  try {
    const formData = await request.formData();
    const postId = formData.get("post_id");

    const fieldsToUpdate = [];
    const values = [];
    let valueIndex = 1;

    const addFieldToUpdate = (field, value) => {
      if (value !== null && value !== undefined) {
        fieldsToUpdate.push(`${field} = $${valueIndex}`);
        values.push(value);
        valueIndex++;
      }
    };

    const title = formData.get("title");
    const picture = formData.get("picture");
    const desc = formData.get("description");
    const content = formData.get("content") ? JSON.parse(formData.get("content")) : null;
    const tags = formData.get("tags") ? formData.get("tags").split(",").map((tag) => tag.trim()) : null;
    const userId = formData.get("userId");
    const category = formData.get("category");

    addFieldToUpdate("title", title);
    addFieldToUpdate("picture", picture);
    addFieldToUpdate("description", desc);
    addFieldToUpdate("content", content ? JSON.stringify(content) : null);
    addFieldToUpdate("tags", tags);
    addFieldToUpdate("user_id", userId);
    addFieldToUpdate("category_id", category);

    if (title !== null && title !== undefined) {
      const slug = generateSlug(title);
      addFieldToUpdate("slug", slug);
    }

    if (fieldsToUpdate.length === 0) {
      return new Response("No fields to update", { status: 400 });
    }

    const query = `
      UPDATE posts
      SET ${fieldsToUpdate.join(", ")}
      WHERE id = $${valueIndex}
      RETURNING *
    `;
    values.push(postId);

    const result = await client.query(query, values);

    return new Response(JSON.stringify(result.rows[0]), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    await client.release();
  }
}


