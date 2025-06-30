import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changeCategoryName } from "@/lib/api/categories";
import { Category as CategoryType, Product } from "@/types/api";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal, Pencil, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import CategoryEditDialog from "./edit-dialog";
import RemoveCategoryDialog from "./remove-dialog";

type Props = {
  category: CategoryType;
};

const Category = ({ category }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: category.id });
  const [inputValue, setInputValue] = useState(category.name);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div style={style} ref={setNodeRef}>
      <div className="flex items-center px-4 py-2 border rounded-lg shadow-sm bg-primary-foreground">
        <div>
          <div className="flex items-center gap-2">
            <GripHorizontal
              {...attributes}
              {...listeners}
              size={20}
              className="cursor-grab"
            />
            <Label className="font-semibold">{category.name}</Label>
          </div>
          {category.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {category.description}
            </p>
          )}
        </div>
        <div className="space-x-2 ml-auto">
          <CategoryEditDialog category={category} />
          <RemoveCategoryDialog category={category} />
        </div>
      </div>
    </div>
  );
};

export default Category;
