"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Sparkles, Check, Loader2, AlertCircle, CheckCircle2, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Funções de formatação
function formatPhone(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "")

  // Limita a 11 dígitos
  const limited = numbers.slice(0, 11)

  // Aplica a máscara (00) 00000-0000
  if (limited.length <= 2) {
    return limited.length > 0 ? `(${limited}` : ""
  } else if (limited.length <= 7) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`
  } else {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`
  }
}

function formatCPF(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "")

  // Limita a 11 dígitos
  const limited = numbers.slice(0, 11)

  // Aplica a máscara 000.000.000-00
  if (limited.length <= 3) {
    return limited
  } else if (limited.length <= 6) {
    return `${limited.slice(0, 3)}.${limited.slice(3)}`
  } else if (limited.length <= 9) {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`
  } else {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6, 9)}-${limited.slice(9)}`
  }
}

function formatCNPJ(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "")

  // Limita a 14 dígitos
  const limited = numbers.slice(0, 14)

  // Aplica a máscara 00.000.000/0000-00
  if (limited.length <= 2) {
    return limited
  } else if (limited.length <= 5) {
    return `${limited.slice(0, 2)}.${limited.slice(2)}`
  } else if (limited.length <= 8) {
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5)}`
  } else if (limited.length <= 12) {
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8)}`
  } else {
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8, 12)}-${limited.slice(12)}`
  }
}

// Tipos
interface Question {
  id: string
  section: "personal" | "company" | "needs"
  question: string
  placeholder: string
  type: "text" | "email" | "tel" | "textarea" | "select"
  options?: string[]
  required?: boolean
}

// Perguntas do Quiz
const questions: Question[] = [
  // Seção 1: Dados Pessoais
  {
    id: "name",
    section: "personal",
    question: "Qual é o seu nome completo?",
    placeholder: "Digite seu nome e sobrenome",
    type: "text",
    required: true,
  },
  {
    id: "email",
    section: "personal",
    question: "Qual é o seu melhor e-mail?",
    placeholder: "seu@email.com",
    type: "email",
    required: true,
  },
  {
    id: "phone",
    section: "personal",
    question: "Qual é o seu telefone para contato?",
    placeholder: "(00) 00000-0000",
    type: "tel",
    required: true,
  },
  {
    id: "cpf",
    section: "personal",
    question: "Qual é o seu CPF?",
    placeholder: "000.000.000-00",
    type: "text",
    required: false,
  },
  // Seção 2: Dados da Empresa
  {
    id: "companyName",
    section: "company",
    question: "Qual é o nome da sua empresa?",
    placeholder: "Nome da empresa",
    type: "text",
    required: true,
  },
  {
    id: "companyCNPJ",
    section: "company",
    question: "Qual é o CNPJ da empresa?",
    placeholder: "00.000.000/0000-00",
    type: "text",
    required: false,
  },
  {
    id: "companySegment",
    section: "company",
    question: "Em qual ramo sua empresa atua?",
    placeholder: "Ex: Tecnologia, Varejo, Serviços...",
    type: "text",
    required: true,
  },
  {
    id: "companyWebsite",
    section: "company",
    question: "Sua empresa possui um site?",
    placeholder: "www.suaempresa.com.br (opcional)",
    type: "text",
    required: false,
  },
  {
    id: "companySocial",
    section: "company",
    question: "Quais são as redes sociais da empresa?",
    placeholder: "@suaempresa (opcional)",
    type: "text",
    required: false,
  },
  {
    id: "companyDescription",
    section: "company",
    question: "Descreva brevemente o que sua empresa faz",
    placeholder: "Conte um pouco sobre o seu negócio...",
    type: "textarea",
    required: false,
  },
  // Seção 3: Dores e Necessidades
  {
    id: "mainChallenge",
    section: "needs",
    question: "Qual é o principal desafio da sua empresa hoje?",
    placeholder: "Descreva seu maior desafio atual...",
    type: "textarea",
    required: true,
  },
  {
    id: "motivation",
    section: "needs",
    question: "O que te motivou a buscar soluções de IA?",
    placeholder: "Ex: Automatizar processos, reduzir custos...",
    type: "textarea",
    required: true,
  },
  {
    id: "focusArea",
    section: "needs",
    question: "Qual área da sua empresa precisa de mais atenção?",
    placeholder: "Selecione uma área",
    type: "select",
    options: [
      "Atendimento ao cliente",
      "Vendas e Marketing",
      "Operações e Processos",
      "Análise de Dados",
      "Gestão Financeira",
      "Outra área",
    ],
    required: true,
  },
  {
    id: "expectation",
    section: "needs",
    question: "Qual resultado você espera alcançar?",
    placeholder: "Descreva sua expectativa principal...",
    type: "textarea",
    required: true,
  },
  {
    id: "urgency",
    section: "needs",
    question: "Qual é o nível de urgência para implementar uma solução?",
    placeholder: "Selecione o nível de urgência",
    type: "select",
    options: [
      "Imediato - Preciso para ontem",
      "Curto prazo - Próximas semanas",
      "Médio prazo - Próximos meses",
      "Longo prazo - Estou planejando",
      "Apenas explorando opções",
    ],
    required: true,
  },
]

// Componente de Animação de Digitação
function TypingAnimation({ onStart }: { onStart: () => void }) {
  const fullText = "Que bom saber que você quer ser parte do futuro... Agora precisamos entender um pouco mais sobre você."
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayText.length < fullText.length) {
      // Digitando
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1))
      }, 40)
    } else if (!isDeleting && displayText.length === fullText.length) {
      // Texto completo - espera 3 segundos
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 3000)
    } else if (isDeleting && displayText.length > 0) {
      // Apagando
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1))
      }, 25)
    } else if (isDeleting && displayText.length === 0) {
      // Texto apagado - reinicia
      timeout = setTimeout(() => {
        setIsDeleting(false)
      }, 500)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, fullText])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen px-6"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="size-10 rounded-full bg-neon-green flex items-center justify-center text-black font-bold text-sm shadow-[0_0_20px_rgba(0,255,65,0.6)]">
            ∞
          </div>
          <span className="text-neon-green drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]">ut∞pia</span>
        </Link>
      </motion.div>

      {/* Texto com animação de digitação */}
      <div className="max-w-2xl text-center mb-12">
        <h1 className="text-2xl md:text-4xl font-light text-white leading-relaxed">
          {displayText}
          <span
            className={`inline-block w-[3px] h-[1em] bg-neon-green ml-1 align-middle transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"
              }`}
          />
        </h1>
      </div>

      {/* Botão Responder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Button
          onClick={onStart}
          className="relative rounded-full h-14 px-10 text-base group bg-neon-green text-black hover:bg-neon-green-light font-medium border-0 shadow-[0_0_30px_rgba(0,255,65,0.5)] transition-all duration-300 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles className="size-5" />
            Responder
          </span>
        </Button>
      </motion.div>
    </motion.div>
  )
}

// Tipos para validação de CNPJ
interface CNPJValidation {
  status: "idle" | "loading" | "valid" | "invalid"
  companyName?: string
  error?: string
}

// Componente Principal do Quiz
function Quiz({ onComplete }: { onComplete: (data: Record<string, string>) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [direction, setDirection] = useState(0)
  const [cnpjValidation, setCnpjValidation] = useState<CNPJValidation>({ status: "idle" })

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length

  // Validar CNPJ quando tiver 14 dígitos
  useEffect(() => {
    const cnpjValue = answers.companyCNPJ || ""
    const cnpjNumbers = cnpjValue.replace(/\D/g, "")

    // Reset se não tiver CNPJ ou for menor que 14 dígitos
    if (cnpjNumbers.length < 14) {
      if (cnpjValidation.status !== "idle") {
        setCnpjValidation({ status: "idle" })
      }
      return
    }

    // Validar quando tiver 14 dígitos
    if (cnpjNumbers.length === 14 && cnpjValidation.status !== "loading") {
      const validateCNPJ = async () => {
        setCnpjValidation({ status: "loading" })

        try {
          const response = await fetch(`/api/cnpj?cnpj=${cnpjNumbers}`)
          const data = await response.json()

          if (data.success && data.valid) {
            setCnpjValidation({
              status: "valid",
              companyName: data.company?.nome || data.company?.fantasia || "",
            })
          } else {
            setCnpjValidation({
              status: "invalid",
              error: data.error || "CNPJ não encontrado na base da Receita Federal",
            })
          }
        } catch {
          setCnpjValidation({
            status: "invalid",
            error: "Erro ao validar CNPJ. Tente novamente.",
          })
        }
      }

      validateCNPJ()
    }
  }, [answers.companyCNPJ, cnpjValidation.status])

  // Seções para o indicador de progresso
  const sections = [
    { name: "Você", questions: questions.filter((q) => q.section === "personal").length },
    { name: "Empresa", questions: questions.filter((q) => q.section === "company").length },
    { name: "Necessidades", questions: questions.filter((q) => q.section === "needs").length },
  ]

  const getCurrentSection = () => {
    if (currentQuestion.section === "personal") return 0
    if (currentQuestion.section === "company") return 1
    return 2
  }

  const handleNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setDirection(1)
      setCurrentIndex((prev) => prev + 1)
    } else {
      onComplete(answers)
    }
  }, [currentIndex, totalQuestions, answers, onComplete])

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleAnswer = (value: string) => {
    let formattedValue = value

    // Aplica formatação baseada no ID do campo
    if (currentQuestion.id === "phone") {
      formattedValue = formatPhone(value)
    } else if (currentQuestion.id === "cpf") {
      formattedValue = formatCPF(value)
    } else if (currentQuestion.id === "companyCNPJ") {
      formattedValue = formatCNPJ(value)
    }

    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: formattedValue }))
  }

  const canProceed = () => {
    if (!currentQuestion.required) return true
    return answers[currentQuestion.id]?.trim().length > 0
  }

  // Detectar Enter para avançar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && canProceed() && currentQuestion.type !== "textarea") {
        handleNext()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [canProceed, handleNext, currentQuestion.type])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      {/* Header com Logo e Progresso */}
      <div className="flex flex-col items-center mb-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-8">
          <div className="size-8 rounded-full bg-neon-green flex items-center justify-center text-black font-bold text-xs shadow-[0_0_15px_rgba(0,255,65,0.6)]">
            ∞
          </div>
          <span className="text-neon-green drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]">ut∞pia</span>
        </Link>

        {/* Indicador de Seções */}
        <div className="flex items-center gap-4 mb-4">
          {sections.map((section, idx) => (
            <div key={section.name} className="flex items-center gap-2">
              <motion.div
                className={`flex items-center justify-center size-8 rounded-full border-2 transition-all duration-300 ${idx < getCurrentSection()
                  ? "bg-neon-green border-neon-green text-black"
                  : idx === getCurrentSection()
                    ? "border-neon-green text-neon-green"
                    : "border-white/30 text-white/30"
                  }`}
                animate={{
                  scale: idx === getCurrentSection() ? 1.1 : 1,
                  boxShadow: idx === getCurrentSection() ? "0 0 20px rgba(0,255,65,0.4)" : "none",
                }}
              >
                {idx < getCurrentSection() ? <Check className="size-4" /> : idx + 1}
              </motion.div>
              <span
                className={`hidden sm:block text-sm transition-colors duration-300 ${idx === getCurrentSection() ? "text-neon-green" : "text-white/50"
                  }`}
              >
                {section.name}
              </span>
              {idx < sections.length - 1 && (
                <div
                  className={`w-8 h-0.5 transition-colors duration-300 ${idx < getCurrentSection() ? "bg-neon-green" : "bg-white/20"
                    }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Indicador de Progresso (Círculos) */}
        <div className="flex items-center gap-2">
          {questions.map((_, idx) => (
            <motion.div
              key={idx}
              className={`rounded-full transition-all duration-300 ${idx === currentIndex
                ? "w-8 h-2 bg-neon-green shadow-[0_0_10px_rgba(0,255,65,0.6)]"
                : idx < currentIndex
                  ? "w-2 h-2 bg-neon-green/60"
                  : "w-2 h-2 bg-white/20"
                }`}
              animate={{
                scale: idx === currentIndex ? 1 : 0.9,
              }}
            />
          ))}
        </div>

        {/* Contador */}
        <p className="text-white/50 text-sm mt-4">
          {currentIndex + 1} de {totalQuestions}
        </p>
      </div>

      {/* Área da Pergunta */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-8"
            >
              {/* Pergunta */}
              <motion.h2
                className="text-2xl md:text-3xl font-light text-white text-center leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {currentQuestion.question}
                {currentQuestion.required && <span className="text-neon-green ml-1">*</span>}
              </motion.h2>

              {/* Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {currentQuestion.type === "select" ? (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className={`w-full p-4 rounded-xl border text-left transition-all duration-300 ${answers[currentQuestion.id] === option
                          ? "border-neon-green bg-neon-green/10 text-white"
                          : "border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : currentQuestion.type === "textarea" ? (
                  <textarea
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswer(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-white/30 focus:border-neon-green text-white text-xl placeholder:text-white/30 outline-none transition-colors duration-300 resize-none py-4"
                  />
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type={currentQuestion.type}
                        value={answers[currentQuestion.id] || ""}
                        onChange={(e) => handleAnswer(e.target.value)}
                        placeholder={currentQuestion.placeholder}
                        className={`w-full bg-transparent border-b-2 text-white text-xl md:text-2xl placeholder:text-white/30 outline-none transition-colors duration-300 py-4 text-center ${currentQuestion.id === "companyCNPJ"
                          ? cnpjValidation.status === "valid"
                            ? "border-neon-green"
                            : cnpjValidation.status === "invalid"
                              ? "border-red-500"
                              : "border-white/30 focus:border-neon-green"
                          : "border-white/30 focus:border-neon-green"
                          }`}
                        autoFocus
                      />
                      {/* Indicador de status do CNPJ */}
                      {currentQuestion.id === "companyCNPJ" && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                          {cnpjValidation.status === "loading" && (
                            <Loader2 className="size-6 text-neon-green animate-spin" />
                          )}
                          {cnpjValidation.status === "valid" && (
                            <CheckCircle2 className="size-6 text-neon-green" />
                          )}
                          {cnpjValidation.status === "invalid" && (
                            <AlertCircle className="size-6 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Feedback de validação do CNPJ */}
                    {currentQuestion.id === "companyCNPJ" && (
                      <AnimatePresence mode="wait">
                        {cnpjValidation.status === "loading" && (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center justify-center gap-2 text-white/60 text-sm"
                          >
                            <Loader2 className="size-4 animate-spin" />
                            Validando CNPJ na Receita Federal...
                          </motion.div>
                        )}

                        {cnpjValidation.status === "valid" && (
                          <motion.div
                            key="valid"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 rounded-xl bg-neon-green/10 border border-neon-green/30"
                          >
                            <div className="flex items-center justify-center gap-2 text-neon-green">
                              <Building2 className="size-5" />
                              <span className="font-medium">Empresa encontrada!</span>
                            </div>
                            {cnpjValidation.companyName && (
                              <p className="text-center text-white/80 mt-2 text-sm">
                                {cnpjValidation.companyName}
                              </p>
                            )}
                          </motion.div>
                        )}

                        {cnpjValidation.status === "invalid" && (
                          <motion.div
                            key="invalid"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 rounded-xl bg-red-500/10 border border-red-500/30"
                          >
                            <div className="flex items-center justify-center gap-2 text-red-400">
                              <AlertCircle className="size-5" />
                              <span className="font-medium">CNPJ não encontrado</span>
                            </div>
                            <p className="text-center text-white/60 mt-2 text-sm">
                              {cnpjValidation.error}
                            </p>
                            <p className="text-center text-white/40 mt-3 text-xs">
                              Você pode continuar sem preencher, mas isso pode afetar sua experiência futura com nossos serviços.
                            </p>
                          </motion.div>
                        )}

                        {cnpjValidation.status === "idle" && answers.companyCNPJ && (
                          <motion.p
                            key="hint"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-white/40 text-xs text-center"
                          >
                            Digite os 14 dígitos do CNPJ para validação automática
                          </motion.p>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Dica de tecla Enter */}
              {currentQuestion.type !== "textarea" && currentQuestion.type !== "select" && (
                <motion.p
                  className="text-white/30 text-sm text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Pressione <span className="text-neon-green/60">Enter ↵</span> para continuar
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navegação */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <Button
          variant="ghost"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`rounded-full size-14 p-0 border transition-all duration-300 ${currentIndex === 0
            ? "border-white/10 text-white/20 cursor-not-allowed"
            : "border-white/30 text-white hover:border-neon-green hover:text-neon-green hover:bg-neon-green/10"
            }`}
        >
          <ArrowLeft className="size-6" />
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`rounded-full size-14 p-0 transition-all duration-300 ${canProceed()
            ? "bg-neon-green text-black hover:bg-neon-green-light shadow-[0_0_20px_rgba(0,255,65,0.4)]"
            : "bg-white/10 text-white/30 cursor-not-allowed"
            }`}
        >
          {currentIndex === totalQuestions - 1 ? (
            <Check className="size-6" />
          ) : (
            <ArrowRight className="size-6" />
          )}
        </Button>
      </div>
    </div>
  )
}

// Tela de Conclusão
function CompletionScreen({ data }: { data: Record<string, string> }) {
  const whatsappMessage = encodeURIComponent(
    `Olá! Acabei de preencher o formulário no site.\n\nMeu nome: ${data.name}\nEmpresa: ${data.companyName}\nDesafio principal: ${data.mainChallenge}\n\nGostaria de conversar sobre soluções!`
  )
  const whatsappLink = `https://wa.me/5527981076713?text=${whatsappMessage}`

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Ícone de sucesso */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="size-24 rounded-full bg-neon-green flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(0,255,65,0.6)]"
      >
        <Check className="size-12 text-black" />
      </motion.div>

      {/* Mensagem */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-white mb-4"
      >
        Perfeito, {data.name?.split(" ")[0]}!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-white/70 mb-8 max-w-md"
      >
        Suas respostas foram registradas. Agora estamos mais perto de criar o futuro juntos.
      </motion.p>

      {/* Botões */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          asChild
          className="rounded-full h-14 px-8 bg-neon-green text-black hover:bg-neon-green-light font-medium shadow-[0_0_30px_rgba(0,255,65,0.5)] transition-all duration-300"
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            Falar no WhatsApp
          </a>
        </Button>

        <Button
          asChild
          variant="ghost"
          className="rounded-full h-14 px-8 border border-white/30 text-white hover:border-neon-green hover:text-neon-green hover:bg-neon-green/10 transition-all duration-300"
        >
          <Link href="/">Voltar ao site</Link>
        </Button>
      </motion.div>
    </motion.div>
  )
}

// Função para enviar dados via API Route (protege o webhook URL)
async function submitQuizData(data: Record<string, string>) {
  try {
    const response = await fetch("/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      console.error("Erro no webhook:", response.status, response.statusText)
      return false
    }

    console.log("Sucesso: Dados enviados ao webhook")
    return true
  } catch (error) {
    console.error("Erro no webhook:", error)
    return false
  }
}

// Página Principal
export default function QuizPage() {
  const [stage, setStage] = useState<"intro" | "quiz" | "complete">("intro")
  const [quizData, setQuizData] = useState<Record<string, string>>({})

  const handleStartQuiz = () => {
    setStage("quiz")
  }

  const handleCompleteQuiz = async (data: Record<string, string>) => {
    setQuizData(data)
    setStage("complete")

    // Envia os dados para o webhook via API Route (seguro)
    await submitQuizData(data)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background sutil */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,255,65,0.08) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {stage === "intro" && <TypingAnimation key="intro" onStart={handleStartQuiz} />}
        {stage === "quiz" && <Quiz key="quiz" onComplete={handleCompleteQuiz} />}
        {stage === "complete" && <CompletionScreen key="complete" data={quizData} />}
      </AnimatePresence>
    </div>
  )
}
