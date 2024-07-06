import { db } from '@vercel/postgres';
export async function POST(request) {
    const client = await db.connect();
  
    try {
      const formData = await request.formData();
      console.log(formData);
      const name = formData.get("name");
      const image = formData.get("image");
      const coverimageurl = formData.get("coverimage");
      const bio = formData.get("bio"); // Parse JSON content
    //   const tags = formData.get("tags").split(",").map((tag) => tag.trim());
    //   const userId = formData.get("userId");
    //   const slug = generateSlug(title); // Generate slug
    //   const category = formData.get("category");
  
       console.log(name, image, coverimageurl, bio);
  
    //   const result = await client.query(
    //     "INSERT INTO posts (title, picture, description, content, tags, slug, user_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    //     [title, picture, desc, JSON.stringify(content), tags, slug, userId, category]
    //   );
  
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