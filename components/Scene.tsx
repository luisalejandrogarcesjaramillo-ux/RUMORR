import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Suspense } from 'react'
import EpicModel from './EpicModel'
import { THREE_D_CONFIG } from '../src/config'

/**
 * H2: Cinematic Lighting & Environment
 * 3-Light Schema:
 * - Ambient: Base illumination (no harsh shadows)
 * - Key Light (Directional): Main shadow-casting light
 * - Fill Light (Point): Soft highlight from opposite direction
 * - HDRI Environment: Realistic world reflections & lighting
 * - Contact Shadows: Grounds the object in space
 */

function Lights() {
  return (
    <>
      {/* AMBIENT LIGHT: Soft base illumination */}
      <ambientLight intensity={0.2} />

      {/* KEY LIGHT: Main directional light (sun-like) */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-near={0.1}
      />

      {/* FILL LIGHT: Accent light for visual interest */}
      <pointLight
        position={[-5, -5, -5]}
        intensity={0.5}
        color="#4f46e5"
      />
    </>
  )
}

export default function Scene() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        camera={{
          position: [0, 0, THREE_D_CONFIG.CAMERA_Z_DESKTOP],
          fov: THREE_D_CONFIG.CAMERA_FOV,
        }}
        shadows={{ type: 'PCFSoftShadowMap' }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        {/* LIGHTS SETUP */}
        <Lights />

        {/* ENVIRONMENT: HDRI for cinematic realism */}
        <Suspense fallback={null}>
          <Environment preset="sunset" background={false} />
        </Suspense>

        {/* CONTACT SHADOWS: Grounds the object */}
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={10}
        />

        {/* 3D MODEL */}
        <Suspense fallback={null}>
          <EpicModel
            modelUrl="/models/glb/TORO.glb"
            scale={[1, 1, 1]}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          />
        </Suspense>

        {/* ORBIT CONTROLS */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={THREE_D_CONFIG.ORBIT_CONTROLS_MIN_DISTANCE}
          maxDistance={THREE_D_CONFIG.ORBIT_CONTROLS_MAX_DISTANCE}
        />
      </Canvas>
    </div>
  )
}
