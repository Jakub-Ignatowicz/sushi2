import { getNewOrders } from "@/lib/api/orders";
import FetchError from "@/components/fetch-error";
import { columns } from "../columns";
import { OrdersTable } from "../data-table";

const NewOrdersPage = async () => {
  try {
    const orders = await getNewOrders();
    // return <OrdersClientPage orders={orders} />;

    return (
      <div className="container mx-auto py-10">
        <OrdersTable columns={columns} data={orders} />
      </div>
    );
  } catch (error) {
    return <FetchError error={error} />;
  }
};

export default NewOrdersPage;
