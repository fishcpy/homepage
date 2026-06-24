"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/data/profile";

const navItems = [
  { label: "首页", href: "/" },
  { label: "项目", href: "/projects" },
  { label: "网站", href: "/websites" },
  { label: "文章", href: "/posts" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Avatar className="h-7 w-7">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            <AvatarFallback className="bg-muted" />
          </Avatar>
          <span>{profile.name}</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-foreground ${isActive ? "text-foreground font-medium" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
