import ProductComponent from "@/app/(main)/order/product";
import LabelFile from "@/components/label-file";
import LabelInput from "@/components/label-input";
import LabelTextarea from "@/components/label-textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadImage } from "@/lib/api/images";
import { createProduct, updateProduct } from "@/lib/api/products";
import { Product } from "@/types/api";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  product: Product;
  isEdit?: boolean;
};

const ProductDialog = ({ product, isEdit }: Props) => {
  const { register, control, handleSubmit, reset, watch, setValue } =
    useForm<Product>({
      defaultValues: { ...product },
    });
  const [newAmount, setNewAmount] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const addItem = () => {
    if (!newAmount || !newDescription) return;

    append({
      number: Number(newAmount) || 0,
      description: newDescription,
    } as any);

    setNewAmount("");
    setNewDescription("");
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setValue("fakePath", url, { shouldValidate: false, shouldDirty: true });
    }
  };

  const onSubmit = async (data: Product) => {
    if (file) {
      data.imageUrl = await uploadImage(file);
      console.log(data.imageUrl);
    }

    // try {
    //   if (isEdit) product = await updateProduct(data);
    //   else product = await createProduct(data);
    // } catch (error) {
    //   toast.error(`Nie udało się ${isEdit ? "edytować" : "dodać"} produktu`);
    //   return;
    // }
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
          <div className="flex-2 justify-center items-center bg-secondary p-4 rounded-lg shadow-md">
            <ProductComponent isPreview product={watch()} />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex-1 pl-6"
          >
            <Label className="text-2xl mb-4 font-bold">
              {isEdit ? "Edytuj produkt" : "Stwórz nowy produkt"}
            </Label>
            <div className="flex flex-col items-center">
              <div className="overflow-auto w-full max-h-[50vh] flex flex-col gap-2 pr-3">
                <LabelInput label="Nazwa" {...register("name")} />
                <LabelFile label="Zdjęcie" onChange={onFileChange} />
                <LabelInput label="Cena" type="number" {...register("price")} />
                <LabelInput
                  label="Ilość"
                  type="number"
                  {...register("amount")}
                />
                <LabelInput label="Jednostka" {...register("amountUnit")} />
                <LabelTextarea
                  rows={5}
                  label="Opis"
                  {...register("description")}
                />
                <div>
                  <Label className="my-2 text-xl">Dodaj produkt</Label>
                  <div className="flex items-end gap-2">
                    <LabelInput
                      label="Ilość"
                      value={newAmount}
                      width="w-32"
                      type="number"
                      onChange={(e) => setNewAmount(e.target.value)}
                    />
                    <LabelInput
                      label="Opis"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <Button variant="outline" type="button" onClick={addItem}>
                      <Plus size={16} />
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-col gap-2">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center justify-between pl-4 pr-2 py-1 rounded-md shadow-sm border bg-sidebar"
                      >
                        <div className="flex gap-2">
                          <div>{field.number}x</div>
                          <p className="wrap-normal">{field.description}</p>
                        </div>
                        <Button
                          className="size-8"
                          variant="ghost"
                          onClick={() => remove(index)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Button className="mt-4 w-full" type="submit" variant="secondary">
                {isEdit ? "Zapisz zmiany" : "Zapisz"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
