"use client";

import { Button } from "@/components/ui/button";
import { useCartState } from "@/context/cart-context";
import { Product } from "@/types/api";
import { Plus } from "lucide-react";

type Props = {
  isPreview?: boolean;
  product: Product;
};

export default function AddToCartButton({ isPreview, product }: Props) {
  const { addToCart } = useCartState();
  return (
    <Button
      disabled={isPreview}
      variant="outline"
      className="size-8"
      onClick={() => addToCart(product)}
    >
      <Plus />
    </Button>
  );
}
