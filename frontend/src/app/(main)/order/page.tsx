import { getProducts } from "@/lib/api/products";
import { Product } from "@/types/api";
import ProductComponent from "./product";
import { categorizieProducts } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Tag } from "lucide-react";
import FetchError from "@/components/fetch-error";

export default async function OrderPage() {
  let products;
  try {
    products = await getProducts();
  } catch (error: any) {
    return <FetchError error={error} />;
  }

  const categories = categorizieProducts(products);

  return (
    <div>
      {categories.map((cat) => (
        <div key={cat.id}>
          <div className="mt-24 mb-8">
            <Label className="text-4xl font-bold">
              <Tag />
              {cat.name}
            </Label>
            <p className="mt-2">
              lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12"> */}
          <div className="flex flex-col gap-6">
            {cat.products.map((product: Product) => (
              <ProductComponent key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
