import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Accessible dark‑mode toggle.
 * Uses aria‑pressed and distinct labels for screen‑readers.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (localStorage.getItem("theme") === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  /* Persist preference & update <html class="dark"> */
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center rounded p-2
                 hover:bg-slate-100 dark:hover:bg-slate-800/40"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}