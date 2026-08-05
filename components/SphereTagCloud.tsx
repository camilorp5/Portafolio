"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Estructura de cada elemento/foto
export interface SphereItem {
  id: number | string;
  image: string;
  title: string;
  description: string;
  size?: number; // tamaño del círculo en la esfera
}

interface SphereTagCloudProps {
  items: SphereItem[];
  radius?: number;
}

// Algoritmo de distribución uniforme en una esfera (Fibonacci Sphere Algorithm)
function getSpherePositions(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // Ángulo dorado

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y va de 1 a -1
    const r = Math.sqrt(1 - y * y); // Radio a la altura y
    const theta = phi * i;

    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

// Elemento individual (Foto circular 3D)
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
          className={`group relative cursor-pointer rounded-full p-1 transition-all duration-300 ${
            hovered ? "scale-125 z-50 shadow-2xl ring-4 ring-blue-500/50" : "scale-100 shadow-md"
          }`}
          style={{
            width: `${nodeSize * 45}px`,
            height: `${nodeSize * 45}px`,
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-slate-200">
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

// Grupo que auto-rota suavemente la esfera
function RotatingGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08; // Rotación automática lenta
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function SphereTagCloud({
  items,
  radius = 6,
}: SphereTagCloudProps) {
  const [selectedItem, setSelectedItem] = useState<SphereItem | null>(null);

  const positions = useMemo(
    () => getSpherePositions(items.length, radius),
    [items, radius]
  );

  return (
    <div className="relative w-full h-[600px] md:h-[700px] bg-slate-950 overflow-hidden rounded-3xl">
      {/* Canvas 3D */}
      <Canvas camera={{ position: [0, 0, 14], fov: 50 }}>
        <ambientLight intensity={1.5} />
        
        <RotatingGroup>
          {items.map((item, index) => (
            <NodeItem
              key={item.id}
              item={item}
              position={positions[index]}
              onClick={setSelectedItem}
            />
          ))}
        </RotatingGroup>

        {/* OrbitControls permite arrastrar, rotar en 360° y hacer zoom */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          rotateSpeed={0.6}
          zoomSpeed={0.5}
          minDistance={8}
          maxDistance={22}
        />
      </Canvas>

      {/* Modal / Tarjeta al hacer clic */}
      <AnimatePresence>
        {selectedItem && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm rounded-3xl bg-white overflow-hidden shadow-2xl border border-slate-100"
            >
              {/* Botón Cerrar */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/80"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Imagen de la tarjeta */}
              <div className="relative h-72 w-full bg-slate-100">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Contenido / Texto */}
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
      </AnimatePresence>
    </div>
  );
}