import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
  label: string;
  width?: string;
} & React.ComponentProps<"input">;

const LabelInput = ({ label, width, ...props }: Props) => {
  return (
    <div className={`flex flex-col gap-2 ${width ? width : "w-full"}`}>
      <Label className="text-sm font-medium">{label}</Label>
      <Input {...props} />
    </div>
  );
};

export default LabelInput;
