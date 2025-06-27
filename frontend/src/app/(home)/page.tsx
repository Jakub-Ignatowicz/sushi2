import HeroImage from "@/components/ui/hero-image";

export default function Home() {
  return (
    <div className="relative w-screen h-full flex items-center overflow-hidden bg-green-500">
      <div className="z-10 flex items-center justify-center flex-col px-8">
        <div className="text-2xl font-semibold text-white mb-4">
          Zanurz się w świecie sushi z naszą restauracją
        </div>
        <div className="text-white max-w-xl text-center">
          Skosztuj sushi marzeń. Niepowtarzalne smaki, niezrównane ceny,
          elastyczne opcje zamówienia i wiele więcej.
        </div>
      </div>
      <HeroImage />
    </div>
  );
}
