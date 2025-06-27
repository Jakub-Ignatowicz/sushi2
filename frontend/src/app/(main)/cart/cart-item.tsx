import { Button } from "@/components/ui/button";
import { priceToString } from "@/lib/utils";
import { X } from "lucide-react";
import QuantitySelector from "./quantity-selector";
import { CartProduct, useCartState } from "@/context/cart-context";

type Props = {
  item: CartProduct;
};

export default function CartItem({ item }: Props) {
  const { removeFromCart } = useCartState();

  return (
    <div
      key={item.product.id}
      className="flex items-center justify-between border px-4 py-3 rounded-lg shadow-sm bg-primary-foreground"
    >
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-muted-foreground">
            {item.product.name}
          </h2>
          <p className="font-semibold text-base">
            {priceToString(item.product.price)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <QuantitySelector item={item} />
        <p>{priceToString(item.total)}</p>
        <Button variant="ghost" onClick={() => removeFromCart(item.product.id)}>
          <X />
        </Button>
      </div>
    </div>
  );
}
