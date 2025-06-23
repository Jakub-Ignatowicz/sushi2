"use client";

import { Button } from "@/components/ui/button";
import { priceToString } from "@/lib/utils";
import { Product as ProductType } from "@/types/api";
import ProductDialog from "./product-dialog";
import { Trash, Trash2 } from "lucide-react";

type Props = {
  product: ProductType;
};

const Product = ({ product }: Props) => {
  return (
    <div
      key={product.id}
      className="px-6 py-4 bg-primary-foreground rounded-lg shadow-md flex gap-2 items-center justify-between"
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
        <p className="mt-2">{priceToString(product.price)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="destructive"
          onClick={() => alert(`Product ID: ${product.id}`)}
        >
          <Trash2 size={16} />
        </Button>
        <ProductDialog product={product} />
      </div>
    </div>
  );
};

export default Product;
