"use client";
import { cn } from "@/lib/utils";
import { CartItem } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  return (
    <Link
      href="/cart"
      className="hidden xl:flex relative  w-[50px] h-[50px] items-center justify-center rounded-full cursor-pointer"
    >
      <FaShoppingBasket size={32} />

      <div
        className={cn(
          "absolute top-1 right-1 rounded-full bg-primary text-sm w-[20px] h-[20px] flex items-center justify-center translate-x-1/4 -translate-y-1/4",
          cartItems.length == 0 ? "hidden" : "",
        )}
      >
        {cartItems.length}
      </div>
    </Link>
  );
}
