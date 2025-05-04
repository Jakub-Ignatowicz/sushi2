import Image from "next/image";
import logo from "../../../../public/SushizumeLogo.png";
import Link from "next/link";
import { FaHome, FaCarSide, FaNewspaper, FaInfoCircle } from "react-icons/fa";
import { IconType } from "react-icons";
import ShoppingCart from "./ShoppingCart";

type NavbarLinkProps = {
  href: string;
  content: string;
  Icon: IconType;
};

const NavbarLink = ({ href, content, Icon }: NavbarLinkProps) => (
  <div>
    <Icon />
    <Link href={href}>{content}</Link>
  </div>
);

const NavbarLinks = () => (
  <div>
    <NavbarLink href="/" content="Strona główna" Icon={FaHome} />
    <NavbarLink href="/order" content="Zamów online" Icon={FaCarSide} />
    <NavbarLink href="/news" content="Aktualności" Icon={FaNewspaper} />
    <NavbarLink href="/about" content="O nas" Icon={FaInfoCircle} />
  </div>
);

const Cart = () => <div></div>;
export default function Navbar() {
  return (
    <div>
      <Link href="/">
        <Image src={logo} alt="Logo" width={230} height={70} />
      </Link>
      <NavbarLinks />
      <ShoppingCart />
    </div>
  );
}
