"use client";

import { useCartState } from "@/context/CartState";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Form from "./Form";
import { categorizeProducts, priceToString } from "@/lib/utils";
import { Cross, Tag, X } from "lucide-react";
import CartItem from "./cart-item";
import { Label } from "@/components/ui/label";

export default function CartPage() {
  const { cart, clearCart, removeFromCart } = useCartState();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  console.log("Cart items:", cart);

  const categories = categorizeProducts(cart.map((item) => item.product));

  return (
    <div className="mx-4 xl:mx-20 mt-32">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Twój koszyk 🍣</h1>
        <Button variant="outline" onClick={clearCart}>
          Wyczyść koszyk
        </Button>
      </div>

      {/* <div></div> */}
      {cart.length === 0 ? (
        <p className="text-gray-500">Koszyk jest pusty.</p>
      ) : (
        <div>
          <div className="space-y-4 mb-6">
            {categories.map((cat) => (
              <div key={cat.id}>
                <Label className="text-2xl font-bold flex items-center gap-2 mb-4 text-muted-foreground">
                  <Tag size={20} />
                  {cat.name}
                </Label>
                <div className="flex flex-col gap-4">
                  {cat.products.map((product) => (
                    <CartItem
                      key={product.id}
                      item={{
                        product: product,
                        quantity:
                          cart.find((item) => item.product.id === product.id)
                            ?.quantity || 1,
                      }}
                      onRemove={() => removeFromCart(product.id)}
                    />
                  ))}
                </div>
              </div>
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
