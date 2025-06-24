import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/lib/api";
import { priceToString } from "@/lib/utils";
import { Product } from "@/types/api";
import { Plus } from "lucide-react";

type Props = {
  product: Product;
  isPreview?: boolean;
};

const ProductComponent = ({ product, isPreview = false }: Props) => {
  return (
    <div className="flex gap-2 bg-primary-foreground p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      {((isPreview && product.fakePath) || product.imageName) && (
        <img
          src={
            product.fakePath
              ? product.fakePath
              : `${API_BASE_URL}/images/${product.imageName}`
          }
          alt={product.name}
          className="w-64 h-full object-cover rounded-lg my-auto mr-8"
        />
      )}
      <div className="flex flex-col gap-2">
        <div>
          <span className="text-lg font-semibold">{product.name}</span>
          <span className="text-muted-foreground ml-2">
            {product.amount} {product.amountUnit}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-xl font-bold text-red-200">
            {priceToString(product.price)}
          </p>
          <Button disabled={isPreview} variant="outline" className="size-8">
            <Plus />
          </Button>
        </div>
        {product.description && <p>{product.description}</p>}
        {product.items.length > 0 && (
          <div className="inline-block mt-2">
            {product.items.map((item) => (
              <div className="flex items-start gap-2" key={item.id}>
                <p className="text-red-400 font-semibold">{item.number}x</p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductComponent;
