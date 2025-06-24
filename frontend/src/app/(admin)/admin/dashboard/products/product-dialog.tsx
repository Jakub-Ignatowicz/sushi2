import ProductComponent from "@/app/(main)/order/product";
import LabelFile from "@/components/label-file";
import LabelInput from "@/components/label-input";
import LabelTextarea from "@/components/label-textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateProduct } from "@/lib/api/products";
import { Product } from "@/types/api";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

type Props = {
  product: Product;
};

const ProductDialog = ({ product }: Props) => {
  const { register, control, handleSubmit, reset, watch } = useForm<Product>({
    defaultValues: { ...product },
  });
  const [newAmount, setNewAmount] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const addItem = () => {
    if (!newDescription) return; // simple validation
    append({
      number: Number(newAmount) || 0,
      description: newDescription,
      numberSuffix: "x",
      id: "8f253f0f-c7ef-4830-bd32-f217ec610d3d",
    });
    setNewAmount("");
    setNewDescription("");
  };

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
          <div className="flex-2 justify-center items-center bg-secondary p-4 rounded-lg shadow-md">
            <ProductComponent isPreview product={watch()} />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex-1 pl-6"
          >
            <Label className="text-2xl mb-4 font-bold">Edytuj produkt</Label>
            <div className="flex flex-col items-center">
              <div className="overflow-auto w-full max-h-[50vh] flex flex-col gap-2 pr-2">
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
                    <Button variant="outline" className="" onClick={addItem}>
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
              <Button
                className="mt-4 w-full"
                type="submit"
                variant="secondary"
                onClick={() => {
                  updateProduct(watch());
                }}
              >
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
