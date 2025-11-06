'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import * as THREE from 'three'
import { useTheme } from 'next-themes'
import { usePerformance } from '@/hooks/use-performance'

export function InfinitySymbol() {
  const meshRef = useRef<Mesh>(null)
  const lightPointRef = useRef<Mesh>(null)
  const { theme } = useTheme()
  const performance = usePerformance()
  
  // Adaptive configuration based on device performance
  const config = useMemo(() => {
    if (performance.prefersReducedMotion) {
      return {
        curvePoints: 50,
        tubeSegments: 50,
        tubeRadius: 0.08,
        radialSegments: 4,
        sphereSegments: 8,
        animationSpeed: 0
      }
    }
    
    if (performance.isLowEnd) {
      return {
        curvePoints: 100,
        tubeSegments: 100,
        tubeRadius: 0.08,
        radialSegments: 6,
        sphereSegments: 8,
        animationSpeed: 0.5
      }
    }
    
    if (performance.tier === 'medium') {
      return {
        curvePoints: 150,
        tubeSegments: 150,
        tubeRadius: 0.08,
        radialSegments: 8,
        sphereSegments: 12,
        animationSpeed: 1
      }
    }
    
    // High-end
    return {
      curvePoints: 200,
      tubeSegments: 200,
      tubeRadius: 0.08,
      radialSegments: 8,
      sphereSegments: 16,
      animationSpeed: 1
    }
  }, [performance])
  
  // Create infinity curve points
  const infinityData = useMemo(() => {
    const points = []
    
    for (let i = 0; i <= config.curvePoints; i++) {
      const t = (i / config.curvePoints) * Math.PI * 2
      const x = Math.cos(t) / (1 + Math.sin(t) * Math.sin(t)) * 2.5
      const y = Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t)) * 2.5
      const z = 0
      
      points.push(new Vector3(x, y, z))
    }
    
    return points
  }, [config.curvePoints])

  // Create tube geometry for the infinity symbol
  const tubeGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(infinityData)
    curve.closed = true
    return new THREE.TubeGeometry(
      curve, 
      config.tubeSegments, 
      config.tubeRadius, 
      config.radialSegments, 
      true
    )
  }, [infinityData, config])

  // Create curve for light point to follow
  const curve = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(infinityData)
    curve.closed = true
    return curve
  }, [infinityData])

  useFrame((state) => {
    if (config.animationSpeed === 0) return
    
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 * config.animationSpeed) * 0.1
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3 * config.animationSpeed) * 0.05
    }
    
    if (lightPointRef.current && curve) {
      // Light point follows the infinity curve
      const t = (state.clock.elapsedTime * 0.2 * config.animationSpeed) % 1
      const position = curve.getPoint(t)
      lightPointRef.current.position.copy(position)
      
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3 * config.animationSpeed) * 0.3
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
        <sphereGeometry args={[0.12, config.sphereSegments, config.sphereSegments]} />
        <meshBasicMaterial 
          color={lightColor}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      
      {/* Subtle glow effect around the light point - only on medium/high-end */}
      {!performance.isLowEnd && (
        <mesh ref={lightPointRef}>
          <sphereGeometry args={[0.25, config.sphereSegments, config.sphereSegments]} />
          <meshBasicMaterial 
            color={lightColor}
            transparent={true}
            opacity={0.2}
          />
        </mesh>
      )}
    </group>
  )
}
