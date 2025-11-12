/**
 * AutoGLB Component
 * 
 * Profesional auto-centering, auto-scaling, auto-rotation for any .glb file.
 * No manual tweaking needed—this component handles:
 * - Centering the pivot point
 * - Uniform scaling to fit [-1,1] bounding box
 * - Optional auto-rotation for presentation
 * 
 * Source: Professional 3D Protocol for React Three Fiber MVP
 */

import { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Box3, Vector3, Mesh } from 'three';
import type { Group } from 'three';

interface AutoGLBProps {
  rotateSpeed?: number; // radians per second (0 = no rotation)
  castShadow?: boolean;
}

export function AutoGLB({ rotateSpeed = 0.5, castShadow = true }: AutoGLBProps) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF('/models/glb/TORO.glb');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!scene) return;

    // Clone scene to avoid mutation of cached gltf
    const clonedScene = scene.clone();

    // Step 1: Compute bounding box
    const box = new Box3().setFromObject(clonedScene);
    const size = new Vector3();
    box.getSize(size);

    // Step 2: Uniform scale to fit in [-1,1]
    // This ensures the model scales proportionally and always fits the viewport
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 2 / maxDim : 1;
    clonedScene.scale.set(scale, scale, scale);

    // Step 3: Center the pivot (subtract center from position)
    const center = new Vector3();
    box.getCenter(center);
    clonedScene.position.sub(center.multiplyScalar(scale));

    // Step 4: Apply shadow casting if needed
    if (castShadow) {
      clonedScene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    // Update ref with cloned, centered, scaled scene
    if (groupRef.current) {
      groupRef.current.clear();
      groupRef.current.add(clonedScene);
    }

    setReady(true);
  }, [scene, castShadow]);

  // Auto-rotation for presentation (optional)
  useFrame((state: any, delta: number) => {
    if (groupRef.current && rotateSpeed > 0) {
      groupRef.current.rotation.y += rotateSpeed * delta;
    }
  });

  return ready ? <group ref={groupRef} /> : null;
}

// Preload the model for faster rendering
useGLTF.preload('/models/glb/TORO.glb');
