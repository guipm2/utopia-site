"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";
import { usePerformance } from "@/hooks/use-performance";

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<{ x: number; y: number }[]>([]);
  const rafRef = useRef<number>();
  const performance = usePerformance();

  // Adjust particle count based on performance
  const particleCount = useMemo(() => {
    if (performance.prefersReducedMotion) return 0;
    if (performance.isLowEnd) return 5;
    if (performance.tier === 'medium') return 8;
    return 12;
  }, [performance]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Use RAF to throttle updates
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    // Only track mouse on non-low-end devices
    if (!performance.isLowEnd) {
      window.addEventListener("mousemove", updateMousePosition, { passive: true });
    }

    // gera posições iniciais das partículas no client
    if (particleCount > 0) {
      setParticles(
        Array.from({ length: particleCount }).map(() => ({
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
        }))
      );
    }

    return () => {
      if (!performance.isLowEnd) {
        window.removeEventListener("mousemove", updateMousePosition);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [performance.isLowEnd, particleCount]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Only render orbs on capable devices */}
      {!performance.isLowEnd && (
        <>
          {/* orbs */}
          <motion.div
            className="absolute w-96 h-96 rounded-full will-change-transform"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            animate={!performance.prefersReducedMotion ? {
              x: mousePosition.x * 0.02,
              y: mousePosition.y * 0.02,
              scale: [1, 1.2, 1],
            } : {}}
            transition={{
              x: { type: "spring", stiffness: 50, damping: 30 },
              y: { type: "spring", stiffness: 50, damping: 30 },
              scale: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
            initial={{ x: "20%", y: "20%" }}
          />

          <motion.div
            className="absolute w-80 h-80 rounded-full will-change-transform"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={!performance.prefersReducedMotion ? {
              x: -mousePosition.x * 0.01,
              y: -mousePosition.y * 0.01,
              scale: [1.2, 1, 1.2],
            } : {}}
            transition={{
              x: { type: "spring", stiffness: 30, damping: 40 },
              y: { type: "spring", stiffness: 30, damping: 40 },
              scale: {
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
            initial={{ x: "70%", y: "60%" }}
          />
        </>
      )}

      {/* Floating particles - reduced from 20 to 12 */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/10 rounded-full"
          initial={{ x: p.x, y: p.y }}
          animate={{
            y: [p.y, p.y - 20, p.y],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  );
}
