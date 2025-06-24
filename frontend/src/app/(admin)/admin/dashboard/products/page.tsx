import { getProducts } from "@/lib/api/products";
import Product from "./product";
import { Product as ProductType } from "@/types/api";
import { Label } from "@/components/ui/label";
import { Tag } from "lucide-react";
import { groupProductsByCategory } from "@/lib/utils";
import { uploadImage } from "@/lib/api/images";

const ProductsPage = async () => {
  const products = await getProducts();

  async function urlToFile(url, filename, mimeType) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
  }

  const convertProduct = async (data) => {
    const fileName = await uploadImage(file);
    data.imageName = fileName;

    await updateProduct(data);
  };

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
