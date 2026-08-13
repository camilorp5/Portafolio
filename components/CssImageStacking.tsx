"use client";

import { useState } from "react";
import { ReactLenis } from "lenis/react";
import { X } from "lucide-react";

export interface PublicationItem {
  id: number | string;
  title: string;
  description: string;
  image: string;
  date?: string;
  category?: string;
}

// Puedes cambiar estos datos por tus publicaciones reales
const publicacionesData: PublicationItem[] = [
  {
    id: 1,
    title: "Análisis Predictivo con Python",
    description: "Estudio detallado sobre modelos de Machine Learning aplicados a series temporales y automatización de datos.",
    image: "https://images.unsplash.com/photo-1718969604981-de826f44ce15?w=1200&auto=format&fit=crop",
    category: "Investigación",
  },
  {
    id: 2,
    title: "Automatización de Procesos ETL",
    description: "Implementación de flujos de trabajo optimizados en la nube reduciendo tiempos de procesamiento en un 40%.",
    image: "https://images.unsplash.com/photo-1476180814856-a36609db0493?w=1200&auto=format&fit=crop",
    category: "Ingeniería de Datos",
  },
  {
    id: 3,
    title: "Visualización Interactiva con Dashboards",
    description: "Diseño e implementación de paneles de control ejecutivos con métricas clave para la toma de decisiones.",
    image: "https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=1200&auto=format&fit=crop",
    category: "Business Intelligence",
  },
  {
    id: 4,
    title: "Modelos de Lenguaje Aplicados (LLMs)",
    description: "Integración de arquitecturas RAG para asistentes virtuales inteligentes en entornos corporativos.",
    image: "https://images.unsplash.com/photo-1599054799131-4b09c73a63cf?w=1200&auto=format&fit=crop",
    category: "Inteligencia Artificial",
  },
  {
    id: 5,
    title: "Despliegue de Aplicaciones con Docker",
    description: "Guía práctica para contenedorizar proyectos en entornos de producción escalables.",
    image: "https://images.unsplash.com/photo-1719963532023-01b573d1d584?w=1200&auto=format&fit=crop",
    category: "DevOps",
  },
];

export default function CssImageStacking({ items = publicacionesData }: { items?: PublicationItem[] }) {
  const [selectedItem, setSelectedItem] = useState<PublicationItem | null>(null);

  // Anchos progresivos para el efecto de cascada al apilarse
  const widthClasses = ["w-[70%]", "w-[75%]", "w-[80%]", "w-[85%]", "w-[90%]"];

  return (
    <ReactLenis root>
      <div className="w-full bg-slate-50 text-slate-900 min-h-screen">
        {/* Cabecera / Intro */}
        <section className="h-[50vh] w-full flex flex-col items-center justify-center sticky top-0 bg-slate-50 z-0 px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">02</p>
          <h1 className="text-4xl md:text-6xl font-black text-center tracking-tight mt-2 text-slate-900">
            Publicaciones & Artículos
          </h1>
          <p className="mt-4 text-slate-600 text-center max-w-xl">
            Haz scroll hacia abajo para explorar las publicaciones o haz clic en cualquiera para leer los detalles.
          </p>
        </section>

        {/* Galería Apilada (Sticky Stack) */}
        <section className="w-full relative z-10 pb-20">
          {items.map((item, index) => {
            const widthClass = widthClasses[index % widthClasses.length];
            const topOffset = `${(index + 1) * 1.5}rem`;

            return (
              <div
                key={item.id}
                className="sticky w-full flex justify-center"
                style={{ top: topOffset }}
              >
                <figure
                  onClick={() => setSelectedItem(item)}
                  className={`group relative h-[75vh] ${widthClass} cursor-pointer overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200 transition-transform duration-300 hover:scale-[1.01]`}
                >
                  {/* Encabezado / Título de la tarjeta */}
                  <div className="absolute top-0 inset-x-0 z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-6 text-white flex justify-between items-start">
                    <div>
                      {item.category && (
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-blue-500/30">
                          {item.category}
                        </span>
                      )}
                      <h3 className="text-xl md:text-2xl font-bold mt-2 text-white group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-xs bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full font-medium">
                      Clic para ver más 🔍
                    </span>
                  </div>

                  {/* Imagen de fondo */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradiente inferior con previsualización de descripción */}
                  <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 text-white">
                    <p className="text-sm md:text-base line-clamp-2 text-slate-200">
                      {item.description}
                    </p>
                  </div>
                </figure>
              </div>
            );
          })}
        </section>

        {/* Modal Emergente */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón Cerrar */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Imagen Grande */}
              <div className="relative h-72 w-full bg-slate-100">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Detalles */}
              <div className="p-8">
                {selectedItem.category && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    {selectedItem.category}
                  </span>
                )}
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-3">
                  {selectedItem.title}
                </h3>
                <p className="mt-4 text-slate-600 leading-relaxed text-base">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ReactLenis>
  );
}