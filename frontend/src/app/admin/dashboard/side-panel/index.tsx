"use client";

import { LayoutDashboard } from "lucide-react";
import AdminSidePanelButton from "./button";
import { Label } from "@/components/ui/label";

const AdminDashboardSidePanel = () => {
  const buttons = [
    {
      label: "Panel zarządzania",
      icon: <LayoutDashboard />,
    },
  ];

  return (
    <div className="w-128 h-screen p-4 bg-sidebar">
      <Label className="font-semibold mb-2 flex items-center gap-2 text-base pb-2">
        <LayoutDashboard size={22} />
        Panel administracyjny
      </Label>
      <AdminSidePanelButton label="Zamówienia" />
    </div>
  );
};

export default AdminDashboardSidePanel;
