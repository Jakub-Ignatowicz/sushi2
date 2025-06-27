"use client";

import { useCartState } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { categorizeProducts, priceToString } from "@/lib/utils";
import CartCategory from "./cart-category";
import { LoadingSpinner } from "@/components/loading-spinner";
import CartForm from "./form";

export default function CartPageClient() {
  const { clearCart, cartItems, total, areProductsLoaded } = useCartState();

  const categories = categorizeProducts(cartItems.map((item) => item.product));

  return (
    <div className="mt-16">
      <div className="flex flex-col justify-between ">
        {cartItems.length > 0 && (
          <Button variant="outline" onClick={clearCart}>
            Wyczyść koszyk
          </Button>
        )}
        <h1 className="text-3xl my-4 font-bold">Twój koszyk 🍣</h1>
      </div>

      {!areProductsLoaded ? (
        <div className="flex items-center justify-center gap-4 mt-16 font-semibold">
          <LoadingSpinner />
          <p className="text-muted-foreground">Ładowanie koszyka...</p>
        </div>
      ) : cartItems.length > 0 ? (
        <div>
          <div className="space-y-4 mb-6">
            {categories.map((cat) => (
              <CartCategory key={cat.id} category={cat} />
            ))}
          </div>

          <div className="flex justify-between items-end w-full">
            <h2 className="text-xl xl:text-2xl font-bold items-end w-full">
              Suma w koszyku: {priceToString(total)}
            </h2>
          </div>
          <CartForm />
        </div>
      ) : (
        <p className="text-gray-500">Koszyk jest pusty.</p>
      )}
    </div>
  );
}
