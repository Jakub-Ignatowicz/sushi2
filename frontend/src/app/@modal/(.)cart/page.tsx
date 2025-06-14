"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => router.back(), 100); // match this with your animation duration
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="flex justify-center items-center fixed top-0 left-0 w-screen h-screen backdrop-blur-lg z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="bg-black w-1/2 h-1/2 p-4 flex justify-between items-start rounded-xl shadow-xl text-white"
          >
            <div>TO DO</div>
            <Button onClick={handleClose}>Close</Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
