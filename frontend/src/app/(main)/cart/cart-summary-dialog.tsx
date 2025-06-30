import TooltipButton from "@/components/tooltip-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartState } from "@/context/cart-context";
import {
  addressToString,
  formatDate,
  categorizeProducts,
  priceToString,
} from "@/lib/utils";
import { Order, PostOrder, PostOrderWithAddress } from "@/types/api";
import { Info, Tag, Trash2 } from "lucide-react";
import { Control, UseFormReturn, useWatch } from "react-hook-form";
import { CartFormSchemaType } from "./form";
import { toast } from "sonner";
import { useState } from "react";
import { createUserGuest } from "@/lib/api/users";
import { createOrder, createOrderWithAddress } from "@/lib/api/orders";

type Props = {
  form: UseFormReturn<CartFormSchemaType>;
};

const OrderDetailRow = ({ label, value }: { label: string; value: any }) => {
  return (
    <div key={label} className="mt-1 text-sm">
      <Label className="font-semibold inline">{label}: </Label>
      <span className="">{value}</span>
    </div>
  );
};

const CartSummaryDialog = ({ form }: Props) => {
  const { cartItems } = useCartState();

  const categories = categorizeProducts(cartItems.map((item) => item.product));
  const values = useWatch<CartFormSchemaType>({ control: form.control });
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: CartFormSchemaType) => {
    let userId;
    try {
      userId = await createUserGuest({
        email: data.email,
        phoneNumber: data.phoneNumber,
      });
    } catch (error) {
      toast.error(
        "Potwierdzenie zamówienia nie powiodło się. Spróbuj ponownie.",
      );
    }

    const orderProducts = cartItems.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    const payload: PostOrderWithAddress = {
      ...form.getValues(),
      userId,
      orderProducts,
    } as any;

    try {
      await createOrderWithAddress(payload);
      toast.success("Zamówienie zostało złożone pomyślnie!");
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error(
        "Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="mt-4 w-full"
          onClick={form.handleSubmit(() => setOpen(true))}
        >
          Zamawiam
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Label className="text-xl font-bold">Szczegóły zamówienia</Label>
        <div className="overflow-auto w-full max-h-[75vh] pr-2">
          <div>
            <div>
              <OrderDetailRow label="Email" value={values.email || "Brak"} />
              <OrderDetailRow
                label="Telefon"
                value={values.phoneNumber || "Brak"}
              />
              {values.address && (
                <>
                  <OrderDetailRow
                    label="Adres"
                    value={addressToString(values.address as any)}
                  />
                  {values.address.floor && (
                    <OrderDetailRow
                      label="Piętro"
                      value={values.address.floor}
                    />
                  )}
                </>
              )}
              <OrderDetailRow
                label="Liczba osób"
                value={values.peopleCount || "Brak"}
              />
              <OrderDetailRow
                label="Metoda płatności"
                value={values.paymentMethod || "Brak"}
              />
              {values.notes && (
                <OrderDetailRow label="Uwagi" value={values.notes} />
              )}
            </div>
          </div>
          <Separator className="mt-4 mb-3" />
          {categories.map((cat) => (
            <div key={cat.id} className="">
              <Label className="text-lg font-semibold text-muted-foreground flex items-center gap-2">
                <Tag size={16} />
                {cat.name}
              </Label>
              {cat.products.map((product) => (
                <div key={product.id}>
                  <span className="font-semibold ml-3">
                    {cartItems.find((op) => op.product.id === product.id)
                      ?.quantity || 1}
                    x{" "}
                  </span>
                  <span>{product.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Button onClick={form.handleSubmit(onSubmit)} variant={"outline"}>
          Potwierdź zamówienie
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CartSummaryDialog;
