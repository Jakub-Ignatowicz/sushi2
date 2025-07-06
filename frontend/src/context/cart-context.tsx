"use client";

import { getProductsRange } from "@/lib/api/products";
import { Product } from "@/types/api";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";

const LOCAL_STORAGE_KEY = "cart";

type CartState = {
  [key: string]: number;
};

export type CartProduct = {
  product: Product;
  quantity: number;
  total: number;
};

type CartStateType = {
  addToCart: (item: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  clearCartSilent: () => void;
  areProductsLoaded: boolean;
  total: number;
  cartItems: CartProduct[];
  count: number;
  setItemQuantity: (productId: string, quantity: number) => void;
};

const CartStateContext = createContext<CartStateType | null>(null);

export const CartStateProvider = ({ children }: { children: ReactNode }) => {
  const [areProductsLoaded, setAreProductsLoaded] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartState>({});

  useEffect(() => {
    const fetchProducts = async (productIds: string[]) => {
      try {
        const res = await getProductsRange(productIds);
        setProducts(res);
        setAreProductsLoaded(true);
      } catch (error) {
        setAreProductsLoaded(false);
        toast.error("Nie udało się pobrać produktów w koszyku.");
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    };

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setAreProductsLoaded(false);

        const parsedCart = JSON.parse(saved);
        setCart(parsedCart);
        fetchProducts(Object.keys(parsedCart));
      } else setAreProductsLoaded(true);
    } else setAreProductsLoaded(true);
  }, []);

  useEffect(() => {
    const cartItems = products.reduce((acc, product) => {
      acc[product.id] = cart[product.id];
      return acc;
    }, {} as CartState);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [products, cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] ?? 0) + 1 }));
    setProducts((prev) => [...prev, product]);
    toast.success("Produkt został dodany do koszyka");
  };

  const removeFromCart = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[productId]) delete newCart[productId];
      return newCart;
    });
    toast.success("Produkt został usunięty z koszyka");
  };

  const setItemQuantity = (productId: string, quantity: number) => {
    if (!cart[productId] || cart[productId] === quantity) return; // No change in quantity

    setCart((prev) => {
      const newCart = { ...prev };
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        newCart[productId] = quantity;
      }
      return newCart;
    });
  };

  const clearCartSilent = () => {
    setCart({});
    setProducts([]);
  };

  const clearCart = () => {
    clearCartSilent();
    toast.info("Koszyk został wyczyszczony");
  };

  const getOrderProducts = () => {
    return Object.entries(cart)
      .map(([productId, quantity]) => {
        const product = products.find((p) => p.id === productId);
        if (product) {
          return { product, quantity, total: product.price * quantity };
        }
        return null;
      })
      .filter(Boolean) as CartProduct[];
  };

  const getTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find((p) => p.id === productId);
      if (product) {
        return total + product.price * quantity;
      }
      return total;
    }, 0);
  };

  const getCount = () => {
    return Object.values(cart).length;
  };

  const value: CartStateType = {
    areProductsLoaded,
    addToCart,
    clearCart,
    clearCartSilent,
    removeFromCart,
    total: getTotal(),
    cartItems: getOrderProducts(),
    count: getCount(),
    setItemQuantity,
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
