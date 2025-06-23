import LabelFile from "@/components/label-file";
import LabelInput from "@/components/label-input";
import LabelTextarea from "@/components/label-textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types/api";
import { useForm } from "react-hook-form";

type Props = {
  product: Product;
};

const ProductDialog = ({ product }: Props) => {
  const { register, handleSubmit, reset } = useForm<Product>({
    defaultValues: { ...product },
  });

  const onSubmit = (data: Product) => {
    console.log("Submitted data:", data);
    // you can call an API or do something else here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} onClick={() => reset()}>
          Edytuj
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[75%]">
        <div className="flex">
          <div className="flex-2">
            <p>Tutaj bedzie preview produktu</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex-1">
            <Label className="text-2xl mb-5 font-bold">Edytuj produkt</Label>
            <div className="flex flex-col items-center">
              <div className="overflow-auto w-full max-h-[50vh] flex flex-col gap-2">
                <LabelInput label="Nazwa" {...register("name")} />
                <LabelFile label="Zdjęcie" {...register("imagePath")} />
                <LabelInput label="Cena" type="number" {...register("price")} />
                <LabelInput
                  label="Ilość"
                  type="number"
                  {...register("amount")}
                />
                <LabelInput label="Jednostka" {...register("amountUnit")} />
                <LabelTextarea label="Opis" {...register("description")} />
              </div>
              <Button className="mt-4 w-full" type="submit">
                Zapisz zmiany
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
