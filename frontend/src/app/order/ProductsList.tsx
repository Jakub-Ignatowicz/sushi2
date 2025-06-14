import { Product } from "@/types";
import ProductComponent from "./ProductComponent";

export default function ProductsList({ products }: { products: Product[] }) {
  return (
    <div>
      {products.map((product) => (
        <ProductComponent product={product} key={product.id} />
      ))}
    </div>
  );
}
