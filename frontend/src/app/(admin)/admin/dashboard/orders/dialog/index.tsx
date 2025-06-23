import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  addressToString,
  formatDate,
  groupProductsByCategory,
  priceToString,
} from "@/lib/utils";
import { Order } from "@/types/api";
import { Tag, Trash2 } from "lucide-react";

type Props = {
  order: Order;
};

const rows = [
  {
    header: "Email",
    value: (order: Order) => order.user.email || "Brak",
  },
  {
    header: "Telefon",
    value: (order: Order) => order.user.phoneNumber || "Brak",
  },
  {
    header: "Adres",
    value: (order: Order) => addressToString(order.address),
  },
  {
    header: "Piętro",
    value: (order: Order) => order.address.floor,
  },
  {
    header: "Liczba osób",
    value: (order: Order) => order.peopleCount || "Brak",
  },
];

const OrderDetailRow = ({ label, value }: { label: string; value: any }) => {
  return (
    <div key={label} className="mt-1 flex items-center gap-2 text-sm">
      <Label className="font-semibold">{label}:</Label>
      <span>{value}</span>
    </div>
  );
};

const OrderDialog = ({ order }: Props) => {
  const aggregatedProducts = groupProductsByCategory(
    order.orderProducts.map((op) => op.product),
  );
  console.log("OrderDialog", aggregatedProducts);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Szczegóły</Button>
      </DialogTrigger>
      <DialogContent className="">
        <Label className="text-xl font-bold">Szczegóły zamówienia</Label>
        <div>
          <OrderDetailRow label="ID" value={order.id} />
          <OrderDetailRow label="Data" value={formatDate(order.createdAt)} />
          <OrderDetailRow
            label="Kwota"
            value={priceToString(order.totalPrice)}
          />
        </div>
        <Separator />

        <div>
          <Label className="text-base font-bold">Dane kontaktowe</Label>
          <div>
            <OrderDetailRow label="Email" value={order.user.email || "Brak"} />
            <OrderDetailRow
              label="Telefon"
              value={order.user.phoneNumber || "Brak"}
            />
            <OrderDetailRow
              label="Adres"
              value={addressToString(order.address)}
            />
            {order.address.floor && (
              <OrderDetailRow label="Piętro" value={order.address.floor} />
            )}
            <OrderDetailRow
              label="Liczba osób"
              value={order.peopleCount || "Brak"}
            />
          </div>
        </div>
        <Separator />
        {Object.entries(aggregatedProducts).map(([category, products]) => {
          return (
            <div key={category} className="">
              <Label className="text-lg font-semibold text-muted-foreground flex items-center gap-2">
                <Tag size={16} />
                {category}
              </Label>
              {products.map((product) => (
                <div key={product.id}>
                  <span className="font-semibold ml-3">
                    {order.orderProducts.find(
                      (op) => op.product.id === product.id,
                    )?.quantity || 1}
                    x{" "}
                  </span>
                  <span>{product.name}</span>
                </div>
              ))}
            </div>
          );
        })}

        {/* <p className="text-sm text-muted-foreground"> */}
        {/*   <span className="font-bold">{product.name}</span> należy do */}
        {/*   następujących kategorii: */}
        {/* </p> */}
        {/* <div> */}
        {/*   {categoryNames.map((name, index) => ( */}
        {/*     <div key={index} className="flex items-center gap-2 text-sm"> */}
        {/*       <ChevronRightIcon size={16} /> */}
        {/*       {name} */}
        {/*     </div> */}
        {/*   ))} */}
        {/* </div> */}
        {/* <Button disabled={categoryNames.length <= 1} variant="outline"> */}
        {/*   Usuń tylko z kategorii {categoryId} */}
        {/* </Button> */}
        {/* <Button variant="destructive" className=""> */}
        {/*   Usuń produkt */}
        {/* </Button> */}
        {/* <p className="text-xs text-muted-foreground mt-2"> */}
        {/*   <Info size={15} className="inline mr-1" /> */}
        {/*   Jeżeli produkt należy tylko do jednej kategorii, zostanie usunięty z */}
        {/*   bazy danych. */}
        {/* </p> */}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
