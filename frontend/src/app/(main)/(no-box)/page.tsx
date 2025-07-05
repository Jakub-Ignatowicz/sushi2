import { Button } from "@/components/ui/button";
import HeroImage from "@/components/ui/hero-image";
import Link from "next/link";
import { FaCarSide, FaNewspaper } from "react-icons/fa";

export default function Home() {
  return (
    <div className="overflow-hidden relative flex items-center w-full">
      <div
        className={"w-[85%] max-w-[1400px] mx-auto items-center justify-start"}
      >
        <div className="flex flex-col xl:items-start items-center">
          <div className="text-5xl xl:text-6xl font-bold text-center xl:text-left max-w-[800px]">
            Zanurz się w świecie{" "}
            <span className="text-zume text-shadow-lg/75">sushi</span> z
            <span className="text-zume text-shadow-lg/75"> naszą </span>
            restauracją
          </div>
          <div className="text-lg xl:text-xl font-medium text-center xl:text-left max-w-xl my-4">
            Skosztuj sushi marzeń. Niepowtarzalne smaki, niezrównane ceny,
            elastyczne opcje zamówienia i wiele więcej.
          </div>
          <div className="space-x-3">
            <Link href="/order">
              <Button variant="zume" className="shadow-md/40" size={"homePage"}>
                <FaCarSide />
                Zamów online
              </Button>
            </Link>
            <Link href="/news">
              <Button className="shadow-md/40" size="homePage">
                <FaNewspaper />
                Aktualności
              </Button>
            </Link>
          </div>
          <HeroImage />
        </div>
      </div>
    </div>
  );
}
