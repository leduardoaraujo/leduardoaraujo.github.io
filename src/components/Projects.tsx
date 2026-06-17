import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "GAV Insights",
    type: "copiloto corporativo",
    summary:
      "BI conversacional para a GAV: Power BI/Fabric, modelos semânticos, relatórios e bases internas.",
    thesis:
      "Pergunta → ativo correto → consulta segura → resposta explicada.",
    tags: ["Power BI", "Fabric", "DAX", "MCP", "BI interno"],
  },
  {
    number: "02",
    title: "Axis",
    type: "analytics com IA",
    summary:
      "Engine para conectar fontes, gerar SQL seguro, analisar resultados e criar visualizações.",
    thesis:
      "Intenção → SQL validado → análise → dashboard.",
    tags: ["FastAPI", "React", "SQL", "PostgreSQL", "agentes"],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="bg-zinc-950 px-4 py-12 text-zinc-50 md:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-8">
          <div>
            <p className="mb-3 text-xs uppercase text-lime-300">003 / Cases</p>
            <h2 className="font-heading text-[clamp(2.2rem,6vw,5.4rem)] font-medium leading-[0.9]">
              Sistemas que pensam
              <span className="block text-zinc-500">com dados.</span>
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm leading-6 text-zinc-400 md:block">
            GAV Insights é o caso real. Axis é a base reaproveitável.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group border border-zinc-800 bg-zinc-900/35 p-5 transition hover:border-lime-300/50 hover:bg-zinc-900/70"
            >
              <div className="mb-6 flex items-start justify-between">
                <span className="font-mono text-4xl text-zinc-700">{project.number}</span>
                <ArrowUpRight className="h-6 w-6 text-lime-300 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              <p className="mb-3 text-xs uppercase text-lime-300">{project.type}</p>
              <h3 className="mb-4 font-heading text-4xl font-medium md:text-5xl">
                {project.title}
              </h3>
              <p className="mb-5 text-base leading-7 text-zinc-300">{project.summary}</p>
              <p className="mb-5 text-sm leading-6 text-zinc-500">{project.thesis}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
