"use client";

import { OrderProduct } from "@/types/api";
import { createContext, useContext, useState, ReactNode } from "react";

type CartStateType = {
  cart: OrderProduct[];
  setCart: (cart: OrderProduct[]) => void;
};

const CartStateContext = createContext<CartStateType | null>(null);

export const CartStateProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<OrderProduct[]>([]);

  return (
    <CartStateContext.Provider value={{ cart, setCart }}>
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
