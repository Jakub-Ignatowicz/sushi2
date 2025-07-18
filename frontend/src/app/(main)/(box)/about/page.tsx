import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Heart, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/api";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sushi Zume<div className="text-zume">Tarchomin</div>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tradycja, jakość i pasja w każdym kęsie
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-lg border-border bg-card">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="h-6 w-6 text-zume fill-zume" />
                <CardTitle className="text-2xl text-card-foreground">
                  O nas
                </CardTitle>
              </div>
              <CardDescription className="text-base">
                Nasza historia i filozofia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/location.webp"
                  alt="Wnętrze restauracji Sushi Zume"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-card-foreground leading-relaxed">
                Restauracja Sushi Zume Tarchomin powstała w{" "}
                <Badge variant="secondary">2007 roku</Badge>, ale w lipcu{" "}
                <Badge variant="secondary">2013 roku</Badge> przeszła w ręce
                nowych właścicieli, którzy codziennie wkładają całe serce i
                umiejętności, aby wizyta Państwa stała się miłym i
                niezapomnianym przeżyciem.
              </p>
              <p className="text-card-foreground leading-relaxed">
                Doceniając tradycję życia w zgodzie z naturą, nasze sushi
                przygotowujemy wyłącznie ze składników najwyższej jakości.
              </p>
              <div className="bg-muted p-4 rounded-lg border-l-4 border-[color:var(--zume)]">
                <p className="text-muted-foreground font-medium italic">
                  "Serdecznie zapraszamy do odwiedzin, abyście Państwo wraz z
                  Nami mogli tworzyć klimat i magię naszej wspólnej
                  restauracji."
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Lokalizacja Section */}
          <Card className="shadow-lg border-border bg-card">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Lokalizacja</CardTitle>
              </div>
              <CardDescription className="text-base">
                Znajdź nas w Warszawie
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative h-48 rounded-lg overflow-hidden bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div>
                      <iframe
                        className="w-[500px] h-[500px]"
                        scrolling="no"
                        src="https://maps.google.com/maps?width=100%%26amp;height=600&amp;hl=en&amp;q=Strumykowa%14+Warszawa&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                      >
                        <a href="https://www.mapsdirections.info/fr/calculer-la-population-sur-une-carte">
                          Carte démographique
                        </a>
                      </iframe>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-card-foreground">
                      Adres
                    </h3>
                    <p className="text-muted-foreground">ul. Strumykowa 14</p>
                    <p className="text-muted-foreground">03-138 Warszawa</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <Phone className="h-5 w-5 text-chart-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-card-foreground">
                      Telefon
                    </h3>
                    <a
                      href="tel:785252525"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      785-25-25-25
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <Clock className="h-5 w-5 text-chart-1 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-card-foreground">
                      Godziny otwarcia
                    </h3>
                    <p className="text-muted-foreground">
                      Pon-Nie: 12:00 - 22:00
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Galeria sushi */}
        <Card className="shadow-lg border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Utensils className="h-6 w-6 text-chart-2" />
              <CardTitle className="text-2xl text-card-foreground">
                Nasze Sushi
              </CardTitle>
            </div>
            <CardDescription className="text-base">
              Składniki najwyższej jakości w każdym kęsie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/order"
                className="relative h-48 rounded-lg overflow-hidden group"
              >
                <img
                  src={getImageUrl("7ebc5de3-5fb9-4c44-a38c-7a9d4f3329de.png")}
                  alt="Świeży zestaw kampai"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="font-semibold">Kempai</p>
                </div>
              </Link>
              <Link
                href="/order"
                className="relative h-48 rounded-lg overflow-hidden group"
              >
                <img
                  src={getImageUrl("b55d996f-793f-4631-9a16-35212e2cdb3d.png")}
                  alt="Wyśmienity zestaw kendo"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="font-semibold">Kendo</p>
                </div>
              </Link>
              <Link
                href="/order"
                className="relative h-48 rounded-lg overflow-hidden group"
              >
                <img
                  src={getImageUrl("3073e0ed-49e7-439a-8e93-27ac43e76876.png")}
                  alt="Elegancki zestaw hibana"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="font-semibold">Hibana</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-zume rounded-2xl text-white">
          <h2 className="text-3xl font-bold mb-4">Serdecznie Zapraszamy!</h2>
          <p className="text-xl mb-6 opacity-90">
            Doświadcz magii autentycznego sushi w sercu Warszawy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:785252525"
              className="bg-white text-[color:var(--zume)] px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
            >
              <Phone className="h-5 w-5" />
              Zadzwoń teraz
            </a>
            <div className="text-white/80">
              lub odwiedź nas przy ul. Strumykowej 14
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
