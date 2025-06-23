import { Button } from "@/components/ui/button";
import { OrderProduct as OrderProductType } from "@/types/api";

type Props = {
  orderProduct: OrderProductType;
};

const OrderProduct = ({ orderProduct }: Props) => {
  const { quantity, product } = orderProduct;
  const categories = product.categories
    .map((category) => category.name)
    .join(", ");

  return (
    <div
      key={product.id}
      className="flex gap-2 px-4 py-2 border rounded-lg shadow-sm items-center"
    >
      <p>x{quantity}</p>
      <p>{product.name}</p>
      <p>{categories}</p>
      <p>
        {product.amount} {product.amountUnit}
      </p>
      <Button
        variant="outline"
        className="ml-auto"
        onClick={() => {
          // Handle product details or actions here
          console.log(`Product ID: ${product.id}`);
        }}
      >
        Szczegóły
      </Button>
    </div>
  );
};

export default OrderProduct;
