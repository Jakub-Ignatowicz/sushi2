"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const OrdersLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/dashboard/orders/new", label: "Nowe" },
    { href: "/admin/dashboard/orders/in-progress", label: "W trakcie" },
    { href: "/admin/dashboard/orders/all", label: "Wszystkie" },
  ];

  return (
    <div className="flex flex-col gap-4 pt-10">
      <div className="flex justify-center w-full gap-8">
        {navItems.map(({ href, label }) => (
          <Link href={href} key={href}>
            <Button variant={pathname === href ? "default" : "ghost"}>
              {label}
            </Button>
          </Link>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default OrdersLayout;
