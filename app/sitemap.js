export default async function sitemap() {
  const url = process.env.NEXT_MAIN_URL;
  //Important change on any update
  const upadatedDate = `2024-08-31`;

  //fetching post slugs
  const response = await fetch(`${url}/api/query/postsitemapdata`, {
    cache: "no-store",
  });
  if (!response.ok) {
    console.error(`Error fetching slugs: ${response.statusText}`);
    return [];
  }
  const posts = await response.json();
  const postEntries = posts.map(({ slug, created_at }) => ({
    url: `${url}/post/${slug}`,
    lastModified: created_at,
    priority: 0.8,
  }));

  //fetching userprofiles
  const res = await fetch(`${url}/api/query/usernames`, {
    cache: "no-store",
  });
  if (!response.ok) {
    console.error(`Error fetching slugs: ${response.statusText}`);
    return [];
  }
  const users = await res.json();
  const userEntries = users.map(({ username }) => ({
    url: `${url}/${username}`,
    priority: 0.6,
  }));

  return [
    {
      url: url,
      lastModified: upadatedDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${url}/posts/all`,
      lastModified: upadatedDate,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...postEntries,
    ...userEntries,
  ];
}
