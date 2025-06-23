import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  label: string;
} & React.ComponentProps<"input">;

function InputFile({ label, ...props }: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="picture" className="text-sm font-medium">
        {label}
      </Label>
      <Input id="picture" type="file" {...props} />
    </div>
  );
}

export default InputFile;
