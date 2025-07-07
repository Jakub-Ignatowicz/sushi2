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
          {Array.from(mapLinks).map(([href, content]) => (
            <NavbarLink key={href} href={href} content={content} />
          ))}
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
