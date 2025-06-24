"use client";

import { Button } from "@/components/ui/button";
import { useCartState } from "@/context/CartState";
import { CartProduct, Product } from "@/types/api";
import { Plus } from "lucide-react";

type Props = {
  product: Product;
  isPreview: boolean;
};

const AddToCardButton = ({ product, isPreview }: Props) => {
  const { cart, setCart } = useCartState();

  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, count: item.count + 1 }
          : item,
      );
      setCart(updatedCart);
    } else {
      const newCartItem: CartProduct = {
        product,
        count: 1,
      };
      setCart([...cart, newCartItem]);
    }
  };

  return (
    <Button
      disabled={isPreview}
      variant="outline"
      className="size-8"
      onClick={handleAddToCart}
    >
      <Plus />
    </Button>
  );
};

export default AddToCardButton;
