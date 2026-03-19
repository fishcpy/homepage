"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="outline"
      size="icon-sm"
      aria-label="切换主题"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span className="sr-only">切换主题</span>
      {isDark ? (
        <Sun size={16} strokeWidth={1.8} aria-hidden="true" />
      ) : (
        <Moon size={16} strokeWidth={1.8} aria-hidden="true" />
      )}
    </Button>
  );
}
