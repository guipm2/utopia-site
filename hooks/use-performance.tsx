'use client'

import { useState, useEffect } from 'react'

interface PerformanceLevel {
  tier: 'low' | 'medium' | 'high'
  prefersReducedMotion: boolean
  isLowEnd: boolean
  isMobile: boolean
}

export function usePerformance(): PerformanceLevel {
  const [performance, setPerformance] = useState<PerformanceLevel>({
    tier: 'medium',
    prefersReducedMotion: false,
    isLowEnd: false,
    isMobile: false,
  })

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Check if mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768

    // Detect hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 2

    // Detect memory (if available)
    const memory = (navigator as any).deviceMemory || 4

    // Detect connection speed
    const connection = (navigator as any).connection
    const effectiveType = connection?.effectiveType || '4g'
    const saveData = connection?.saveData || false

    // Performance tier logic
    let tier: 'low' | 'medium' | 'high' = 'medium'
    let isLowEnd = false

    if (
      saveData || 
      cores < 4 || 
      memory < 4 || 
      effectiveType === 'slow-2g' || 
      effectiveType === '2g' ||
      (isMobile && (cores < 6 || memory < 3))
    ) {
      tier = 'low'
      isLowEnd = true
    } else if (cores >= 8 && memory >= 8 && !isMobile) {
      tier = 'high'
    }

    setPerformance({
      tier,
      prefersReducedMotion,
      isLowEnd,
      isMobile,
    })
  }, [])

  return performance
}
