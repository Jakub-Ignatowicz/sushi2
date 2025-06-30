"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editCategory } from "@/lib/api/categories";
import { toast } from "sonner";
import { Category } from "@/types/api";

const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Nazwa jest wymagana")
    .max(100, "Nazwa nie może być dłuższa niż 100 znaków"),
  description: z
    .string()
    .max(256, "Opis nie może być dłuższy niż 256 znaków")
    .optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

type Props = {
  category: Category;
};

export default function EditCategoryDialog({ category }: Props) {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      description: category.description ?? "",
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await editCategory(category.id, data);
      window.location.reload();
    } catch (error) {
      toast.error("Nie udało się utworzyć kategorii. Spróbuj ponownie.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto">
          <Pencil size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-2xl font-bold">Edytuj kategorie</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa</FormLabel>
                  <FormControl>
                    <Input placeholder="Wpisz nazwę" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Opis kategorii" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Edytuj
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
