import { Button } from "@/components/ui/button";
import { priceToString } from "@/lib/utils";
import { OrderProduct, Product } from "@/types/api";
import { X } from "lucide-react";
import QuantitySelector from "./quantity-selector";

const CartItem = ({
  item,
  onRemove,
}: {
  item: OrderProduct;
  onRemove: (id: string) => void;
}) => {
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
        <QuantitySelector />
        <Button variant="ghost" onClick={() => onRemove(item.product.id)}>
          <X />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
