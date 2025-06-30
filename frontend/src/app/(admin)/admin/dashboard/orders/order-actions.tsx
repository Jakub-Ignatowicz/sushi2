import { Button } from "@/components/ui/button";
import { Order, OrderStatus } from "@/types/api";
import OrderDialog from "./dialog";
import { Check, X } from "lucide-react";
import TooltipButton from "@/components/tooltip-button";
import { changeOrderStatus } from "@/lib/api/orders";
import { toast } from "sonner";

type Props = {
  order: Order;
};

export default function OrderActions({ order }: Props) {
  const AcceptButton = () => (
    <TooltipButton label={"Akceptuj"}>
      <Button
        className="btn btn-primary"
        variant={"outline"}
        onClick={async () => {
          try {
            await changeOrderStatus(order.id, OrderStatus.Preparing);
            toast.success("Zamówienie zaakceptowane");
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
            toast.success("Zamówienie anulowane");
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
            toast.success("Zamówienie oznaczone jako zrealizowane");
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
      {order.status === OrderStatus.Pending ? (
        <>
          <AcceptButton />
          <CancelButton />
        </>
      ) : order.status === OrderStatus.Preparing ? (
        <>
          <CompleteButton />
          <CancelButton />
        </>
      ) : null}
      <OrderDialog order={order} />
    </div>
  );
}
