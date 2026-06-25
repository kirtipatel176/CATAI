"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#F8FAFC]">
      {/* Base animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "linear-gradient(to right, #F8FAFC, #EEF4FF, #F5F3FF)",
            "linear-gradient(to right, #FFF7ED, #F8FAFC, #EEF4FF)",
            "linear-gradient(to right, #EEF4FF, #F5F3FF, #FFF7ED)",
            "linear-gradient(to right, #F8FAFC, #EEF4FF, #F5F3FF)",
          ],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Blue Blob */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] rounded-full blur-[100px] bg-[#60A5FA] opacity-15"
        animate={{
          x: ["-20%", "20%", "-20%"],
          y: ["-20%", "40%", "-20%"],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Purple Blob */}
      <motion.div
        className="absolute right-0 top-1/4 w-[50vw] h-[50vw] rounded-full blur-[120px] bg-[#A78BFA] opacity-15"
        animate={{
          x: ["20%", "-30%", "20%"],
          y: ["0%", "20%", "0%"],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Orange Blob */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-[70vw] h-[70vw] rounded-full blur-[120px] bg-[#FDBA74] opacity-15"
        animate={{
          x: ["0%", "30%", "0%"],
          y: ["20%", "-20%", "20%"],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      
      {/* Light noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};
