import { getNewOrders } from "@/lib/api/orders";
import FetchError from "@/components/fetch-error";
import OrdersClientPage from "./page-client";
import { authLogin } from "@/lib/api/auth";

const NewOrdersPage = async () => {
  return <OrdersClientPage />;
};

export default NewOrdersPage;
