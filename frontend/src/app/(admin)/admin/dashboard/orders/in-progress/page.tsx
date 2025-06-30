import { getInProgressOrders } from "@/lib/api/orders";
import FetchError from "@/components/fetch-error";
import { OrdersTable } from "../data-table";
import { columns } from "../columns";

const NewOrdersPage = async () => {
  try {
    const orders = await getInProgressOrders();

    return <OrdersTable columns={columns} data={orders} />;
  } catch (error: any) {
    return <FetchError error={error} />;
  }
};

export default NewOrdersPage;
