import React, { Suspense, useRef, useEffect, useMemo, useCallback } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Color, MeshStandardMaterial, Group, Box3, Vector3 } from 'three';
import { useExperienceState, useExperienceDispatch } from '@/hooks/useExperienceState';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useProximitySensor } from '@/hooks/useProximitySensor';

interface DynamicModelProps {
  onInteraction?: () => void;
}

export function DynamicModel({ onInteraction }: DynamicModelProps) {
  const currentProject = useExperienceState((state) => state.currentProject);
  const emissiveColor = useExperienceState(
    (state) => state.currentProject?.emissiveColor ?? '#ffffff'
  );
  const { dispatch } = useExperienceDispatch();
  const { trackEvent } = useAnalytics();
  const gltf = useGLTF(`/models/glb/${(currentProject?.id ?? 'toro').toUpperCase()}.glb`);
  const groupRef = useRef<Group>(null);
  const { isNear, isTouching } = useProximitySensor(groupRef, 2.5);

  // 1) Encontrar y memorizar materiales una sola vez al cargar el modelo
  const materialsToAnimate = useMemo(() => {
    const mats: MeshStandardMaterial[] = [];
    if (!gltf?.scene) return mats;
    gltf.scene.traverse((child: any) => {
      if (child.isMesh && child.material instanceof MeshStandardMaterial) {
        // Clonar material para evitar shared-material side-effects (opcional según flujo)
        // child.material = child.material.clone();
        mats.push(child.material as MeshStandardMaterial);
      }
    });
    return mats;
  }, [gltf]);

  // 2) Track de hover vía proximidad (no dependemos de onPointerEnter/Leave)
  const hasTrackedHover = useRef(false);
  useEffect(() => {
    if (isNear && !hasTrackedHover.current) {
      trackEvent('model_hover_enter');
      hasTrackedHover.current = true;
    } else if (!isNear && hasTrackedHover.current) {
      trackEvent('model_hover_leave');
      hasTrackedHover.current = false;
    }
  }, [isNear, trackEvent]);

  useEffect(() => {
    if (!gltf.scene) return;
    // --- MAGIA DEL OBJETO: AUTO-ESCALA Y CENTRADO ---
    const box = new Box3().setFromObject(gltf.scene);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = (1 / maxDim) * 2.5; // Ajusta este valor para el tamaño deseado

    if (groupRef.current) {
      groupRef.current.position.copy(center).negate().multiplyScalar(scale);
      groupRef.current.scale.setScalar(scale);
    }
  }, [gltf.scene]);

  const handleClick = useCallback(() => {
    trackEvent('model_click');
    dispatch({ type: 'INCREMENT_CLICK' });
    onInteraction?.();
  }, [onInteraction, trackEvent, dispatch]);

  // 3) Actualización por frame: solo actualizar materiales en memoria
  useFrame((frameState) => {
    if (materialsToAnimate.length === 0) return;

    const pulseFreq = isNear ? 1.2 : 0.4;
    const pulse = Math.sin(frameState.clock.elapsedTime * pulseFreq) * 0.5 + 0.5;
    const baseColor = new Color(emissiveColor);

    for (const mat of materialsToAnimate) {
      if (isTouching) {
        mat.emissive.setHex(0xff6b00);
        mat.emissiveIntensity = 1.0;
      } else if (isNear) {
        mat.emissive.copy(baseColor);
        mat.emissiveIntensity = pulse * 0.4 + 0.1;
      } else {
        mat.emissive.copy(baseColor);
        mat.emissiveIntensity = 0.05;
      }
      // opcional: mat.needsUpdate = true; // normalmente no necesario para emissive
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={handleClick}
      dispose={null}
    >
      <Suspense fallback={null}>
        <primitive object={gltf.scene} />
      </Suspense>
    </group>
  );
}

// Precargar todos los modelos para una transición más rápida
['TORO', 'CRISTAL', 'ONDA', 'ESTRUCTURA'].forEach(id => useGLTF.preload(`/models/glb/${id}.glb`));
