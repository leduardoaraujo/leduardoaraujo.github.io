const About = () => {
  return (
    <section id="about" className="py-32 px-4 border-t border-border relative z-10 bg-background/90 backdrop-blur-sm">
      <div className="container max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
              Sobre
            </h2>
            <h3 className="font-heading text-3xl md:text-4xl font-medium mb-6 leading-tight">
              Focado em transformar informação em soluções estratégicas
            </h3>
          </div>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Especialista em arquitetura e engenharia de dados com foco em soluções escaláveis para cloud. Experiência em design de pipelines complexos, otimização de queries e infraestrutura analítica end-to-end.
            </p>
            <p>
              Atuação em migração de sistemas para arquiteturas modernas (Data Lake/Warehouse), implementação de ETL/ELT com Airflow e Spark, e desenvolvimento de dashboards estratégicos com impacto direto em decisões de negócio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
