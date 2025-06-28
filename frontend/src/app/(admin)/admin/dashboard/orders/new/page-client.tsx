"use client";

import { Order as OrderType } from "@/types/api";
import Order from "../order";
import { useEffect, useState } from "react";
import { getNewOrders } from "@/lib/api/orders";
import { formatDate } from "@/lib/utils";
import { PackageX } from "lucide-react";

type Props = {
  orders: OrderType[];
};

const OrdersClientPage = ({ orders: initOrders }: Props) => {
  const [orders, setOrders] = useState<OrderType[]>(initOrders);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLive, setIsLive] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getNewOrders();
        setOrders(res);
        setLastUpdate(new Date());
        setIsLive(true);
      } catch (error: any) {
        setIsLive(false);
      }
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
            <Order key={order.id} order={order} />
          ))}
        </>
      ) : (
        <div className="flex items-center justify-center gap-2 py-16">
          <div className="text-2xl">🍣</div>
          <span className="text-xl">Brak nowych zamówień</span>
        </div>
      )}
      <div className="mx-auto flex items-center gap-2 text-sm">
        {isLive ? (
          <>
            <div className="relative flex h-3 w-3 mt-0.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
            </div>
            <span className="text-muted-foreground">
              aktualny stan na{" "}
              <span className="font-semibold">{formatDate(lastUpdate)}</span>
            </span>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <PackageX className="text-red-500" />
            <span className="text-red-500">Błąd pobierania zamówień</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersClientPage;
