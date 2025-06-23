// "use client";

import { LayoutDashboard } from "lucide-react";
import AdminSidePanelButton from "./button";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

const AdminDashboardSidePanel = () => {
  return (
    <div className="min-w-100 p-4 bg-sidebar h-screen sticky top-0">
      <div className="mb-6 flex items-center justify-center">
        <Image src={"/SushizumeLogo.png"} alt="Logo" width={170} height={50} />
      </div>
      <div className="flex items-center justify-between mb-4">
        <Label className="font-semibold flex items-center text-base">
          <LayoutDashboard size={22} />
          Panel administracyjny
        </Label>
        <ModeToggle />
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <AdminSidePanelButton
          label="Zamówienia"
          href="/admin/dashboard/orders"
        />
        <AdminSidePanelButton
          label="Produkty"
          href="/admin/dashboard/products"
        />
        <AdminSidePanelButton
          label="Kategorie"
          href="/admin/dashboard/categories"
        />
      </div>
    </div>
  );
};

export default AdminDashboardSidePanel;
