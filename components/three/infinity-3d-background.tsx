'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import * as THREE from 'three'
import { useTheme } from 'next-themes'
import { useScroll, useTransform } from 'framer-motion'

export function Infinity3DBackground() {
  const meshRef = useRef<Mesh>(null)
  const shadowRef = useRef<Mesh>(null)
  const { theme } = useTheme()
  const { scrollYProgress } = useScroll()
  
  // Parallax transforms - movimento mais lento que o scroll normal
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -2])
  const parallaxRotation = useTransform(scrollYProgress, [0, 1], [0, 0.3])
  
  // Create infinity curve points
  const infinityPoints = useMemo(() => {
    const points = []
    
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * Math.PI * 2
      const x = Math.cos(t) / (1 + Math.sin(t) * Math.sin(t)) * 4
      const y = Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t)) * 4
      const z = 0
      
      points.push(new Vector3(x, y, z))
    }
    
    return points
  }, [])

  // Create tube geometry for the infinity symbol
  const tubeGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(infinityPoints)
    curve.closed = true
    return new THREE.TubeGeometry(curve, 200, 0.18, 16, true)
  }, [infinityPoints])

  // Animation with parallax
  useFrame((state) => {
    if (meshRef.current && shadowRef.current) {
      // Subtle rotation animation
      const baseRotationZ = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      const baseRotationY = Math.sin(state.clock.elapsedTime * 0.15) * 0.05
      
      // Apply parallax rotation
      meshRef.current.rotation.z = baseRotationZ + parallaxRotation.get()
      meshRef.current.rotation.y = baseRotationY
      shadowRef.current.rotation.z = baseRotationZ + parallaxRotation.get()
      shadowRef.current.rotation.y = baseRotationY
      
      // Subtle floating with parallax Y
      const baseY = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.position.y = baseY + parallaxY.get()
      shadowRef.current.position.y = baseY + parallaxY.get() - 0.1
    }
  })

  // Colors based on theme
  const primaryColor = theme === 'dark' ? '#ffffff' : '#000000'
  const shadowColor = theme === 'dark' ? '#666666' : '#cccccc'

  return (
    <group position={[0, 1, -5]}>
      {/* Main infinity symbol */}
      <mesh ref={meshRef} geometry={tubeGeometry}>
        <meshPhongMaterial 
          color={primaryColor}
          shininess={30}
          transparent={true}
          opacity={0.35}
        />
      </mesh>
      
      {/* Shadow/depth layer */}
      <mesh 
        ref={shadowRef}
        geometry={tubeGeometry}
        position={[0.1, -0.1, -0.2]}
        scale={[1.02, 1.02, 1.02]}
      >
        <meshBasicMaterial 
          color={shadowColor}
          transparent={true}
          opacity={0.15}
        />
      </mesh>
      
      {/* Subtle lighting effects */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.3}
        color={primaryColor}
      />
      <directionalLight 
        position={[-5, -5, 2]} 
        intensity={0.2}
        color={shadowColor}
      />
    </group>
  )
}
