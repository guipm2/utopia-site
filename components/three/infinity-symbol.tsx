'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3, BufferGeometry, Float32BufferAttribute } from 'three'
import * as THREE from 'three'
import { useTheme } from 'next-themes'

export function InfinitySymbol() {
  const meshRef = useRef<Mesh>(null)
  const lightPointRef = useRef<Mesh>(null)
  const { theme } = useTheme()
  
  // Create infinity curve points
  const infinityData = useMemo(() => {
    const points = []
    const curvePoints = []
    
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * Math.PI * 2
      const x = Math.cos(t) / (1 + Math.sin(t) * Math.sin(t)) * 2.5
      const y = Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t)) * 2.5
      const z = 0
      
      points.push(new Vector3(x, y, z))
      curvePoints.push(x, y, z)
    }
    
    return { points, curvePoints }
  }, [])

  // Create tube geometry for the infinity symbol
  const tubeGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(infinityData.points)
    curve.closed = true
    return new THREE.TubeGeometry(curve, 200, 0.08, 8, true)
  }, [infinityData.points])

  // Create curve for light point to follow
  const curve = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(infinityData.points)
    curve.closed = true
    return curve
  }, [infinityData.points])

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
    
    if (lightPointRef.current && curve) {
      // Light point follows the infinity curve
      const t = (state.clock.elapsedTime * 0.2) % 1
      const position = curve.getPoint(t)
      lightPointRef.current.position.copy(position)
      
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3
      lightPointRef.current.scale.setScalar(scale)
    }
  })

  const symbolColor = theme === 'dark' ? '#ffffff' : '#000000'
  const lightColor = theme === 'dark' ? '#ffffff' : '#000000'

  return (
    <group>
      {/* Main infinity symbol */}
      <mesh ref={meshRef} geometry={tubeGeometry}>
        <meshBasicMaterial 
          color={symbolColor}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
      
      {/* Light point traveling along the curve */}
      <mesh ref={lightPointRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial 
          color={lightColor}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      
      {/* Subtle glow effect around the light point */}
      <mesh ref={lightPointRef}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial 
          color={lightColor}
          transparent={true}
          opacity={0.2}
        />
      </mesh>
    </group>
  )
}
