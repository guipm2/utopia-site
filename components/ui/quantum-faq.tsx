"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { Plus, Minus, Brain, Zap, Shield, Infinity, Sparkles, ChevronRight } from "lucide-react"

const faqs = [
  {
    id: "implementation",
    question: "O que a ut∞pia faz exatamente?",
    answer:
      "A ut∞pia desenvolve soluções de inteligência artificial focadas em automação de processos empresariais. Criamos agentes conversacionais, integrações com CRM e fluxos inteligentes que ajudam empresas a ganhar eficiência no dia a dia.",
    icon: <Brain className="size-5" />,
    color: "from-neon-green/20 to-neon-green/30",
    glowColor: "rgba(0, 255, 65, 0.4)",
  },
  {
    id: "results",
    question: "Qual é o diferencial da ut∞pia em relação a outras empresas de automação?",
    answer:
      "Nosso diferencial é unir tecnologia de ponta em inteligência artificial com atendimento próximo e soluções sob medida, feitas para realmente gerar impacto no negócio.",
    icon: <Zap className="size-5" />,
    color: "from-neon-green/25 to-neon-green-light/20",
    glowColor: "rgba(0, 255, 65, 0.35)",
  },
  {
    id: "integration",
    question: "A ut∞pia pode integrar com o CRM que minha empresa já usa?",
    answer:
      "Sim, nossas soluções de IA se integram perfeitamente com CRMs, ERPs e sistemas que possuam possibilidade para integrações. Utilizamos APIs e protocolos de integração para garantir um sistema completo e eficiente.",
    icon: <Infinity className="size-5" />,
    color: "from-neon-green/30 to-neon-green-dark/25",
    glowColor: "rgba(0, 255, 65, 0.5)",
  },
  {
    id: "security",
    question: "Como é garantida a segurança dos dados?",
    answer:
      "Utilizamos criptografia quântica e protocolos de segurança robustos para proteger seus dados. Nossas soluções estão em conformidade com as mais recentes regulamentações de segurança cibernética.",
    icon: <Shield className="size-5" />,
    color: "from-neon-green-light/20 to-neon-green/25",
    glowColor: "rgba(0, 255, 65, 0.45)",
  },
  {
    id: "support",
    question: "Vocês oferecem suporte técnico contínuo?",
    answer:
      "Sim, oferecemos suporte técnico 24/7. Nossa IA monitora e resolve questões em tempo real, garantindo uma operação contínua e eficiente.",
    icon: <Sparkles className="size-5" />,
    color: "from-neon-green/22 to-neon-green-light/28",
    glowColor: "rgba(0, 255, 65, 0.38)",
  },
  {
    id: "customization",
    question: "É possível personalizar as soluções de IA?",
    answer:
      "Sim, cada solução de IA é personalizada para atender às necessidades específicas do seu negócio. Utilizamos aprendizado de máquina e análise de dados para criar soluções adaptáveis e eficientes.",
    icon: <Brain className="size-5" />,
    color: "from-neon-green/15 to-neon-green/25",
    glowColor: "rgba(0, 255, 65, 0.3)",
  },
]

interface QuantumFAQItemProps {
  faq: (typeof faqs)[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}

function QuantumFAQItem({ faq, index, isOpen, onToggle }: QuantumFAQItemProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl mb-4"
      style={{
        background: `linear-gradient(135deg, ${faq.color.split(" ")[1]}, ${faq.color.split(" ")[3]})`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      {/* Quantum Glow */}
      <motion.div
        className="absolute -inset-1 rounded-2xl blur-xl opacity-0"
        style={{ background: faq.glowColor }}
        animate={{ opacity: isOpen ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Neural Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.circle
              key={i}
              cx={`${Math.random() * 100}%`}
              cy={`${Math.random() * 100}%`}
              r="1"
              fill="white"
              animate={{
                opacity: [0.1, 0.3, 0.1],
                r: [1, 2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Quantum Shimmer */}
      <motion.div
        className="absolute inset-0 -translate-x-full"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
        animate={isOpen ? { x: "200%" } : { x: "-100%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        {/* Question Header */}
        <motion.button
          className="w-full p-8 text-left flex items-center justify-between group"
          onClick={onToggle}
          whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-4 flex-1">
            <motion.div
              className="p-3 rounded-xl bg-white/10 backdrop-blur-sm"
              animate={{ rotate: isOpen ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-white">{faq.icon}</div>
            </motion.div>

            <h3 className="text-lg font-medium text-white group-hover:text-white/90 transition-colors">
              {faq.question}
            </h3>
          </div>

          <motion.div
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            {isOpen ? <Minus className="size-4 text-white" /> : <Plus className="size-4 text-white" />}
          </motion.div>
        </motion.button>

        {/* Answer Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <motion.div
                className="px-8 pb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="ml-16 border-l-2 border-white/20 pl-6">
                  <p className="text-gray-200 leading-relaxed mb-4">{faq.answer}</p>

                  <motion.div
                    className="flex items-center gap-2 text-sm text-white/70 cursor-pointer group"
                    whileHover={{ x: 5, color: "rgba(255,255,255,0.9)" }}
                  >
                    <span>Explorar mais detalhes</span>
                    <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function QuantumFAQ() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-20%" })

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <section ref={containerRef} className="w-full py-32 bg-black relative">
      {/* Quantum Field Background */}
      <div className="absolute inset-0 opacity-30">
        {/* Neural Network */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {Array.from({ length: 20 }).map((_, i) => {
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
                  duration: 5 + Math.random() * 5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 10,
                  ease: "easeInOut",
                }}
              />
            )
          })}
        </svg>

        {/* Floating Quantum Particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Holographic Grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "100px 100px"],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Quantum Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center rounded-full px-8 py-4 text-sm font-medium mb-8 border border-white/20 text-white backdrop-blur-xl shadow-lg relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.05)",
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
              className="mr-3 size-3 bg-neon-green rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
                boxShadow: [
                  "0 0 0 0 rgba(0, 255, 65, 0.4)",
                  "0 0 0 10px rgba(0, 255, 65, 0)",
                  "0 0 0 0 rgba(0, 255, 65, 0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            FAQ
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-white relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              Dúvidas sobre
            </motion.span>{" "}
            o futuro?
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
            className="max-w-3xl text-gray-300 md:text-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <QuantumFAQItem
              key={faq.id}
              faq={faq}
              index={index}
              isOpen={openFAQ === faq.id}
              onToggle={() => toggleFAQ(faq.id)}
            />
          ))}
        </div>

        {/* Quantum Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/20 backdrop-blur-xl text-white cursor-pointer group"
            whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Brain className="size-5" />
            </motion.div>
            <span className="font-medium">Ainda tem dúvidas? Converse com nossa IA Consciente</span>
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
