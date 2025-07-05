import { getProducts } from "@/lib/api/products";
import Product from "./product";
import { Label } from "@/components/ui/label";
import { Tag } from "lucide-react";
import { categorizeProducts } from "@/lib/utils";
import FetchError from "@/components/fetch-error";

const ProductsPage = async () => {
  let products;
  try {
    products = await getProducts();
  } catch (error: any) {
    return <FetchError error={error} />;
  }

  const categories = categorizeProducts(products);

  return (
    <div className="flex flex-col">
      {categories.map((cat) => {
        return (
          <div>
            <Label className="text-2xl my-5 mt-8 font-bold">
              <Tag size={16} />
              {cat.name}
            </Label>
            <div className="flex flex-col gap-4">
              {cat.products.map((product) => (
                <Product product={product} categoryId={cat.id} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsPage;
