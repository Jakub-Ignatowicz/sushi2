"use client";
import { useCartState } from "@/context/CartState";
import { Product } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductComponent({ product }: { product: Product }) {
  const { cart, setCart } = useCartState();

  function addToCart() {
    const existing = cart.find((item) => item.product.id === product.id);

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, count: item.count + 1 }
          : item,
      );
    } else {
      updatedCart = [...cart, { product, count: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="hover:bg-[#121212] duration-300 ease-in-out p-5 rounded-lg m-5 cursor-pointer"
    >
      {product.imagePath && (
        <Image
          src={product.imagePath}
          width={250}
          height={250}
          className=" rounded-lg w-[300px] h-[230px]"
          alt={`${product.name} image`}
        />
      )}
      <div className="flex flex-col items-center justify-center m-2">
        <div className="text-2xl font-bold flex justify-center items-center">
          {product.name}
        </div>
        <div className="font-bold my-1">{product.price} zł</div>
        <div className="text-xs text-secondary/90 my-1">
          {product.amount} {product.amountUnit}
        </div>
      </div>

      <motion.div
        onClick={addToCart}
        whileTap={{ scale: 0.95, backgroundColor: "#0f0f0f" }}
        className="p-1 flex items-center justify-center bg-primary rounded-lg cursor-pointer m-2 select-none"
        style={{ userSelect: "none" }}
      >
        Dodaj do koszyka
      </motion.div>
    </motion.div>
  );
}
