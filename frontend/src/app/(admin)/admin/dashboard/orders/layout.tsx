import { Button } from "@/components/ui/button";
import Link from "next/link";

const OrdersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4 pt-10">
      <div className="flex justify-center w-full gap-8">
        <Link href="/admin/dashboard/orders/new">
          <Button variant={"ghost"} className="font-bold">
            Nowe
          </Button>
        </Link>
        <Link href="/admin/dashboard/orders/in-progress">
          <Button variant={"ghost"} className="font-bold">
            W trakcie
          </Button>
        </Link>
        <Link href="/admin/dashboard/orders/all">
          <Button variant={"ghost"} className="font-bold">
            Wszystkie
          </Button>
        </Link>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default OrdersLayout;
