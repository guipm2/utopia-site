"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showExit, setShowExit] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        let increment = 0
        if (prev < 30) increment = Math.random() * 8 + 2
        else if (prev < 70) increment = Math.random() * 4 + 1
        else if (prev < 100) increment = Math.random() * 3 + 0.5

        const next = Math.min(prev + increment, 100)

        if (next === 100) {
          setShowExit(true)
          setTimeout(() => setIsComplete(true), 800)
          clearInterval(timer)
        }

        return next
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
        >
          <div className="relative flex flex-col items-center gap-4">
            {/* Logo */}
            <motion.div
              className="text-white text-2xl font-bold tracking-widest"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: showExit ? 1.05 : 1,
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              ut∞pia
            </motion.div>

            {/* Subtitle */}
            <motion.div
              className="text-white/60 text-xs tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: showExit ? 0 : 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              carregando
            </motion.div>

            {/* Progress bar container */}
            <motion.div
              className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 256, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Progress fill */}
              <motion.div
                className="h-full bg-gradient-to-r from-white via-white to-white/80 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute right-0 top-0 h-full w-6 bg-white/40 blur-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>

            {/* Progress number */}
            <motion.div
              className="text-white text-xs font-mono tracking-widest"
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: showExit ? 0 : 1,
                y: 0,
                scale: showExit ? 1.05 : 1,
              }}
              transition={{ opacity: { duration: 0.5, delay: 0.7 }, y: { duration: 0.5, delay: 0.7 } }}
            >
              {Math.floor(progress).toString().padStart(3, "0")}%
            </motion.div>

            {/* Loading dots */}
            <motion.div
              className="flex gap-1 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: showExit ? 0 : 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-white/60 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>

            {/* Completion message */}
            <AnimatePresence>
              {showExit && (
                <motion.div
                  className="text-white/70 text-xs tracking-widest mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6 }}
                >
                  Bem-vindo ao futuro
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
