import { getInProgressOrders } from "@/lib/api/orders";
import FetchError from "@/components/fetch-error";
import { OrdersTable } from "../data-table";
import { columns } from "../columns";

const NewOrdersPage = async () => {
  try {
    const orders = await getInProgressOrders();

    return (
      <div className="container mx-auto py-10">
        <OrdersTable columns={columns} data={orders} />
      </div>
    );
  } catch (error: any) {
    return <FetchError error={error} />;
  }
};

export default NewOrdersPage;
