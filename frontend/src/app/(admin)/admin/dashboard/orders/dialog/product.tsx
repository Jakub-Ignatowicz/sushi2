import { Product } from "@/types/api";

type Props = {
  product: Product;
};

const OrderDialogProduct = ({ product }: Props) => {
  return (
    <div>
      <h2>Order Product Dialog</h2>
      {/* Add your dialog content here */}
    </div>
  );
};

export default OrderDialogProduct;
