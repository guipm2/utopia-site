"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { motion, useScroll, useSpring } from "framer-motion"
import { ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePerformance } from "@/hooks/use-performance"

// Critical components - load immediately
import { LoadingScreen } from "@/components/ui/loading-screen"

// Lazy load heavy components with priority
const CustomCursor = dynamic(
  () => import("@/components/ui/custom-cursor").then(mod => ({ default: mod.CustomCursor })),
  { ssr: false }
)

const AnimatedBackground = dynamic(
  () => import("@/components/ui/animated-background").then(mod => ({ default: mod.AnimatedBackground })),
  { ssr: false }
)

const FloatingElements = dynamic(
  () => import("@/components/ui/floating-elements").then(mod => ({ default: mod.FloatingElements })),
  { ssr: false }
)

const FuturisticHero = dynamic(
  () => import("@/components/ui/futuristic-hero").then(mod => ({ default: mod.FuturisticHero })),
  { 
    ssr: false,
    loading: () => <div className="w-full h-screen bg-black" />
  }
)

const ScrollReveal = dynamic(
  () => import("@/components/ui/scroll-reveal").then(mod => ({ default: mod.ScrollReveal })),
  { ssr: false }
)

const ParallaxSection = dynamic(
  () => import("@/components/ui/parallax-section").then(mod => ({ default: mod.ParallaxSection })),
  { ssr: false }
)

const ProfessionalSolutions = dynamic(
  () => import("@/components/ui/professional-solutions").then(mod => ({ default: mod.ProfessionalSolutions })),
  { ssr: false }
)

const NeuralCases = dynamic(
  () => import("@/components/ui/neural-cases").then(mod => ({ default: mod.NeuralCases })),
  { ssr: false }
)

const QuantumFAQ = dynamic(
  () => import("@/components/ui/quantum-faq").then(mod => ({ default: mod.QuantumFAQ })),
  { ssr: false }
)

const QuantumCTA = dynamic(
  () => import("@/components/ui/quantum-cta").then(mod => ({ default: mod.QuantumCTA })),
  { ssr: false }
)

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const performance = usePerformance()

  // Smooth spring animation for scroll-based effects
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <LoadingScreen />
      
      {/* Only render expensive visual effects on capable devices */}
      {!performance.isLowEnd && !performance.prefersReducedMotion && <CustomCursor />}
      {!performance.isLowEnd && <AnimatedBackground />}
      {!performance.isLowEnd && !performance.prefersReducedMotion && <FloatingElements />}

      <div className="flex min-h-[100dvh] flex-col bg-black text-white relative">
        <div className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4">
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
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
              opacity: { duration: 0.6, delay: 0.2 },
              scale: { duration: 0.6, delay: 0.3 },
              filter: { duration: 0.5, delay: 0.4 },
            }}
            className="w-full max-w-[calc(100vw-2rem)] md:max-w-4xl"
          >
            <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className={`relative backdrop-blur-3xl transition-all duration-700 rounded-full border ${
              isScrolled
                ? "bg-black/80 border-neon-green/60 shadow-2xl shadow-neon-green/20"
                : "bg-black/60 border-neon-green/40 shadow-lg shadow-neon-green/10"
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
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`absolute inset-0 rounded-full transition-all duration-700 ${
                isScrolled
                  ? "bg-gradient-to-r from-neon-green/10 via-transparent to-neon-green/10"
                  : "bg-gradient-to-r from-neon-green/5 via-transparent to-neon-green/5"
              }`}
              style={{
                background: `linear-gradient(135deg, 
                  rgba(0,255,65,0.1) 0%, 
                  rgba(0,255,65,0.05) 25%, 
                  transparent 50%, 
                  rgba(0,255,65,0.05) 75%, 
                  rgba(0,255,65,0.1) 100%)`,
              }}
            />

            {/* Inner glass effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute inset-[1px] rounded-full"
              style={{
                background: `linear-gradient(145deg, 
                  rgba(0,255,65,0.08) 0%, 
                  rgba(0,255,65,0.02) 50%, 
                  rgba(0,255,65,0.08) 100%)`,
              }}
            />

            <div className="relative flex h-14 md:h-16 items-center justify-center md:justify-between px-2 md:px-8 gap-3 md:gap-4 safe-left safe-right safe-top w-full">
              <motion.div
                className="flex items-center gap-1.5 md:gap-3 font-bold text-sm md:text-lg flex-shrink-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="size-5 md:size-8 rounded-full bg-neon-green flex items-center justify-center text-black font-bold text-[10px] md:text-sm shadow-[0_0_15px_rgba(0,255,65,0.6)]"
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 2.7, type: "spring", stiffness: 200 }}
                  whileHover={{ rotate: 360 }}
                >
                  ∞
                </motion.div>
                <span className="text-neon-green drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]">ut∞pia</span>
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
                      delay: 2.7 + i * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                      <Link
                        href={item.href}
                        className="text-sm font-medium text-gray-300 transition-all duration-300 hover:text-neon-green hover:bg-neon-green/10 px-3 py-2 rounded-full relative group backdrop-blur-sm"
                      >
                        {item.label}
                        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-neon-green transition-all duration-300 group-hover:w-4 rounded-full shadow-[0_0_8px_rgba(0,255,65,0.6)]" />
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="hidden md:flex gap-3 items-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 3.1 }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 3.5, type: "spring" }}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-green/30 via-neon-green/50 to-neon-green/30 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
                  <Button asChild className="relative rounded-full bg-neon-green text-black hover:bg-neon-green-light group font-medium h-9 px-6 text-sm shadow-[0_0_20px_rgba(0,255,65,0.4)] backdrop-blur-sm border border-neon-green/30 transition-all duration-300 overflow-hidden">
                    <a href="https://wa.me/5527981076713?text=Oi!%20Visitei%20o%20site%20de%20voc%C3%AAs%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es." target="_blank" rel="noopener noreferrer">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                      <span className="relative z-10">Explorar</span>
                      <ChevronRight className="ml-1 size-3 transition-transform group-hover:translate-x-1 relative z-10" />
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden flex-shrink-0 absolute right-2 md:relative md:right-auto">
                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 3.5, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-neon-green size-8 hover:bg-neon-green/10 rounded-full flex-shrink-0"
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
                className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl overflow-hidden border border-neon-green/40 shadow-[0_0_30px_rgba(0,255,65,0.2)]"
                style={{
                  background: "rgba(0,0,0,0.8)",
                  backdropFilter: "blur(60px) saturate(200%)",
                  WebkitBackdropFilter: "blur(60px) saturate(200%)",
                }}
              >
                {/* Glass effect for mobile menu */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(145deg, 
                      rgba(0,255,65,0.1) 0%, 
                      rgba(0,255,65,0.02) 50%, 
                      rgba(0,255,65,0.1) 100%)`,
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
                        className="px-6 py-3 text-sm font-medium text-gray-300 hover:text-neon-green hover:bg-neon-green/10 transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  <div className="px-6 pt-2 border-t border-neon-green/20 mt-2">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-green/30 via-neon-green/50 to-neon-green/30 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
                      <Button asChild className="relative w-full rounded-full bg-neon-green text-black hover:bg-neon-green-light mt-2 h-9 shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all duration-300 overflow-hidden group">
                        <a href="https://wa.me/5527981076713?text=Oi!%20Visitei%20o%20site%20de%20voc%C3%AAs%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es." target="_blank" rel="noopener noreferrer">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                          <span className="relative z-10">Explorar</span>
                          <ChevronRight className="ml-1 size-3 relative z-10" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
          </motion.header>
        </div>

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

        <footer className="w-full border-t border-white/10 relative safe-bottom">
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
