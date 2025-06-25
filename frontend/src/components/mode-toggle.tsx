"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

type Props = {
  className?: string;
};

export function ModeToggle({ className }: Props) {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    if (!theme) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={className}
      variant="ghost"
      size="icon"
    >
      {/* TODO; animacja zmiany theme nie dziala idk */}
      <Sun
        className="h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out 
               scale-100 rotate-0 opacity-100 
               dark:scale-0 dark:-rotate-90 dark:opacity-0"
      />
      <Moon
        className="absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out 
               scale-0 rotate-90 opacity-0 
               dark:scale-100 dark:rotate-0 dark:opacity-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
