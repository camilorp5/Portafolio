import Image from 'next/image';

// Simulamos los datos de tus proyectos destacados
const proyectosDestacados = [
  {
    id: 1,
    titulo: "Sistema RAG Universitario v1",
    descripcion: "Arquitectura Retrieval-Augmented Generation con LangChain y bases de datos vectoriales.",
    imagen: "/proyectos/proyecto1.jpg", // Asegúrate de tener una imagen aquí en public/proyectos/
    tags: ["Python", "LangChain", "ChromaDB"]
  },
  {
    id: 2,
    titulo: "Agente Autónomo de Automatización",
    descripcion: "Despliegue de agentes inteligentes que optimizan flujos de trabajo en entornos académicos.",
    imagen: "/proyectos/proyecto2.jpg",
    tags: ["LangGraph", "Gemini", "Docker"]
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* SECCIÓN HERO / BIOGRAFÍA */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-20 lg:py-32">
        {/* Detalle futurista de fondo (Líneas sutiles de rejilla tech) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Texto Biografía */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-200">
              <span>🤖 Profesor e Investigador de IA</span>
            </div>
            
            {/* Animación mental: Aquí irá el efecto de scroll más adelante */}
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900">
              Hola, soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900">Camilo</span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              Especialista en Ciencia de Datos, agentes inteligentes y automatización. Mi enfoque combina la rigurosidad de la investigación académica con el desarrollo de soluciones de IA prácticas y escalables.
            </p>

            {/* Botones de acción */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#proyectos" className="px-6 py-3 font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-lg shadow-blue-700/20 transition-all transform hover:-translate-y-0.5">
                Ver Proyectos
              </a>
              <a
                href="/cv/Camilo_Perez_CV.pdf"
                download="Camilo_Perez_CV.pdf"
                className="px-6 py-3 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 transition-all flex items-center gap-2"
              >
                Descargar CV (Hoja de Vida)
              </a>
            </div>
          </div>

          {/* Foto de Perfil con Marco Cyber-Futurista */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Efecto de brillo azul de fondo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-2xl bg-slate-200 border-2 border-blue-900/10 overflow-hidden shadow-2xl">
                <img src="foto_perfil/perfil.jpg" 
                     alt="Foto de Perfil" 
                     className="w-full h-full object-cover object-top scale-130" />
                <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-400">
                  <span className="text-xs">Tu Foto de Perfil Aquí</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECCIÓN PROYECTOS DESTACADOS (ESTILO REFERENCIA DE TU IMAGEN) */}
      <section id="proyectos" className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Proyectos Destacados</h2>
            <p className="text-slate-500 mt-2">Una muestra de mis últimos desarrollos en Inteligencia Artificial</p>
          </div>
        </div>

        {/* Grilla de Tarjetas como tu captura */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {proyectosDestacados.map((proyecto) => (
            <div 
              key={proyecto.id} 
              className="relative h-80 group rounded-2xl overflow-hidden shadow-md border border-slate-200/60 bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Imagen de Fondo del botón/tarjeta */}
              <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity bg-cover bg-center" style={{ backgroundImage: `url(${proyecto.imagen})` }}>
                {/* Si no hay imagen aún, esto da un fondo azul tech por mientras */}
                <div className="w-full h-full bg-gradient-to-br from-blue-950 to-slate-950" />
              </div>

              {/* Degradado oscuro inferior para que el texto resalte (tal cual tu referencia) */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

              {/* Contenido de la Tarjeta */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="space-y-2">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {proyecto.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Título */}
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-2">
                    {proyecto.titulo}
                    <span className="text-sm opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                  </h3>
                  
                  {/* Descripción */}
                  <p className="text-sm text-slate-300 line-clamp-2">
                    {proyecto.descripcion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}