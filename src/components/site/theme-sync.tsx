"use client";

import { useEffect } from "react";

export function ThemeSync() {
  useEffect(() => {
    let theme: "light" | "dark" | null = null;

    try {
      const saved = window.localStorage.getItem("techcyme-theme");
      if (saved === "light" || saved === "dark") {
        theme = saved;
      }
    } catch {
      // Use the system preference when browser storage is unavailable.
    }

    theme ??= window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    document.documentElement.dataset.theme = theme;
  }, []);

  return null;
}
