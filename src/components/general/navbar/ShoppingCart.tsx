"use client";
import { cn } from "@/lib/utils";
import { CartItem } from "@/types";
import { useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  return (
    <div className="relative border-2 w-[50px] h-[50px] flex items-center justify-center rounded-full">
      <FaShoppingBasket size={28} />

      <div
        className={cn(
          "absolute top-0 right-0 rounded-full bg-additional text-sm w-[20px] h-[20px] flex items-center justify-center translate-x-1/4 -translate-y-1/4",
          cartItems.length == 0 ? "hidden" : "",
        )}
      >
        {cartItems.length}
      </div>
    </div>
  );
}
