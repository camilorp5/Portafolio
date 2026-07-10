"use client";

import Link from "next/link";
import { useState } from "react";
import { getCvHref, languages, translations, type Language } from "./i18n";

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
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [activeTab, setActiveTab] = useState<TabId>("home");

  const t = translations[language];
  const cvHref = getCvHref(language);

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
          <section className="relative overflow-hidden border-b border-slate-200 bg-white py-20 lg:py-32">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

            <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  <span>{t.hero.badge}</span>
                </div>

                <h1 className="text-4xl font-black tracking-tight text-slate-900 lg:text-6xl">
                  {t.hero.title} <span className="bg-gradient-to-r from-blue-700 to-indigo-900 bg-clip-text text-transparent">{t.hero.name}</span>
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
                    className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-100 px-6 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-200"
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
          </section>

          <section id="proyectos" className="mx-auto max-w-6xl px-6 py-20">
            <div className="mb-12 flex flex-col justify-between md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">{t.projects.title}</h2>
                <p className="mt-2 text-slate-500">{t.projects.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {proyectosDestacados.map((proyecto) => (
                <Link
                  key={proyecto.id}
                  href={`/proyectos/${proyecto.id}`}
                  className="group relative h-80 overflow-hidden rounded-2xl border border-slate-200/60 bg-slate-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-100 transition-opacity group-hover:opacity-50"
                    style={{ backgroundImage: `url(${proyecto.imagen})` }}
                  >
                    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-slate-950 opacity-50" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {t.projects.items[proyecto.id - 1].tags.map((tag) => (
                          <span
                            key={`${proyecto.id}-${tag}`}
                            className="rounded border border-blue-500/30 bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="flex items-center gap-2 text-xl font-bold text-white transition-colors group-hover:text-blue-300">
                        {t.projects.items[proyecto.id - 1].title}
                        <span className="text-sm opacity-70 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                      </h3>

                      <p className="line-clamp-2 text-sm text-slate-300">
                        {t.projects.items[proyecto.id - 1].description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-6 py-20">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
              {activeTab === "publications"
                ? "02"
                : activeTab === "about"
                  ? "03"
                  : "04"}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              {activeTab === "publications"
                ? t.placeholders.publications.title
                : activeTab === "about"
                  ? t.placeholders.about.title
                  : t.placeholders.chatbot.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              {activeTab === "publications"
                ? t.placeholders.publications.description
                : activeTab === "about"
                  ? t.placeholders.about.description
                  : t.placeholders.chatbot.description}
            </p>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setActiveTab("chatbot")}
        className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-blue-600/20 bg-blue-700 text-white shadow-2xl shadow-blue-700/30 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-800"
        aria-label="Abrir asistente personal"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 5h8a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-1l-2 3-2-3H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" />
          <path d="M9 10h.01" />
          <path d="M15 10h.01" />
          <path d="M10 13c.5.8 1.2 1.2 2 1.2s1.5-.4 2-1.2" />
        </svg>
      </button>
    </main>
  );
}