"use client";

import Link from "next/link";
import { useState } from "react";
import { getCvHref, languages, translations, type Language } from "./i18n";
import { CoverflowCarousel, CoverflowSlide } from "@/components/CoverflowCarousel";
import KineticGrid from "@/components/ui/kinetic-grid";
import SphereTagCloud, { SphereItem } from "@/components/SphereTagCloud";

type TabId = "home" | "publications" | "about" | "chatbot";

const tabs: Array<{ id: TabId; key: keyof (typeof translations)[Language]["navigation"] }> = [
  { id: "home", key: "home" },
  { id: "publications", key: "publications" },
  { id: "about", key: "about" },
  { id: "chatbot", key: "chatbot" },
];

const proyectosDestacados = [
  {
    id: 1,
    imagen: "/proyectos/proyecto1.png",
  },
  {
    id: 2,
    imagen: "/proyectos/proyecto2.png",
  },
  {
    id: 3,
    imagen: "/proyectos/proyecto3.png",
  },
  {
    id: 4,
    imagen: "/proyectos/proyecto4.png",
  },
];

// Datos para la esfera 3D interactiva
const esferaItems: SphereItem[] = [
  {
    id: 1,
    image: "/logosHabilidades/python.webp",
    title: "Python",
    description: "3 años de experiencia programando y enseñando este lenguaje. Competencia avanzada.",
    size: 1.5,
  },
  {
    id: 2,
    image: "/logosHabilidades/KNIME.png",
    title: "KNIME",
    description: "Enseñanza y desarrollo de soluciones de automatización de procesos con KNIME.",
    size: 1.2,
  },
  {
    id: 3,
    image: "/logosHabilidades/GoogleAppsScript.webp",
    title: "Google Apps Script",
    description: "+1 año de experiencia desarrollando soluciones automatizadas para Google Workspace.",
    size: 1.2,
  },
  {
    id: 4,
    image: "/logosHabilidades/github.png",
    title: "Github",
    description: "+10 proyectos desplegados, +100 contribuciones anuales y 3 años de experiencia en control de versiones",
    size: 1.0,
  },
  {
    id: 5,
    image: "/logosHabilidades/studio.svg",
    title: "Google Workspace Studio",
    description: "Dominio en automatización de procesos y desarrollo de soluciones con Google Workspace Studio.",
    size: 1.2,
  },
  {
    id: 6,
    image: "/logosHabilidades/unity.png",
    title: "Unity",
    description: "Experiencia enseñando habilidades en matemáticas, física y programación para Unity.",
    size: 1.0,
  },
  {
    id: 7,
    image: "/logosHabilidades/googlecollab.png",
    title: "Google Colab",
    description: "Experiencia en enseñanza y desarrollo de proyectos de ML, DL y ciencia de datos en Google Colab.",
    size: 1.5,
  },
  {
    id: 8,
    image: "/logosHabilidades/streamlit.png",
    title: "Streamlit",
    description: "Experiencia desarrollando visualizaciones interactivas y aplicaciones web para proyectos de ciencia de datos con Streamlit.",
    size: 1.2,
  },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [activeTab, setActiveTab] = useState<TabId>("home");

  const t = translations[language];
  const cvHref = getCvHref(language);

  const [messages, setMessages] = useState<Array<{sender: 'user' | 'bot'; text: string}>>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = "https://chatbot-rag-244902663860.us-central1.run.app/chat";

  // Mapeo de proyectos para el formato Coverflow
  const coverflowSlides: CoverflowSlide[] = proyectosDestacados.map((proyecto, idx) => {
    const itemData = t.projects.items[idx];
    return {
      src: proyecto.imagen,
      alt: itemData?.title || `Proyecto ${proyecto.id}`,
      title: itemData?.title,
      subtitle: itemData?.description,
      meta: itemData?.tags.map((tag) => ({ label: "Tag", value: tag })),
    };
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    const text = question.trim();
    if (!text) return;
    setError(null);
    setLoading(true);
    setMessages((m) => [...m, { sender: 'user', text }]);
    setQuestion("");

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta: text }),
      });

      const data = await res.json();
      const botText = data?.respuesta || data?.answer || data?.text || (typeof data === 'string' ? data : JSON.stringify(data));
      setMessages((m) => [...m, { sender: 'bot', text: String(botText) }]);
    } catch (err: any) {
        console.error("ERROR:", err);
        setError(err.message || "Error al comunicarse con la API.");
        setMessages((m) => [...m, { sender: 'bot', text: 'Lo siento, ocurrió un error al obtener la respuesta.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-end">
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <label className="sr-only" htmlFor="language-selector">
              Select language
            </label>
            <span className="text-sm font-medium text-slate-700">
              {t.languagelabel}
            </span>
            <select
              id="language-selector"
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
              className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {languages.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>

            <nav className="flex flex-wrap items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-blue-700 text-white shadow-lg shadow-blue-700/20"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {t.navigation[tab.key]}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {activeTab === "home" ? (
        <>
          {/* Sección Hero con KineticGrid */}
          <KineticGrid globalColor="light" className="border-b border-slate-200 py-20 lg:py-32">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-blue-700">
                  <span>{t.hero.badge}</span>
                </div>

                <h1 className="text-4xl font-black tracking-tight text-slate-900 lg:text-6xl">
                  {t.hero.title}{" "}
                  <span className="bg-gradient-to-r from-blue-700 to-indigo-900 bg-clip-text text-transparent">
                    {t.hero.name}
                  </span>
                </h1>

                <p className="text-lg leading-relaxed text-slate-600">{t.hero.description}</p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="#proyectos"
                    className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-700/20 transition-all hover:bg-blue-800"
                  >
                    {t.hero.ctaProjects}
                  </a>
                  <a
                    href={cvHref}
                    download
                    className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm px-6 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-100"
                  >
                    {t.hero.ctaCv}
                  </a>
                </div>
              </div>

              <div className="flex justify-center lg:col-span-5">
                <a
                  href="https://www.linkedin.com/in/camilo-perez-cientifico-de-datos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative cursor-pointer"
                >
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 blur opacity-25 transition duration-1000 group-hover:opacity-40" />

                  <div className="relative h-72 w-72 overflow-hidden rounded-2xl border-2 border-blue-900/10 bg-slate-200 shadow-2xl lg:h-80 lg:w-80">
                    <img
                      src="/foto_perfil/perfil.jpg"
                      alt={t.hero.profileAlt}
                      className="h-full w-full scale-125 object-cover object-top transition-transform duration-300 group-hover:scale-130"
                    />
                  </div>
                </a>
              </div>
            </div>
          </KineticGrid>

          {/* Sección de Proyectos con el CoverflowCarousel */}
          <section id="proyectos" className="mx-auto max-w-6xl px-6 py-20">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">{t.projects.title}</h2>
              <p className="mt-2 text-slate-500">{t.projects.subtitle}</p>
            </div>

            <div className="mt-6">
              <CoverflowCarousel
                slides={coverflowSlides}
                showCaption={true}
                showNavigation={true}
                showPagination={true}
                cardWidth="clamp(240px, 32vw, 320px)"
              />
            </div>
          </section>

          {/* Sección de la Esfera 3D Interactiva (Ubicada abajo de todo) */}
          <section className="mx-auto max-w-6xl px-6 pb-20 pt-10">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Explora el Ecosistema
              </h2>
              <p className="mt-2 text-slate-500">
                Mueve la esfera en cualquier dirección para interactuar con los proyectos e investigaciones.
              </p>
            </div>

            <SphereTagCloud items={esferaItems} radius={6} />
          </section>
        </>
      ) : activeTab === "chatbot" ? (
        <section className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-6 py-20">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">04</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{t.placeholders.chatbot.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{t.placeholders.chatbot.description}</p>
            </div>

            <div className="flex h-[60vh] flex-col gap-4">
              <div className="flex-1 overflow-y-auto rounded-lg border border-slate-100 p-4" id="chat-messages">
                {messages.length === 0 ? (
                  <p className="text-sm text-slate-400">Escribe una pregunta en el cuadro de abajo y presiona Enviar.</p>
                ) : (
                  messages.map((m, idx) => (
                    <div key={idx} className={`mb-3 flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-xl px-4 py-2 ${m.sender === 'user' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-900'}`}>
                        {m.text}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleSubmit} className="mt-auto flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
                  placeholder={t.placeholders.chatbot.inputPlaceholder || 'Escribe tu pregunta...'}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                />
                <button type="submit" disabled={loading} className="rounded-xl bg-blue-700 px-4 py-2 text-white disabled:opacity-60">
                  {loading ? 'Enviando...' : 'Enviar'}
                </button>
              </form>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-6 py-20">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
              {activeTab === "publications"
                ? "02"
                : "03"}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {activeTab === "publications"
                ? t.placeholders.publications.title
                : t.placeholders.about.title}
            </h2>
            <p className="mt-4 text-slate-600">
              {activeTab === "publications"
                ? t.placeholders.publications.description
                : t.placeholders.about.description}
            </p>
          </div>
        </section>
      )}
    </main>
  );
}