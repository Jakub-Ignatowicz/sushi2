import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/api";
import { ChevronRightIcon, CornerDownRight, Dot, Trash2 } from "lucide-react";

type Props = {
  product: Product;
  categoryId: string;
};

const ProductDeleteDialog = ({ product, categoryId }: Props) => {
  console.log("ProductDeleteDialog", product, categoryId);
  // const categoryName = product.categories.find(
  //   (c) => c.id === categoryId,
  // )?.name;
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
            <div key={index} className="flex items-center gap-2">
              <ChevronRightIcon size={16} />
              {name}
            </div>
          ))}
        </div>
        <Button variant="outline">Usuń tylko z kategorii {categoryId}</Button>
        <Button variant="destructive" className="">
          Usuń produkt
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDeleteDialog;
