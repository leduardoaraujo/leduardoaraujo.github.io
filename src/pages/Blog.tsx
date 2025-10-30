import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const blogPosts = [
  {
    id: "data-driven-decisions",
    title: "Tomada de Decisões Orientada por Dados",
    excerpt: "Como transformar dados brutos em insights acionáveis para decisões estratégicas de negócio.",
    date: "2024-03-15",
    readTime: "5 min",
  },
  {
    id: "python-data-pipelines",
    title: "Construindo Pipelines de Dados Eficientes com Python",
    excerpt: "Melhores práticas para criar pipelines de dados escaláveis e manuteníveis usando Python e ferramentas modernas.",
    date: "2024-02-28",
    readTime: "8 min",
  },
  {
    id: "power-bi-best-practices",
    title: "Power BI: Práticas para Dashboards Profissionais",
    excerpt: "Técnicas avançadas de visualização e design de dashboards que comunicam dados de forma clara e impactante.",
    date: "2024-02-10",
    readTime: "6 min",
  },
  {
    id: "etl-modern-stack",
    title: "ETL Moderno: Além das Ferramentas Tradicionais",
    excerpt: "Explorando arquiteturas modernas de ETL/ELT e como escolher a melhor abordagem para seu projeto.",
    date: "2024-01-20",
    readTime: "7 min",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-medium mb-4">
              Blog
            </h1>
            <p className="text-muted-foreground text-lg">
              Reflexões sobre dados, tecnologia e desenvolvimento.
            </p>
          </div>

          <div className="space-y-12">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="block group border-t border-border pt-8 hover:opacity-70 transition-opacity"
              >
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <time className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="text-sm text-muted-foreground">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="font-heading text-2xl font-medium mb-3">
                  {post.title}
                </h2>
                <p className="text-muted-foreground">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
