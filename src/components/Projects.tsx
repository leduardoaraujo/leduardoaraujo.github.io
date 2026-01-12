import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "PBIP Analyzer",
    description: "Ferramenta para análise e extração de informações de arquivos Power BI Project (.pbip), facilitando manutenção e documentação de projetos complexos.",
    year: "2024",
    link: "https://github.com/leduardoaraujo/pbip_analyzer",
  },
  {
    title: "Visual SQL",
    description: "Construtor visual de consultas SQL com interface gráfica intuitiva. Suporte a JOINs, condições WHERE e geração automática de código SQL.",
    year: "2024",
    link: "https://github.com/leduardoaraujo/visualSQL",
  },
  {
    title: "JSON Explorer",
    description: "Aplicação web para visualizar e explorar arquivos JSON de forma interativa, com navegação dinâmica por estruturas aninhadas complexas.",
    year: "2024",
    link: "https://github.com/leduardoaraujo/jsonexplorer",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-4 border-t border-border relative z-10 bg-background/90 backdrop-blur-sm">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">
          Projetos Selecionados
        </h2>

        <div className="space-y-8">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-t border-border pt-8 hover:opacity-70 transition-opacity"
            >
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1">
                  <h3 className="font-heading text-2xl font-medium mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-sm text-muted-foreground">
                    {project.year}
                  </span>
                  <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
