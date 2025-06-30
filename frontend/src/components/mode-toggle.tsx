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
      className={cn(className, "size-fit p-2")}
      variant="ghost"
      size="icon"
    >
      <Sun className="hidden dark:block size-fit" />
      <Moon className="block dark:hidden size-fit" />
    </Button>
  );
}
