"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  if (!mounted) {
    return (
      <div
        className="h-12 w-12 shrink-0 rounded-2xl border border-foreground/10 bg-card shadow-md shadow-black/5 dark:border-white/10 dark:bg-card"
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-foreground/15 bg-card text-foreground shadow-lg shadow-black/10 transition hover:border-brand/40 hover:text-brand dark:border-white/15 dark:text-white dark:shadow-black/30 dark:hover:border-accent/50 dark:hover:text-accent"
    >
      <FontAwesomeIcon
        icon={isDark ? faSun : faMoon}
        className="text-lg"
        aria-hidden
      />
    </button>
  );
}
