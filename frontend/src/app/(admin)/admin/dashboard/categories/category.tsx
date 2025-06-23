import { Label } from "@/components/ui/label";
import { Category as CategoryType } from "@/types/api";
import { GripHorizontal, GripVertical } from "lucide-react";

type Props = {
  category: CategoryType;
};

const Category = ({ category }: Props) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm bg-primary-foreground">
      <GripHorizontal size={20} />
      <Label className="font-semibold">{category.name}</Label>
    </div>
  );
};

export default Category;
