import { db } from '@vercel/postgres';

export async function GET(request){
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get('postId');
    
    if (!postId) {
        return new Response("Post Id is required", { status: 400 });
     }
     try {
        const client = await db.connect();
         const res=await client.query(
           'SELECT COUNT(*) FROM post_views WHERE post_id = $1',[postId]
         );
        

         return new Response(JSON.stringify(res.rows[0].count), {
            headers: {
              'Content-Type': 'application/json'
            },
            status:200
          });
   
       } catch (error) {
         console.error('Error logging post view:', error);
         return new Response("Internal Server Error", { status: 500 });
       }
 
}