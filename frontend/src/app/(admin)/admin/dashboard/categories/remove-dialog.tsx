"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import { Category } from "@/types/api";
import { Label } from "@/components/ui/label";
import { deleteCategory } from "@/lib/api/categories";
import { toast } from "sonner";

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
        <Label className="text-xl font-medium">Usunięcie kategorii</Label>
        <div className="text-muted-foreground">
          Czy na pewno chcesz usunąć kategorię:
          <strong className="text-zume font-normal block">
            - {category.name}
          </strong>{" "}
          oraz wszystkie produkty z nią powiązane?
        </div>
        <Button
          variant="destructive"
          className="w-full"
          onClick={async () => {
            try {
              await deleteCategory(category.id);
              toast.success("Kategoria została pomyślnie usunięta.");
            } catch {
              toast.error("Wystąpił błąd podczas usuwania kategorii.");
            }
          }}
        >
          Usuń
        </Button>
        <Label className="text-sm text-muted-foreground">
          Uwaga: Ta operacja jest nieodwracalna.
        </Label>
      </DialogContent>
    </Dialog>
  );
}
