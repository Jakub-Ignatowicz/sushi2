import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Asterisk } from "lucide-react";

type Props = {
  label: string;
  // name: string;
  // value: string | number;
  // error?: string | null;
  // isEditable?: boolean;
  disabled?: boolean;
  required?: boolean;
  [key: string]: any; // Allows for additional props to be passed
};

export default function FormInput({
  label,
  disabled = false,
  required = true,
  ...props
}: Props) {
  return (
    <div className="w-full max-w-md space-y-2">
      <Label className="text-sm text-muted-foreground">
        <span>{label}</span>
        {required && (
          <span className="fill-red-600">
            <Asterisk size={16} color="red" className="fill-red-600" />
          </span>
        )}
      </Label>
      <Input
        disabled={disabled}
        placeholder={label}
        {...props}
        // disabled={!isEditable}
        // className={cn(
        //   "border border-input rounded-md px-3 py-2 text-base",
        //   "transition duration-300 ease-in-out hover:border-zume focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        //   !isEditable && "bg-muted text-muted-foreground cursor-not-allowed",
        //   error && "border-destructive",
        // )}
      />
      {/* {error && <p className="text-sm text-destructive font-medium">{error}</p>} */}
    </div>
  );
}
