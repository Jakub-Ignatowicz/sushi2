"use client";

import { Order as OrderType } from "@/types/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { getNewOrders } from "@/lib/api/orders";
import { formatDate } from "@/lib/utils";
import { PackageX } from "lucide-react";
import { OrdersTable } from "../data-table";
import { columns } from "../columns";
import PageLoader from "@/components/page-loader";
import { toast } from "sonner";

const OrdersClientPage = () => {
  const [orders, setOrders] = useState<OrderType[] | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLive, setIsLive] = useState<boolean>(true);
  const ordersRef = useRef<OrderType[] | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getNewOrders();
        if (ordersRef.current !== null && audioRef.current) {
          const oldIds = ordersRef.current.map((order) => order.id);
          if (res.map((order) => order.id).some((id) => !oldIds.includes(id))) {
            audioRef.current.play().catch(() =>
              toast.error("Błąd odtwarzania dźwięku", {
                description: "Sprawdź ustawienia dźwięku w przeglądarce.",
              }),
            );
          }
        }

        ordersRef.current = res;
        setOrders(res);
        setLastUpdate(new Date());
        setIsLive(true);
      } catch (error: any) {
        setIsLive(false);
      }
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 30_000);
    return () => clearInterval(interval);
  }, []);

  if (orders === null) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <audio ref={audioRef} src="/ui-4.mp3"></audio>
      <OrdersTable columns={columns} data={orders} />
      <div className="mx-auto flex items-center gap-2 text-sm">
        {isLive ? (
          <>
            <div className="relative flex h-3 w-3">
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
