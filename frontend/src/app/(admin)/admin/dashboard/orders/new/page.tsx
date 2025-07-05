import { getNewOrders } from "@/lib/api/orders";
import FetchError from "@/components/fetch-error";
import OrdersClientPage from "./page-client";

const NewOrdersPage = async () => {
  try {
    const orders = await getNewOrders();

    return <OrdersClientPage orders={orders} />;
  } catch (error) {
    return <FetchError error={error} />;
  }
};

export default NewOrdersPage;
