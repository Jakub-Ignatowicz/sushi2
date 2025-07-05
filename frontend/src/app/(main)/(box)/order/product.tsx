import { priceToString } from "@/lib/utils";
import { Product } from "@/types/api";
import AddToCartButton, { AddToCartButtonPreview } from "./add-to-cart";
import { Tag } from "lucide-react";

type Props = {
  product: Product;
  isPreview?: boolean;
  isFeatured?: boolean;
};

const ProductComponent = ({ product, isPreview, isFeatured }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-primary-foreground p-4 lg:py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col gap-2 lg:gap-1 w-full">
        <div>
          <div>
            {isFeatured && (
              <div className="font-medium text-muted-foreground">
                <Tag className="inline mr-1" size={16} />
                {product.category.name}
              </div>
            )}
            <span className="text-lg font-semibold">{product.name}</span>
            <span className="text-muted-foreground font-medium ml-2">
              {product.amount}
              {product.amountUnit}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xl font-medium text-zume dark:text-red-400">
            {priceToString(product.price)}
          </p>
          {isPreview ? (
            <AddToCartButtonPreview isDisabled />
          ) : (
            <AddToCartButton product={product} />
          )}
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
      {((isPreview && product.fakePath) || product.imageUrl) && (
        <img
          src={product.fakePath || product.imageUrl}
          alt={product.name}
          className="w-50 h-full object-cover rounded-lg mx-auto sm:my-auto"
        />
      )}
    </div>
  );
};

export default ProductComponent;
