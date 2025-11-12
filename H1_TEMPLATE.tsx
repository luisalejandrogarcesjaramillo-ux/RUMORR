/**
 * H1 Reference: How to Replace the Placeholder with Your GLB Model
 * 
 * This is a template showing the exact code to update Scene.tsx
 */

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, useGLTF } from '@react-three/drei'

/**
 * Step 1: Import useGLTF
 * This loads your GLB/GLTF model from public/models/glb/
 */

interface GLTFModelProps {
  modelUrl: string
}

/**
 * Step 2: Create component to load your model
 * Replace the placeholder function with this
 */
function YourModel({ modelUrl }: GLTFModelProps) {
  const { scene } = useGLTF(modelUrl)
  
  return (
    <primitive 
      object={scene} 
      scale={[2, 2, 2]}          // Adjust this if model is too small/large
      position={[0, 0, 0]}       // Adjust if model is off-center
      rotation={[0, 0, 0]}       // Adjust if model is rotated wrong
    />
  )
}

/**
 * Step 3: Update the main Scene component
 * This is what your complete Scene.tsx should look like
 */

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color={'#0088ff'} />
    </>
  )
}

export default function Scene() {
  return (
    <div style={{ height: '70vh', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Lights />
        <Suspense fallback={<Html center>Loading 3D...</Html>}>
          {/* 
            IMPORTANT: Replace '/models/glb/your_model.glb' 
            with your actual file path
            Example: '/models/glb/epic_object.glb'
          */}
          <YourModel modelUrl="/models/glb/your_model.glb" />
        </Suspense>
        <OrbitControls 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  )
}

/**
 * IMPLEMENTATION STEPS:
 * 
 * 1. Save your GLB file to:
 *    c:\Users\assi\Desktop\RUMORR\public\models\glb\your_model.glb
 * 
 * 2. Copy the entire Scene function above
 * 
 * 3. Replace the entire content of components/Scene.tsx with it
 * 
 * 4. Update '/models/glb/your_model.glb' to match your filename
 * 
 * 5. Save and reload http://localhost:3000
 * 
 * 6. If model is too small: increase scale to [3, 3, 3] or [5, 5, 5]
 * 
 * 7. If model is upside down: add rotation={[Math.PI / 2, 0, 0]}
 * 
 * 8. If model is off-center: adjust position={[x, y, z]}
 * 
 * SUCCESS CRITERIA:
 * ✅ Model renders on screen
 * ✅ Model rotates with mouse
 * ✅ No console errors
 * ✅ FPS > 50
 */

/**
 * DEBUGGING TIPS:
 * 
 * - Check browser console (F12) for import/parse errors
 * - If "Cannot find module" error: file path is wrong (check spelling, case)
 * - If model doesn't appear: scale might be too small (try scale={[5, 5, 5]})
 * - If model is black: lighting might be wrong (add more lights)
 * - If FPS drops: model might be too heavy (compress with DRACO in H7)
 */
