"use client";

import { OrderProduct, Product } from "@/types/api";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type CartStateType = {
  cart: OrderProduct[];
  // setCart: (cart: OrderProduct[]) => void;
  addToCart: (item: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const CartStateContext = createContext<CartStateType | null>(null);

export const CartStateProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<OrderProduct[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  console.log("CartState", cart);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.product.id === product.id);
      if (existingItem) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    clearCart,
    removeFromCart,
  };

  if (!CartStateContext) {
    throw new Error("CartStateContext is not initialized");
  }

  return (
    <CartStateContext.Provider value={value}>
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const context = useContext(CartStateContext);
  if (!context)
    throw new Error("useCartState must be used within CartStateProvider");
  return context;
};
