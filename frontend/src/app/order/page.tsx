import { GET } from "@/lib/api";
import ProductsList from "./ProductsList";

export default async function page() {
  let products = await GET("/api/products");
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="max-w-box w-full h-full ">
        <ProductsList products={products} />
      </div>
    </div>
  );
}
