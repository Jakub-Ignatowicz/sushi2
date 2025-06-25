"use client";

import { useCartState } from "@/context/CartState";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Order, PostOrder, PostUser } from "@/types/api";
import FormInput from "./FormInput";
import { toast } from "sonner";
import { createUser } from "@/lib/api/users";
import { createOrder } from "@/lib/api/orders";

export default function Form() {
  const { cart, setCart } = useCartState();
  const router = useRouter();

  type formProps = {
    phoneNumber: string;
    email: string;
    city: string;
    district: string;
    street: string;
    homeNumber: string;
    apartmentNumber: string;
    floor: string;
    peopleCount: number;
    paymentMethod: number;
    notes: string;
  };

  const [form, setForm] = useState<formProps>({
    phoneNumber: "",
    email: "",
    city: "Warszawa",
    district: "Białołęka",
    street: "",
    homeNumber: "",
    apartmentNumber: "",
    floor: "",
    peopleCount: 1,
    paymentMethod: 0,
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const validatePeopleCount = (count: number) => {
    if (isNaN(count)) return "Liczba osób musi być liczbą.";
    if (count < 0) return "Liczba osób nie może być ujemna.";

    return "";
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9}$/;

    if (!form.email) newErrors.email = "Podaj email";
    else if (!emailRegex.test(form.email))
      newErrors.email = "Nieprawidłowy adres email";

    if (!form.phoneNumber) newErrors.phoneNumber = "Podaj numer telefonu";
    else if (!phoneRegex.test(form.phoneNumber))
      newErrors.phoneNumber = "Numer telefonu musi składać się z 9 cyfr";

    if (!form.city) newErrors.city = "Podaj miasto.";
    if (!form.district) newErrors.district = "Podaj dzielnicę.";
    if (!form.street) newErrors.street = "Podaj ulicę.";
    if (!form.homeNumber) newErrors.homeNumber = "Podaj numer domu.";
    if (!form.peopleCount) newErrors.homeNumber = "Podaj numer domu.";
    else if (validatePeopleCount(form.peopleCount) !== "") {
      newErrors.peopleCount = validatePeopleCount(form.peopleCount);
    }

    if (form.floor) {
      const floorNumber = parseInt(form.floor, 10);
      if (isNaN(floorNumber)) newErrors.floor = "Piętro musi być liczbą.";
      else if (floorNumber < 0) newErrors.floor = "Piętro nie może być ujemne.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const guest: PostUser = {
      guest: {
        phoneNumber: form.phoneNumber,
        email: form.email,
      },
    };

    const userId = await createUser(guest);
    if (!userId) return;

    const parsedCart =
      typeof window !== "undefined" && localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")!)
        : [];

    const orderProducts = parsedCart.map((item: any) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    const order: PostOrder = {
      peopleCount: form.peopleCount,
      notes: form.notes,
      paymentMethod: form.paymentMethod,
      userId: userId,
      address: {
        city: form.city,
        district: form.district,
        street: form.street,
        homeNumber: form.homeNumber,
        apartmentNumber: form.apartmentNumber,
        floor: parseInt(form.floor),
      },
      orderProducts,
    };

    const orderResponse: Order | undefined = await createOrder(order);
    if (!orderResponse) return;

    toast.success(`Udało się złożyć zamówienie ${orderResponse.id}`);
    setCart([]);
    localStorage.removeItem("cart");
    router.push("/");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mt-12 mb-20 p-4 xl:p-8 border rounded-2xl shadow-md bg-white dark:bg-neutral-900">
      <h2 className="text-3xl font-bold mb-8">Zamówienie</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold mb-4">Dane kontaktowe</h3>
          <div className="space-y-4">
            <FormInput
              label="Email"
              name="email"
              value={form.email}
              handleChange={handleChange}
              error={errors.email}
              isEditable={true}
            />
            <FormInput
              label="Telefon"
              name="phoneNumber"
              value={form.phoneNumber}
              handleChange={handleChange}
              error={errors.phoneNumber}
              isEditable={true}
            />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Adres dostawy</h3>
          <div className="space-y-4">
            <FormInput
              label="Miasto"
              name="city"
              value={form.city}
              handleChange={handleChange}
              error={errors.city}
              isEditable={false}
            />
            <FormInput
              label="Dzielnica"
              name="district"
              value={form.district}
              handleChange={handleChange}
              error={errors.district}
              isEditable={false}
            />
            <FormInput
              label="Ulica"
              name="street"
              value={form.street}
              handleChange={handleChange}
              error={errors.street}
              isEditable={true}
            />
            <FormInput
              label="Numer domu"
              name="homeNumber"
              value={form.homeNumber}
              handleChange={handleChange}
              error={errors.homeNumber}
              isEditable={true}
            />
            <FormInput
              label="Numer mieszkania"
              name="apartmentNumber"
              value={form.apartmentNumber}
              handleChange={handleChange}
              error={errors.apartmentNumber}
              isEditable={true}
              required={false}
            />
            <FormInput
              label="Piętro"
              name="floor"
              value={form.floor}
              handleChange={handleChange}
              error={errors.floor}
              isEditable={true}
              required={false}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
        <FormInput
          label="Ilość osób"
          name="peopleCount"
          value={form.peopleCount}
          handleChange={handleChange}
          error={errors.peopleCount}
          isEditable={true}
        />

        <div className="max-w-96 w-full">
          <label className="block text-lg font-medium mb-1">
            Metoda płatności *
          </label>
          <select
            className="w-full p-2 border rounded-md text-base"
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
          >
            <option value="0">Gotówka</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-lg font-medium mb-1">Notatki</label>
        <textarea
          className="w-full p-2 border rounded-md h-24 resize-none"
          name="notes"
          value={form.notes}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="text-md text-gray-200">
          <div className="border-b-1 border-zume mb-2 text-lg">
            informacje dodatkowe
          </div>
          <div className="flex justify-between w-full">
            <div>
              Do kazdego zamówienia doliczamy koszt opakowania 2zł za pudełko
              oraz koszt dostawy 8zł!
            </div>
            <div>* Pola wymagane</div>
          </div>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <h2 className="text-xl xl:text-2xl font-bold">
            Do zapłaty:{" "}
            {validatePeopleCount(form.peopleCount) === ""
              ? `${totalPrice.toFixed(2)} + ${(form.peopleCount * 2).toFixed(2)} (liczba osób) + 8 (dostawa) = ${(totalPrice + form.peopleCount * 2 + 8).toFixed(2)} zł`
              : "Niepoprawna liczba osób :("}{" "}
          </h2>
          <Button
            size="lg"
            className="w-full xl:w-auto bg-zume text-white"
            onClick={handleSubmit}
          >
            Zamawiam
          </Button>
        </div>
      </div>
    </div>
  );
}
