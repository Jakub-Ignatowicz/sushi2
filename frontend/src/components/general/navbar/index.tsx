import NavbarLinks from "./navbar-links";
import MobileMenu from "./mobile-menu";
import { ModeToggle } from "@/components/mode-toggle";
import AppLogo from "@/components/logo";
import CartDialog from "@/app/(main)/cart/cart-dialog";
import { cva } from "class-variance-authority";

const mapLinks = new Map<string, string>([
  ["/", "Strona Główna"],
  ["/order", "Zamów Online"],
  ["/news", "Aktualności"],
  ["/about", "O nas"],
]);

export default function Navbar() {
  return (
    <div
      className={
        "flex justify-center items-center mt-8 mx-auto w-[85%] max-w-[1400px]"
      }
    >
      <div className="flex w-full items-center justify-between max-w-box">
        <div className="flex items-center justify-between gap-4">
          <div className="-mt-2">
            <AppLogo />
          </div>
          <div className="hidden lg:flex">
            <NavbarLinks mapLinks={mapLinks} />
          </div>
        </div>

        <div className="hidden lg:flex gap-4 items-center justify-center h-10">
          <div className="size-5">
            <ModeToggle />
          </div>
          <CartDialog />
        </div>

        {/* Floating cart dialog, mobile only */}
        <div className="fixed lg:hidden right-10 bottom-10">
          <div className="bg-zume flex items-center justify-center w-16 h-16 rounded-full">
            <CartDialog />
          </div>
        </div>

        {/* Mobile burger menu */}
        <div className="flex items-center lg:hidden">
          <div className="flex items-center gap-4">
            <ModeToggle className="hidden" />
          </div>
          <MobileMenu mapLinks={mapLinks} />
        </div>
      </div>
    </div>
  );
}
