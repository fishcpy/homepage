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
  title: "项目",
  description: "近期关注的产品方向与作品集。",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16 lg:px-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">项目</h1>
        <p className="text-muted-foreground">
          近期关注的产品方向与作品集。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {profile.projects.map((project) => (
          <Card key={project.name} className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" asChild className="w-fit">
                <a href={project.href} target="_blank" rel="noreferrer">
                  查看项目
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
