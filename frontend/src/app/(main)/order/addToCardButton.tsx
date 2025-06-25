"use client";

import { Button } from "@/components/ui/button";
import { useCartState } from "@/context/CartState";
import { OrderProduct, Product } from "@/types/api";
import { Plus } from "lucide-react";

type Props = {
  product: Product;
  isPreview: boolean;
};

const AddToCardButton = ({ product, isPreview }: Props) => {
  const { cart, setCart } = useCartState();

  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    console.log(cart);

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      const newCartItem: OrderProduct = {
        product,
        quantity: 1,
      };
      updatedCart = [...cart, newCartItem];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
