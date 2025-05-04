"use client";
import { CartItem } from "@/types";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  return (
    <div>
      <FaShoppingCart />
    </div>
  );
}
