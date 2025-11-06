'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import { InfinitySymbol } from './infinity-symbol'
import { ErrorBoundary } from '@/components/error-boundary'

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
  return (
    <div className="absolute inset-0 -z-10">
      <ErrorBoundary>
        <Canvas>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}
