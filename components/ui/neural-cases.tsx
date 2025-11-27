"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect, useMemo } from "react"
import { Star, Brain, Zap, TrendingUp, Shield, Sparkles } from "lucide-react"
import { usePerformance } from "@/hooks/use-performance"

const testimonials = [
  {
    id: "techflow",
    quote:
      "A Utopia não apenas automatizou nossos processos - ela os reinventou. Nossa IA conversacional agora pensa, aprende e evolui como um membro da equipe.",
    author: "Maria Silva",
    role: "Diretora de Inovação",
    company: "TechFlow Dynamics",
    rating: 5,
    metrics: { efficiency: "+380%", satisfaction: "4.9/5", evolution: "Contínua" },
    color: "from-neon-green/20 to-neon-green/30",
    glowColor: "rgba(0, 255, 65, 0.4)",
    icon: <Brain className="size-5" />,
    position: { x: "10%", y: "15%" },
  },
  {
    id: "salesmax",
    quote:
      "Não é apenas IA preditiva - é precognição empresarial. Antecipamos tendências que nem sabíamos que existiam. O futuro chegou ao nosso presente.",
    author: "Carlos Santos",
    role: "CEO & Visionário",
    company: "SalesMax Quantum",
    rating: 5,
    metrics: { growth: "+450%", accuracy: "96.7%", insights: "∞" },
    color: "from-neon-green/25 to-neon-green-light/20",
    glowColor: "rgba(0, 255, 65, 0.35)",
    icon: <TrendingUp className="size-5" />,
    position: { x: "75%", y: "20%" },
  },
  {
    id: "innovacorp",
    quote:
      "A implementação transcendeu nossas expectativas. Não recebemos uma ferramenta - ganhamos um ecossistema inteligente que respira e evolui conosco.",
    author: "Ana Costa",
    role: "Chief Innovation Officer",
    company: "InnovaCorp Future",
    rating: 5,
    metrics: { productivity: "+340%", innovation: "Exponencial", impact: "Transformador" },
    color: "from-neon-green/30 to-neon-green-dark/25",
    glowColor: "rgba(0, 255, 65, 0.5)",
    icon: <Sparkles className="size-5" />,
    position: { x: "20%", y: "70%" },
  },
  {
    id: "datadriven",
    quote:
      "A integração foi além do seamless - foi simbiótica. Nossa infraestrutura e a IA da Utopia se fundiram numa entidade única e poderosa.",
    author: "Roberto Lima",
    role: "Chief Technology Architect",
    company: "DataDriven Neural",
    rating: 5,
    metrics: { integration: "100%", performance: "Quântica", scalability: "Ilimitada" },
    color: "from-neon-green-light/20 to-neon-green/25",
    glowColor: "rgba(0, 255, 65, 0.45)",
    icon: <Zap className="size-5" />,
    position: { x: "70%", y: "65%" },
  },
  {
    id: "growthlab",
    quote:
      "ROI de 400% em 4 meses não é apenas crescimento - é metamorfose. A Utopia não otimizou nossa operação, ela a transcendeu para uma nova dimensão.",
    author: "Fernanda Oliveira",
    role: "Quantum Finance Director",
    company: "GrowthLab Infinity",
    rating: 5,
    metrics: { roi: "+400%", transformation: "Quântica", timeline: "4 meses" },
    color: "from-neon-green/22 to-neon-green-light/28",
    glowColor: "rgba(0, 255, 65, 0.38)",
    icon: <TrendingUp className="size-5" />,
    position: { x: "45%", y: "40%" },
  },
  {
    id: "autoflow",
    quote:
      "Processamento que transcende velocidade - é instantaneidade cognitiva. Documentos complexos são compreendidos antes mesmo de serem processados.",
    author: "João Pereira",
    role: "Neural Process Manager",
    company: "AutoFlow Quantum",
    rating: 5,
    metrics: { speed: "Instantânea", accuracy: "99.97%", intelligence: "Sobre-humana" },
    color: "from-neon-green/15 to-neon-green/25",
    glowColor: "rgba(0, 255, 65, 0.3)",
    icon: <Shield className="size-5" />,
    position: { x: "85%", y: "45%" },
  },
]

interface FloatingTestimonialProps {
  testimonial: (typeof testimonials)[0]
  index: number
  isActive: boolean
  onActivate: () => void
}

function FloatingTestimonial({ testimonial, index, isActive, onActivate }: FloatingTestimonialProps) {
  const [isHovered, setIsHovered] = useState(false)
  const performance = usePerformance()
  
  // Reduz partículas baseado na performance
  const particleCount = useMemo(() => {
    if (performance.prefersReducedMotion) return 0
    if (performance.isLowEnd) return 3
    if (performance.tier === 'medium') return 5
    return 6
  }, [performance])

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: testimonial.position.x,
        top: testimonial.position.y,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0, rotateY: -180 }}
      animate={{
        opacity: 1,
        scale: isActive ? 1.1 : 1,
        rotateY: 0,
        y: [0, -15, 0],
      }}
      transition={{
        duration: 1,
        delay: index * 0.15,
        type: "spring",
        y: { duration: 4 + index * 0.3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        scale: { duration: 0.3 },
      }}
      whileHover={{ scale: performance.isLowEnd ? 1.05 : 1.15, rotateY: performance.isLowEnd ? 0 : 10, rotateX: performance.isLowEnd ? 0 : 5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onActivate}
    >
      {/* Quantum Glow - desabilitado em low-end */}
      {!performance.isLowEnd && (
        <motion.div
          className="absolute -inset-6 rounded-3xl blur-2xl"
          style={{ background: testimonial.glowColor }}
          animate={{
            opacity: isActive || isHovered ? 0.8 : 0.3,
            scale: isActive || isHovered ? 1.3 : 1,
            rotate: performance.prefersReducedMotion ? 0 : [0, 360],
          }}
          transition={{
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
            rotate: { duration: 8, repeat: performance.prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "linear" },
          }}
        />
      )}

      {/* Neural Card */}
      <motion.div
        className={`relative w-72 p-4 md:p-6 rounded-3xl border border-white/20 backdrop-blur-xl overflow-hidden ${
          isActive ? "bg-white/15" : "bg-white/8"
        }`}
        style={{
          background: `linear-gradient(135deg, ${testimonial.color.split(" ")[1]}, ${testimonial.color.split(" ")[3]})`,
        }}
      >
        {/* Quantum Shimmer - desabilitado em low-end */}
        {!performance.isLowEnd && !performance.prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 -translate-x-full"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            }}
            animate={isHovered || isActive ? { x: "200%" } : { x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        )}

        {/* Neural Pattern */}
        {particleCount > 0 && (
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              {Array.from({ length: particleCount }).map((_, i) => (
                <motion.circle
                  key={i}
                  cx={`${Math.random() * 100}%`}
                  cy={`${Math.random() * 100}%`}
                  r="1"
                  fill="white"
                  animate={{
                    opacity: [0.1, 0.5, 0.1],
                    r: [1, 2, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </svg>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className="p-3 rounded-xl bg-white/10 backdrop-blur-sm"
            animate={{ rotate: isHovered && !performance.prefersReducedMotion ? 360 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-white">{testimonial.icon}</div>
          </motion.div>

          <div className="flex">
            {Array(testimonial.rating)
              .fill(0)
              .map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1 * i, type: "spring" }}
                >
                  <Star className="size-4 text-yellow-400 fill-yellow-400" />
                </motion.div>
              ))}
          </div>
        </div>

        {/* Quote */}
        <p className="text-sm text-white/90 mb-4 leading-relaxed line-clamp-4">{testimonial.quote}</p>

        {/* Metrics */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {Object.entries(testimonial.metrics).map(([key, value]) => (
            <motion.div
              key={key}
              className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/90 backdrop-blur-sm"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              {value}
            </motion.div>
          ))}
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/10">
          <motion.div
            className="size-10 rounded-full bg-white/10 flex items-center justify-center text-white font-medium text-sm backdrop-blur-sm"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {testimonial.author.charAt(0)}
          </motion.div>
          <div>
            <p className="text-sm font-medium text-white">{testimonial.author}</p>
            <p className="text-xs text-white/70">{testimonial.role}</p>
            <p className="text-xs text-white/50">{testimonial.company}</p>
          </div>
        </div>

        {/* Active Indicator */}
        {isActive && (
          <motion.div
            className="absolute top-3 right-3"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="size-5 text-white" />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export function NeuralCases() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-20%" })
  const performance = usePerformance()
  
  // Handlers para swipe gestures em mobile
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    } else {
      setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }
  
  // Ajusta complexidade baseado na performance
  const complexity = useMemo(() => {
    if (performance.prefersReducedMotion) return { lines: 0, particles: 0 }
    if (performance.isLowEnd) return { lines: 8, particles: 3 }
    if (performance.tier === 'medium') return { lines: 15, particles: 4 }
    return { lines: 25, particles: 6 }
  }, [performance])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], performance.isLowEnd ? ["0%", "0%"] : ["0%", "40%"])
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], performance.isLowEnd ? [1, 1, 1] : [1, 1.15, 1.3])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentTestimonial = testimonials[activeTestimonial]

  return (
    <section ref={containerRef} className="relative w-full py-16 md:py-32 overflow-hidden bg-black">
      {/* Quantum Field Background */}
      <motion.div className="absolute inset-0 opacity-40" style={{ y: backgroundY, scale: backgroundScale }}>
        {/* Neural Network - reduzido baseado em performance */}
        {complexity.lines > 0 && (
          <div className="absolute inset-0">
            <svg className="w-full h-full opacity-20">
              {Array.from({ length: complexity.lines }).map((_, i) => {
                const x1 = Math.random() * 100
                const y1 = Math.random() * 100
                const x2 = Math.random() * 100
                const y2 = Math.random() * 100

                return (
                  <motion.line
                    key={i}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 1, 0],
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 6,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 8,
                      ease: "easeInOut",
                    }}
                  />
                )
              })}
            </svg>
          </div>
        )}

        {/* Simplified Reactive Quantum Field - apenas em dispositivos capazes */}
        {!performance.isLowEnd && (
          <motion.div
            className="absolute w-[120vw] h-[120vw] md:w-[600px] md:h-[600px] rounded-full blur-2xl md:blur-3xl"
            style={{
              background: `radial-gradient(circle, ${currentTestimonial.glowColor} 0%, transparent 70%)`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={performance.prefersReducedMotion ? {} : {
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Quantum Particles - reduzido baseado em performance */}
        {complexity.particles > 0 && testimonials.slice(0, complexity.particles).map((testimonial, i) => (
          <motion.div
            key={testimonial.id}
            className="absolute w-40 h-40 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${testimonial.glowColor} 0%, transparent 70%)`,
              left: testimonial.position.x,
              top: testimonial.position.y,
            }}
            animate={{
              opacity: activeTestimonial === i ? [0.3, 0.6, 0.3] : [0.1, 0.2, 0.1],
              scale: activeTestimonial === i ? [1, 1.4, 1] : [1, 1.2, 1],
              rotate: performance.prefersReducedMotion ? 0 : [0, 360],
            }}
            transition={{
              opacity: { duration: 3, repeat: Number.POSITIVE_INFINITY },
              scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
              rotate: { duration: 10, repeat: performance.prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "linear" },
            }}
          />
        ))}
      </motion.div>

      {/* Holographic Grid - desabilitado em low-end */}
      {!performance.isLowEnd && (
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
          animate={performance.prefersReducedMotion ? {} : {
            backgroundPosition: ["0px 0px", "80px 80px"],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      )}

      <div className="container px-4 md:px-6 relative z-10">
        {/* Quantum Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center rounded-full px-4 py-2 md:px-8 md:py-4 text-xs md:text-sm font-medium mb-6 md:mb-8 border border-white/20 text-white backdrop-blur-xl shadow-lg relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${currentTestimonial.color.split(" ")[1]}, ${currentTestimonial.color.split(" ")[3]})`,
              backdropFilter: "blur(20px) saturate(180%)",
            }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <motion.div
              className="absolute inset-0 -translate-x-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              }}
              animate={{ x: ["0%", "200%"] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.span
              className="mr-3 size-3 rounded-full"
              style={{ background: currentTestimonial.glowColor }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
                boxShadow: [
                  `0 0 0 0 ${currentTestimonial.glowColor}`,
                  `0 0 0 10px transparent`,
                  `0 0 0 0 ${currentTestimonial.glowColor}`,
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            Realidades Transformadas
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 md:mb-8 text-white relative px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              Testemunhos
            </motion.span>{" "}
            do Futuro
            {/* Holographic overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            />
          </motion.h2>

          <motion.p
            className="max-w-sm sm:max-w-lg md:max-w-3xl text-sm sm:text-base md:text-xl mx-auto leading-relaxed text-gray-300 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Vozes de líderes que transcenderam os limites do possível e criaram novas realidades empresariais.
          </motion.p>
          
          {/* Hint de swipe para mobile */}
          <motion.div
            className="lg:hidden flex items-center justify-center gap-2 mt-6 text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: 3, delay: 1 }}
          >
            <motion.span
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              ←
            </motion.span>
            Deslize para navegar
            <motion.span
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Interactive Neural Field */}
        <div className="relative min-h-[400px] lg:h-[700px] mb-12 md:mb-20">
          {/* Mobile: Lista vertical de testimonials */}
          <div className="flex flex-col gap-6 lg:hidden px-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTestimonial(index)}
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
                  className={`relative p-4 md:p-6 rounded-3xl border border-white/20 backdrop-blur-xl overflow-hidden ${
                    activeTestimonial === index ? "bg-white/15" : "bg-white/8"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${testimonial.color.split(" ")[1]}, ${testimonial.color.split(" ")[3]})`,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Glow effect ativo */}
                  {activeTestimonial === index && (
                    <motion.div
                      className="absolute -inset-1 rounded-3xl blur-lg md:blur-xl"
                      style={{ background: testimonial.glowColor }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      exit={{ opacity: 0 }}
                    />
                  )}

                  <div className="relative">
                    {/* Rating stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="size-4 fill-neon-green text-neon-green" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-sm text-gray-200 mb-4 leading-relaxed italic">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-white/10 flex items-center justify-center text-white font-medium text-sm backdrop-blur-sm">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{testimonial.author}</p>
                        <p className="text-xs text-white/70">{testimonial.role}</p>
                        <p className="text-xs text-white/50">{testimonial.company}</p>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="mt-4 flex gap-4 text-xs">
                      {Object.entries(testimonial.metrics).map(([key, value]) => (
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

          {/* Desktop: Floating testimonials */}
          <div className="hidden lg:block">
            {testimonials.map((testimonial, index) => (
              <FloatingTestimonial
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                isActive={activeTestimonial === index}
                onActivate={() => setActiveTestimonial(index)}
              />
            ))}
          </div>

          {/* Neural Connections - Desktop only */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block">
            {testimonials.map((testimonial, i) => {
              const nextIndex = (i + 1) % testimonials.length
              const next = testimonials[nextIndex]

              return (
                <motion.line
                  key={`connection-${i}`}
                  x1={testimonial.position.x}
                  y1={testimonial.position.y}
                  x2={next.position.x}
                  y2={next.position.y}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="8,8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: activeTestimonial === i || activeTestimonial === nextIndex ? 0.4 : 0.1,
                  }}
                  transition={{ duration: 2, delay: i * 0.3 }}
                />
              )
            })}
          </svg>
        </div>

        {/* Active Testimonial Details */}
        <motion.div
          className="max-w-5xl mx-auto"
          key={activeTestimonial}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="p-4 rounded-2xl backdrop-blur-xl border border-white/20"
                  style={{
                    background: `linear-gradient(135deg, ${currentTestimonial.color.split(" ")[1]}, ${currentTestimonial.color.split(" ")[3]})`,
                  }}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-white">{currentTestimonial.icon}</div>
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{currentTestimonial.company}</h3>
                  <p className="text-gray-400">{currentTestimonial.role}</p>
                </div>
              </motion.div>

              <motion.blockquote
                className="text-xl text-gray-200 mb-8 leading-relaxed italic border-l-2 border-white/20 pl-6"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                "{currentTestimonial.quote}"
              </motion.blockquote>

              <motion.div
                className="flex items-center gap-4"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="size-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold backdrop-blur-sm border border-white/20"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentTestimonial.author.charAt(0)}
                </motion.div>
                <div>
                  <p className="font-medium text-white text-lg">{currentTestimonial.author}</p>
                  <p className="text-gray-400">{currentTestimonial.role}</p>
                </div>
              </motion.div>
            </div>

            {/* Quantum Metrics */}
            <motion.div
              className="grid grid-cols-3 gap-6"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {Object.entries(currentTestimonial.metrics).map(([key, value], i) => (
                <motion.div
                  key={key}
                  className="text-center p-6 rounded-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${currentTestimonial.color.split(" ")[1]}, ${currentTestimonial.color.split(" ")[3]})`,
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {/* Quantum shimmer */}
                  <motion.div
                    className="absolute inset-0 -translate-x-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    }}
                    animate={{ x: ["0%", "200%"] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative z-10">
                    <div className="text-2xl font-bold text-white mb-2">{value}</div>
                    <div className="text-sm text-white/80 capitalize">{key}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Quantum Navigation */}
        <motion.div
          className="flex justify-center gap-4 mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={testimonial.id}
              className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                activeTestimonial === index ? "bg-white scale-125" : "bg-white/30"
              }`}
              onClick={() => setActiveTestimonial(index)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              {activeTestimonial === index && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: testimonial.glowColor }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
