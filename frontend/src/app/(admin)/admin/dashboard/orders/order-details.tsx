import { Label } from "@/components/ui/label";
import { Order } from "@/types/api";
import React from "react";

type Props = {
  order: Order;
};

const OrderDetails = ({ order }: Props) => {
  const table = [
    { label: "Email", value: order.user.email },
    { label: "Numer telefonu", value: order.user.phoneNumber },
    {
      label: "Adres",
      value: `${order.address.street}, ${order.address.apartmentNumber}, ${order.address.homeNumber}`,
    },
    { label: "Forma płatności", value: order.paymentMethod },
    { label: "Liczba osób", value: order.peopleCount.toString() },
    { label: "Uwagi", value: order.notes || "Brak uwag" },
  ];

  return (
    <div>
      <Label className="uppercase font-bold">Dane odbiorcy</Label>
      <div className="grid grid-cols-[max-content_1fr] gap-x-8">
        {table.map((row) => (
          <React.Fragment key={row.label}>
            <p className="text-muted-foreground">{row.label}</p>
            <p>{row.value}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
