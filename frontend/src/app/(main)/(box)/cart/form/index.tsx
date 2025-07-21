"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
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
import { CartCostSummary } from "../cart-cost-summary";

export const DELIVERY_FEE = 8;
export const PERSON_COST = 2;

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

export type CartFormSchemaType = z.infer<typeof FormSchema>;

export default function CartForm() {
  const form = useForm<CartFormSchemaType>({
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

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div>
      <p className="text-xl font-semibold mb-4 text-muted-foreground">
        {title}
      </p>
      <div className="space-y-4">{children}</div>
    </div>
  );

  return (
    <Form {...form}>
      <div className="flex justify-between items-center mb-4">
        <p className="text-3xl font-bold">Zamówienie</p>
      </div>
      <form className="mb-32">
        <div className="flex flex-col md:flex-row gap-8 md:gap-4">
          <div className="p-4 border rounded-lg shadow-md bg-primary-foreground/50 space-y-8 w-full flex-2">
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
                    <FormLabel>Numer mieszkania</FormLabel>
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
                      <Select
                        onValueChange={(val) => field.onChange(Number(val))}
                        value={String(field.value)}
                        disabled={true}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Gotówka" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Gotówka</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>Płatność tylko gotówką.</FormDescription>
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
                      <Textarea {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Section>
          </div>
          <CartCostSummary form={form} />
        </div>
      </form>
    </Form>
  );
}
