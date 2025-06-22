import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
  label: string;
  // children: React.ReactNode;
};

const LabelInput = ({ label, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Input {...props} />
    </div>
  );
};

export default LabelInput;
