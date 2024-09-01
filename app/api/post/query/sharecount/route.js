// pages/api/getShareCount.js

import { db } from "@vercel/postgres";

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
  const postId = searchParams.get('postId');

  if (!postId) {
    return new Response('Post Id is required', { status: 400 });
  }

  try {
    const client = await db.connect();

    // Fetch total shares for the specified post
    const result = await client.query(
      `SELECT COALESCE(SUM(share_count), 0) AS total_shares 
       FROM post_shares 
       WHERE post_id = $1`,
      [postId]
    );

    const totalShares = result.rows[0].total_shares;

    return new Response(JSON.stringify(totalShares), { status: 200 });
  } catch (error) {
    console.error('Error fetching share count:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
