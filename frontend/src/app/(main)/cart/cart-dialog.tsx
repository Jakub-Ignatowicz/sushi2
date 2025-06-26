"use client";

import { useCartState } from "@/context/CartState";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CartDialog() {
  const router = useRouter();
  const { cart } = useCartState();
  const [totalCount, setTotalCount] = useState(0);
  const newTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const controls = useAnimation();
  useEffect(() => {
    if (totalCount !== 0 && totalCount !== newTotalCount) {
      controls.start({
        scale: [1, 1.4, 1],
        transition: { duration: 0.3 },
      });
    }
    setTotalCount(newTotalCount);
  }, [newTotalCount, totalCount, controls]);

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <AnimatePresence>
          <div className="relative p-4">
            {totalCount > 0 && (
              <motion.div
                initial={{ scale: 1 }}
                animate={controls}
                exit={{ opacity: 0 }}
                className={cn(
                  "pointer-events-none absolute top-0 right-0 rounded-full bg-zume w-[20px] h-[20px] flex items-center justify-center translate-x-1/4 -translate-y-1/4",
                  "text-sm font-medium text-primary-foreground",
                )}
              >
                {totalCount}
              </motion.div>
            )}
            <ShoppingCart />
          </div>
        </AnimatePresence>
      </DialogTrigger>
      <DialogContent>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Twój koszyk 🍣</h2>
        </div>
        {cart.length === 0 ? (
          <p className="text-muted-foreground">Koszyk jest pusty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between border p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {/* {item.product.imageUrl && ( */}
                  {/*   <Image */}
                  {/*     src={item.product.imageUrl} */}
                  {/*     alt={item.product.name} */}
                  {/*     width={60} */}
                  {/*     height={60} */}
                  {/*     className="rounded-md object-cover" */}
                  {/*   /> */}
                  {/* )} */}
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} × {item.product.price} zł
                    </p>
                  </div>
                </div>
                <p className="font-bold">
                  {(item.product.price * item.quantity).toFixed(2)} zł
                </p>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <p className="text-lg font-bold">
                Suma: {totalPrice.toFixed(2)} zł
              </p>
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
