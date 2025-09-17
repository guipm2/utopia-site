"use client"

import { motion } from "framer-motion"
import { useState, type ReactNode } from "react"

interface InteractiveCardProps {
  children: ReactNode
  className?: string
}

export function InteractiveCard({ children, className = "" }: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.02,
        rotateX: 5,
        rotateY: 5,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0"
        style={{
          background: "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05), rgba(255,255,255,0.1))",
          filter: "blur(10px)",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        initial={false}
        animate={isHovered ? "hover" : "initial"}
      >
        <motion.div
          className="absolute inset-0 -translate-x-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          }}
          variants={{
            initial: { x: "-100%" },
            hover: { x: "100%" },
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
