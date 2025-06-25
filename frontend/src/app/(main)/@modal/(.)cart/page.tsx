"use client";

import { useCartState } from "@/context/CartState";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function CartModal() {
  const { cart } = useCartState();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleGoToCart = () => {
    setIsVisible(false);

    setTimeout(() => {
      window.location.href = "/cart"; // To spowoduje pełne przeładowanie strony
    }, 100);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => router.back(), 100);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[9999] backdrop-blur-sm bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-2xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Twój koszyk 🍣</h2>
              <Button variant="ghost" onClick={handleClose}>
                Zamknij
              </Button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500">Koszyk jest pusty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between border p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      {item.product.imagePath && (
                        <Image
                          src={item.product.imagePath}
                          alt={item.product.name}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                      )}
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
                  <Button
                    className="bg-zume text-white"
                    onClick={handleGoToCart}
                  >
                    Idź do koszyka
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
