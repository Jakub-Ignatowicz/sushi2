import { Button } from "@/components/ui/button";
import { priceToString } from "@/lib/utils";
import { Product } from "@/types/api";
import AddToCardButton from "./addToCardButton";

type Props = {
  product: Product;
  isPreview?: boolean;
};

const ProductComponent = ({ product, isPreview }: Props) => {
  return (
    <div className="flex gap-2 bg-primary-foreground p-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      {((isPreview && product.fakePath) || product.imageUrl) && (
        <img
          src={product.fakePath || product.imageUrl}
          alt={product.name}
          className="w-50 h-full object-cover rounded-lg my-auto mr-6"
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
          <AddToCardButton product={product} isPreview={isPreview} />
        </div>
        {product.description && <p>{product.description}</p>}
        {product.items.length > 0 && (
          <div>
            {product.items.map((item) => (
              <div className="flex items-start gap-2" key={item.id}>
                <p className="font-semibold">{item.number}x</p>
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
