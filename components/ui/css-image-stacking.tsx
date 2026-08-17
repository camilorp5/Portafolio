"use client";
import { ReactLenis } from "lenis/react";
import { translations, type Language } from "../../app/i18n";

const publicationSources = [
  "/publicaciones/images/redcolsi.png",
  "https://images.unsplash.com/photo-1476180814856-a36609db0493?w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599054799131-4b09c73a63cf?w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1719963532023-01b573d1d584?w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1714328101501-3594de6cb80f?w=1200&auto=format&fit=crop",
];

const publicationFiles = [
  "/publicaciones/documentos/redcolsi.pdf",
  "/publicaciones/documentos/documento2.pdf",
  "/publicaciones/documentos/documento3.pdf",
  "/publicaciones/documentos/documento4.pdf",
  "/publicaciones/documentos/documento5.pdf",
  "/publicaciones/documentos/documento6.pdf",
];

const widthClasses = ["w-[55%]", "w-[60%]", "w-[65%]", "w-[70%]", "w-[75%]", "w-[80%]"];
const topOffsets = ["sm:top-0", "sm:top-2", "sm:top-4", "sm:top-6", "sm:top-8", "sm:top-12"];

export default function CssImageStacking({ language = "es" }: { language?: Language }) {
  const labels = translations[language].publicationsSection;

  const publications = labels.items.map((item, index) => ({
    title: item.title,
    description: item.description,
    src: publicationSources[index],
    file: publicationFiles[index],
    widthClass: widthClasses[index],
    topOffset: topOffsets[index],
  }));

  return (
    <ReactLenis root>
      <main className="bg-background">
        <div className="wrapper">
          <section className="text-foreground h-screen w-full bg-background grid place-content-center sticky top-0">
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
              {labels.heroTitleLine1} <br /> {labels.heroTitleLine2}
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
                  <div className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white transition-opacity duration-300">
                    <h3 className="text-xl font-bold">{pub.title}</h3>
                    <p className="text-sm text-neutral-200 mt-1">{pub.description}</p>
                    <span className="inline-block mt-2 text-xs font-medium underline opacity-80 group-hover:opacity-100">
                      {labels.downloadLabel}
                    </span>
                  </div>

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
            {labels.footer}
          </h1>
          <div className="bg-background h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full"></div>
        </footer>
      </main>
    </ReactLenis>
  );
}