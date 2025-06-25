import { Label } from "@/components/ui/label";
import { Order } from "@/types/api";
import { Button } from "@/components/ui/button";
import { addressToString, formatDate, priceToString } from "@/lib/utils";
import OrderDialog from "./dialog";

type Props = {
  order: Order;
};

type OrderColumn = {
  header: string;
  key: (order: Order) => string;
};

const columns: OrderColumn[] = [
  { header: "Data", key: (o) => formatDate(o.createdAt) },
  { header: "Adres", key: (o) => addressToString(o.address) },
  { header: "Kwota", key: (o) => priceToString(o.totalPrice) },
];

const OrderComponent = ({ order }: Props) => {
  return (
    <div className="flex gap-8 p-4 bg-primary-foreground rounded-lg shadow-md justify-between items-center w-full">
      <div className="flex gap-8 text-muted-foreground text-sm just">
        {columns.map((col) => (
          <div className="min-w-40" key={col.header}>
            <Label className="text-xs font-bold text-primary mb-2">
              {col.header}
            </Label>
            <p className="text-sm">{col.key(order)}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {order.status == "Pending" ? (
          <Button>Potwierdz</Button>
        ) : order.status == "Preparing" ? (
          <Button variant="green">Zrealizuj</Button>
        ) : null}
        <OrderDialog order={order} />
      </div>
    </div>
  );
};

export default OrderComponent;
