import { getOrders } from "@/lib/api/orders";
import OrderComponent from "../order";

const AllOrdersPage = async () => {
  const orders = await getOrders();

  return orders.map((order) => <OrderComponent key={order.id} order={order} />);
};

export default AllOrdersPage;
