"use client";

import { useState } from "react";
import { ReactLenis } from "lenis/react";
import { X } from "lucide-react";

export interface PublicationItem {
  id: number;
  title: string;
  description: string;
  image: string;
  topClass: string;
  widthClass: string;
}

// Lista de publicaciones con títulos, descripciones y configuraciones de posición
const publicacionesData: PublicationItem[] = [
  {
    id: 1,
    title: "Análisis Predictivo con Python",
    description: "Estudio detallado sobre modelos de Machine Learning aplicados a series temporales y optimización de datos en tiempo real.",
    image: "https://images.unsplash.com/photo-1718969604981-de826f44ce15?w=1200&auto=format&fit=crop",
    topClass: "sm:top-0",
    widthClass: "w-[55%]",
  },
  {
    id: 2,
    title: "Automatización de Procesos ETL",
    description: "Implementación de flujos de trabajo optimizados reduciendo tiempos de procesamiento en un 40% mediante KNIME.",
    image: "https://images.unsplash.com/photo-1476180814856-a36609db0493?w=1200&auto=format&fit=crop",
    topClass: "sm:top-2",
    widthClass: "w-[60%]",
  },
  {
    id: 3,
    title: "Visualización e Inteligencia de Negocios",
    description: "Diseño e implementación de paneles de control interactivos para la toma de decisiones estratégicas.",
    image: "https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=1200&auto=format&fit=crop",
    topClass: "sm:top-4",
    widthClass: "w-[65%]",
  },
  {
    id: 4,
    title: "Modelos de Lenguaje Aplicados (LLMs)",
    description: "Integración de arquitecturas RAG para asistentes virtuales inteligentes en Google Workspace.",
    image: "https://images.unsplash.com/photo-1599054799131-4b09c73a63cf?w=1200&auto=format&fit=crop",
    topClass: "sm:top-6",
    widthClass: "w-[70%]",
  },
  {
    id: 5,
    title: "Despliegue y Contenedores con Docker",
    description: "Guía práctica sobre empaquetamiento de aplicaciones y despliegue continuo en la nube.",
    image: "https://images.unsplash.com/photo-1719963532023-01b573d1d584?w=1200&auto=format&fit=crop",
    topClass: "sm:top-8",
    widthClass: "w-[75%]",
  },
  {
    id: 6,
    title: "Proyectos en Unity y Simulación",
    description: "Experiencia en desarrollo de modelos interactivos y simulaciones en entornos 3D.",
    image: "https://images.unsplash.com/photo-1714328101501-3594de6cb80f?w=1200&auto=format&fit=crop",
    topClass: "sm:top-12",
    widthClass: "w-[80%]",
  },
];

export default function CssImageStacking() {
  const [selectedItem, setSelectedItem] = useState<PublicationItem | null>(null);

  return (
    <ReactLenis root>
      <main className="bg-background text-foreground">
        {/* Encabezado / Título de la sección */}
        <div className="wrapper">
          <section className="text-foreground h-[60vh] w-full bg-background grid place-content-center sticky top-0 z-0 px-6">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700 text-center relative z-10">
              02
            </p>
            <h1 className="2xl:text-6xl text-4xl px-8 font-semibold text-center tracking-tight leading-[120%] relative z-10 mt-2">
              Publicaciones y Artículos <br />
              <span className="text-sm font-normal text-slate-500">
                Haz scroll hacia abajo para desplegar las tarjetas 👇
              </span>
            </h1>
          </section>
        </div>

        {/* Sección con apilamiento Sticky Stack */}
        <section className="text-foreground w-full bg-background relative z-10 pb-20">
          {publicacionesData.map((item) => (
            <div key={item.id} className={`sm:sticky ${item.topClass} w-full`}>
              <figure className="w-full h-screen flex items-center justify-center p-4">
                <div
                  onClick={() => setSelectedItem(item)}
                  className={`group relative transition-all duration-300 h-[80%] ${item.widthClass} cursor-pointer overflow-hidden rounded-2xl shadow-2xl border border-slate-700/20 bg-slate-900`}
                >
                  {/* Título en la parte superior de la imagen */}
                  <div className="absolute top-0 inset-x-0 z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-6 text-white flex justify-between items-start">
                    <h3 className="text-xl md:text-2xl font-bold group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-full font-medium">
                      Ver más 🔍
                    </span>
                  </div>

                  {/* Imagen */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="transition-all duration-500 h-full w-full object-cover group-hover:scale-105"
                  />

                  {/* Gradiente inferior tenue */}
                  <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6">
                    <p className="text-sm text-slate-300 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </figure>
            </div>
          ))}
        </section>

        {/* Modal / Ventana Emergente al hacer clic */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón para cerrar */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Imagen en grande */}
              <div className="relative h-72 w-full bg-slate-100">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Contenido/Descripción */}
              <div className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {selectedItem.title}
                </h3>
                <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </ReactLenis>
  );
}