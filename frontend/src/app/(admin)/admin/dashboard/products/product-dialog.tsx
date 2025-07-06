"use client";

import ProductComponent from "@/app/(main)/(box)/order/product";
import LabelFile from "@/components/label-file";
import LabelInput from "@/components/label-input";
import LabelTextarea from "@/components/label-textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/lib/api/images";
import { createProduct, updateProduct } from "@/lib/api/products";
import { Category, Product, ProductItem, ProductPost } from "@/types/api";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/lib/api/categories";

type Props = {
  isEdit?: boolean;
  product?: Product;
};

const ProductDialog = ({ product, isEdit = false }: Props) => {
  const { register, control, handleSubmit, reset, watch, setValue } =
    useForm<any>({
      defaultValues: {
        ...(product || {
          name: "Nowy produkt",
          price: 5,
          description: undefined,
          amount: undefined,
          amountUnit: undefined,
          categoryId: undefined,
          items: [],
        }),
      },
    });
  const [newAmount, setNewAmount] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);

  const fetchCategories = async () => {
    if (categories) return;
    try {
      const res = await getCategories();
      setCategories(res);
    } catch (err) {
      toast.error("Nie udało się pobrać kategorii");
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const addItem = () => {
    if (!newAmount || !newDescription) return;

    append({
      quantity: Number(newAmount) || 0,
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
    try {
      if (file) {
        const res = (await uploadImage(file)) as any;
        data.imageName = res.fileName;
      }

      data.amount = data.amount ? Number(data.amount) : undefined;

      if (isEdit) {
        product = await updateProduct(data);
        toast.success("Produkt został zaktualizowany");
      } else {
        product = await createProduct(data);
        toast.success("Produkt został dodany");
      }
    } catch (error) {
      toast.error(`Nie udało się ${isEdit ? "edytować" : "dodać"} produktu`);
      return;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} onClick={() => reset()}>
          {isEdit ? (
            "Edytuj"
          ) : (
            <>
              <Plus />
              Dodaj nowy produkt
            </>
          )}
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
                    {fields.map((field: any, index) => (
                      <div
                        key={field.id}
                        className="flex items-center justify-between pl-4 pr-2 py-1 rounded-md shadow-sm border bg-sidebar"
                      >
                        <div className="flex gap-2">
                          <div>{field.quantity}x</div>
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
                  {!isEdit && (
                    <div>
                      <Label className="my-2 text-xl">Wybierz kategorie</Label>
                      <Select
                        onOpenChange={(open) => open && fetchCategories()}
                        onValueChange={(value) =>
                          setValue("categoryId", value, {
                            shouldValidate: true,
                          })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz kategorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Kategorie</SelectLabel>
                            {categories?.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
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
