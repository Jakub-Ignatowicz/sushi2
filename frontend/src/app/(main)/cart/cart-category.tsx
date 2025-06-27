"use client";

import { Label } from "@/components/ui/label";
import { Star, Tag } from "lucide-react";
import CartItem from "./cart-item";
import { useCartState } from "@/context/CartState";
import { AggregatedCategory, FEATURED_CATEGORY_ID } from "@/lib/utils";

type Props = {
  category: AggregatedCategory;
};

export default function CartCategory({ category }: Props) {
  const { cart } = useCartState();

  return (
    <div key={category.id}>
      <Label className="text-2xl font-bold flex items-center gap-2 mb-4 text-muted-foreground">
        <Tag size={20} />
        {category.name}
      </Label>
      <div className="flex flex-col gap-4">
        {category.products.map((product) => (
          <CartItem
            key={product.id}
            item={cart.find((item) => item.product.id === product.id)!}
          />
        ))}
      </div>
    </div>
  );
}
