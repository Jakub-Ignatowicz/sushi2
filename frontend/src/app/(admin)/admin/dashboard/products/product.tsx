"use client";

import { priceToString } from "@/lib/utils";
import { Product as ProductType } from "@/types/api";
import ProductDialog from "./product-dialog";
import ProductDeleteDialog from "./product-delete-dialog";
import { Eye, EyeOff, Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { availableProduct, featureProduct } from "@/lib/api/products";
import { toast } from "sonner";
import { useState } from "react";

type Props = {
  product: ProductType;
  categoryId: string;
};

const Product = ({ product, categoryId }: Props) => {
  const [isFeatured, setIsFeatured] = useState(product.isFeatured);
  const [isAvailable, setIsAvailable] = useState(product.isAvailable);

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
            !isAvailable && "bg-blue-400 dark:bg-blue-900",
            "hover:bg-blue-400 dark:hover:bg-blue-900",
          )}
          onClick={async () => {
            try {
              await availableProduct(product.id, !isAvailable);
              setIsAvailable(!isAvailable);
              toast.success(
                "Produkt został " + (isAvailable ? "ukryty" : "odblokowany"),
              );
            } catch (error) {
              toast.error("Wystąpił błąd podczas aktualizacji produktu");
            }
          }}
          variant="secondary"
        >
          {isAvailable ? <Eye size={16} /> : <EyeOff size={16} />}
        </Button>
        <Button
          className={clsx(
            isFeatured && "bg-yellow-300 dark:bg-yellow-600",
            "hover:bg-yellow-300 dark:hover:bg-yellow-600",
          )}
          onClick={async () => {
            try {
              await featureProduct(product.id, !isFeatured);
              setIsFeatured(!isFeatured);
              toast.success(
                "Produkt został " + (isFeatured ? "odznaczony" : "wyróżniony"),
              );
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
