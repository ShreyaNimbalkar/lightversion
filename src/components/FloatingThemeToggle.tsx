"use client";

import ThemeToggle from "@/components/ThemeToggle";

/**
 * Fixed under the main navbar (matches layout main padding-top).
 */
export default function FloatingThemeToggle() {
  return (
    <div className="pointer-events-none fixed right-3 top-[calc(4.25rem+0.5rem)] z-40 sm:right-5 sm:top-[5.25rem]">
      <div className="pointer-events-auto">
        <ThemeToggle />
      </div>
    </div>
  );
}
