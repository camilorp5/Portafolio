"use client";
import { ReactLenis } from "lenis/react";

// Estructura de datos para simplificar la renderización del stack
const publications = [
  {
    title: "Sistema de Alerta Temprana - RedColsi",
    description: "Publicación e investigación sobre alertas tempranas de deserción en el ITM.",
    src: "/publicaciones/images/redcolsi.png",
    file: "/publicaciones/documentos/redcolsi.pdf", // Cambia a la extensión real de tu archivo
    widthClass: "w-[55%]",
    topOffset: "sm:top-0",
  },
  {
    title: "Investigación en IA 2",
    description: "Análisis comparativo de modelos del lenguaje.",
    src: "https://images.unsplash.com/photo-1476180814856-a36609db0493?w=1200&auto=format&fit=crop",
    file: "/publicaciones/documentos/documento2.pdf",
    widthClass: "w-[60%]",
    topOffset: "sm:top-2",
  },
  {
    title: "Investigación en IA 3",
    description: "Avances en visión por computadora aplicados.",
    src: "https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=1200&auto=format&fit=crop",
    file: "/publicaciones/documentos/documento3.pdf",
    widthClass: "w-[65%]",
    topOffset: "sm:top-4",
  },
  {
    title: "Investigación en IA 4",
    description: "Impacto ético y divulgativo de la inteligencia artificial.",
    src: "https://images.unsplash.com/photo-1599054799131-4b09c73a63cf?w=1200&auto=format&fit=crop",
    file: "/publicaciones/documentos/documento4.pdf",
    widthClass: "w-[70%]",
    topOffset: "sm:top-6",
  },
  {
    title: "Investigación en IA 5",
    description: "Redes neuronales y optimización de datos.",
    src: "https://images.unsplash.com/photo-1719963532023-01b573d1d584?w=1200&auto=format&fit=crop",
    file: "/publicaciones/documentos/documento5.pdf",
    widthClass: "w-[75%]",
    topOffset: "sm:top-8",
  },
  {
    title: "Investigación en IA 6",
    description: "Futuro del aprendizaje profundo en la industria.",
    src: "https://images.unsplash.com/photo-1714328101501-3594de6cb80f?w=1200&auto=format&fit=crop",
    file: "/publicaciones/documentos/documento6.pdf",
    widthClass: "w-[80%]",
    topOffset: "sm:top-12",
  },
];

export default function CssImageStacking() {
  return (
    <ReactLenis root>
      <main className="bg-background">
        <div className="wrapper">
          <section className="text-foreground h-screen w-full bg-background grid place-content-center sticky top-0">
            {/* Fondo de Cuadrícula */}
            <div
              className="absolute bottom-0 left-0 right-0 top-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: "54px 54px",
                WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
                maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
              }}
            />

            <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%] relative z-10">
              Publicaciones investigativas y <br /> divulgativas sobre IA. Scroll down! 👇
            </h1>
          </section>
        </div>

        <section className="text-foreground w-full bg-background">
          {publications.map((pub, index) => (
            <div key={index} className={`sm:sticky ${pub.topOffset} w-full`}>
              <figure className="w-full h-screen flex items-center justify-center">
                <a
                  href={pub.file}
                  download
                  className={`group relative h-[80%] ${pub.widthClass} overflow-hidden rounded-md cursor-pointer block [box-shadow:0_-5px_16px_4px_rgba(0,0,0,0.3)]`}
                >
                  {/* Sombreado superior con texto en letras blancas */}
                  <div className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white transition-opacity duration-300">
                    <h3 className="text-xl font-bold">{pub.title}</h3>
                    <p className="text-sm text-neutral-200 mt-1">{pub.description}</p>
                    <span className="inline-block mt-2 text-xs font-medium underline opacity-80 group-hover:opacity-100">
                      Haz clic para descargar PDF ↓
                    </span>
                  </div>

                  {/* Imagen con efecto hover sutil */}
                  <img
                    src={pub.src}
                    alt={pub.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>
              </figure>
            </div>
          ))}
        </section>

        <footer className="group bg-background">
          <h1 className="text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-neutral-400 to-neutral-800 bg-clip-text text-transparent transition-all ease-linear">
            Camilo Pérez AI
          </h1>
          <div className="bg-background h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full"></div>
        </footer>
      </main>
    </ReactLenis>
  );
}