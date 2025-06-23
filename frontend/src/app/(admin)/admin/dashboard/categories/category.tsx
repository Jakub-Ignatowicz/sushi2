import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Category as CategoryType } from "@/types/api";
import { GripHorizontal, GripVertical, Pencil } from "lucide-react";

type Props = {
  category: CategoryType;
};

const Category = ({ category }: Props) => {
  return (
    <div className="flex items-center px-4 py-2 border rounded-lg shadow-sm bg-primary-foreground">
      <div className="flex items-center gap-2">
        <GripHorizontal size={20} />
        <Label className="font-semibold">{category.name}</Label>
      </div>
      <Button
        variant="outline"
        className="ml-auto"
        onClick={() => alert(`Category ID: ${category.id}`)}
      >
        <Pencil size={20} />
      </Button>
    </div>
  );
};

export default Category;
