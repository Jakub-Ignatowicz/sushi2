import { getProducts } from "@/lib/api/products";
import Product from "./product";
import { Product as ProductType } from "@/types/api";
import { Label } from "@/components/ui/label";
import { Tag } from "lucide-react";
import { groupProductsByCategory } from "@/lib/utils";

const ProductsPage = async () => {
  const products = await getProducts();

  const aggregatedProducts = groupProductsByCategory(products);

  return (
    <div className="flex flex-col">
      {Object.entries(aggregatedProducts).map(([category, products]) => {
        return (
          <div>
            <Label className="text-2xl my-5 mt-8 font-bold">
              <Tag size={16} />
              {category}
            </Label>
            <div className="flex flex-col gap-4">
              {products.map((product) => (
                <Product product={product} categoryId={category} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsPage;
