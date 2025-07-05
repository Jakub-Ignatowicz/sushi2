"use client";

import { useCartState } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { categorizeProducts, priceToString } from "@/lib/utils";
import CartCategory from "./cart-category";
import { LoadingSpinner } from "@/components/loading-spinner";
import CartForm from "./form";

export default function CartPageClient() {
  const { clearCart, cartItems, areProductsLoaded } = useCartState();

  const categories = categorizeProducts(cartItems.map((item) => item.product));

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold">Twój koszyk 🍣</h1>
        {cartItems.length > 0 && (
          <Button variant="outline" onClick={clearCart}>
            Wyczyść koszyk
          </Button>
        )}
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
          <CartForm />
        </div>
      ) : (
        <p className="text-gray-500">Koszyk jest pusty.</p>
      )}
    </div>
  );
}
