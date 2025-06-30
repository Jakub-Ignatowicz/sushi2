import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import NewCategoryDialog from "./new-dialog";

export default function CategoryActionPanel() {
  return (
    <div className="mt-20">
      <Label className="text-2xl font-semibold mb-2">Akcje</Label>
      <div className="flex items-center gap-2">
        <NewCategoryDialog />
      </div>
    </div>
  );
}
