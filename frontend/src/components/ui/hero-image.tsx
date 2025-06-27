"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroImage() {
  return (
    <>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: "33%", opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.1,
          ease: [0.25, 0.8, 0.25, 1],
        }}
        className="absolute right-0 top-0 hidden xl:flex"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 240,
            ease: "linear",
          }}
          className="w-[850px] h-[850px]"
        >
          <Image src={"/icon.svg"} width={850} height={850} alt="logo" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        transition={{
          duration: 1.8,
          delay: 0.3,
          ease: [0.25, 0.8, 0.25, 1],
        }}
        className="absolute right-0 top-0 hidden xl:flex"
      >
        <motion.div
          animate={{
            y: [-5, 5, -5], // góra -> środek -> dół -> środek
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[850px] h-[850px]"
        >
          <Image
            src={"/chopsticks.webp"}
            width={850}
            height={850}
            alt="chopsticks"
          />
        </motion.div>
      </motion.div>
    </>
  );
}
