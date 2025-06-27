import NavbarLinks from "./NavbarLinks";
import MobileMenu from "./MobileMenu";
import { ModeToggle } from "@/components/mode-toggle";
import AppLogo from "@/components/logo";
import CartDialog from "@/app/(main)/cart/cart-dialog";
import clsx from "clsx";
import { cva } from "class-variance-authority";

const navbarVariants = cva(
  "flex justify-center items-center mx-auto 2xl:w-[1536px] px-8 pt-6",
);

export default function Navbar() {
  const mapLinks = new Map<string, string>([
    ["/", "Strona Główna"],
    ["/order", "Zamów Online"],
    ["/news", "Aktualności"],
    ["/about", "O nas"],
  ]);

  return (
    <div
    // className={cva(
    //   "flex justify-center items-center mx-auto 2xl:w-[1536px] px-8 pt-6",
    // )}
    >
      <div className="flex items-center justify-between w-full max-w-box">
        <div className="flex items-center ">
          <AppLogo />
          <NavbarLinks mapLinks={mapLinks} />
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-4">
            <ModeToggle className="hidden xl:flex" />
            <CartDialog />
          </div>
          <MobileMenu mapLinks={mapLinks} />
        </div>
      </div>
    </div>
  );
}
