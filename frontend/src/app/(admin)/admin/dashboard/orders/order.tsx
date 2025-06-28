import { Label } from "@/components/ui/label";
import { Order as OrderType } from "@/types/api";
import { Button } from "@/components/ui/button";
import { addressToString, formatDate, priceToString } from "@/lib/utils";
import OrderDialog from "./dialog";
import OrderStatus from "./order-status";

type Props = {
  order: OrderType;
};

type OrderColumn = {
  header: string;
  key: (order: OrderType) => string;
};

const columns: OrderColumn[] = [
  { header: "Data", key: (o) => formatDate(o.createdAt) },
  { header: "Adres", key: (o) => addressToString(o.address) },
  { header: "Kwota", key: (o) => priceToString(o.totalPrice) },
  { header: "Status", key: (o) => o.status },
];

export default function Order({ order }: Props) {
  return (
    <tr className="my-2 text-sm">
      <td>
        {formatDate(order.createdAt)
          .split(" ")
          .map((s) => (
            <div key={s}>{s}</div>
          ))}
      </td>
      <td>{addressToString(order.address)}</td>
      <td>{priceToString(order.totalPrice)}</td>
      <td>
        <OrderStatus order={order} />
      </td>
      <td className="text-right">
        {order.status == "Pending" ? (
          <Button>Potwierdz</Button>
        ) : order.status == "Preparing" ? (
          <Button variant="green">Zrealizuj</Button>
        ) : null}
        <OrderDialog order={order} />
      </td>
    </tr>
  );
}
