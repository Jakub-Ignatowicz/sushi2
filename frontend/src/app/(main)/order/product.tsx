import { priceToString } from "@/lib/utils";
import { Product } from "@/types/api";
import AddToCartButton from "./add-to-cart";

type Props = {
  product: Product;
  isPreview?: boolean;
};

const ProductComponent = ({ product, isPreview }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-primary-foreground p-4 lg:py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      {((isPreview && product.fakePath) || product.imageUrl) && (
        <img
          src={product.fakePath || product.imageUrl}
          alt={product.name}
          className="w-50 h-full object-cover rounded-lg mx-auto sm:my-auto"
        />
      )}
      <div className="flex flex-col gap-2 lg:gap-1 w-full">
        <div>
          <span className="text-lg font-semibold">{product.name}</span>
          <span className="text-muted-foreground font-medium ml-2">
            {product.amount}
            {product.amountUnit}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xl font-medium text-zume dark:text-red-400">
            {priceToString(product.price)}
          </p>
          <AddToCartButton product={product} isPreview={isPreview} />
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
