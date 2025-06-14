import { Button } from "@/components/ui/button";

type Props = {
  label: string;
};

const AdminSidePanelButton = ({ label }: Props) => {
  return (
    <Button variant={"outline"} className="w-full text-center">
      {label}
    </Button>
  );
};

export default AdminSidePanelButton;
