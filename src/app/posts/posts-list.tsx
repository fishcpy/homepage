"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/rss";

const RSS_URL = "https://api.fis.ink/blog/rss/atom.xml";

function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

function parseAtomXml(xml: string): Post[] {
  const posts: Post[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(xml)) !== null) {
    const entryContent = match[1];

    const titleMatch = entryContent.match(/<title[^>]*>([\s\S]*?)<\/title>/);
    const rawTitle = titleMatch
      ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, "$1").trim()
      : "";
    const title = decodeHtmlEntities(rawTitle);

    const linkMatch = entryContent.match(
      /<link[^>]*href=["']([^"']+)["'][^>]*\/?>/
    );
    const href = linkMatch ? linkMatch[1] : "";

    const summaryMatch = entryContent.match(
      /<summary[^>]*>([\s\S]*?)<\/summary>/
    );
    const rawSummary = summaryMatch
      ? summaryMatch[1]
          .replace(/<!\[CDATA\[(.*?)\]\]>/, "$1")
          .replace(/<[^>]+>/g, "")
          .trim()
      : "";
    const summary = decodeHtmlEntities(rawSummary);

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

export function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(RSS_URL)
      .then((res) => res.text())
      .then((xml) => setPosts(parseAtomXml(xml)))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <div className="h-5 w-48 rounded bg-muted" />
                <div className="h-4 w-72 rounded bg-muted" />
              </div>
              <div className="h-5 w-20 rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-9 w-24 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return <p className="text-muted-foreground">暂无文章。</p>;
  }

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <Card key={post.title}>
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <CardTitle className="text-lg">{post.title}</CardTitle>
              <CardDescription>{post.summary}</CardDescription>
            </div>
            <Badge variant="outline">{post.date}</Badge>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <a href={post.href} target="_blank" rel="noreferrer">
                阅读文章
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
