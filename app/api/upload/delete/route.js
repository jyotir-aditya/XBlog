import { del } from "@vercel/blob";

export const runtime = "edge";

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  var urlToDelete = searchParams.get("url");
  urlToDelete = decodeURIComponent(urlToDelete);
  await del(urlToDelete);
  return new Response();
}
