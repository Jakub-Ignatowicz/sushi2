import { Label } from "@/components/ui/label";
import { Order } from "@/types/api";
import OrderDetails from "./order-details";
import OrderProducts from "./order-products";

type Props = {
  order: Order;
};

const OrderComponent = ({ order }: Props) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-primary-foreground rounded-lg shadow-md text-sm">
      <OrderDetails order={order} />
      <OrderProducts order={order} />
      <div className="flex gap-2 text-xs text-muted-foreground">
        <div>
          <Label className="uppercase font-bold">Data zamówienia</Label>
          <p>
            {new Date(order.createdAt).toLocaleDateString("pl-PL")}{" "}
            {new Date(order.createdAt).toLocaleTimeString("pl-PL", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
        </div>
        <div>
          <Label className="uppercase font-bold">Zamówienie</Label>
          <p>#{order.id}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
