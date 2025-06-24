import Image from "next/image";
import Link from "next/link";
import ShoppingCart from "./ShoppingCart";
import NavbarLinks from "./NavbarLinks";
import MobileMenu from "./MobileMenu";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const mapLinks = new Map<string, string>([
    ["/", "Strona Główna"],
    ["/order", "Zamów Online"],
    ["/news", "Aktualności"],
    ["/about", "O nas"],
  ]);

  return (
    <div className="flex justify-center items-center my-10 mx-8 xl:mx-20">
      <div className="flex items-center justify-between w-full max-w-box">
        <div className="flex items-center ">
          <Link className="flex justify-center items-center z-50" href="/">
            <Image
              src={"/SushizumeLogo.png"}
              alt="Logo"
              width={170}
              height={50}
            />
          </Link>
          <NavbarLinks mapLinks={mapLinks} />
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-4">
            <ModeToggle className="hidden xl:flex" />
            <ShoppingCart />
          </div>
          <MobileMenu mapLinks={mapLinks} />
        </div>
      </div>
    </div>
  );
}
