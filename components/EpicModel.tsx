import { useGLTF } from '@react-three/drei'
import { useRef, useState } from 'react'
import type { Group } from 'three'

interface EpicModelProps {
  modelUrl: string
  scale?: [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
  onHover?: (hovered: boolean) => void
}

export default function EpicModel({
  modelUrl,
  scale = [1, 1, 1],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onHover,
}: EpicModelProps) {
  const { scene } = useGLTF(modelUrl)
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  // Microfeedback: hover glow effect
  const handlePointerEnter = () => {
    setHovered(true)
    onHover?.(true)
    scene.traverse((child: import('three').Object3D) => {
      // runtime check for mesh
      // @ts-ignore
      if (child.isMesh && child.material) {
        // @ts-ignore
        child.material.emissive = child.material.color
        // @ts-ignore
        child.material.emissiveIntensity = 0.2
      }
    })
  }

  const handlePointerLeave = () => {
    setHovered(false)
    onHover?.(false)
    scene.traverse((child: import('three').Object3D) => {
      // @ts-ignore
      if (child.isMesh && child.material) {
        // @ts-ignore
        child.material.emissiveIntensity = 0
      }
    })
  }

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/glb/TORO.glb')
