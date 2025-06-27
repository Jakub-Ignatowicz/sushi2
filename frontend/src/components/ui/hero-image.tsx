"use client";

import Image from "next/image";

export default function HeroImage() {
  return (
    <>
      <Image
        src={"/icon.svg"}
        width={850}
        height={850}
        className="absolute right-0 top-0 translate-x-1/3 hidden xl:flex"
        alt="logo"
      />
      <Image
        src={"/chopsticks.webp"}
        width={850}
        height={850}
        className="absolute right-0 top-0 hidden xl:flex"
        alt="chopsticks"
      />
    </>
  );
}
