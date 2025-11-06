'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import { InfinitySymbol } from './infinity-symbol'
import { SimpleInfinityBackground } from './simple-infinity-background'
import { ErrorBoundary } from '@/components/error-boundary'
import { usePerformance } from '@/hooks/use-performance'

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      
      {/* Minimal lighting */}
      <ambientLight intensity={0.6} />
      
      {/* 3D Elements */}
      <InfinitySymbol />
    </>
  )
}

export function HeroScene() {
  const performance = usePerformance()
  
  // Use simple 2D version on low-end devices or mobile
  if (performance.isLowEnd || performance.isMobile) {
    return <SimpleInfinityBackground />
  }

  return (
    <div className="absolute inset-0 -z-10">
      <ErrorBoundary fallback={<SimpleInfinityBackground />}>
        <Canvas>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}
