import { Button } from "@/components/ui/button";
import { Order, OrderStatus } from "@/types/api";
import OrderDialog from "./dialog";
import { Check, X } from "lucide-react";
import TooltipButton from "@/components/tooltip-button";
import { changeOrderStatus } from "@/lib/api/orders";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

type Props = {
  order: Order;
};

export default function OrderActions({ order }: Props) {
  const pathname = usePathname();

  const AcceptButton = () => (
    <TooltipButton label={"Akceptuj"}>
      <Button
        className="btn btn-primary"
        variant={"outline"}
        onClick={async () => {
          try {
            await changeOrderStatus(order.id, OrderStatus.Preparing);
            window.location.reload();
          } catch (error) {
            toast.error("Nie udało się zaakceptować zamówienia");
          }
        }}
      >
        <Check />
      </Button>
    </TooltipButton>
  );

  const CancelButton = () => (
    <TooltipButton label={"Anuluj"}>
      <Button
        className="btn btn-primary"
        variant={"destructive"}
        onClick={async () => {
          try {
            await changeOrderStatus(order.id, OrderStatus.Cancelled);
            window.location.reload();
          } catch (error) {
            toast.error("Nie udało się anulować zamówienia");
          }
        }}
      >
        <X />
      </Button>
    </TooltipButton>
  );

  const CompleteButton = () => (
    <TooltipButton label={"Oznacz jako zrealizowane"}>
      <Button
        className="btn btn-primary"
        variant={"outline"}
        onClick={async () => {
          try {
            await changeOrderStatus(order.id, OrderStatus.Completed);
            window.location.reload();
          } catch (error) {
            toast.error("Nie udało się oznaczyć zamówienia jako zrealizowane");
          }
        }}
      >
        <Check />
      </Button>
    </TooltipButton>
  );

  return (
    <div className="flex items-center gap-2 justify-end">
      {order.status === OrderStatus.Pending &&
      pathname === "/admin/dashboard/orders/new" ? (
        <>
          <AcceptButton />
          <CancelButton />
        </>
      ) : (
        order.status === OrderStatus.Preparing &&
        pathname === "/admin/dashboard/orders/in-progress" && (
          <>
            <CompleteButton />
            <CancelButton />
          </>
        )
      )}
      <OrderDialog order={order} />
    </div>
  );
}
