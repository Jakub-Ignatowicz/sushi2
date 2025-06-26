"use client";

import { useCartState } from "@/context/CartState";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Form from "./Form";
import { categorizieProducts, priceToString } from "@/lib/utils";
import { Cross, X } from "lucide-react";
import CartItem from "./cart-item";

export default function CartPage() {
  const { cart, setCart } = useCartState();

  const handleRemoveItem = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const aggregated = categorizieProducts(cart.map((item) => item.product));

  return (
    <div className="mx-4 xl:mx-20 mt-32">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Twój koszyk 🍣</h1>
        <Button variant="outline" onClick={handleClearCart}>
          Wyczyść koszyk
        </Button>
      </div>

      {/* <div></div> */}
      {cart.length === 0 ? (
        <p className="text-gray-500">Koszyk jest pusty.</p>
      ) : (
        <div>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <CartItem
                item={item}
                onRemove={() => handleRemoveItem(item.product.id)}
              />
            ))}
          </div>

          <div className="flex justify-between items-end w-full">
            <h2 className="text-xl xl:text-2xl font-bold items-end w-full">
              Suma w koszyku: {priceToString(totalPrice)}
            </h2>
          </div>
          <Form />
        </div>
      )}
    </div>
  );
}
