import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";

export default function CategoryEditDialog() {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        <Button variant="outline" className="ml-auto">
          <Pencil size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] sm:max-w-[800px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Twój koszyk 🍣</h2>
        </div>
        {/* {cartItems.length === 0 ? ( */}
        {/*   <p className="text-muted-foreground">Koszyk jest pusty.</p> */}
        {/* ) : ( */}
        {/*   <div> */}
        {/*     <div className="overflow-auto w-full max-h-[50vh] flex flex-col gap-3 pr-3"> */}
        {/*       {categories.map((cat) => ( */}
        {/*         <CartCategory key={cat.id} category={cat} /> */}
        {/*       ))} */}
        {/*     </div> */}
        {/**/}
        {/*     <div className="flex justify-between items-center mt-6"> */}
        {/*       <p className="text-lg font-bold">Suma: {priceToString(total)}</p> */}
        {/*       <DialogTrigger asChild> */}
        {/*         <Button onClick={() => router.push("/cart")}> */}
        {/*           Przejdź do realizacji */}
        {/*         </Button> */}
        {/*       </DialogTrigger> */}
        {/*     </div> */}
        {/*   </div> */}
        {/* )} */}
      </DialogContent>
    </Dialog>
  );
}
