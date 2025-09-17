"use client"

import { motion } from "framer-motion"

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {/* Large floating shapes */}
      <motion.div
        className="absolute w-2 h-2 bg-white/5 rounded-full"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ left: "10%", top: "20%" }}
      />

      <motion.div
        className="absolute w-1 h-1 bg-white/10 rounded-full"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 2, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{ right: "15%", top: "30%" }}
      />

      <motion.div
        className="absolute w-3 h-3 bg-white/3 rounded-full"
        animate={{
          x: [0, 60, 0],
          y: [0, -80, 0],
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 4,
        }}
        style={{ left: "80%", bottom: "20%" }}
      />

      {/* Geometric lines */}
      <motion.div
        className="absolute w-px h-20 bg-gradient-to-b from-transparent via-white/10 to-transparent"
        animate={{
          scaleY: [1, 1.5, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ left: "25%", top: "40%" }}
      />

      <motion.div
        className="absolute w-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          scaleX: [1, 1.8, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{ right: "30%", bottom: "35%" }}
      />
    </div>
  )
}
