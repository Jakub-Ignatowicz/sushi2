"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaSort } from "react-icons/fa";

type FilterProps = {
  position: string;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
};

export default function Sort({ position, setPosition }: FilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button variant="ghost">
          <FaSort />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filtry</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="priceAsc">
            cena: od najniższej
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="priceDsc">
            cena: od najwyższej
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="alphaAsc">
            alfabetycznie: od A do Z
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="alphaDsc">
            alfabetycznie: od Z do A
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
