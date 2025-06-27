"use client";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBars, FaRegTimesCircle } from "react-icons/fa";
import MobileLink from "./MobileLink";
import { cn } from "@/lib/utils";
import { useCartState } from "@/context/CartState";
import { ModeToggle } from "@/components/mode-toggle";

export default function MobileMenu({
  mapLinks,
}: {
  mapLinks: Map<string, string>;
}) {
  const [menuOn, setMenuOn] = useState<boolean>(false);
  const { cart } = useCartState();

  const newTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative flex xl:hidden">
      <Button
        variant="ghost"
        className="justify-center items-center text-base z-40 relative"
        onClick={() => setMenuOn(!menuOn)}
      >
        Menu
        <div className="flex items-center justify-center relative w-5 h-5 ">
          <AnimatePresence mode="wait">
            {!menuOn ? (
              <motion.span
                key="bars"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
              >
                <FaBars />
              </motion.span>
            ) : (
              <motion.span
                key="times"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <FaRegTimesCircle />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </Button>
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
              <div className="flex flex-row items-center justify-center">
                <MobileLink
                  href="/cart"
                  content="Koszyk"
                  setMenuOn={setMenuOn}
                />

                <div
                  className={cn(
                    "rounded-full bg-zume text-sm w-[25px] h-[25px] flex items-center justify-center",
                    newTotalCount == 0 ? "hidden" : "",
                  )}
                >
                  {newTotalCount}
                </div>
              </div>
              <ModeToggle className="border-0 my-2 mx-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
