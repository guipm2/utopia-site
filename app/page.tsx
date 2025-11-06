"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useSpring } from "framer-motion"
import { ChevronRight, Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { ParallaxSection } from "@/components/ui/parallax-section"
import { FloatingElements } from "@/components/ui/floating-elements"
import { ProfessionalSolutions } from "@/components/ui/professional-solutions"
import { FuturisticHero } from "@/components/ui/futuristic-hero"
import { NeuralCases } from "@/components/ui/neural-cases"
import { QuantumFAQ } from "@/components/ui/quantum-faq"
import { QuantumCTA } from "@/components/ui/quantum-cta"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()

  // Smooth spring animation for scroll-based effects
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <AnimatedBackground />
      <FloatingElements />

      <div className="flex min-h-[100dvh] flex-col bg-black text-white relative">
        <motion.header
          initial={{
            y: -120,
            opacity: 0,
            scale: 0.8,
            filter: "blur(10px)",
          }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
            opacity: { duration: 0.6, delay: 1.2 },
            scale: { duration: 0.6, delay: 1.3 },
            filter: { duration: 0.5, delay: 1.4 },
          }}
          className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className={`relative backdrop-blur-3xl transition-all duration-700 rounded-full border ${
              isScrolled
                ? "bg-black/60 border-white/50 shadow-2xl shadow-black/50"
                : "bg-black/50 border-white/40 shadow-lg shadow-black/25"
            }`}
            style={{
              backdropFilter: "blur(60px) saturate(200%)",
              WebkitBackdropFilter: "blur(60px) saturate(200%)",
            }}
          >
            {/* Glass refraction effect - outer glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className={`absolute inset-0 rounded-full transition-all duration-700 ${
                isScrolled
                  ? "bg-gradient-to-r from-white/10 via-transparent to-white/10"
                  : "bg-gradient-to-r from-white/5 via-transparent to-white/5"
              }`}
              style={{
                background: `linear-gradient(135deg, 
                  rgba(255,255,255,0.1) 0%, 
                  rgba(255,255,255,0.05) 25%, 
                  transparent 50%, 
                  rgba(255,255,255,0.05) 75%, 
                  rgba(255,255,255,0.1) 100%)`,
              }}
            />

            {/* Inner glass effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.7 }}
              className="absolute inset-[1px] rounded-full"
              style={{
                background: `linear-gradient(145deg, 
                  rgba(255,255,255,0.08) 0%, 
                  rgba(255,255,255,0.02) 50%, 
                  rgba(255,255,255,0.08) 100%)`,
              }}
            />

            <div className="relative flex h-16 items-center justify-between px-8 min-w-[600px] max-w-4xl">
              <motion.div
                className="flex items-center gap-3 font-bold text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 5.0 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="size-8 rounded-full bg-gradient-to-br from-white to-gray-300 flex items-center justify-center text-black font-bold text-sm shadow-lg"
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 5.2, type: "spring", stiffness: 200 }}
                  whileHover={{ rotate: 360 }}
                >
                  ∞
                </motion.div>
                <span className="text-white drop-shadow-sm">ut∞pia</span>
              </motion.div>

              <nav className="hidden md:flex gap-8">
                {[
                  { label: "A Utopia", href: "#utopia" },
                  { label: "Soluções", href: "#solutions" },
                  { label: "Cases", href: "#cases" },
                  { label: "FAQ", href: "#faq" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 5.2 + i * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                      <Link
                        href={item.href}
                        className="text-sm font-medium text-white/80 transition-all duration-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-full relative group backdrop-blur-sm"
                      >
                        {item.label}
                        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-4 rounded-full" />
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="hidden md:flex gap-3 items-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 5.6 }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 5.8, type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="rounded-full text-white hover:bg-white/10 size-9 backdrop-blur-sm"
                  >
                    {mounted && theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 6.0, type: "spring" }}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 via-white/40 to-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
                  <Button className="relative rounded-full bg-gradient-to-r from-gray-200 to-white text-black hover:from-white hover:to-white group font-medium h-9 px-6 text-sm shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                    <span className="relative z-10">Explorar</span>
                    <ChevronRight className="ml-1 size-3 transition-transform group-hover:translate-x-1 relative z-10" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Mobile menu button */}
              <div className="flex items-center gap-3 md:hidden">
                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 5.8, type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="rounded-full text-white size-9 hover:bg-white/10"
                  >
                    {mounted && theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 6.0, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-white size-9 hover:bg-white/10 rounded-full"
                  >
                    {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="md:hidden absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden border border-white/20"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(60px) saturate(200%)",
                  WebkitBackdropFilter: "blur(60px) saturate(200%)",
                }}
              >
                {/* Glass effect for mobile menu */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(145deg, 
                      rgba(255,255,255,0.1) 0%, 
                      rgba(255,255,255,0.02) 50%, 
                      rgba(255,255,255,0.1) 100%)`,
                  }}
                />

                <div className="relative py-4 flex flex-col">
                  {[
                    { label: "A Utopia", href: "#utopia" },
                    { label: "Soluções", href: "#solutions" },
                    { label: "Cases", href: "#cases" },
                    { label: "FAQ", href: "#faq" },
                  ].map((item) => (
                    <motion.div key={item.label} whileHover={{ x: 10 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={item.href}
                        className="px-6 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  <div className="px-6 pt-2 border-t border-white/10 mt-2">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 via-white/40 to-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
                      <Button className="relative w-full rounded-full bg-gradient-to-r from-gray-200 to-white text-black hover:from-white hover:to-white mt-2 h-9 shadow-lg transition-all duration-300 overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                        <span className="relative z-10">Explorar</span>
                        <ChevronRight className="ml-1 size-3 relative z-10" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.header>

        <main className="flex-1 relative">
          {/* Futuristic Hero Section */}
          <FuturisticHero />

          {/* Professional Solutions Section */}
          <ParallaxSection offset={100}>
            <ProfessionalSolutions />
          </ParallaxSection>

          {/* Neural Cases Section */}
          <ParallaxSection offset={150}>
            <NeuralCases />
          </ParallaxSection>

          {/* Quantum FAQ Section */}
          <QuantumFAQ />

          {/* Quantum CTA Section */}
          <ParallaxSection offset={200}>
            <QuantumCTA />
          </ParallaxSection>
        </main>

        <footer className="w-full border-t border-white/10 relative">
          {/* Quantum Glass background */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
            }}
          />

          <div className="container flex flex-col gap-8 px-4 py-16 md:px-6 relative">
            <ScrollReveal>
              <motion.div className="flex items-center gap-3 font-bold text-2xl" whileHover={{ scale: 1.05 }}>
                <motion.div
                  className="size-12 rounded-full flex items-center justify-center text-black font-bold backdrop-blur-sm border border-white/20"
                  style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))",
                    backdropFilter: "blur(10px)",
                  }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  ∞
                </motion.div>
                <span className="text-white">ut∞pia</span>
              </motion.div>
              <p className="text-gray-400 mt-4 max-w-md leading-relaxed">
                Transcendendo realidades através da consciência artificial. Criamos futuros que redefinem
                possibilidades.
              </p>
            </ScrollReveal>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 mt-8">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Soluções Quânticas</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#solutions" className="text-gray-400 hover:text-white transition-colors">
                        Consciência Conversacional
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#solutions" className="text-gray-400 hover:text-white transition-colors">
                        Automação Neural
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#solutions" className="text-gray-400 hover:text-white transition-colors">
                        Precognição Empresarial
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#solutions" className="text-gray-400 hover:text-white transition-colors">
                        Processamento Dimensional
                      </Link>
                    </motion.div>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Recursos Neurais</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        Documentação Quântica
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#cases" className="text-gray-400 hover:text-white transition-colors">
                        Realidades Transformadas
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        Consciência Blog
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        Suporte Dimensional
                      </Link>
                    </motion.div>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Entidade</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#utopia" className="text-gray-400 hover:text-white transition-colors">
                        Origem da Utopia
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        Evolução Consciente
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        Privacidade Quântica
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        Termos Dimensionais
                      </Link>
                    </motion.div>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Conexão Neural</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        Interface Consciente
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        Suporte Quântico
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        Parcerias Evolutivas
                      </Link>
                    </motion.div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-white/10 pt-8">
              <p className="text-xs text-gray-500">
                &copy; {new Date().getFullYear()} ut∞pia. Transcendendo realidades desde o início dos tempos.
              </p>
              <motion.div className="flex items-center gap-2 text-xs text-gray-500" whileHover={{ scale: 1.05 }}>
                <span>Powered by Quantum Consciousness</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  ∞
                </motion.div>
              </motion.div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
