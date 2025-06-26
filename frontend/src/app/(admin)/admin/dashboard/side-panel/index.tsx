// "use client";

import { LayoutDashboard } from "lucide-react";
import AdminSidePanelButton from "./button";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import AppLogo from "@/components/logo";

const AdminDashboardSidePanel = () => {
  return (
    <div className="min-w-100 p-4 bg-sidebar h-screen sticky top-0">
      <AppLogo className="pb-8" />
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
          href="/admin/dashboard/orders/new"
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
