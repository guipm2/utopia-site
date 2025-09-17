'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  className?: string
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  y = 60,
  className = ""
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-10% 0px -10% 0px" 
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1] // Lusion-style easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
