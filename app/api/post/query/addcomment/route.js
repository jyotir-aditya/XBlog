// INSERT INTO comments (post_id, user_id, content, parent_comment_id)
//VALUES (<post_id>, <user_id>, '<content>', <parent_comment_id>);
import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres';

export async function POST(req) {
  try {
    
    const { post_id, user_id, content, parent_comment_id } = await req.json();
    console.log(post_id,user_id,content,parent_comment_id);

    if (!post_id || !user_id || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    
    const query = `
      INSERT INTO comments (post_id, user_id, content, parent_comment_id)
      VALUES ($1, $2, $3, $4);
    `;
    const values = [post_id, user_id, content, parent_comment_id];

    const client = await db.connect();

    const result = await client.query(query, values);

    // Return the inserted comment as a response
    return NextResponse.json("Success!", { status: 200 });
  } catch (error) {
    console.error('Error inserting comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

