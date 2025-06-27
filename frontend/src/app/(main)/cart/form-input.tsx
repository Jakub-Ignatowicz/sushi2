import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  name: string;
  value: string | number;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  error?: string | null;
  isEditable?: boolean;
  required?: boolean;
};

export default function FormInput({
  label,
  name,
  value,
  handleChange,
  error,
  isEditable = true,
  required = true,
}: Props) {
  return (
    <div className="w-full max-w-md space-y-2">
      <Label htmlFor={name} className="text-base font-medium">
        {label} {required ? "*" : ""}
      </Label>
      <Input
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={!isEditable}
        className={cn(
          "border border-input rounded-md px-3 py-2 text-base",
          "transition duration-300 ease-in-out hover:border-zume focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          !isEditable && "bg-muted text-muted-foreground cursor-not-allowed",
          error && "border-destructive",
        )}
      />
      {error && <p className="text-sm text-destructive font-medium">{error}</p>}
    </div>
  );
}
