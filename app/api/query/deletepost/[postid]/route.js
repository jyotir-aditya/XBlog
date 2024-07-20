import { getServerSession } from "next-auth/next";
import { db } from '@vercel/postgres';
import { del } from "@vercel/blob";

export async function DELETE(request, { params }) {
    const client = await db.connect();
    const session = await getServerSession();
    const postId=params.postid;
    console.log(postId);
    
    // Log the session object to check its structure
    console.log("Session object:");
    console.log(session);
    
    if (session && session.user) {
      const userEmail = session.user.email;  // Use session user ID
      
      // Log the userId to check if it's defined
      console.log("This is userEmail inside GET function:");
      console.log(userEmail);
      try {
        // Retrieve user ID based on session email
        const userResult = await client.query('SELECT id FROM xusers WHERE email = $1', [userEmail]);
        if (userResult.rows.length === 0) {
          return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }
    
        const userId = userResult.rows[0].id;
        console.log(userId);
    
        // Check if the user is the owner of the post
        const postResult = await client.query('SELECT * FROM posts WHERE id = $1 AND user_id = $2', [postId, userId]);
        if (postResult.rows.length === 0) {
          return new Response(JSON.stringify({ message: 'You are not authorized to delete this post' }), { status: 403 });
        }
        //blob img delete
      const res =await client.query('SELECT * FROM posts WHERE id = $1 AND user_id = $2', [postId, userId]);
      console.log(res.rows[0]);
      const data=res.rows[0];
      var delItems=[];
      delItems.push(data.picture);
      const content =JSON.parse(data.content)
      content.content.forEach(element => {
        if(element.type==="image"){
          delItems.push(element.attrs.src);
        }
      });
      console.log(delItems);
      try {
        delItems.forEach(async(item)=>{
          await del(item);
        })
      } catch (e) {
        return new Response(JSON.stringify({ message: 'Internal server error deleting img' }), { status: 500 });
      }
    
        // Delete the post
        await client.query('DELETE FROM posts WHERE id = $1 AND user_id = $2', [postId, userId]);
        return new Response(JSON.stringify({ message: 'Post deleted successfully' }), { status: 200 });
      } catch (error) {
        console.error('Error deleting post:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
      }
      
    //   try {
    //     // const data = await client.query("SELECT * FROM xusers WHERE email = $1", [userEmail]);
    //     console.log(data.rows[0]);
    //     return new Response(JSON.stringify(data.rows[0]), {
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     });
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //     return new Response("Internal Server Error", { status: 500 });
    //   }finally{
    //     await client.release();
    //   }
     } 
    else {
      console.log("Session or session.user is undefined");
    }
    
    return new Response("Access denied", { status: 403 });
  }