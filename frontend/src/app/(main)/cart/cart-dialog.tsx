"use client";

import { useCartState } from "@/context/CartState";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { categorizeProducts, cn, priceToString } from "@/lib/utils";
import { useRouter } from "next/navigation";
import CartCategory from "./cart-category";

export default function CartDialog() {
  const router = useRouter();
  const { cartItems, total, count } = useCartState();

  const controls = useAnimation();

  const categories = categorizeProducts(cartItems.map((item) => item.product));

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <AnimatePresence>
          <div className="relative p-4">
            {count > 0 && (
              <motion.div
                initial={{ scale: 1 }}
                animate={controls}
                exit={{ opacity: 0 }}
                className={cn(
                  "pointer-events-none absolute top-0 right-0 rounded-full bg-zume w-[20px] h-[20px] flex items-center justify-center translate-x-1/4 -translate-y-1/4",
                  "text-sm font-medium text-primary-foreground",
                )}
              >
                {count}
              </motion.div>
            )}
            <ShoppingCart />
          </div>
        </AnimatePresence>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Twój koszyk 🍣</h2>
        </div>
        {cartItems.length === 0 ? (
          <p className="text-muted-foreground">Koszyk jest pusty.</p>
        ) : (
          <div>
            <div className="overflow-auto w-full max-h-[50vh] flex flex-col gap-3 pr-3">
              {categories.map((cat) => (
                <CartCategory key={cat.id} category={cat} />
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <p className="text-lg font-bold">Suma: {priceToString(total)}</p>
              <DialogTrigger asChild>
                <Button onClick={() => router.push("/cart")}>
                  Przejdź do realizacji
                </Button>
              </DialogTrigger>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
