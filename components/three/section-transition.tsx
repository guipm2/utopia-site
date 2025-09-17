'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useTheme } from 'next-themes'

function MinimalTransition({ trigger }: { trigger: boolean }) {
  const lineRef = useRef<Mesh>(null)
  const { theme } = useTheme()

  useFrame((state) => {
    if (lineRef.current && trigger) {
      const time = state.clock.elapsedTime
      lineRef.current.position.x = Math.sin(time * 1.5) * 0.5
      lineRef.current.scale.x = 1 + Math.sin(time * 2) * 0.2
    }
  })

  const lineColor = theme === 'dark' ? '#ffffff' : '#000000'

  return (
    <mesh ref={lineRef}>
      <planeGeometry args={[10, 0.02, 1, 1]} />
      <meshBasicMaterial 
        color={lineColor}
        transparent={true}
        opacity={0.3}
      />
    </mesh>
  )
}

export function SectionTransition({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none h-20">
      <Canvas>
        <MinimalTransition trigger={isVisible} />
      </Canvas>
    </div>
  )
}
