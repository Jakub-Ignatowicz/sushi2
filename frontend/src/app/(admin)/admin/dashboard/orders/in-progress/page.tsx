import { getInProgressOrders, getNewOrders } from "@/lib/api/orders";
import { formatDate } from "@/lib/utils";
import { Dot } from "lucide-react";
import OrdersClientPage from "../new/page-client";
import OrderComponent from "../order";

const NewOrdersPage = async () => {
  const orders = await getInProgressOrders();

  return (
    <>
      {orders.map((order) => (
        <OrderComponent key={order.id} order={order} />
      ))}
    </>
  );
};

export default NewOrdersPage;
