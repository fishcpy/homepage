"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon-sm"
        aria-label="切换主题"
      >
        <span className="sr-only">切换主题</span>
        <div className="h-4 w-4" />
      </Button>
    );
  }

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
