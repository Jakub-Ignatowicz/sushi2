import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center p-4 md:p-10 bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="w-full relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-md mb-10">
        <Image
          src="/images/sushi-hero.jpg" // Zamień na prawdziwą ścieżkę
          alt="Restauracja Sushi Zume"
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white">O nas</h1>
        </div>
      </div>

      {/* About Section */}
      <Card className="w-full max-w-3xl mb-10 bg-white shadow-lg rounded-2xl">
        <CardContent className="p-6 md:p-10 space-y-6">
          <h2 className="text-2xl font-semibold text-center text-zinc-800">
            Restauracja Sushi Zume Tarchomin
          </h2>
          <p>
            Restauracja Sushi Zume Tarchomin powstała w 2007 roku, ale w lipcu
            2013 roku przeszła w ręce nowych właścicieli, którzy codziennie
            wkładają całe serce i umiejętności, aby każda wizyta stała się miłym
            i niezapomnianym przeżyciem.
          </p>
          <p>
            Doceniając tradycję życia w zgodzie z naturą, nasze sushi
            przygotowujemy wyłącznie ze składników najwyższej jakości.
          </p>
          <p>
            Serdecznie zapraszamy do odwiedzin, abyście Państwo wraz z nami
            mogli tworzyć klimat i magię naszej wspólnej restauracji.
          </p>
          <p className="text-center font-semibold">Serdecznie Zapraszamy!</p>
        </CardContent>
      </Card>

      {/* Location Section */}
      <Card className="w-full max-w-xl bg-white shadow-md rounded-2xl">
        <CardContent className="p-6 md:p-8">
          <h3 className="text-xl font-bold mb-4 text-center">Lokalizacja</h3>
          <div className="text-center space-y-2">
            <p className="font-medium">Sushi Zume</p>
            <p>03-138 Warszawa</p>
            <p>ul. Strumykowa 14</p>
            <p className="font-semibold text-blue-600">📞 785-25-25-25</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
