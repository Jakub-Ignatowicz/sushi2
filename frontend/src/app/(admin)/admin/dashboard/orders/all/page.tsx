import { getOrders } from "@/lib/api/orders";
import FetchError from "@/components/fetch-error";
import { OrdersTable } from "../data-table";
import { columns } from "../columns";

const AllOrdersPage = async () => {
  try {
    const orders = await getOrders();
    console.log(orders);

    return (
      <div className="container mx-auto py-10">
        <OrdersTable columns={columns} data={orders} />
      </div>
    );
  } catch (error: any) {
    return <FetchError error={error} />;
  }
};

export default AllOrdersPage;
