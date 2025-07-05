import { getProducts } from "@/lib/api/products";
import { Product } from "@/types/api";
import ProductComponent from "./product";
import { categorizeProducts, cn, FEATURED_CATEGORY_ID } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Star, Tag } from "lucide-react";
import FetchError from "@/components/fetch-error";

export default async function OrderPage() {
  let products;
  try {
    products = await getProducts();
  } catch (error: any) {
    return <FetchError error={error} />;
  }

  const categories = categorizeProducts(products, true);

  const CategoryIcon = (isFeatured: boolean) => {
    const Icon = isFeatured ? Star : Tag;

    return (
      <Icon className={cn(isFeatured && "text-yellow-500 fill-yellow-500")} />
    );
  };

  return (
    <div className="space-y-16">
      {categories.map((cat) => {
        const isFeatured = cat.id === FEATURED_CATEGORY_ID;

        return (
          <div key={cat.id}>
            <div className="mb-4">
              <Label className="text-3xl md:text-4xl font-bold">
                {CategoryIcon(isFeatured)}
                {cat.name}
              </Label>
              {cat.description && (
                <p className="mt-2 font-medium text-base text-muted-foreground">
                  {cat.description}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-6">
              {cat.products.map((product: Product) => (
                <ProductComponent
                  key={product.id}
                  product={product}
                  isFeatured={isFeatured}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
