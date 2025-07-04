"use client";

import { Button } from "@/components/ui/button";
import { addressToString, formatDate, priceToString } from "@/lib/utils";
import { Address, Order } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import OrderStatus from "./order-status";
import CartDialog from "@/app/(main)/cart/cart-dialog";
import OrderDialog from "./dialog";
import { Check } from "lucide-react";
import OrderActions from "./order-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row }) => {
      const parts = formatDate(row.getValue("createdAt")).split(" ");

      return (
        <div>
          <div className="font-semibold">{parts[0]}</div>
          <div>{parts[1]}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Adres",
    meta: { className: "w-full" },
    cell: ({ row }) => {
      const address = row.getValue("address") as Address;
      return <div>{addressToString(address)}</div>;
    },
  },
  {
    accessorKey: "totalCost",
    header: "Kwota",
    cell: ({ row }) => {
      const totalCost = row.getValue("totalCost") as number;
      return priceToString(totalCost);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <OrderStatus order={row.original} />;
    },
  },
  {
    header: "Akcja",
    cell: ({ row }) => {
      return <OrderActions order={row.original} />;
    },
  },
];
