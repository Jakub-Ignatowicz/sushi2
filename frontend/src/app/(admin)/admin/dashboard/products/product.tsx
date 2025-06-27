"use client";

import { priceToString } from "@/lib/utils";
import { Product as ProductType } from "@/types/api";
import ProductDialog from "./product-dialog";
import ProductDeleteDialog from "./product-delete-dialog";
import { Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { featureProduct } from "@/lib/api/products";
import { toast } from "sonner";
import { useState } from "react";

type Props = {
  product: ProductType;
  categoryId: string;
};

const Product = ({ product, categoryId }: Props) => {
  const [isFeatured, setIsFeatured] = useState(product.isFeatured);

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
          className={clsx(
            isFeatured && "bg-yellow-300 dark:bg-yellow-600",
            "hover:bg-yellow-300 dark:hover:bg-yellow-600",
          )}
          onClick={async () => {
            try {
              await featureProduct(product.id, !isFeatured);
              setIsFeatured(!isFeatured);
              toast.success("Produkt został wyróżniony");
            } catch (error) {
              toast.error("Wystąpił błąd podczas aktualizacji produktu");
            }
          }}
          variant="secondary"
        >
          {isFeatured ? <StarOff size={16} /> : <Star size={16} />}
        </Button>
        <ProductDeleteDialog product={product} categoryId={categoryId} />
        <ProductDialog product={product} isEdit />
      </div>
    </div>
  );
};

export default Product;
