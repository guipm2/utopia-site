'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import { Infinity3DBackground } from './infinity-3d-background'

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <Infinity3DBackground />
    </>
  )
}

export function BackgroundScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas
        style={{ 
          filter: 'blur(1px)',
          background: 'transparent'
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
