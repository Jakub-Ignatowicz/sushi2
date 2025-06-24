import { getInProgressOrders, getNewOrders, getOrders } from "@/lib/api/orders";
import { formatDate } from "@/lib/utils";
import { Dot } from "lucide-react";
import OrdersClientPage from "../new/page-client";
import OrderComponent from "../order";

const AllOrdersPage = async () => {
  const orders = await getOrders();

  return (
    <>
      {orders.map((order) => (
        <OrderComponent key={order.id} order={order} />
      ))}
    </>
  );
};

export default AllOrdersPage;
