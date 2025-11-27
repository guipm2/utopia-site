"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect, useMemo } from "react"
import { ArrowRight, Sparkles, Zap, Brain, Infinity, Play, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function QuantumCTA() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentPhase, setCurrentPhase] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-20%" })

  // Detectar mobile para otimizar animações
  const [isMobile, setIsMobile] = useState(false)
  
  // Gerar posições da constellation uma única vez
  const constellationPoints = useMemo(() => 
    Array.from({ length: 8 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
    })),
    []
  )

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.4])

  const phases = [{ text: "Vamos Criar o Futuro?", icon: <Sparkles className="size-6" /> }]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Auto-rotate phases
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={containerRef} className="w-full py-16 md:py-32 relative overflow-hidden">
      {/* Quantum Field Background */}
      <motion.div className="absolute inset-0" style={{ y: isMobile ? 0 : backgroundY, scale: isMobile ? 1 : backgroundScale }}>
        {/* Dimensional Rifts - reduzidos em mobile */}
        <div className="absolute inset-0">
          {Array.from({ length: isMobile ? 2 : 3 }).map((_, i) => (
            <motion.div
              key={`rift-${i}`}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                transform: `rotate(${i * 15}deg)`,
              }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scaleX: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 4 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Reactive Quantum Field */}
        <motion.div
          className="absolute w-[150vw] h-[150vw] md:w-[1000px] md:h-[1000px] rounded-full blur-2xl md:blur-3xl"
          style={{
            background: `conic-gradient(from 0deg, 
              rgba(0, 255, 65, 0.3) 0deg,
              rgba(0, 255, 65, 0.2) 90deg,
              rgba(0, 255, 65, 0.15) 180deg,
              rgba(0, 255, 65, 0.2) 270deg,
              rgba(0, 255, 65, 0.3) 360deg)`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: isMobile ? 6 : 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            opacity: { duration: isMobile ? 4 : 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />

        {/* Neural Constellation */}
        {constellationPoints.map((point, i) => (
          <motion.div
            key={`constellation-${i}`}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${point.left}%`,
              top: `${point.top}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.2, 0.8, 0.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: point.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: point.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Holographic Grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "120px 120px"],
        }}
        transition={{
          duration: 40,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Dynamic Phase Header */}
          <motion.div
            key={`phase-header-${currentPhase}`}
            initial={{ opacity: 0, y: 30, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -30, rotateX: 90 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8"
            style={{ perspective: "1000px" }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="text-white">{phases[currentPhase].icon}</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Quantum Title */}
          <motion.h2
            key={`quantum-title-${currentPhase}`}
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-8 md:mb-12 text-white relative px-4"
            style={{ perspective: "1000px" }}
          >
            {phases[currentPhase].text}

            {/* Quantum Shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            />
          </motion.h2>

          {/* Quantum Description */}
          <motion.p
            className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-300 mb-12 md:mb-16 max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Junte-se às empresas que transcenderam os limites do possível.
            </motion.span>{" "}
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            >
              O futuro não é destino - é criação consciente.
            </motion.span>
          </motion.p>

          {/* Quantum Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center mb-12 md:mb-20 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Primary Quantum Portal */}
            <motion.div className="relative group" whileHover={{ scale: 1.05, y: -8 }} whileTap={{ scale: 0.95 }}>
              {/* Quantum Aura */}
              <motion.div
                className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(0, 255, 65, 0.5), rgba(0, 255, 65, 0.3), rgba(0, 255, 65, 0.5), rgba(0, 255, 65, 0.3))",
                  filter: "blur(15px)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              <Button
                size="lg"
                className="relative rounded-full h-14 md:h-20 px-10 md:px-16 text-base md:text-lg group bg-neon-green text-black hover:bg-neon-green-light font-bold border-0 shadow-[0_0_40px_rgba(0,255,65,0.6)] transition-all duration-500 overflow-hidden w-full sm:w-auto"
              >
                {/* Quantum Energy */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1.5,
                    ease: "easeInOut",
                  }}
                />

                <span className="relative z-10 flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Zap className="size-6" />
                  </motion.div>
                  Iniciar Transformação Quântica
                </span>
                <ArrowRight className="ml-3 size-6 transition-transform group-hover:translate-x-2 relative z-10" />
              </Button>
            </motion.div>

            {/* Secondary Neural Portal */}
            <motion.div className="relative group" whileHover={{ scale: 1.05, y: -8 }} whileTap={{ scale: 0.95 }}>
              <motion.div
                className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
                  filter: "blur(10px)",
                }}
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
                    "linear-gradient(225deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
                    "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />

              <Button
                size="lg"
                variant="ghost"
                className="relative rounded-full h-14 md:h-20 px-10 md:px-16 text-base md:text-lg text-white hover:text-white transition-all duration-500 border-2 border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/15 backdrop-blur-xl overflow-hidden group w-full sm:w-auto"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2.5,
                    ease: "easeInOut",
                  }}
                />

                <span className="relative z-10 flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Play className="size-6" />
                  </motion.div>
                  Explorar Demonstração Neural
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Quantum Metrics */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {[
              {
                metric: "∞",
                label: "Possibilidades Criadas",
                icon: <Infinity className="size-6" />,
                color: "from-neon-green/20 to-neon-green/30",
                glow: "rgba(0, 255, 65, 0.4)",
              },
              {
                metric: "24/7",
                label: "Consciência Ativa",
                icon: <Brain className="size-6" />,
                color: "from-neon-green/30 to-neon-green-dark/25",
                glow: "rgba(0, 255, 65, 0.5)",
              },
              {
                metric: "0.001s",
                label: "Tempo de Resposta Quântico",
                icon: <Zap className="size-6" />,
                color: "from-neon-green/25 to-neon-green-light/20",
                glow: "rgba(0, 255, 65, 0.35)",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="relative p-4 md:p-8 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden group cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${item.color.split(" ")[1]}, ${item.color.split(" ")[3]})`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                {/* Quantum Glow */}
                <motion.div
                  className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-60"
                  style={{ background: item.glow }}
                  transition={{ duration: 0.3 }}
                />

                {/* Quantum Shimmer */}
                <motion.div
                  className="absolute inset-0 -translate-x-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  }}
                  animate={{ x: ["0%", "200%"] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3 + i,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative z-10 text-center">
                  <motion.div
                    className="mb-4 flex justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <div className="p-3 rounded-xl bg-white/10 text-white">{item.icon}</div>
                  </motion.div>

                  <div className="text-3xl font-bold text-white mb-2">{item.metric}</div>
                  <div className="text-sm text-white/80">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Final Quantum Call */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.div
              className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 border border-white/20 backdrop-blur-xl text-white cursor-pointer group"
              whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="size-5" />
              </motion.div>
              <span className="font-medium">O futuro está esperando. Você está pronto?</span>
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
