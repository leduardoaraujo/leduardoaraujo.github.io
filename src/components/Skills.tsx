const skills = [
  ["BI + semântica", "Power BI/Fabric, DAX, workspaces, metadados e regras de negócio."],
  ["Produto", "React, Vite, FastAPI, APIs, autenticação e integrações."],
  ["IA operacional", "Agentes, intenção, SQL seguro, RAG contextual e MCP."],
  ["Governança", "SELECT-only, DML/DDL block, preview-first e rastreabilidade."],
];

const Skills = () => {
  return (
    <section id="skills" className="bg-[#d7d7c8] px-4 py-12 text-zinc-950 md:py-14">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 grid gap-4 md:grid-cols-[0.34fr_1fr] md:items-end">
          <p className="text-xs uppercase text-zinc-600">002 / Stack</p>
          <h2 className="font-heading text-[clamp(2rem,5vw,4.8rem)] font-medium leading-[0.92]">
            Técnica com direção.
          </h2>
        </div>

        <div className="grid border-t border-zinc-950/20 md:grid-cols-4">
          {skills.map(([title, body], index) => (
            <article
              key={title}
              className="border-b border-zinc-950/20 py-5 md:border-r md:px-5 md:last:border-r-0"
            >
              <span className="mb-4 block font-mono text-xs text-zinc-500">0{index + 1}</span>
              <h3 className="mb-3 font-heading text-xl font-medium">{title}</h3>
              <p className="text-sm leading-6 text-zinc-700">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
