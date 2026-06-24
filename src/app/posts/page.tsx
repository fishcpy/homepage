import type { Metadata } from "next";
import { PostsList } from "./posts-list";

export const metadata: Metadata = {
  title: "文章",
  description: "我对设计、工程与体验的思考。",
};

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16 lg:px-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">文章</h1>
          <p className="text-muted-foreground">
            我对设计、工程与体验的思考。
          </p>
        </div>
        <PostsList />
      </main>
    </div>
  );
}
