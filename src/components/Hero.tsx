import { ArrowDownRight, BrainCircuit, DatabaseZap, ShieldCheck } from "lucide-react";

const keywords = ["analytics", "fabric", "sql", "power bi", "agents", "fastapi", "react", "mcp", "ai"];

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-20 text-zinc-50">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_68%_20%,rgba(18,185,129,0.2),transparent_26%),radial-gradient(circle_at_10%_82%,rgba(14,116,144,0.2),transparent_22%),linear-gradient(120deg,#050505,#10100d_50%,#050505)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute right-4 top-24 hidden w-64 text-[10px] uppercase leading-5 text-zinc-500 md:block">
        {keywords.map((word) => (
          <span key={word} className="mr-4 inline-block">
            {word}
          </span>
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col justify-between pb-8 md:min-h-[72vh]">
        <div className="grid gap-7 pt-12 lg:grid-cols-[1fr_21rem] lg:items-end">
          <div className="max-w-5xl">
            <p className="mb-5 text-xs uppercase text-lime-300">
              Luiz Eduardo Araújo / dados, desenvolvimento e IA
            </p>
            <h1 className="max-w-[22rem] font-heading text-[clamp(2.6rem,12vw,4.7rem)] font-medium leading-[0.9] sm:max-w-none md:text-[clamp(4.2rem,8vw,7.6rem)] md:leading-[0.87]">
              Dados que respondem.
              <span className="block text-zinc-500">IA que executa.</span>
            </h1>
          </div>

          <div className="max-w-[22rem] border-l border-zinc-700 pl-5 sm:max-w-none">
            <p className="text-base leading-7 text-zinc-300">
              Copilotos e plataformas que conectam linguagem natural a BI, SQL,
              modelos semânticos e sistemas internos.
            </p>
            <a
              href="#projects"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-lime-300/60 px-4 py-2.5 text-sm text-lime-200 transition hover:bg-lime-300 hover:text-zinc-950"
            >
              Ver cases
              <ArrowDownRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {[
            { icon: DatabaseZap, label: "Dados reais", text: "Power BI, Fabric, SQL, APIs e relatórios corporativos." },
            { icon: BrainCircuit, label: "IA aplicada", text: "Agentes que entendem intenção, consultam fontes e explicam." },
            { icon: ShieldCheck, label: "Execução segura", text: "Read-only, preview-first, validação e confirmação." },
          ].map((item, index) => (
            <article
              key={item.label}
              className="border border-zinc-800 bg-zinc-950/50 p-4 backdrop-blur transition hover:border-lime-300/50 md:p-3.5"
            >
              <div className="mb-4 flex items-start justify-between">
                <item.icon className="h-5 w-5 text-lime-300" />
                <span className="font-mono text-xs text-zinc-600">0{index + 1}</span>
              </div>
              <h2 className="mb-1.5 font-heading text-lg font-medium">{item.label}</h2>
              <p className="max-w-[18.5rem] break-words text-sm leading-6 text-zinc-400 sm:max-w-none">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
