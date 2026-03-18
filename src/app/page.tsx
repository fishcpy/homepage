import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/data/profile";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Avatar className="h-7 w-7">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback className="bg-muted" />
            </Avatar>
            <span>{profile.name}</span>
          </div>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <a className="hover:text-foreground" href="#projects">
              项目
            </a>
            <a className="hover:text-foreground" href="#posts">
              文章
            </a>
            <a className="hover:text-foreground" href="#contact">
              联系
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 sm:gap-20 lg:px-12">
        <section className="grid min-h-[calc(100vh-72px)] gap-10 pb-12 pt-16 sm:pt-20 lg:min-h-[calc(100vh-80px)] lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{profile.location}</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {profile.name}
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl">
                {profile.title}
              </p>
            </div>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {profile.bio}
            </p>
            <div className="flex flex-wrap gap-3">
              {profile.links.map((link) => (
                <Button
                  key={link.label}
                  variant={link.variant ?? "secondary"}
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-start lg:justify-end">
            <Avatar className="h-32 w-32 lg:h-40 lg:w-40">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback className="bg-muted" />
            </Avatar>
          </div>
        </section>

        <Separator />

        <section id="projects" className="grid gap-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">项目</h2>
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
        </section>

        <Separator />

        <section id="posts" className="grid gap-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">文章</h2>
            <p className="text-muted-foreground">
              我对设计、工程与体验的思考。
            </p>
          </div>
          <div className="grid gap-4">
            {profile.posts.map((post) => (
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
        </section>

        <Separator />

        <section id="contact" className="grid gap-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">联系</h2>
          </div>
          <Card>
            <CardContent className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">邮箱</p>
                <p className="text-base font-medium text-foreground">
                  {profile.contact.email}
                </p>
              </div>
              <Button asChild>
                <a href={`mailto:${profile.contact.email}`}>发送邮件</a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="mt-10 border-t border-border/60 bg-muted/30 sm:mt-14 lg:mt-16">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 text-sm text-muted-foreground lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-12 lg:px-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-base font-semibold text-foreground">
              <Avatar className="h-9 w-9">
                <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                <AvatarFallback className="bg-muted" />
              </Avatar>
              <span>fishcpy</span>
            </div>
            <p>平时喜欢折腾点新奇的玩意，偶尔做点小网站&小项目。</p>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">快速导航</p>
            <div className="grid gap-2">
              {profile.footer.nav.map((item) => (
                <a
                  key={item.label}
                  className="hover:text-foreground"
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">联系方式</p>
            <div className="grid gap-2">
              <a
                className="hover:text-foreground"
                href={`mailto:${profile.contact.email}`}
              >
                {profile.contact.email}
              </a>
              <span>{profile.location}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-border/60">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-muted-foreground lg:px-12">
            <div className="flex flex-wrap items-center gap-2">
              <span>
                © {currentYear} {profile.footer.owner}. {profile.footer.rights}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:flex-nowrap">
              <a
                className="hover:text-foreground"
                href={profile.footer.beian.href}
                target="_blank"
                rel="noreferrer"
              >
                {profile.footer.beian.text}
              </a>
              <span>{profile.footer.version}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
