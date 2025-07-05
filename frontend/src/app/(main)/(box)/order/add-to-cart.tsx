"use client";

import TooltipButton from "@/components/tooltip-button";
import { Button } from "@/components/ui/button";
import { useCartState } from "@/context/cart-context";
import { Product } from "@/types/api";
import { Plus } from "lucide-react";

type Props = {
  product: Product;
};

// Avoid "useCartState must be used within CartStateProvider" error
export const AddToCartButtonPreview = ({
  onClick,
  isDisabled = false,
}: {
  onClick?: () => void;
  isDisabled?: boolean;
}) => {
  return (
    <TooltipButton label="Dodaj do koszyka">
      <Button
        disabled={isDisabled}
        variant="outline"
        className="size-8"
        onClick={onClick}
      >
        <Plus />
      </Button>
    </TooltipButton>
  );
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCartState();

  return <AddToCartButtonPreview onClick={() => addToCart(product)} />;
}
