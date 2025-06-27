import { cn } from "@/lib/utils";
import NavbarLink from "./navbar-link";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function NavbarLinks({
  mapLinks,
}: {
  mapLinks: Map<string, string>;
}) {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <div className={"flex items-center justify-center gap-1"}>
          <NavbarLink href="/" content="Strona główna" />
          <NavbarLink href="/order" content="Zamów online" />
          <NavbarLink href="/news" content="Aktualności" />
          <NavbarLink href="/about" content="O nas" />
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
