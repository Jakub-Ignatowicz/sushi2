"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { FaHome, FaCarSide, FaNewspaper, FaInfoCircle } from "react-icons/fa";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type NavbarLinkProps = {
  href: string;
  content: string;
};

const iconMap = new Map<string, IconType>([
  ["/", FaHome],
  ["/order", FaCarSide],
  ["/news", FaNewspaper],
  ["/about", FaInfoCircle],
]);

export default function NavbarLink({ href, content }: NavbarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const Icon = iconMap.get(href);

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href={href}>
          <div className="flex items-center justify-center relative gap-2">
            {Icon && <Icon size={18} />}
            <span>{content}</span>
          </div>

          {/* {isActive && ( */}
          {/*   <motion.div */}
          {/*     layoutId="navbar-bg" */}
          {/*     className="absolute inset-0 rounded-4xl bg-zume z-0" */}
          {/*     transition={{ type: "spring", stiffness: 500, damping: 35 }} */}
          {/*   /> */}
          {/* )} */}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
