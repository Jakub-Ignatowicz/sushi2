"use client";
import { Product } from "@/types";
import ProductComponent from "./ProductComponent";

export default function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center">
      {products.map((product) => (
        <ProductComponent product={product} />
      ))}
    </div>
  );
}
