import { getProducts } from "@/lib/api/products";
import Product from "./product";
import { Product as ProductType } from "@/types/api";
import { Label } from "@/components/ui/label";
import { Tag } from "lucide-react";

type AggregatedProducts = {
  [categoryName: string]: ProductType[];
};

const ProductsPage = async () => {
  const products = await getProducts();

  const aggregatedProducts = products.reduce((acc, product) => {
    for (const category of product.categories)
      (acc[category.name] ??= []).push(product);
    return acc;
  }, {} as AggregatedProducts);

  return (
    <div className="flex flex-col">
      {Object.entries(aggregatedProducts).map(([category, products]) => {
        return (
          <div>
            <Label className="text-2xl my-5 font-bold">
              <Tag size={16} />
              {category}
            </Label>
            <div className="flex flex-col gap-4">
              {products.map((product) => (
                <Product product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsPage;
