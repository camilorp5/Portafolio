"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

// ==========================================
// INTERFACES & COMPATIBILIDAD
// ==========================================

export interface SphereItem {
  id: string | number;
  image: string;       // Compatible con la versión anterior
  src?: string;        // Compatibilidad con prop src alternativa
  alt?: string;
  title: string;
  description: string;
  size?: number;
}

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface SphericalPosition {
  theta: number;  // Ángulo azimutal
  phi: number;    // Ángulo polar
  radius: number; // Distancia al centro
}

export interface WorldPosition extends Position3D {
  scale: number;
  zIndex: number;
  isVisible: boolean;
  fadeOpacity: number;
  originalIndex: number;
}

export interface SphereImageGridProps {
  items?: SphereItem[];         // Propiedad utilizada en tu page.tsx
  images?: SphereItem[];        // Alias retrocompatible
  containerSize?: number;
  sphereRadius?: number;
  radius?: number;              // Acepta la prop `radius` anterior
  dragSensitivity?: number;
  momentumDecay?: number;
  maxRotationSpeed?: number;
  baseImageScale?: number;
  hoverScale?: number;
  perspective?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
}

interface RotationState {
  x: number;
  y: number;
  z: number;
}

interface VelocityState {
  x: number;
  y: number;
}

interface MousePosition {
  x: number;
  y: number;
}

// ==========================================
// UTILIDADES MATEMÁTICAS 3D
// ==========================================

const SPHERE_MATH = {
  degreesToRadians: (degrees: number): number => degrees * (Math.PI / 180),
  normalizeAngle: (angle: number): number => {
    let a = angle;
    while (a > 180) a -= 360;
    while (a < -180) a += 360;
    return a;
  }
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function SphereImageGrid({
  items,
  images,
  containerSize = 600,
  sphereRadius,
  radius,
  dragSensitivity = 0.5,
  momentumDecay = 0.95,
  maxRotationSpeed = 5,
  baseImageScale = 0.08,
  perspective = 1000,
  autoRotate = true,
  autoRotateSpeed = 0.2,
  className = ''
}: SphereImageGridProps) {

  // Unificar fuente de elementos
  const itemList = items || images || [];
  
  // Calcular el radio de la esfera dinámicamente si viene la prop antigua `radius`
  const actualSphereRadius = sphereRadius || (radius ? radius * 35 : containerSize * 0.38);
  const baseImageSize = containerSize * baseImageScale;

  // ==========================================
  // ESTADOS Y REFS
  // ==========================================

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [rotation, setRotation] = useState<RotationState>({ x: 15, y: 15, z: 0 });
  const [velocity, setVelocity] = useState<VelocityState>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<SphereItem | null>(null);
  const [imagePositions, setImagePositions] = useState<SphericalPosition[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  // ==========================================
  // DISTRIBUCIÓN DE FIBONACCI EN LA ESFERA
  // ==========================================

  const generateSpherePositions = useCallback((): SphericalPosition[] => {
    const positions: SphericalPosition[] = [];
    const count = itemList.length;
    if (count === 0) return positions;

    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = 2 * Math.PI / goldenRatio;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      let phi = inclination * (180 / Math.PI);
      let theta = (azimuth * (180 / Math.PI)) % 360;

      phi = 15 + (phi / 180) * 150; // Distribución equilibrada de polos

      positions.push({
        theta,
        phi,
        radius: actualSphereRadius
      });
    }

    return positions;
  }, [itemList.length, actualSphereRadius]);

  // ==========================================
  // CÁLCULO DE POSICIONES 3D EN EL ESPACIO
  // ==========================================

  const calculateWorldPositions = useCallback((): WorldPosition[] => {
    const positions = imagePositions.map((pos, index) => {
      const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
      const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
      const rotXRad = SPHERE_MATH.degreesToRadians(rotation.x);
      const rotYRad = SPHERE_MATH.degreesToRadians(rotation.y);

      // Posición inicial en la esfera
      let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
      let y = pos.radius * Math.cos(phiRad);
      let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

      // Rotación Eje Y
      const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
      const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      x = x1;
      z = z1;

      // Rotación Eje X
      const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
      const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
      y = y2;
      z = z2;

      const worldPos: Position3D = { x, y, z };

      // Zonas de desvanecimiento
      const fadeZoneStart = -20;
      const fadeZoneEnd = -actualSphereRadius;
      const isVisible = worldPos.z > fadeZoneEnd;

      let fadeOpacity = 1;
      if (worldPos.z <= fadeZoneStart) {
        fadeOpacity = Math.max(0.15, (worldPos.z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd));
      }

      // Escala de profundidad
      const depthScale = (worldPos.z + actualSphereRadius) / (2 * actualSphereRadius);
      const itemCustomSize = itemList[index]?.size || 1.0;
      const scale = Math.max(0.3, (0.4 + depthScale * 0.4) * (itemCustomSize * 0.8));

      return {
        ...worldPos,
        scale,
        zIndex: Math.round(1000 + worldPos.z),
        isVisible,
        fadeOpacity,
        originalIndex: index
      };
    });

    return positions;
  }, [imagePositions, rotation, actualSphereRadius, itemList]);

  const clampRotationSpeed = useCallback((speed: number): number => {
    return Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, speed));
  }, [maxRotationSpeed]);

  // ==========================================
  // INERCIA Y BUCLE DE ANIMACIÓN
  // ==========================================

  const updateMomentum = useCallback(() => {
    if (isDragging) return;

    setVelocity(prev => {
      const newVel = {
        x: prev.x * momentumDecay,
        y: prev.y * momentumDecay
      };

      if (!autoRotate && Math.abs(newVel.x) < 0.01 && Math.abs(newVel.y) < 0.01) {
        return { x: 0, y: 0 };
      }

      return newVel;
    });

    setRotation(prev => {
      let newY = prev.y;

      if (autoRotate && !isDragging) {
        newY += autoRotateSpeed;
      }

      newY += clampRotationSpeed(velocity.y);

      return {
        x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(velocity.x)),
        y: SPHERE_MATH.normalizeAngle(newY),
        z: prev.z
      };
    });
  }, [isDragging, momentumDecay, velocity, clampRotationSpeed, autoRotate, autoRotateSpeed]);

  // ==========================================
  // EVENTOS DEL MOUSE / TOUCH
  // ==========================================

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;

    const rotationDelta = {
      x: -deltaY * dragSensitivity,
      y: deltaX * dragSensitivity
    };

    setRotation(prev => ({
      x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rotationDelta.x)),
      y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotationDelta.y)),
      z: prev.z
    }));

    setVelocity({
      x: clampRotationSpeed(rotationDelta.x),
      y: clampRotationSpeed(rotationDelta.y)
    });

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, [isDragging, dragSensitivity, clampRotationSpeed]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMousePos.current.x;
    const deltaY = touch.clientY - lastMousePos.current.y;

    const rotationDelta = {
      x: -deltaY * dragSensitivity,
      y: deltaX * dragSensitivity
    };

    setRotation(prev => ({
      x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rotationDelta.x)),
      y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotationDelta.y)),
      z: prev.z
    }));

    setVelocity({
      x: clampRotationSpeed(rotationDelta.x),
      y: clampRotationSpeed(rotationDelta.y)
    });

    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, [isDragging, dragSensitivity, clampRotationSpeed]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ==========================================
  // LIFECYCLE & EFFECT HOOKS
  // ==========================================

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setImagePositions(generateSpherePositions());
  }, [generateSpherePositions]);

  useEffect(() => {
    const animate = () => {
      updateMomentum();
      animationFrame.current = requestAnimationFrame(animate);
    };

    if (isMounted) {
      animationFrame.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isMounted, updateMomentum]);

  useEffect(() => {
    if (!isMounted) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMounted, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // ==========================================
  // RENDERIZADO DE ELEMENTOS
  // ==========================================

  const worldPositions = calculateWorldPositions();

  const renderItemNode = useCallback((item: SphereItem, index: number) => {
    const position = worldPositions[index];

    if (!position || !position.isVisible) return null;

    const itemSize = baseImageSize * position.scale;
    const isHovered = hoveredIndex === index;
    const finalScale = isHovered ? 1.25 : 1;
    const imgSrc = item.image || item.src || '';

    return (
      <div
        key={item.id}
        className="absolute cursor-pointer select-none transition-transform duration-200 ease-out"
        style={{
          width: `${itemSize}px`,
          height: `${itemSize}px`,
          left: `${containerSize / 2 + position.x}px`,
          top: `${containerSize / 2 + position.y}px`,
          opacity: position.fadeOpacity,
          transform: `translate(-50%, -50%) scale(${finalScale})`,
          zIndex: position.zIndex
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedItem(item);
        }}
      >
        <div className={`relative w-full h-full rounded-full overflow-hidden transition-all duration-300 ${
          isHovered ? 'ring-4 ring-blue-400 shadow-2xl' : 'shadow-md ring-1 ring-slate-200/50'
        }`}>
          <img
            src={imgSrc}
            alt={item.title || 'Habilidad'}
            className="w-full h-full object-cover pointer-events-none select-none bg-white"
            draggable={false}
            loading={index < 5 ? 'eager' : 'lazy'}
          />
        </div>
      </div>
    );
  }, [worldPositions, baseImageSize, containerSize, hoveredIndex]);

  // Renderizado del Modal con Portal hacia document.body
  const renderSpotlightModal = () => {
    if (!selectedItem || !isMounted) return null;

    const modalContent = (
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
        onClick={() => setSelectedItem(null)}
      >
        <div
          className="relative w-full max-w-sm rounded-3xl bg-white overflow-hidden shadow-2xl border border-slate-100 animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/80"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative h-64 w-full bg-slate-100 flex items-center justify-center p-6">
            <img
              src={selectedItem.image || selectedItem.src}
              alt={selectedItem.title}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-slate-900">{selectedItem.title}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{selectedItem.description}</p>
          </div>
        </div>
      </div>
    );

    return createPortal(modalContent, document.body);
  };

  if (!isMounted) {
    return (
      <div
        className="mx-auto rounded-3xl bg-slate-100/50 animate-pulse flex items-center justify-center"
        style={{ width: '100%', maxWidth: containerSize, height: containerSize }}
      >
        <div className="text-slate-400 font-medium">Cargando habilidades...</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.25s ease-out forwards; }
      `}</style>

      <div className="relative mx-auto w-full flex items-center justify-center" style={{ maxWidth: containerSize }}>
        {/* Resplandor decorativo de fondo */}
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-cyan-400/15 blur-2xl pointer-events-none" />

        <div
          ref={containerRef}
          className={`relative select-none cursor-grab active:cursor-grabbing ${className}`}
          style={{
            width: containerSize,
            height: containerSize,
            perspective: `${perspective}px`
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="relative w-full h-full">
            {itemList.map((item, index) => renderItemNode(item, index))}
          </div>
        </div>
      </div>

      {renderSpotlightModal()}
    </>
  );
}