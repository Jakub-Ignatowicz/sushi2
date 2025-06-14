"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function MobileMenu() {
  const [menuOn, setMenuOn] = useState<boolean>(false);

  const SwitchButton = () => (
    <Button
      variant="ghost"
      className={
        "flex xl:hidden justify-center items-center text-base z-[999999999]"
      }
      onClick={() => setMenuOn(!menuOn)}
    >
      Menu
      <FaBars />
    </Button>
  );

  return (
    <div>
      <SwitchButton />
      <div
        className={cn(
          "w-screen h-screen backdrop-blur-lg absolute left-0 top-0 z-10 justify-center items-center transform transition-transform duration-500 ease-in-out",
          menuOn ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex max-w-box w-full justify-end h-full">
          <div className="h-30 flex items-center justify-center">
            <SwitchButton />
          </div>
        </div>
      </div>
    </div>
  );
}
