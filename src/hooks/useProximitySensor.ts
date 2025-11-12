import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';

/**
 * Hook que calcula la distancia entre el cursor y un objeto 3D en tiempo real.
 * Proporciona un estado reactivo con la distancia y si el cursor está cerca o "tocando" el objeto.
 */
export function useProximitySensor(meshRef: React.RefObject<THREE.Object3D | null>, threshold = 2.5) {
  const { camera } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);
  const [isNear, setIsNear] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  // Solo recalculamos si pointer cambió: R3F expone state.pointer en useFrame,
  // pero aquí usamos un pequeño guard dentro de useFrame.
  useFrame((state) => {
    const p = state.pointer;
    if (!lastPointer.current || lastPointer.current.x !== p.x || lastPointer.current.y !== p.y) {
      lastPointer.current = { x: p.x, y: p.y };
      if (!meshRef.current) {
        setIsNear(false);
        setIsTouching(false);
        return;
      }
      raycaster.setFromCamera(p, camera);
      const intersects = raycaster.intersectObject(meshRef.current, true);
      if (intersects.length > 0) {
        const dist = intersects[0].distance;
        setIsNear(dist <= threshold);
        setIsTouching(dist <= 0.1); // umbral para "touch"
      } else {
        setIsNear(false);
        setIsTouching(false);
      }
    }
  });

  return { isNear, isTouching };
}