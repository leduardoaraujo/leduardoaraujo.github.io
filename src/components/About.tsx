const About = () => {
  return (
    <section id="about" className="bg-zinc-950 px-4 py-12 text-zinc-50 md:py-14">
      <div className="mx-auto grid w-full max-w-7xl gap-6 border-y border-zinc-800 py-7 md:grid-cols-[0.34fr_1fr] md:items-center">
        <div className="text-xs uppercase text-zinc-500">
          <p>001 / Tese</p>
          <p className="mt-2 text-lime-300">dados → resposta → ação</p>
        </div>

        <p className="max-w-5xl font-heading text-[clamp(1.45rem,3vw,2.8rem)] font-medium leading-[1.08]">
          Não é um chat em cima do banco. É um sistema que entende contexto,
          escolhe ferramenta, executa com limites e explica o resultado.
        </p>
      </div>
    </section>
  );
};

export default About;
