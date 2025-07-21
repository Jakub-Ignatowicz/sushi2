"use client";

import { UseFormReturn, useWatch } from "react-hook-form";
import { priceToString } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CartFormSchemaType, DELIVERY_FEE, PERSON_COST } from "./form";
import { useCartState } from "@/context/cart-context";
import OrderDialog from "@/app/(admin)/admin/dashboard/orders/dialog";
import CartSummaryDialog from "./cart-summary-dialog";

type Props = {
  form: UseFormReturn<CartFormSchemaType>;
};

export function CartCostSummary({ form }: Props) {
  const { total } = useCartState();
  const totalCost = DELIVERY_FEE + total;

  return (
    <div className="p-4 border-1 rounded-lg shadow-md w-full h-fit flex-1">
      <div className="text-muted-foreground">
        <div className="flex justify-between">
          <p>Dostawa</p>
          <p>{priceToString(DELIVERY_FEE)}</p>
        </div>
        <div className="flex justify-between">
          <p>Koszyk</p>
          <p>{priceToString(total)}</p>
        </div>
      </div>
      <Separator className="mt-2 mb-1" />
      <div className="flex justify-between">
        <p className="font-bold">Do zapłaty</p>
        <p className="font-medium">{priceToString(totalCost)}</p>
      </div>
      <CartSummaryDialog form={form} />
    </div>
  );
}
// export type Order = {
//   id: string;
//   address: Address;
//   peopleCount: number;
//   notes: string;
//   createdAt: Date;
//   orderProducts: OrderProduct[];
//   totalPrice: number;
//   paymentMethod: PaymentMethod;
//   status: OrderStatus;
//   user: User;
// };
