import { getOrders } from "@/lib/api/orders";
import { Order } from "@/types/api";
import OrderComponent from "./order";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const OrdersPage = async () => {
  const orders = await getOrders();

  return (
    <div>
      <div className="flex justify-center w-full gap-8">
        <Button variant={"ghost"} className="font-bold">
          Nowe
        </Button>
        <Button variant={"ghost"} className="font-bold">
          W trakcie
        </Button>
        <Button variant={"ghost"} className="font-bold">
          Wykonane
        </Button>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {orders.map((order) => (
          <OrderComponent key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
