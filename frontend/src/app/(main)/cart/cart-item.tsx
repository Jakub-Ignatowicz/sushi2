import { Button } from "@/components/ui/button";
import { priceToString } from "@/lib/utils";
import { Product } from "@/types/api";
import { X } from "lucide-react";

const CartItem = ({
  item,
  onRemove,
}: {
  item: { product: Product };
  onRemove: (id: string) => void;
}) => {
  return (
    <li
      key={item.product.id}
      className="flex items-center justify-between border p-4 rounded-xl shadow-sm"
    >
      <div className="flex items-center gap-4">
        {/* {item.product.imageUrl && ( */}
        {/* <Image */}
        {/*   src={item.product.imageUrl} */}
        {/*   alt={item.product.name} */}
        {/*   width={80} */}
        {/*   height={80} */}
        {/*   className="rounded-lg object-cover" */}
        {/* /> */}
        {/* )} */}
        <div>
          <h2 className="text-xl font-semibold">{item.product.name}</h2>
          <p className="text-gray-500">{priceToString(item.product.price)}</p>
        </div>
      </div>
      <Button variant="ghost" onClick={() => onRemove(item.product.id)}>
        <X />
      </Button>
    </li>
  );
};

export default CartItem;
