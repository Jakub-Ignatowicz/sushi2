import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/api";
import {
  ChevronRightIcon,
  CornerDownRight,
  Dot,
  Info,
  Trash2,
} from "lucide-react";

type Props = {
  product: Product;
  categoryId: string;
};

const ProductDeleteDialog = ({ product, categoryId }: Props) => {
  const categoryNames = product.categories.map((c) => c.name);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <Label className="text-xl font-bold">Usuń produkt</Label>
        <p className="text-sm text-muted-foreground">
          <span className="font-bold">{product.name}</span> należy do
          następujących kategorii:
        </p>
        <div>
          {categoryNames.map((name, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <ChevronRightIcon size={16} />
              {name}
            </div>
          ))}
        </div>
        <Button disabled={categoryNames.length <= 1} variant="outline">
          Usuń tylko z kategorii {categoryId}
        </Button>
        <Button variant="destructive" className="">
          Usuń produkt
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          <Info size={15} className="inline mr-1" />
          Jeżeli produkt należy tylko do jednej kategorii, zostanie usunięty z
          bazy danych.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDeleteDialog;
