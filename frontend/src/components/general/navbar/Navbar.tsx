import Image from "next/image";
import logo from "../../../../public/SushizumeLogo.png";
import Link from "next/link";
import ShoppingCart from "./ShoppingCart";
import NavbarLinks from "./NavbarLinks";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <div className="flex justify-center items-center h-30">
      <div className="flex items-center justify-between w-full max-w-box">
        <div className="flex items-center ">
          <Link className="flex justify-center items-center" href="/">
            <Image src={logo} alt="Logo" width={170} height={50} />
          </Link>
          <NavbarLinks />
        </div>
        <MobileMenu />
        <ShoppingCart />
      </div>
    </div>
  );
}
