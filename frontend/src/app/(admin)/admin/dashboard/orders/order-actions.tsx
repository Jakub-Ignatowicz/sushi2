import { Button } from "@/components/ui/button";
import { Order, OrderStatus } from "@/types/api";
import OrderDialog from "./dialog";
import { Check, X } from "lucide-react";
import TooltipButton from "@/components/tooltip-button";

type Props = {
  order: Order;
};

export default function OrderActions({ order }: Props) {
  return (
    <div className="flex items-center gap-2">
      {order.status === OrderStatus.Pending ? (
        <>
          <TooltipButton label={"Akceptuj zamówienie"}>
            <Button className="btn btn-primary" variant={"outline"}>
              <Check />
            </Button>
          </TooltipButton>
          <TooltipButton label={"Anuluj"}>
            <Button className="btn btn-primary" variant={"destructive"}>
              <X />
            </Button>
          </TooltipButton>
        </>
      ) : order.status === OrderStatus.Preparing ? (
        <>
          <TooltipButton label={"Oznacz jako zrealizowane"}>
            <Button className="btn btn-primary" variant={"outline"}>
              <Check />
            </Button>
          </TooltipButton>
          <TooltipButton label={"Anuluj"}>
            <Button className="btn btn-primary" variant={"destructive"}>
              <X />
            </Button>
          </TooltipButton>
        </>
      ) : null}
      <OrderDialog order={order} />
    </div>
  );
}
