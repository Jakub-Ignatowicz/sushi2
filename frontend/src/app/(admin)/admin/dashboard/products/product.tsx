"use client";

import { priceToString } from "@/lib/utils";
import { Product as ProductType } from "@/types/api";
import ProductDialog from "./product-dialog";
import ProductDeleteDialog from "./product-delete-dialog";

type Props = {
  product: ProductType;
  categoryId: string;
};

const Product = ({ product, categoryId }: Props) => {
  return (
    <div
      key={product.id}
      className="px-6 py-3 bg-primary-foreground rounded-lg shadow-md flex gap-10 items-center justify-between"
    >
      <div>
        <div>
          <span className="font-bold">{product.name} </span>
          <span className="text-sm text-muted-foreground">
            <span className="font-semibold">{product.amount}</span>
            <span className="font-semibold">{product.amountUnit}</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <p className="mt-2 text-sm">{priceToString(product.price)}</p>
      </div>
      <div className="flex items-center gap-2">
        <ProductDeleteDialog product={product} categoryId={categoryId} />
        <ProductDialog product={product} />
      </div>
    </div>
  );
};

export default Product;
