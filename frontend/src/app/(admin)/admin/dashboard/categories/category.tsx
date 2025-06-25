import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changeCategoryName } from "@/lib/api/categories";
import { Category as CategoryType } from "@/types/api";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal, Pencil, Save, X } from "lucide-react";
import { useState } from "react";
import Product from "../products/product";

type Props = {
  category: CategoryType;
};

const Category = ({ category }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: category.id });
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(category.name);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div style={style} ref={setNodeRef}>
      <div className="flex items-center px-4 py-2 border rounded-lg shadow-sm bg-primary-foreground">
        <div className="flex items-center gap-2">
          <GripHorizontal
            {...attributes}
            {...listeners}
            size={20}
            className="cursor-grab"
          />
          {isEditing ? (
            <div className="flex items-center gap-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="min-w-100"
              />
              <Button
                variant="ghost"
                onClick={async () => {
                  await changeCategoryName(category.id, inputValue);
                  category.name = inputValue;
                  setIsEditing(false);
                }}
              >
                <Save size={20} />
              </Button>
            </div>
          ) : (
            <Label className="font-semibold">{category.name}</Label>
          )}
        </div>
        <Button
          variant="outline"
          className="ml-auto"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <X size={20} /> : <Pencil size={20} />}
        </Button>
      </div>
    </div>
  );
};

export default Category;
