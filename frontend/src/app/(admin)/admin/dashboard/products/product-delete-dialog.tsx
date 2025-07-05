import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { deleteProduct } from "@/lib/api/products";
import { Product } from "@/types/api";
import {
  ChevronRightIcon,
  CornerDownRight,
  Dot,
  Info,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

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
        <Button
          variant="destructive"
          className=""
          onClick={async () => {
            try {
              await deleteProduct(product.id);
              toast.success("Produkt został pomyślnie usunięty.");
            } catch (error) {
              console.error("Błąd podczas usuwania produktu:", error);
              toast.error("Wystąpił błąd podczas usuwania produktu.");
            }
          }}
        >
          Potwierdź usunięcie
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDeleteDialog;
