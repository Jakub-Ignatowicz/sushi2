"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Info, Save } from "lucide-react";
import { useState } from "react";
import DraggableCategoryList from "./draggable";
import { Category } from "@/types/api";

type Props = {
  categories: Category[];
};

const CategoriesClient = ({ categories }: Props) => {
  const [changed, setChanged] = useState(false);

  return (
    <div>
      <div>
        <Label className="py-3 text-muted-foreground">
          <Info size={16} />
          Przeciągnij i upuść, aby zmienić kolejność kategorii na stronie
          głównej
        </Label>
      </div>
      <div className="flex gap-4">
        <Button disabled={!changed} variant="green" className="font-bold">
          <Save size={16} />
          Zapisz zmiany
        </Button>
        <DraggableCategoryList items={categories} setChanged={setChanged} />
      </div>
    </div>
  );
};

export default CategoriesClient;
