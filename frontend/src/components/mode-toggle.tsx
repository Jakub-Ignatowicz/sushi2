"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

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
      className={cn(className, "size-full")}
      variant="ghost"
      size="icon"
    >
      {/* TODO; animacja zmiany theme nie dziala idk */}
      <Sun className="hidden dark:block size-full" />
      <Moon className="block dark:hidden size-full" />
    </Button>
  );
}
