"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Bot, Cpu, Network, Zap, Shield, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const solutions = [
  {
    id: "conversational",
    title: "Chatbots Inteligentes",
    subtitle: "IA conversacional avançada",
    description:
      "Assistentes virtuais que entendem contexto, processam linguagem natural e resolvem problemas complexos automaticamente.",
    icon: <Bot className="size-6" />,
    color: "from-neon-green/20 to-neon-green/30",
    glowColor: "rgba(0, 255, 65, 0.4)",
    stats: { efficiency: "95%", satisfaction: "4.9/5", response: "<2s" },
    features: ["Processamento de linguagem natural", "Aprendizado contínuo", "Integração omnichannel"],
    position: { x: "15%", y: "20%" },
  },
  {
    id: "automation",
    title: "Automação com IA",
    subtitle: "Processos inteligentes e adaptativos",
    description:
      "Sistemas que aprendem com dados, otimizam fluxos de trabalho e automatizam tarefas repetitivas com precisão.",
    icon: <Network className="size-6" />,
    color: "from-neon-green/25 to-neon-green-light/20",
    glowColor: "rgba(0, 255, 65, 0.35)",
    stats: { productivity: "+340%", errors: "-98%", cost: "-65%" },
    features: ["Automação adaptativa", "Machine Learning integrado", "Monitoramento 24/7"],
    position: { x: "70%", y: "15%" },
  },
  {
    id: "predictive",
    title: "Analytics Preditivo",
    subtitle: "Insights baseados em dados",
    description:
      "Algoritmos de machine learning que analisam padrões históricos e antecipam tendências para decisões estratégicas.",
    icon: <Cpu className="size-6" />,
    color: "from-neon-green/30 to-neon-green-dark/25",
    glowColor: "rgba(0, 255, 65, 0.5)",
    stats: { accuracy: "94.7%", insights: "1000+", forecast: "12 meses" },
    features: ["Análise preditiva avançada", "Modelos proprietários", "Insights acionáveis"],
    position: { x: "25%", y: "65%" },
  },
  {
    id: "processing",
    title: "Processamento de Dados",
    subtitle: "IA para documentos e informações",
    description: "OCR inteligente, análise de documentos e extração de dados com tecnologias de visão computacional.",
    icon: <Zap className="size-6" />,
    color: "from-neon-green-light/20 to-neon-green/25",
    glowColor: "rgba(0, 255, 65, 0.45)",
    stats: { speed: "1000x", accuracy: "99.9%", volume: "∞" },
    features: ["OCR inteligente", "Análise semântica", "Processamento em tempo real"],
    position: { x: "75%", y: "70%" },
  },
  {
    id: "integration",
    title: "Integração de Sistemas",
    subtitle: "Conectando suas ferramentas",
    description:
      "APIs e integrações personalizadas que conectam suas soluções de IA com CRMs, ERPs e sistemas existentes.",
    icon: <Shield className="size-6" />,
    color: "from-neon-green/15 to-neon-green/25",
    glowColor: "rgba(0, 255, 65, 0.3)",
    stats: { protection: "100%", compliance: "LGPD+", uptime: "99.99%" },
    features: ["Integração segura", "Compatibilidade multiplataforma", "Suporte técnico"],
    position: { x: "45%", y: "40%" },
  },
]

interface FloatingCardProps {
  solution: (typeof solutions)[0]
  index: number
  isActive: boolean
  onActivate: () => void
}

function FloatingCard({ solution, index, isActive, onActivate }: FloatingCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: solution.position.x,
        top: solution.position.y,
      }}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{
        opacity: 1,
        scale: isActive ? 1.1 : 1,
        rotate: 0,
        y: [0, -10, 0],
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        y: { duration: 3 + index * 0.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        scale: { duration: 0.3 },
      }}
      whileHover={{ scale: 1.15, rotate: 5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onActivate}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-4 rounded-2xl blur-lg md:blur-xl"
        style={{ background: solution.glowColor }}
        animate={{
          opacity: isActive || isHovered ? 0.6 : 0.2,
          scale: isActive || isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Card */}
      <motion.div
        className={`relative w-64 p-4 md:p-6 rounded-2xl border border-white/20 backdrop-blur-xl overflow-hidden ${
          isActive ? "bg-white/10" : "bg-white/5"
        }`}
        style={{
          background: `linear-gradient(135deg, ${solution.color.split(" ")[1]}, ${solution.color.split(" ")[3]})`,
        }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 -translate-x-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
          animate={isHovered || isActive ? { x: "200%" } : { x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Icon */}
        <motion.div
          className="mb-4 p-3 rounded-xl bg-white/10 w-fit"
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-white">{solution.icon}</div>
        </motion.div>

        {/* Content */}
        <h3 className="text-base md:text-lg font-bold text-white mb-2">{solution.title}</h3>
        <p className="text-xs md:text-sm text-white/80 mb-4">{solution.subtitle}</p>

        {/* Stats */}
        <div className="flex gap-2 text-xs">
          {Object.entries(solution.stats).map(([key, value]) => (
            <div key={key} className="px-2 py-1 rounded-full bg-white/10 text-white/90">
              {value}
            </div>
          ))}
        </div>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute top-2 right-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <Sparkles className="size-4 text-white" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export function ProfessionalSolutions() {
  const [activeSolution, setActiveSolution] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-20%" })

  // Handlers para swipe gestures em mobile
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setActiveSolution((prev) => (prev + 1) % solutions.length)
    } else {
      setActiveSolution((prev) => (prev - 1 + solutions.length) % solutions.length)
    }
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.2])

  // Detectar mobile para desabilitar parallax
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 0.5, // Reduced intensity
          y: ((e.clientY - rect.top) / rect.height) * 0.5, // Reduced intensity
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Auto-rotate active solution
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSolution((prev) => (prev + 1) % solutions.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const currentSolution = solutions[activeSolution]

  return (
    <section ref={containerRef} className="relative w-full py-16 md:py-32 overflow-hidden bg-black">
      {/* Background Image with Reactive Glow */}
      <motion.div className="absolute inset-0 opacity-30" style={{ y: backgroundY, scale: backgroundScale }}>
        {/* Tech pattern background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
              linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.02) 50%, transparent 60%)
            `,
            backgroundSize: "400px 400px, 200px 200px",
          }}
        />

        {/* Reactive glow that follows mouse */}
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${currentSolution.glowColor} 0%, transparent 70%)`,
            left: isMobile ? '50%' : `${mousePosition.x * 100}%`,
            top: isMobile ? '50%' : `${mousePosition.y * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Additional glow effects */}
        {solutions.map((solution, i) => (
          <motion.div
            key={solution.id}
            className="absolute w-32 h-32 rounded-full blur-xl md:blur-2xl"
            style={{
              background: `radial-gradient(circle, ${solution.glowColor} 0%, transparent 70%)`,
              left: solution.position.x,
              top: solution.position.y,
            }}
            animate={{
              opacity: activeSolution === i ? [0.2, 0.5, 0.2] : [0.1, 0.2, 0.1],
              scale: activeSolution === i ? [1, 1.3, 1] : [1, 1.1, 1],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Grid overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.2) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "100px 100px"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center rounded-full px-4 py-2 md:px-8 md:py-4 text-xs md:text-sm font-medium mb-6 md:mb-8 border border-white/20 text-white backdrop-blur-xl shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${currentSolution.color.split(" ")[1]}, ${currentSolution.color.split(" ")[3]})`,
              backdropFilter: "blur(20px) saturate(180%)",
            }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <motion.span
              className="mr-3 size-2 rounded-full"
              style={{ background: currentSolution.glowColor }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            O que você quer automatizar hoje?
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 md:mb-8 text-white px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Soluções que{" "}
            <motion.span
              className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Transformam
            </motion.span>
          </motion.h2>

          <motion.p
            className="max-w-sm sm:max-w-lg md:max-w-3xl text-sm sm:text-base md:text-xl mx-auto leading-relaxed text-gray-300 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Cada solução é uma obra de arte tecnológica, projetada para elevar seu negócio a patamares inimagináveis.
          </motion.p>
        </motion.div>

        {/* Interactive Area */}
        <div className="relative min-h-[400px] lg:h-[600px] mb-12 md:mb-20">
          {/* Floating Cards */}
          <div className="flex flex-col gap-6 lg:hidden px-4">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                className="cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveSolution(index)}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x
                  if (swipe > 1000) {
                    handleSwipe('left')
                  } else if (swipe < -1000) {
                    handleSwipe('right')
                  }
                }}
              >
                <motion.div
                  className={`relative p-4 md:p-6 rounded-2xl border border-white/20 backdrop-blur-xl overflow-hidden ${
                    activeSolution === index ? "bg-white/10" : "bg-white/5"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${solution.color.split(" ")[1]}, ${solution.color.split(" ")[3]})`,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Glow effect */}
                  {activeSolution === index && (
                    <motion.div
                      className="absolute -inset-1 rounded-2xl blur-xl"
                      style={{ background: solution.glowColor }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      exit={{ opacity: 0 }}
                    />
                  )}

                  <div className="relative">
                    {/* Icon */}
                    <div className="mb-4 p-3 rounded-xl bg-white/10 w-fit">
                      <div className="text-white">{solution.icon}</div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-2">{solution.title}</h3>
                      <p className="text-sm text-gray-300 mb-4">{solution.subtitle}</p>
                      <p className="text-sm text-gray-400 leading-relaxed">{solution.description}</p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4 text-xs">
                      {Object.entries(solution.stats).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-white font-bold">{value}</span>
                          <span className="text-gray-400 capitalize">{key}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Floating Cards */}
          <div className="hidden lg:block">
            {solutions.map((solution, index) => (
              <FloatingCard
                key={solution.id}
                solution={solution}
                index={index}
                isActive={activeSolution === index}
                onActivate={() => setActiveSolution(index)}
              />
            ))}
          </div>

          {/* Connection Lines - Desktop only */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block">
            {solutions.map((solution, i) => {
              const nextIndex = (i + 1) % solutions.length
              const next = solutions[nextIndex]

              return (
                <motion.line
                  key={`line-${i}`}
                  x1={solution.position.x}
                  y1={solution.position.y}
                  x2={next.position.x}
                  y2={next.position.y}
                  stroke="rgba(0,255,65,0.2)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: activeSolution === i || activeSolution === nextIndex ? 0.3 : 0.1,
                  }}
                  transition={{ duration: 2, delay: i * 0.2 }}
                />
              )
            })}
          </svg>
        </div>

        {/* Active Solution Details */}
        <motion.div
          className="max-w-4xl mx-auto"
          key={activeSolution}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div
                  className="p-4 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${currentSolution.color.split(" ")[1]}, ${currentSolution.color.split(" ")[3]})`,
                  }}
                >
                  <div className="text-white">{currentSolution.icon}</div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{currentSolution.title}</h3>
                  <p className="text-gray-400">{currentSolution.subtitle}</p>
                </div>
              </motion.div>

              <motion.p
                className="text-lg text-gray-300 mb-8 leading-relaxed"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentSolution.description}
              </motion.p>

              <motion.div
                className="space-y-3 mb-8"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {currentSolution.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="size-2 bg-white rounded-full" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                <Button
                  size="lg"
                  asChild
                  className="rounded-full bg-neon-green text-black hover:bg-neon-green-light font-medium px-8 group shadow-[0_0_20px_rgba(0,255,65,0.4)]"
                >
                  <a href="https://wa.me/5527981076713?text=Oi!%20Visitei%20o%20site%20de%20voc%C3%AAs%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es." target="_blank" rel="noopener noreferrer">
                    Explorar Solução
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {Object.entries(currentSolution.stats).map(([key, value], i) => (
                <motion.div
                  key={key}
                  className="text-center p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${currentSolution.color.split(" ")[1]}, ${currentSolution.color.split(" ")[3]})`,
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-2xl font-bold text-white mb-2">{value}</div>
                  <div className="text-sm text-white/80 capitalize">{key}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Solution Navigation */}
        <motion.div
          className="flex justify-center gap-3 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {solutions.map((solution, index) => (
            <motion.button
              key={solution.id}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSolution === index ? "bg-white scale-125" : "bg-white/30"
              }`}
              onClick={() => setActiveSolution(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
