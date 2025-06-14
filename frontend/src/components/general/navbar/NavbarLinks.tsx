import { cn } from "@/lib/utils";
import NavbarLink from "./NavbarLink";

export default function NavbarLinks() {
  return (
    <div
      className={cn(
        "hidden xl:flex items-center justify-center rounded-4xl h-[50px] mx-6",
      )}
    >
      <NavbarLink href="/" content="Strona główna" />
      <NavbarLink href="/order" content="Zamów online" />
      <NavbarLink href="/news" content="Aktualności" />
      <NavbarLink href="/about" content="O nas" />
    </div>
  );
}
