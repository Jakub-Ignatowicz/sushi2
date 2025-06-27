"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroImage() {
  return (
    <div className="z-[-10]">
      <div className="hidden xl:inline">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "40%" }}
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
            <Image src={"/icon.svg"} fill alt="logo" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "15%" }}
          transition={{
            duration: 1.8,
            delay: 0.3,
            ease: [0.25, 0.8, 0.25, 1],
          }}
          className="absolute right-0 top-0 hidden xl:flex"
        >
          <motion.div
            animate={{
              y: [-5, 5, -5],
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
      </div>

      <motion.div
        className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/4  xl:hidden "
        initial={{ y: "200%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 1.8,
          delay: 0.3,
          ease: [0.25, 0.8, 0.25, 1],
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 240,
            ease: "linear",
          }}
          className="w-[500px] h-[500px]"
        >
          <Image src="/icon.svg" width={500} height={500} alt="logo" />
        </motion.div>
      </motion.div>
    </div>
  );
}
