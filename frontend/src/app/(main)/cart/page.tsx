"use client";

import { useCartState } from "@/context/CartState";
import { Button } from "@/components/ui/button";
import Form from "./Form";
import { categorizeProducts, priceToString } from "@/lib/utils";
import { Tag } from "lucide-react";
import CartItem from "./cart-item";
import { Label } from "@/components/ui/label";
import CartCategory from "./cart-category";

export default function CartPage() {
  const { cart, clearCart } = useCartState();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const hasItems = cart.length > 0;

  const categories = categorizeProducts(cart.map((item) => item.product));

  return (
    <div className="mx-4 xl:mx-20 mt-32">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Twój koszyk 🍣</h1>
        {hasItems && (
          <Button variant="outline" onClick={clearCart}>
            Wyczyść koszyk
          </Button>
        )}
      </div>

      {!hasItems ? (
        <p className="text-gray-500">Koszyk jest pusty.</p>
      ) : (
        <div>
          <div className="space-y-4 mb-6">
            {categories.map((cat) => (
              <CartCategory key={cat.id} category={cat} />
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
