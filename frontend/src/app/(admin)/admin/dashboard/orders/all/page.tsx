"use client";

import { getOrders } from "@/lib/api/orders";
import FetchError from "@/components/fetch-error";
import { OrdersTable } from "../data-table";
import { columns } from "../columns";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Order } from "@/types/api";
import PageLoader from "@/components/page-loader";

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  useEffect(() => {
    const fetchNewOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res);
      } catch (error) {
        toast.error("Błąd pobierania zamówień");
      }
    };

    fetchNewOrders();
  }, []);

  if (orders === null) {
    return <PageLoader />;
  }

  return <OrdersTable columns={columns} data={orders} />;
}
