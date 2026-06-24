import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profile } from "@/data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-muted/30">
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
            <Link href="/" className="hover:text-foreground">首页</Link>
            <Link href="/projects" className="hover:text-foreground">项目</Link>
            <Link href="/websites" className="hover:text-foreground">网站</Link>
            <Link href="/posts" className="hover:text-foreground">文章</Link>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">联系方式</p>
          <div className="grid gap-2">
            {profile.contact.emails.map((email) => (
              <a
                key={email}
                className="hover:text-foreground"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            ))}
            <span>{profile.location}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-muted-foreground lg:px-12">
          <div className="flex flex-wrap items-center gap-2">
            <span>
              &copy; {currentYear} {profile.footer.owner}. {profile.footer.rights}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:flex-nowrap">
            <div className="flex flex-wrap items-center gap-4">
              {profile.footer.sponsor && (
                <a
                  className="hover:text-foreground"
                  href={profile.footer.sponsor.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  赞助: {profile.footer.sponsor.label}
                </a>
              )}
              <a
                className="hover:text-foreground"
                href={profile.footer.beian.href}
                target="_blank"
                rel="noreferrer"
              >
                {profile.footer.beian.text}
              </a>
            </div>
            <span>{profile.footer.version}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
