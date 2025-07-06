"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Info, RefreshCw, Save } from "lucide-react";
import { useEffect, useState } from "react";
import DraggableCategoryList from "./draggable";
import { Category, Product } from "@/types/api";
import { getCategories, updateCategoryOrder } from "@/lib/api/categories";
import { toast } from "sonner";
import TooltipButton from "@/components/tooltip-button";
import PageLoader from "@/components/page-loader";

const CategoriesClient = () => {
  const [changed, setChanged] = useState(false);
  const [items, setItems] = useState<Category[] | null>(null);
  const [originalItems, setOriginalItems] = useState<Category[] | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      const sortedCategories = categories.sort(
        (a, b) => a.orderIndex - b.orderIndex,
      );
      setItems(sortedCategories);
      setOriginalItems(sortedCategories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (items === null || originalItems === null) return;
    const currentIds = items.map((c) => c.id);
    const originalIds = originalItems.map((c) => c.id);
    const changed = originalIds.some((id, i) => id !== currentIds[i]);
    setChanged(changed);
  }, [items, originalItems]);

  if (items === null) {
    return <PageLoader />;
  }

  return (
    <div>
      <div className="mb-4">
        <Label className="text-muted-foreground">
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
