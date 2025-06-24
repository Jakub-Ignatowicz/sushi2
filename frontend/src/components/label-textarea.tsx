import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type Props = {
  label: string;
} & React.ComponentProps<"textarea">;

const LabelTextarea = ({ label, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-sm font-medium">{label}</Label>
      <Textarea {...props} />
    </div>
  );
};

export default LabelTextarea;
