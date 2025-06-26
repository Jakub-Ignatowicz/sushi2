import { getProducts } from "@/lib/api/products";
import { Product } from "@/types/api";
import ProductComponent from "./product";
import { groupProductsByCategory } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Tag } from "lucide-react";

export default async function OrderPage() {
  const aggregatedProducts = groupProductsByCategory(await getProducts());

  return (
    <div className="mb-64">
      {Object.entries(aggregatedProducts).map(([category, products]) => (
        <div key={category} className="w-[60%] mx-auto">
          <div className="mt-24 mb-8">
            <Label className="text-4xl font-bold">
              <Tag />
              {category}
            </Label>
            <p className="mt-2">
              lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12"> */}
          <div className="flex flex-col gap-6">
            {products.map((product: Product) => (
              <ProductComponent key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
