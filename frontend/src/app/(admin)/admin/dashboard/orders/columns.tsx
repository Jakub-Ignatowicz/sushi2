"use client";

import { Button } from "@/components/ui/button";
import { addressToString, formatDate, priceToString } from "@/lib/utils";
import { Address, Order } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  {
    accessorKey: "address",
    header: "Adres",
    cell: ({ row }) => {
      const address = row.getValue("address") as Address;
      return addressToString(address);
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Kwota",
    cell: ({ row }) => {
      const totalPrice = row.getValue("totalPrice") as number;
      return priceToString(totalPrice);
    },
  },
  {
    header: "Potwierz",
    cell: ({ row }) => {
      return (
        <Button className="ml-auto" variant={"outline"}>
          Potwierdz
        </Button>
      );
    },
  },
];
