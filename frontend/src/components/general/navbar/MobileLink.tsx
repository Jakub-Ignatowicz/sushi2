import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export default function MobileLink({
  href,
  content,
  setMenuOn,
}: {
  href: string;
  content: string;
  setMenuOn: Dispatch<SetStateAction<boolean>>;
}) {
  const path = usePathname();
  return (
    <Link
      href={href}
      onClick={() => setMenuOn(false)}
      className={cn(
        "px-3 py-2 m-1 rounded-4xl",
        path == href ? "bg-primary" : "bg-transparent",
      )}
    >
      {content}
    </Link>
  );
}
