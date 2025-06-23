import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  label: string;
  href: string;
};

const AdminSidePanelButton = ({ label, href }: Props) => {
  return (
    <Link href={href}>
      <Button variant={"outline"} className="w-full text-center">
        {label}
      </Button>
    </Link>
  );
};

export default AdminSidePanelButton;
