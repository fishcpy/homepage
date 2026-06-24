import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "网站",
  description: "我的在线网站与服务。",
};

export default function WebsitesPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16 lg:px-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">网站</h1>
        <p className="text-muted-foreground">
          我的在线网站与服务。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {profile.websites.map((website) => (
          <Card key={website.name} className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">{website.name}</CardTitle>
              <CardDescription>{website.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {website.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" asChild className="w-fit">
                <a href={website.url} target="_blank" rel="noreferrer">
                  访问网站
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
