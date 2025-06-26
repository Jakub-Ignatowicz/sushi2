import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const QuantitySelector = ({}) => {
  const [quantity, setQuantity] = useState(1);

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => q + 1);

  return (
    <Card className="flex flex-row items-center justify-center gap-1 px-2 py-2 shadow-md">
      <Button
        size="icon"
        variant="outline"
        onClick={decrease}
        className="size-6"
      >
        <Minus className="w-4 h-4" />
      </Button>
      <div className="font-medium w-8 text-center">{quantity}</div>
      <Button
        size="icon"
        variant="outline"
        onClick={increase}
        className="size-6"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </Card>
  );
};

export default QuantitySelector;
