'use client';

import { motion, Variants } from 'framer-motion';
import { ArrowUpRight, Download, FileText, MessageSquare } from 'lucide-react';

export default function Home() {
  
  // Configuración de animación suave al aparecer
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 1. SECCIÓN HERO (Presentación Animada) */}
      <section className="min-h-screen flex flex-col justify-center items-start px-6 max-w-5xl mx-auto md:px-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="space-y-4"
        >
          <span className="text-indigo-400 font-mono tracking-wider text-sm md:text-base">
            // Inteligencia Artificial & Ciencia de Datos
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            Hola, soy Camilo.
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed">
            Construyo agentes de IA, sistemas de automatización y soluciones basadas en datos para resolver problemas complejos.
          </p>
        </motion.div>

        {/* Botones de acción rápidos */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a href="#proyectos" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20">
            Ver Proyectos destacados
          </a>
          <a href="#" className="px-6 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-medium rounded-lg transition-colors flex items-center gap-2">
            Descargar CV <Download className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* 2. SECCIÓN SOBRE MÍ (Biografía) */}
      <section className="py-24 px-6 max-w-5xl mx-auto md:px-12 border-t border-slate-900">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid md:grid-cols-3 gap-12 items-center"
        >
          <div className="md:col-span-1 flex justify-center">
            {/* Foto de perfil placeholder */}
            <div className="w-48 h-48 md:w-60 md:h-60 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 shadow-2xl shadow-indigo-500/10">
              <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-slate-500 text-sm">
                [Tu Foto Aquí]
              </div>
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-white">Sobre mí</h2>
            <p className="text-slate-400 leading-relaxed">
              Aquí puedes escribir una biografía enfocada en tu pasión por la Ciencia de Datos, tu trayectoria educativa, papers o investigaciones que te entusiasmen y tus metas en el mundo de la automatización y los agentes inteligentes.
            </p>
            <div className="flex gap-4 text-slate-400">
              <a href="#" className="hover:text-indigo-400 text-sm font-mono transition-colors">[ LinkedIn ]</a>
              <a href="#" className="hover:text-indigo-400 text-sm font-mono transition-colors">[ GitHub ]</a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. SECCIÓN PROYECTOS DESTACADOS (Cuadrícula Elegante) */}
      <section id="proyectos" className="py-24 px-6 max-w-5xl mx-auto md:px-12 border-t border-slate-900">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">Proyectos Destacados</h2>
              <p className="text-slate-400 mt-2">Una muestra de mis desarrollos recientes en IA y datos.</p>
            </div>
          </div>

          {/* Grid de tarjetas de proyectos */}
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((id) => (
              <motion.div 
                key={id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="group relative bg-slate-900/50 border border-slate-900 rounded-2xl overflow-hidden hover:border-slate-800 transition-all duration-300"
              >
                {/* Imagen del proyecto placeholder */}
                <div className="h-48 bg-slate-900 flex items-center justify-center text-slate-700 border-b border-slate-900">
                  [Imagen de Proyecto {id}]
                </div>
                {/* Contenido */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      Sistema RAG Universitario v{id}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Descripción breve del proyecto. Implementación de una arquitectura Retrieval-Augmented Generation con LangChain y bases de datos vectoriales.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Python', 'LangChain', 'Next.js'].map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-xs font-mono rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BOTÓN FLOTANTE DEL CHATBOT (Efecto visual inicial) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-xl shadow-indigo-600/30 transition-all transform hover:scale-105 flex items-center justify-center group">
          <MessageSquare className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out text-sm font-medium whitespace-nowrap">
            Pregúntale a mi IA
          </span>
        </button>
      </div>

    </main>
  );
}