"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function RouteLoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startLoading = () => {
    setProgress(0);
    setLoading(true);
    // 快速推进到 30%，然后逐渐减速
    let current = 0;
    timerRef.current = setInterval(() => {
      if (current < 30) {
        current += 10 + Math.random() * 10;
      } else if (current < 70) {
        current += 2 + Math.random() * 4;
      } else if (current < 90) {
        current += 0.5 + Math.random() * 1.5;
      } else {
        current += 0.1 + Math.random() * 0.3;
      }
      if (current > 96) current = 96;
      setProgress(current);
    }, 120);
  };

  // 路由变化完成，直接完成到 100%
  useEffect(() => {
    if (!loading) return;

    clearTimers();
    setProgress(100);

    // 短暂显示满进度后消失
    const finishTimer = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 200);

    return () => clearTimeout(finishTimer);
  }, [pathname, searchParams]);

  // 拦截站内链接点击
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("//") &&
        href !== pathname &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        clearTimers();
        startLoading();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  if (!loading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-transparent">
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
