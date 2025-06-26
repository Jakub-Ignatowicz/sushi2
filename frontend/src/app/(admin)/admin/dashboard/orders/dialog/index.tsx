import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  addressToString,
  formatDate,
  categorizeProducts,
  priceToString,
} from "@/lib/utils";
import { Order } from "@/types/api";
import { Tag, Trash2 } from "lucide-react";

type Props = {
  order: Order;
};

const OrderDetailRow = ({ label, value }: { label: string; value: any }) => {
  return (
    <div key={label} className="mt-1 flex items-center gap-2 text-sm">
      <Label className="font-semibold">{label}:</Label>
      <span>{value}</span>
    </div>
  );
};

const OrderDialog = ({ order }: Props) => {
  const categories = categorizeProducts(
    order.orderProducts.map((op) => op.product),
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Szczegóły</Button>
      </DialogTrigger>
      <DialogContent className="">
        <Label className="text-xl font-bold">Szczegóły zamówienia</Label>
        {/* <div className="overflow-auto w-full max-h-[75vh] flex flex-col gap-2"> */}
        <div>
          <div>
            <OrderDetailRow label="ID" value={order.id} />
            <OrderDetailRow label="Data" value={formatDate(order.createdAt)} />
            <OrderDetailRow
              label="Kwota"
              value={priceToString(order.totalPrice)}
            />
          </div>
          <Separator className="my-4" />

          <div>
            {/* <Label className="text-base font-bold">Dane kontaktowe</Label> */}
            <div>
              <OrderDetailRow
                label="Email"
                value={order.user.email || "Brak"}
              />
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
              {order.notes && (
                <OrderDetailRow label="Uwagi" value={order.notes} />
              )}
            </div>
          </div>
          <Separator className="my-4" />
          {categories.map((cat) => (
            <div key={cat.id} className="">
              <Label className="text-lg font-semibold text-muted-foreground flex items-center gap-2">
                <Tag size={16} />
                {cat.name}
              </Label>
              {cat.products.map((product) => (
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
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
