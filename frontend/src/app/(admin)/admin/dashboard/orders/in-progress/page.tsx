import { getInProgressOrders } from "@/lib/api/orders";
import OrderComponent from "../order";
import FetchError from "@/components/fetch-error";

const NewOrdersPage = async () => {
  try {
    const orders = await getInProgressOrders();
    return orders.map((order) => (
      <OrderComponent key={order.id} order={order} />
    ));
  } catch (error: any) {
    return <FetchError error={error} />;
  }
};

export default NewOrdersPage;
