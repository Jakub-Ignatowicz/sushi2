import { Button } from "@/components/ui/button";
import HeroImage from "@/components/ui/hero-image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full h-full flex items-center overflow-hidden">
      <div className="mx-[10%] flex flex-col justify-evenly h-full">
        <div className=" flex flex-col xl:items-start items-center">
          <div className="text-5xl xl:text-7xl font-bold text-center xl:text-left mb-4 max-w-[1000px]">
            Zanurz się w świecie sushi z
            <div className="inline max-xl:[-webkit-text-stroke:_1px_var(--primary)] max-xl:[text-stroke:_1px_var(--primary)] text-shadow-background border-primary text-zume">
              {" "}
              naszą{" "}
            </div>
            restauracją
          </div>
          <div className="text-lg xl:text-2xl font-light text-center xl:text-left max-w-xl">
            Skosztuj sushi marzeń. Niepowtarzalne smaki, niezrównane ceny,
            elastyczne opcje zamówienia i wiele więcej.
          </div>
          <div className="my-6">
            <Button
              className="mr-3 max-xl:border-primary"
              variant="zume"
              size="homePage"
            >
              <Link href="/order">Zamów online</Link>
            </Button>
            <Button size="homePage">
              <Link href="/news">Aktualności</Link>
            </Button>
          </div>
        </div>
        <div></div>
      </div>
      <HeroImage />
    </div>
  );
}
