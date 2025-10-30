import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="container max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="font-heading text-5xl md:text-7xl font-medium tracking-tight">
            Developer & Data Analyst
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
            Transformando dados em soluções estratégicas.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => scrollToSection("about")}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Ver trabalhos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:bg-muted transition-colors"
          >
            Entrar em contato
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
