"use client";

import { getInProgressOrders, getOrders } from "@/lib/api/orders";
import FetchError from "@/components/fetch-error";
import { OrdersTable } from "../data-table";
import { columns } from "../columns";
import { useEffect, useState } from "react";
import { Order } from "@/types/api";
import PageLoader from "@/components/page-loader";
import { toast } from "sonner";

export default function InProgressOrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res);
      } catch (error) {
        toast.error("Błąd pobierania zamówień");
      }
    };

    fetchOrders();
  }, []);

  if (orders === null) {
    return <PageLoader />;
  }

  return <OrdersTable columns={columns} data={orders} />;
}
