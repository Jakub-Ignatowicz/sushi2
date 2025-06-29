"use client";

import { useCartState } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Order, PostOrder, PostUser } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./form-input";
import { toast } from "sonner";
import { createUserGuest } from "@/lib/api/users";
import { createOrder } from "@/lib/api/orders";
import { withToast } from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { priceToString } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const DELIVERY_FEE = 8; // Fixed delivery price

const FormSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\d{9}$/, "Numer telefonu musi składać się z 9 cyfr"),
  email: z
    .string()
    .email("Nieprawidłowy adres e-mail")
    .nonempty("Email jest wymagany"),
  address: z.object({
    city: z.string().nonempty("Miasto jest wymagane"),
    district: z.string().nonempty("Dzielnica jest wymagana"),
    street: z.string().nonempty("Ulica jest wymagana"),
    homeNumber: z.string().nonempty("Numer domu jest wymagany"),
    apartmentNumber: z.string().optional(),
    floor: z.coerce.number().int("Musi być liczbą całkowitą").optional(),
  }),
  peopleCount: z.coerce
    .number({ invalid_type_error: "Liczba osób jest wymagana" })
    .int("Musi być liczbą całkowitą")
    .min(1, "Minimum 1 osoba"),
  paymentMethod: z.coerce.number(),
  notes: z.string(),
});

export default function CartForm() {
  const { clearCart, total } = useCartState();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneNumber: "",
      email: "",
      address: {
        city: "Warszawa",
        street: "",
        homeNumber: "",
        district: "Białołęka",
        apartmentNumber: "",
        floor: undefined,
      },
      peopleCount: 1,
      paymentMethod: 0,
      notes: "",
    },
  });

  // const onSubmit = async (form: FormProps) => {
  //   if (!validate(form)) return;
  //
  //   let userId;
  //   try {
  //     userId = await createUserGuest({
  //       phoneNumber: form.phoneNumber,
  //       email: form.email,
  //     });
  //   } catch (error) {
  //     toast.error("Nie udało się utworzyć użytkownika");
  //     return;
  //   }
  //
  //   if (!userId) return;
  //
  //   // const parsedCart =
  //   //   typeof window !== "undefined" && localStorage.getItem("cart")
  //   //     ? JSON.parse(localStorage.getItem("cart")!)
  //   //     : [];
  //   //
  //   // const orderProducts = parsedCart.map((item: any) => ({
  //   //   productId: item.product.id,
  //   //   quantity: item.quantity,
  //   // }));
  //
  //   // const order: PostOrder = { ...form, orderProducts };
  //   //
  //   // const orderResponse = await withToast(() => createOrder(order));
  //   // if (!orderResponse) return;
  //   //
  //   // toast.success(`Udało się złożyć zamówienie ${orderResponse.id}`);
  //   // clearCart();
  //   //
  //   // router.push("/");
  // };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-4">
      <p className="text-xl font-medium mb-2">{title}</p>
      {children}
    </div>
  );

  // const peopleCount = form.watch("peopleCount") || 0;
  const paymentPrice = Number(5) * 2 + total + DELIVERY_FEE;

  return (
    <Form {...form}>
      <div className="flex justify-between items-center mb-8">
        <p className="text-3xl font-bold">Zamówienie</p>
      </div>
      <form className="mb-32" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 border rounded-lg shadow-md bg-primary-foreground space-y-4 w-full flex-2">
            <Section title="Dane kontaktowe">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numer telefonu *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Section>

            <Section title="Adres dostawy">
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Miasto *</FormLabel>
                    <FormControl>
                      <Input disabled={true} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dzielnica *</FormLabel>
                    <FormControl>
                      <Input disabled={true} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ulica *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.homeNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numer budynku *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.apartmentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numer mieszkania *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.floor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Piętro</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Section>

            <Section title="Informacje dodatkowe">
              <FormField
                control={form.control}
                name="peopleCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Liczba osób *</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>Koszt 2zł za osobę</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metoda płatności przy odbiorze</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Gotówka" {...field} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"0"}>Gotówka</SelectItem>
                          <SelectItem value={"1"}>Karta</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Uwagi do zamówienia</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Section>
          </div>
          <div className="p-4 bg-primary-foreground rounded-lg shadow-md w-full h-fit flex-1">
            <div className="text-muted-foreground">
              <div className="flex justify-between">
                <p>Liczba osób</p>
                <p>{priceToString(5 * 2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Dostawa</p>
                <p>{priceToString(DELIVERY_FEE)}</p>
              </div>
              <div className="flex justify-between">
                <p>Koszyk</p>
                <p>{priceToString(total)}</p>
              </div>
            </div>
            <Separator className="mt-2 mb-1" />
            <div className="flex justify-between">
              <p className="font-bold">Do zapłaty</p>
              <p className="font-medium">{priceToString(paymentPrice)}</p>
            </div>
            <Button variant="zume" className="w-full mt-2">
              Zamawiam
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
