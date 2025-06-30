"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import { Category } from "@/types/api";

type Props = {
  category: Category;
};

export default function RemoveCategoryDialog({ category }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        <Button variant="destructive">
          <X />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <p>Tworzenie nowej kategorii jest obecnie niedostępne.</p>
      </DialogContent>
    </Dialog>
  );
}
