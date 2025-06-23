import { getProducts } from "@/lib/api/products";
import { Product } from "@/types/api";
import ProductComponent from "./product";

export default async function OrderPage() {
  const products = (await getProducts()) as Product[];

  return (
    <div>
      {products.map((product) => (
        <ProductComponent key={product.id} product={product} />
      ))}
    </div>
  );
}
