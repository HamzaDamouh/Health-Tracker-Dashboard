// components/layout.tsx
"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-primary/10 dark:bg-primary/20 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link
              href="/sleep"
              className="text-lg font-semibold hover:underline"
            >
              Sleep
            </Link>
            {/* If you had other links (Daily, Workout, etc.), you'd put them here */}
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-primary/20 dark:hover:bg-primary/30 transition"
          >
            {theme === "dark" ? (
              <Sun className="w-6 h-6 text-foreground" />
            ) : (
              <Moon className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      {/* Footer (optional) */}
      <footer className="w-full bg-primary/10 dark:bg-primary/20 py-4">
        <div className="max-w-4xl mx-auto text-center text-sm text-foreground/70">
          © {new Date().getFullYear()} Sleep Tracker
        </div>
      </footer>
    </div>
  );
}
