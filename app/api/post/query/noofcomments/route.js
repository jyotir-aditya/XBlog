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
    const query = `SELECT COUNT(*) FROM comments WHERE post_id = $1`;
    const values = [postId];

    const result = await client.query(query, values);
    // console.log("inside fetch comments");
    // console.log(result.rows);

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
