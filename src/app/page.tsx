import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <>
      <section
        className="relative flex min-h-[calc(100vh-56px)] items-center px-6 pt-[72px] lg:px-12"
        style={{
          backgroundImage: "url(https://pic.fis.ink/end)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 mx-auto w-full max-w-6xl grid items-center gap-8 sm:gap-12 lg:grid-cols-[1.25fr_0.4fr] lg:gap-0">
          {/* 左侧文字 */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground lg:justify-start">
              <span>{profile.location}</span>
            </div>
            <div className="space-y-3">
              <p className="text-lg text-muted-foreground sm:text-xl">
                {profile.title}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {profile.name}
              </h1>
            </div>
            <p className="mx-auto max-w-xl text-base leading-7 text-muted-foreground sm:text-lg lg:mx-0">
              {profile.bio}
            </p>
            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
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

          {/* 右侧头像（移动端在下，桌面端在右） */}
          <Avatar className="mx-auto h-28 w-28 lg:h-40 lg:w-40">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            <AvatarFallback className="bg-muted" />
          </Avatar>
        </div>
      </section>
    </>
  );
}
