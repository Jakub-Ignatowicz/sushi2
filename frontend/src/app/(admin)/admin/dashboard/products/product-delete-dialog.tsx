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
          Czy na pewno chcesz usunąć produkt:{" "}
          <span className="font-bold">{product.name}</span> należący do
          kategorii <span className="font-bold">{product.category.name}</span>.
        </p>
        <Button variant="destructive" className="">
          Potwierdź usunięcie
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDeleteDialog;
