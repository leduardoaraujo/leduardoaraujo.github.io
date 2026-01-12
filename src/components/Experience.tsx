const experiences = [
  {
    period: "2024 - Presente",
    title: "Data Analyst",
    company: "Gav Resorts",
    description: "Engenharia de dados, desenvolvimento de dashboards, soluções BI e automações voltadas a dados.",
  },
  {
    period: "2025 - 2025",
    title: "Data Engineer",
    company: "LG Lugar de Gente",
    description: "Implementação e migração de sistemas de dados para a nuvem.",
  },
  {
    period: "2023 - 2024",
    title: "Data and Planning Analyst",
    company: "Trinus.Co",
    description: "Dashboards, BI e planejamento de projetos.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-32 px-4 border-t border-border relative z-10 bg-background/90 backdrop-blur-sm">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">
          Experiência
        </h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="grid md:grid-cols-3 gap-4">
              <div className="text-sm text-muted-foreground">
                {exp.period}
              </div>
              <div className="md:col-span-2 space-y-2">
                <h3 className="font-heading text-xl font-medium">
                  {exp.title}
                </h3>
                <p className="text-muted-foreground">{exp.company}</p>
                <p className="text-sm text-muted-foreground">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
