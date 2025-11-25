"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect, useMemo } from "react"
import { ArrowRight, Sparkles, Zap, Brain, Infinity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePerformance } from "@/hooks/use-performance"

export function FuturisticHero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const performance = usePerformance()

  const phrases = ["somos a Utopia.", "pensamos.", "criamos.", "aplicamos."]

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  // Adjust complexity based on device performance
  const complexityConfig = useMemo(() => {
    if (performance.prefersReducedMotion) {
      return { connections: 0, nodes: 0, particles: 0 }
    }
    if (performance.isLowEnd) {
      return { connections: 4, nodes: 3, particles: 2 }
    }
    if (performance.tier === 'medium') {
      return { connections: 8, nodes: 4, particles: 3 }
    }
    return { connections: 12, nodes: 6, particles: 5 }
  }, [performance])

  // Memoize neural connections to prevent recalculation on every render
  const neuralConnections = useMemo(() => {
    return Array.from({ length: complexityConfig.connections }).map(() => ({
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
    }))
  }, [complexityConfig.connections])

  // Memoize neural nodes
  const neuralNodes = useMemo(() => {
    return Array.from({ length: complexityConfig.nodes }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 3,
    }))
  }, [complexityConfig.nodes])

  // Memoize quantum particles
  const quantumParticles = useMemo(() => {
    return Array.from({ length: complexityConfig.particles }).map(() => ({
      left: 20 + Math.random() * 60,
      top: 20 + Math.random() * 60,
      xOffset: Math.random() * 100 - 50,
      yOffset: Math.random() * 100 - 50,
      duration: 8 + Math.random() * 4,
      delay: Math.random() * 5,
    }))
  }, [complexityConfig.particles])

  // Auto-rotate phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [phrases.length])

  return (
    <section ref={containerRef} className="w-full h-screen overflow-hidden relative bg-black">
      {/* Dynamic Neural Network Background */}
      <div className="absolute inset-0 -z-20">
        {/* Neural connections */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {neuralConnections.map((conn, i) => (
            <motion.line
              key={i}
              x1={`${conn.x1}%`}
              y1={`${conn.y1}%`}
              x2={`${conn.x2}%`}
              y2={`${conn.y2}%`}
              stroke="rgba(0,255,65,0.3)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: conn.duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: conn.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>

        {/* Neural nodes */}
        {neuralNodes.map((node, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-green/40 rounded-full shadow-[0_0_10px_rgba(0,255,65,0.6)]"
            style={{
              left: `${node.left}%`,
              top: `${node.top}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: node.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: node.delay,
            }}
          />
        ))}
      </div>

      {/* Reactive Quantum Field */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, 
            rgba(0,255,65,0.15) 0%, 
            rgba(0,255,65,0.08) 30%, 
            transparent 70%)`,
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Floating Quantum Particles */}
      {quantumParticles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-neon-green/20 rounded-full blur-sm shadow-[0_0_8px_rgba(0,255,65,0.5)]"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            x: [0, particle.xOffset, 0],
            y: [0, particle.yOffset, 0],
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Holographic Grid - always visible but static on low-end */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.2) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        animate={!performance.prefersReducedMotion && !performance.isLowEnd ? {
          backgroundPosition: ["0px 0px", "60px 60px"],
        } : {}}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <div className="container px-4 md:px-6 relative z-10 h-full flex flex-col justify-between pt-24">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-6xl mx-auto">
            {/* Quantum Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 6.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-12"
            >
              <motion.div
                className="inline-flex items-center rounded-full px-8 py-4 text-sm font-medium border border-neon-green/30 text-neon-green backdrop-blur-xl shadow-[0_0_20px_rgba(0,255,65,0.2)] relative overflow-hidden"
                style={{
                  background: "rgba(0,0,0,0.7)",
                  backdropFilter: "blur(20px) saturate(180%)",
                }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {/* Quantum shimmer */}
                <motion.div
                  className="absolute inset-0 -translate-x-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(0,255,65,0.3), transparent)",
                  }}
                  animate={{ x: ["0%", "200%"] }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div className="mr-3 flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Infinity className="size-4" />
                  </motion.div>
                  <motion.span
                    className="size-2 bg-neon-green rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                      boxShadow: [
                        "0 0 0 0 rgba(0,255,65,0.4)",
                        "0 0 0 10px rgba(0,255,65,0)",
                        "0 0 0 0 rgba(0,255,65,0.4)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>
                O futuro na sua mão
              </motion.div>
            </motion.div>

            {/* Dynamic Title */}
            <div className="relative mb-12 flex items-center justify-center gap-4">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-lg leading-tight">
                Nós
              </h1>

              <motion.h1
                key={currentPhrase}
                initial={{ opacity: 0, x: 30, rotateY: -90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -30, rotateY: 90 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-neon-green drop-shadow-[0_0_30px_rgba(0,255,65,0.5)] leading-tight"
                style={{ perspective: "1000px" }}
              >
                {phrases[currentPhrase]}
              </motion.h1>

              {/* Holographic overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green/10 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Quantum Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 8.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-16"
            >
              <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed relative">
                <motion.span
                  className="inline-block"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  Transcendemos os limites do possível.
                </motion.span>{" "}
                <motion.span
                  className="inline-block"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                >
                  Criamos soluções que redefinem realidades.
                </motion.span>{" "}
                <motion.span
                  className="inline-block"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                >
                  O futuro não é destino, é criação.
                </motion.span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Quantum Action Zone */}
        <div className="text-center max-w-5xl mx-auto pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 9.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row gap-8 justify-center mb-20"
          >
            {/* Primary Quantum Button */}
            <motion.div className="relative group" whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
              {/* Quantum field */}
              <motion.div
                className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(0,255,65,0.2), rgba(0,255,65,0.5), rgba(0,255,65,0.2))",
                  filter: "blur(10px)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              <Button
                size="lg"
                className="relative rounded-full h-16 px-12 text-base group bg-neon-green text-black hover:bg-neon-green-light font-medium border-0 shadow-[0_0_30px_rgba(0,255,65,0.5)] transition-all duration-300 overflow-hidden"
              >
                {/* Quantum ripple */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />

                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="size-4" />
                  Iniciar Transformação
                </span>
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1 relative z-10" />
              </Button>
            </motion.div>

            {/* Secondary Neural Button */}
            <motion.div className="relative group" whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
              <motion.div
                className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(0,255,65,0.2), rgba(0,255,65,0.4), rgba(0,255,65,0.2))",
                  filter: "blur(8px)",
                }}
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(0,255,65,0.2), rgba(0,255,65,0.4), rgba(0,255,65,0.2))",
                    "linear-gradient(225deg, rgba(0,255,65,0.2), rgba(0,255,65,0.4), rgba(0,255,65,0.2))",
                    "linear-gradient(45deg, rgba(0,255,65,0.2), rgba(0,255,65,0.4), rgba(0,255,65,0.2))",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />

              <Button
                size="lg"
                variant="ghost"
                className="relative rounded-full h-16 px-12 text-base text-neon-green hover:text-neon-green-light transition-all duration-300 border border-neon-green/40 hover:border-neon-green/70 bg-black/70 hover:bg-black/80 backdrop-blur-sm overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                />

                <span className="relative z-10 flex items-center gap-2">
                  <Brain className="size-4" />
                  Explorar o futuro
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Quantum Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 10.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-12 text-sm text-gray-400"
          >
            {[
              { icon: <Sparkles className="size-4" />, text: "Automatize Processos", delay: 0 },
              { icon: <Brain className="size-4" />, text: "IA Consciente", delay: 0.3 },
              { icon: <Infinity className="size-4" />, text: "Soluções Personalizadas", delay: 0.6 },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 10.4 + item.delay }}
                className="flex items-center gap-3 group cursor-pointer"
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <motion.div
                  className="p-2 rounded-full bg-black/70 border border-neon-green/30 text-neon-green"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(0,255,65,0.2)",
                      "0 0 0 8px rgba(0,255,65,0)",
                      "0 0 0 0 rgba(0,255,65,0.2)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.7,
                  }}
                >
                  {item.icon}
                </motion.div>
                <span className="uppercase tracking-wider font-medium group-hover:text-neon-green transition-colors">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
