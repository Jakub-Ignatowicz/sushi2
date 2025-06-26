import { getOrders } from "@/lib/api/orders";
import OrderComponent from "../order";
import FetchError from "@/components/fetch-error";

const AllOrdersPage = async () => {
  try {
    const orders = await getOrders();

    return orders.map((order) => (
      <OrderComponent key={order.id} order={order} />
    ));
  } catch (error: any) {
    return <FetchError error={error} />;
  }
};

export default AllOrdersPage;
