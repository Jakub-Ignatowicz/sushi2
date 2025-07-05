"use client";

import { usePathname } from "next/navigation";
import CartDialog from "./cart-dialog";

export default function CartFloatDialog() {
  const pathname = usePathname();
  if (pathname === "/cart") return null;

  return (
    <div className="fixed lg:hidden right-10 bottom-10 z-999">
      <div className="bg-zume flex items-center justify-center w-16 h-16 rounded-full shadow-lg">
        <CartDialog />
      </div>
    </div>
  );
}
