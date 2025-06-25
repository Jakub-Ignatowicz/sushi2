import { getNewOrders } from "@/lib/api/orders";
import OrdersClientPage from "./page-client";

const NewOrdersPage = async () => {
  const orders = await getNewOrders();

  return <OrdersClientPage orders={orders} />;
};

export default NewOrdersPage;
