'use client'

import { motion } from 'framer-motion'

export function SimpleInfinityBackground() {
  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-10">
      <motion.svg
        width="200"
        height="100"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M50 50 C50 20, 75 0, 100 50 C125 100, 150 80, 150 50 C150 20, 125 0, 100 50 C75 100, 50 80, 50 50 Z"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
      </motion.svg>
    </div>
  )
}
