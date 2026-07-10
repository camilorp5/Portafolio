import Link from "next/link";
import { notFound } from "next/navigation";
import { translations } from "../../i18n";

const proyectos = [
  {
    id: 1,
    imagen: "/proyectos/proyecto1.png",
  },
  {
    id: 2,
    imagen: "/proyectos/proyecto2.png",
  },
] as const;

export function generateStaticParams() {
  return proyectos.map((proyecto) => ({ id: String(proyecto.id) }));
}

export default function ProyectoPage({ params }: { params: Promise<{ id: string }> }) {
  return <ProyectoContent params={params} />;
}

async function ProyectoContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const proyectoId = Number(id);
  const proyecto = proyectos.find((item) => item.id === proyectoId);

  if (!proyecto) {
    notFound();
  }

  const projectData = translations.es.projects.items[proyecto.id - 1];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 lg:px-8 lg:py-16">
        <Link
          href="/"
          className="w-fit rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          ← Volver al inicio
        </Link>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="relative h-72 overflow-hidden sm:h-96">
            <img
              src={proyecto.imagen}
              alt={projectData.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 sm:p-10">
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                {projectData.title}
              </h1>
            </div>
          </div>

          <div className="space-y-6 p-8 sm:p-10">
            <div className="flex flex-wrap gap-2">
              {projectData.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
              {projectData.description}
            </p>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-bold text-slate-900">Resumen del proyecto</h2>
              <p className="mt-3 text-slate-600">
                Este espacio puede ampliarse con más contexto, resultados, enlaces o capturas del proyecto.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
