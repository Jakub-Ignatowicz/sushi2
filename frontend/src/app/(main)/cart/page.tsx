"use client";

import { useCartState } from "@/context/CartState";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Form from "./Form";

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

  return (
    <div className="mx-4 xl:mx-20">
      <h1 className="text-3xl font-bold mb-6">Twój koszyk 🍣</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Koszyk jest pusty.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cart.map((item) => (
              <li
                key={item.product.id}
                className="flex items-center justify-between border p-4 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-4">
                  {item.product.imageUrl && (
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.product.name}
                    </h2>
                    <p className="text-gray-500">
                      Ilość: {item.quantity} × {item.product.price} zł
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveItem(item.product.id)}
                >
                  Usuń
                </Button>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center">
            <h2 className="text-xl xl:text-2xl font-bold">
              Suma w koszyku: {totalPrice.toFixed(2)} zł
            </h2>
            <div className="flex flex-col xl:flex-row">
              <Button
                className="m-1"
                variant="outline"
                onClick={handleClearCart}
              >
                Wyczyść koszyk
              </Button>
            </div>
          </div>
          <Form />
        </>
      )}
    </div>
  );
}
