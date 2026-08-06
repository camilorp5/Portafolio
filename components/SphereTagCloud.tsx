"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface SphereItem {
  id: number | string;
  image: string;
  title: string;
  description: string;
  size?: number;
}

interface SphereTagCloudProps {
  items: SphereItem[];
  radius?: number;
}

function getSpherePositions(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

function NodeItem({
  item,
  position,
  onClick,
}: {
  item: SphereItem;
  position: THREE.Vector3;
  onClick: (item: SphereItem) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const nodeSize = item.size || 1.2;

  return (
    <Billboard position={position}>
      <Html center transform distanceFactor={12}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClick(item);
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`group relative cursor-pointer rounded-full p-0.5 transition-all duration-300 ${
            hovered ? "scale-125 shadow-2xl ring-2 ring-blue-400" : "scale-100 shadow-md"
          }`}
          style={{
            width: `${nodeSize * 38}px`,
            height: `${nodeSize * 38}px`,
          }}
        >
          {/* Imagen sin borde blanco */}
          <div className="w-full h-full rounded-full overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover pointer-events-none select-none transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
      </Html>
    </Billboard>
  );
}

function RotatingGroup({
  children,
  paused,
}: {
  children: React.ReactNode;
  paused: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current || paused) return;

    groupRef.current.rotation.y += delta * 0.08;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function SphereTagCloud({
  items,
  radius = 5.8, // Aumentado el radio por defecto de la esfera
}: SphereTagCloudProps) {
  const [selectedItem, setSelectedItem] = useState<SphereItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const positions = useMemo(
    () => getSpherePositions(items.length, radius),
    [items, radius]
  );

  return (
    <motion.div
      /* Se aumentó el tamaño de la tarjeta de 420px a 600px */
      className="relative mx-auto w-full max-w-[600px] h-[600px]"
      animate={{
        opacity: selectedItem ? 0 : 1,
        scale: selectedItem ? 0.82 : 1,
        filter: selectedItem ? "blur(8px)" : "blur(0px)",
      }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
    >
      {/* Resplandor gráfico tipo tarjeta detrás del contenedor */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-500/25 via-indigo-500/20 to-cyan-400/25 blur-xl pointer-events-none" />

      {/* Se eliminó 'border border-slate-800' y se usó 'border-0' */}
      <div className="relative w-full h-full rounded-3xl border-0 bg-slate-50 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Canvas 3D */}
        <Canvas
          camera={{ position: [0, 0, 20], fov: 50 }}
          gl={{ alpha: true }}
          style={{
            pointerEvents: selectedItem ? "none" : "auto",
          }}
        >
          <ambientLight intensity={1.5} />

          <RotatingGroup paused={!!selectedItem}>
            {items.map((item, index) => (
              <NodeItem
                key={item.id}
                item={item}
                position={positions[index]}
                onClick={setSelectedItem}
              />
            ))}
          </RotatingGroup>

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            rotateSpeed={0.6}
            zoomSpeed={0.5}
            minDistance={8}
            maxDistance={22}
          />
        </Canvas>
      </div>

      {/* Modal renderizado en document.body mediante Portal */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {selectedItem && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.7,
                    y: 40,
                  }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full max-w-sm rounded-3xl bg-white overflow-hidden shadow-2xl border border-slate-100"
                >
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/80"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="relative h-72 w-full bg-slate-100">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900">
                      {selectedItem.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </motion.div>
  );
}