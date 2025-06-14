import { Product } from "@/types";
import Image from "next/image";

export default function ProductComponent({ product }: { product: Product }) {
  return (
    <div>
      {product.imagePath && (
        <Image
          src={product.imagePath}
          width={200}
          height={200}
          alt={`${product.name} image`}
        />
      )}
      <h1>{product.name}</h1>
      <div>
        {product.amount} {product.amountUnit}
      </div>
    </div>
  );
}
