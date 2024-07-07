import { db } from "@vercel/postgres";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  console.log(userId);
  const client = await db.connect();
  try {
    let query = `
      SELECT COUNT(*) AS follower_count FROM followers WHERE following_id = $1;
    `;
    const values = [userId]; // Assign userId to values directly since it's the only parameter

    console.log(query, values);

    const data = await client.query(query, values);
    return new Response(JSON.stringify(data.rows[0].follower_count), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching followers:", error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    await client.release(true);
  }
}
