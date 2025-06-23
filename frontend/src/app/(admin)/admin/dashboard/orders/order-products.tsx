"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Order } from "@/types/api";
import OrderProduct from "./order-product";

type Props = {
  order: Order;
};

const OrderProducts = ({ order }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Label className="uppercase">Całkowity koszt:</Label>
        <p className="font-semibold">{order.totalPrice}zł</p>
      </div>
      <div className="flex flex-col gap-2">
        {order.orderProducts.map((productItem) => (
          <OrderProduct orderProduct={productItem} />
        ))}
      </div>
    </div>
  );
};

export default OrderProducts;
