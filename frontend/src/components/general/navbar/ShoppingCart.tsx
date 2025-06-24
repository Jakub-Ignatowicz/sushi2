"use client";
import { useCartState } from "@/context/CartState";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

export default function ShoppingCart() {
  const { cart, setCart } = useCartState();
  const [totalCount, setTotalCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, [setCart]);

  const newTotalCount = cart.reduce((sum, item) => sum + item.count, 0);

  useEffect(() => {
    if (totalCount !== 0 && totalCount !== newTotalCount) {
      controls.start({
        scale: [1, 1.4, 1],
        transition: { duration: 0.3 },
      });
    }
    setTotalCount(newTotalCount);
  }, [newTotalCount, totalCount, controls]);

  return (
    <Link
      href="/cart"
      className="hidden xl:flex relative w-[50px] h-[50px] items-center justify-center rounded-full cursor-pointer"
    >
      <FaShoppingBasket size={32} />

      <AnimatePresence>
        {totalCount > 0 && (
          <motion.div
            initial={{ scale: 1 }}
            animate={controls}
            exit={{ opacity: 0 }}
            className={cn(
              "absolute top-1 right-1 rounded-full bg-primary text-sm w-[20px] h-[20px] flex items-center justify-center translate-x-1/4 -translate-y-1/4",
            )}
          >
            {totalCount}
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}
