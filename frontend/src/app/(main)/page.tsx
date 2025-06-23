import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full  flex items-center ">
      <div className="flex flex-col justify-center max-w-box w-full mx-auto h-full">
        <div>Zanurz się w świecie sushi z naszą restauracją</div>
        <div>
          Skosztuj sushi marzeń. Niepowtarzalne smaki, niezrównane ceny,
          elastyczne opcje zamówienia i wiele więcej.
        </div>
      </div>
      <Image
        src={"/Hero.webp"}
        width={850}
        height={850}
        className="absolute right-0 hidden xl:flex"
        alt="hero"
      />
    </div>
  );
}
