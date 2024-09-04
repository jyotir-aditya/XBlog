import { NextResponse } from "next/server";
import { db } from "@vercel/postgres"; // Assuming you have a database connection utility

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");
  console.log(postId);

  try {
    if (!postId) {
      return NextResponse.json(
        { error: "Missing postId parameter" },
        { status: 400 }
      );
    }
    const client = await db.connect();
    const query = `
      SELECT c.id,c.content,c.created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata' AS created_at_ist,c.updated_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata' AS updated_at_ist, 
    u.name, 
    u.image
    FROM comments c
    JOIN xusers u ON c.user_id = u.id
    WHERE c.post_id = $1 
    AND c.parent_comment_id IS NULL 
    AND c.is_deleted = FALSE
    ORDER BY c.created_at ASC;
    `;
    const values = [postId];

    const result = await client.query(query, values);
    console.log("inside fetch comments");
    console.log(result.rows);

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
