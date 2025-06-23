"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Info, Save } from "lucide-react";
import { useEffect, useState } from "react";
import DraggableCategoryList from "./draggable";
import { Category } from "@/types/api";
import { updateCategoryOrder } from "@/lib/api/categories";

type Props = {
  categories: Category[];
};

const CategoriesClient = ({ categories }: Props) => {
  const [changed, setChanged] = useState(false);
  const [items, setItems] = useState(
    [...categories].sort((a, b) => a.orderIndex - b.orderIndex),
  );

  useEffect(() => {
    const originalIds = [...categories]
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map((c) => c.id);
    const currentIds = items.map((c) => c.id);

    const changed = originalIds.some((id, i) => id !== currentIds[i]);

    if (changed) setChanged(true);
  }, [items]);

  return (
    <div>
      <div>
        <Label className="py-4 text-muted-foreground">
          <Info size={16} />
          Przeciągnij i upuść, aby zmienić kolejność kategorii na stronie
          głównej
        </Label>
      </div>
      <div className="flex gap-4">
        <Button
          disabled={!changed}
          variant="green"
          onClick={() => updateCategoryOrder(items.map((c) => c.id))}
        >
          <Save size={16} />
          Zapisz kolejność
        </Button>
        <DraggableCategoryList items={items} setItems={setItems} />
      </div>
    </div>
  );
};

export default CategoriesClient;
