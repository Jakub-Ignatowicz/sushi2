"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
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
import { createCategory } from "@/lib/api/categories";
import { toast } from "sonner";

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

export default function NewCategoryDialog() {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await createCategory(data);
      window.location.reload();
    } catch (error) {
      toast.error("Nie udało się utworzyć kategorii. Spróbuj ponownie.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <Button>
          <Plus />
          Nowa kategoria
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-2xl font-bold">Nowa kategoria</h2>
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
              Zapisz
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
