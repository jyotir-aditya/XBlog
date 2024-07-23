import { db } from "@vercel/postgres";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const postId = searchParams.get("postId");
  const userId = searchParams.get("userId");

  if (!postId || !userId) {
    return new Response("Post Id & User Id are required", { status: 400 });
  }

  try {
    const client = await db.connect();

    const existingLike = await client.query(
      "SELECT * FROM post_likes WHERE post_id = $1 AND user_id = $2",
      [postId, userId]
    );

    if (existingLike.rows.length > 0) {
      return new Response(JSON.stringify({ liked: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ liked: false }), { status: 200 });
    }
  } catch (error) {
    console.error("Error checking like status:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
