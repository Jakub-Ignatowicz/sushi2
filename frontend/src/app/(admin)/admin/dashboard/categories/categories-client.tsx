"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Info, RefreshCw, Save } from "lucide-react";
import { useEffect, useState } from "react";
import DraggableCategoryList from "./draggable";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Category } from "@/types/api";
import { updateCategoryOrder } from "@/lib/api/categories";
import { toast } from "sonner";

type Props = {
  categories: Category[];
};

const TooltipButton = ({ children, label }: any) => {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
};

const CategoriesClient = ({ categories }: Props) => {
  const [changed, setChanged] = useState(false);
  const [items, setItems] = useState(
    [...categories].sort((a, b) => a.orderIndex - b.orderIndex),
  );
  const [originalItems, setOriginalItems] = useState(items);

  useEffect(() => {
    const currentIds = items.map((c) => c.id);
    const originalIds = originalItems.map((c) => c.id);
    const changed = originalIds.some((id, i) => id !== currentIds[i]);
    setChanged(changed);
  }, [items]);

  return (
    <div>
      <div>
        <Label className="py-4 text-muted-foreground">
          <Info size={16} />
          Przeciągnij i upuść, aby zmienić kolejność wyświetlania kategorii na
          stronie głównej
        </Label>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <TooltipButton label="Zapisz kolejność kategorii">
            <Button
              disabled={!changed}
              variant="green"
              onClick={async () => {
                try {
                  await updateCategoryOrder(items.map((c) => c.id));
                  setOriginalItems(items);
                  setChanged(false);
                  toast.success("Kolejność kategorii została zapisana.");
                } catch (error) {
                  toast.error(
                    "Wystąpił błąd podczas zapisywania kolejności kategorii.",
                  );
                }
              }}
            >
              <Save size={16} />
            </Button>
          </TooltipButton>
          <TooltipButton label="Przywróć oryginalną kolejność kategorii">
            <Button
              variant="outline"
              disabled={!changed}
              onClick={() => {
                setItems(originalItems);
                setChanged(false);
              }}
            >
              <RefreshCw size={16} />
            </Button>
          </TooltipButton>
        </div>
        <DraggableCategoryList items={items} setItems={setItems} />
      </div>
    </div>
  );
};

export default CategoriesClient;
