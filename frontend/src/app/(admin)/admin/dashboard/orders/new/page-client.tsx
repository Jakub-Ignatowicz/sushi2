"use client";

import { Order } from "@/types/api";
import OrderComponent from "../order";
import { useEffect, useState } from "react";
import { getNewOrders } from "@/lib/api/orders";
import { formatDate } from "@/lib/utils";
import { Activity, Dot, PackageX, UtensilsCrossed } from "lucide-react";

type Props = {
  orders: Order[];
};

const OrdersClientPage = ({ orders: initOrders }: Props) => {
  const [orders, setOrders] = useState<Order[]>(initOrders);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getNewOrders();
      setOrders(res);
      setLastUpdate(new Date());
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 5_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      {orders.length !== 0 ? (
        <>
          {orders.map((order) => (
            <OrderComponent key={order.id} order={order} />
          ))}
        </>
      ) : (
        <div className="flex items-center justify-center gap-2 py-16">
          <div className="text-2xl">🍣</div>
          <span className="text-xl">Brak nowych zamówień</span>
        </div>
      )}
      <div className="mx-auto flex items-center gap-2 text-sm">
        <div className="relative flex h-3 w-3 mt-0.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
        </div>
        <span className="text-muted-foreground">
          aktualny stan na{" "}
          <span className="font-semibold">{formatDate(lastUpdate)}</span>
        </span>
      </div>
    </div>
  );
};

export default OrdersClientPage;
