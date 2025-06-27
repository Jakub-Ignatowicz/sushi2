"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBars, FaRegTimesCircle } from "react-icons/fa";
import MobileLink from "./MobileLink";
import { cn } from "@/lib/utils";
import { useCartState } from "@/context/CartState";
import { ModeToggle } from "@/components/mode-toggle";
import { Hamburger, LucideIcon, Menu, X } from "lucide-react";

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full">{children}</div>
);

type Props = {
  mapLinks: Map<string, string>;
};

export default function MobileMenu({ mapLinks }: Props) {
  const [menuOn, setMenuOn] = useState<boolean>(false);
  const { count } = useCartState();

  const FullSizeIcon = (Icon: LucideIcon) => <Icon className="w-full h-full" />;

  return (
    <div className="relative flex">
      <div
        className="justify-center items-center z-40 relative -mr-2"
        onClick={() => setMenuOn(!menuOn)}
      >
        <div className="flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.span
              key={menuOn ? "x" : "menu"}
              className="w-12 h-12 p-2"
              initial={{ opacity: 1, rotate: 0 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: menuOn ? 90 : -90 }}
              transition={{ duration: 0.3 }}
            >
              {FullSizeIcon(menuOn ? X : Menu)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {menuOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="flex justify-center  fixed top-0 left-0 w-screen h-screen backdrop-blur-lg z-10 py-20"
          >
            <div className="flex items-start flex-col max-w-box w-full text-xl my-6 mx-6">
              {Array.from(mapLinks).map(([href, content]) => (
                <MobileLink
                  key={href}
                  href={href}
                  content={content}
                  setMenuOn={setMenuOn}
                />
              ))}
              <div className="size-10">
                <ModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
