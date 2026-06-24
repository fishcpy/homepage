const RSS_URL = "https://api.fis.ink/blog/rss/atom.xml";

export interface Post {
  title: string;
  date: string;
  summary: string;
  href: string;
}

async function fetchAtomFeed(): Promise<string> {
  const response = await fetch(RSS_URL, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
  }

  return response.text();
}

function parseAtomXml(xml: string): Post[] {
  const posts: Post[] = [];

  // 使用正则表达式解析 Atom XML
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(xml)) !== null) {
    const entryContent = match[1];

    // 提取标题
    const titleMatch = entryContent.match(/<title[^>]*>([\s\S]*?)<\/title>/);
    const title = titleMatch
      ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, "$1").trim()
      : "";

    // 提取链接
    const linkMatch = entryContent.match(
      /<link[^>]*href=["']([^"']+)["'][^>]*\/?>/
    );
    const href = linkMatch ? linkMatch[1] : "";

    // 提取摘要
    const summaryMatch = entryContent.match(
      /<summary[^>]*>([\s\S]*?)<\/summary>/
    );
    const summary = summaryMatch
      ? summaryMatch[1]
          .replace(/<!\[CDATA\[(.*?)\]\]>/, "$1")
          .replace(/<[^>]+>/g, "")
          .trim()
      : "";

    // 提取日期
    const dateMatch = entryContent.match(
      /<(?:published|updated)>([\s\S]*?)<\/(?:published|updated)>/
    );
    const date = dateMatch ? dateMatch[1].split("T")[0] : "";

    if (title && href) {
      posts.push({ title, date, summary, href });
    }
  }

  return posts;
}

export async function getPosts(): Promise<Post[]> {
  try {
    const xml = await fetchAtomFeed();
    return parseAtomXml(xml);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
