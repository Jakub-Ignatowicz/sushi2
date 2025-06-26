import { getNewOrders } from "@/lib/api/orders";
import OrdersClientPage from "./page-client";
import FetchError from "@/components/fetch-error";

const NewOrdersPage = async () => {
  try {
    const orders = await getNewOrders();
    return <OrdersClientPage orders={orders} />;
  } catch (error) {
    return <FetchError error={error} />;
  }
};

export default NewOrdersPage;
