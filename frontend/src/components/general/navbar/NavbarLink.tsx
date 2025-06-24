"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { FaHome, FaCarSide, FaNewspaper, FaInfoCircle } from "react-icons/fa";

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
    <Link href={href} className="relative w-[170px] mx-3 h-[40px]">
      <div className="flex items-center justify-center w-full h-full rounded-4xl relative z-10 px-4">
        {Icon && <Icon size={18} />}
        <span className="text-base ml-2">{content}</span>
      </div>

      {isActive && (
        <motion.div
          layoutId="navbar-bg"
          className="absolute inset-0 rounded-4xl bg-zume z-0"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
    </Link>
  );
}
