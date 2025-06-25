"use client";

import { priceToString } from "@/lib/utils";
import { Product as ProductType } from "@/types/api";
import ProductDialog from "./product-dialog";
import ProductDeleteDialog from "./product-delete-dialog";
import { Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

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
        {/* <p className="text-sm text-muted-foreground">{product.description}</p> */}
        <p className="mt-2 text-sm">{priceToString(product.price)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className={clsx(product.isFeatured && "bg-yellow-500")}
          variant="secondary"
        >
          {product.isFeatured ? <StarOff size={16} /> : <Star size={16} />}
        </Button>
        <ProductDeleteDialog product={product} categoryId={categoryId} />
        <ProductDialog product={product} isEdit />
      </div>
    </div>
  );
};

export default Product;
