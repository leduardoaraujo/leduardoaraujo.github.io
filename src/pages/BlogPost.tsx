import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

const blogContent: Record<string, any> = {
  "data-driven-decisions": {
    title: "Tomada de Decisões Orientada por Dados",
    date: "2024-03-15",
    readTime: "5 min",
    content: `
      <p>Em um mundo cada vez mais digital, a capacidade de tomar decisões baseadas em dados se tornou um diferencial competitivo essencial para organizações de todos os tamanhos.</p>

      <h2>O Que São Decisões Orientadas por Dados?</h2>
      <p>Decisões orientadas por dados (data-driven decisions) são aquelas fundamentadas em análise de dados objetivos e verificáveis, em vez de intuição ou observação casual. Este método permite que as organizações:</p>
      <ul>
        <li>Reduzam riscos em suas decisões estratégicas</li>
        <li>Identifiquem oportunidades de mercado com precisão</li>
        <li>Otimizem processos e recursos</li>
        <li>Melhorem a experiência do cliente</li>
      </ul>

      <h2>Implementando uma Cultura Data-Driven</h2>
      <p>A transição para uma cultura orientada por dados requer mais do que apenas ferramentas e tecnologia. É necessário:</p>
      <ol>
        <li><strong>Infraestrutura adequada:</strong> Sistemas que coletam, armazenam e processam dados de forma eficiente.</li>
        <li><strong>Capacitação:</strong> Equipes treinadas para interpretar e utilizar os dados disponíveis.</li>
        <li><strong>Governança:</strong> Políticas claras sobre uso, privacidade e qualidade dos dados.</li>
      </ol>

      <h2>Desafios Comuns</h2>
      <p>A jornada para se tornar data-driven não é isenta de desafios. Alguns dos mais comuns incluem:</p>
      <ul>
        <li>Dados isolados em diferentes departamentos</li>
        <li>Falta de confiança na qualidade dos dados</li>
        <li>Resistência cultural à mudança</li>
        <li>Dificuldade em traduzir insights em ações práticas</li>
      </ul>

      <h2>Conclusão</h2>
      <p>A tomada de decisões orientada por dados não é apenas uma tendência, mas uma necessidade para organizações que desejam se manter competitivas. O segredo está em começar pequeno, demonstrar valor e expandir gradualmente a cultura data-driven por toda a organização.</p>
    `,
  },
  "python-data-pipelines": {
    title: "Construindo Pipelines de Dados Eficientes com Python",
    date: "2024-02-28",
    readTime: "8 min",
    content: `
      <p>Pipelines de dados são a espinha dorsal de qualquer operação de análise de dados moderna. Vamos explorar como construir pipelines eficientes e escaláveis usando Python.</p>

      <h2>O Que É Um Pipeline de Dados?</h2>
      <p>Um pipeline de dados é uma série de etapas de processamento onde os dados fluem de uma fonte para um destino, sendo transformados ao longo do caminho. Componentes típicos incluem:</p>
      <ul>
        <li>Extração de dados de diversas fontes</li>
        <li>Transformação e limpeza</li>
        <li>Validação de qualidade</li>
        <li>Carregamento no destino final</li>
      </ul>

      <h2>Ferramentas e Bibliotecas</h2>
      <p>O ecossistema Python oferece diversas ferramentas poderosas para construção de pipelines:</p>
      <ul>
        <li><strong>Pandas:</strong> Para manipulação e análise de dados</li>
        <li><strong>Apache Airflow:</strong> Para orquestração de workflows</li>
        <li><strong>Prefect:</strong> Alternativa moderna ao Airflow</li>
        <li><strong>Great Expectations:</strong> Para validação de dados</li>
      </ul>

      <h2>Melhores Práticas</h2>
      <ol>
        <li><strong>Idempotência:</strong> Pipelines devem produzir os mesmos resultados quando executados múltiplas vezes com os mesmos inputs.</li>
        <li><strong>Monitoramento:</strong> Implemente logging e alertas para detectar falhas rapidamente.</li>
        <li><strong>Testes:</strong> Escreva testes unitários e de integração para suas transformações.</li>
        <li><strong>Documentação:</strong> Documente a lógica de negócio e decisões técnicas.</li>
      </ol>

      <h2>Conclusão</h2>
      <p>Construir pipelines de dados eficientes requer planejamento cuidadoso e atenção aos detalhes. Com as ferramentas certas e boas práticas, é possível criar sistemas robustos que escalam com as necessidades do negócio.</p>
    `,
  },
  "power-bi-best-practices": {
    title: "Power BI: Práticas para Dashboards Profissionais",
    date: "2024-02-10",
    readTime: "6 min",
    content: `
      <p>Criar dashboards eficazes no Power BI vai muito além de simplesmente conectar dados e adicionar visuais. Vamos explorar práticas que elevam a qualidade e utilidade dos seus relatórios.</p>

      <h2>Princípios de Design</h2>
      <p>Um bom dashboard deve ser:</p>
      <ul>
        <li><strong>Claro:</strong> Informações apresentadas de forma direta e compreensível</li>
        <li><strong>Focado:</strong> Apenas as métricas mais relevantes para a audiência</li>
        <li><strong>Consistente:</strong> Cores, fontes e layout padronizados</li>
        <li><strong>Responsivo:</strong> Funciona bem em diferentes dispositivos</li>
      </ul>

      <h2>Otimização de Performance</h2>
      <p>Performance é crucial para a experiência do usuário. Algumas técnicas incluem:</p>
      <ol>
        <li>Usar agregações sempre que possível</li>
        <li>Limitar o número de visuais por página</li>
        <li>Implementar incremental refresh para grandes volumes</li>
        <li>Otimizar o modelo de dados (star schema)</li>
      </ol>

      <h2>Visualizações Eficazes</h2>
      <p>Escolher o tipo certo de visualização é fundamental:</p>
      <ul>
        <li><strong>Gráficos de linha:</strong> Para tendências ao longo do tempo</li>
        <li><strong>Gráficos de barra:</strong> Para comparações entre categorias</li>
        <li><strong>KPIs:</strong> Para métricas principais e variações</li>
        <li><strong>Mapas:</strong> Apenas quando a geografia é relevante</li>
      </ul>

      <h2>Conclusão</h2>
      <p>Dashboards profissionais no Power BI combinam design thoughtful, performance otimizada e visuais apropriados para contar histórias com dados de forma impactante.</p>
    `,
  },
  "etl-modern-stack": {
    title: "ETL Moderno: Além das Ferramentas Tradicionais",
    date: "2024-01-20",
    readTime: "7 min",
    content: `
      <p>O mundo do ETL (Extract, Transform, Load) evoluiu significativamente nos últimos anos. Vamos explorar as tendências modernas e como escolher a arquitetura certa.</p>

      <h2>ETL vs ELT</h2>
      <p>Uma das mudanças mais significativas foi a adoção crescente de ELT (Extract, Load, Transform):</p>
      <ul>
        <li><strong>ETL tradicional:</strong> Transforma dados antes de carregar no destino</li>
        <li><strong>ELT moderno:</strong> Carrega dados brutos e transforma no destino</li>
      </ul>

      <h2>Arquiteturas Modernas</h2>
      <p>As arquiteturas modernas de dados incluem:</p>
      <ol>
        <li><strong>Data Lake:</strong> Armazenamento central de dados brutos</li>
        <li><strong>Data Warehouse:</strong> Dados estruturados e otimizados para análise</li>
        <li><strong>Lakehouse:</strong> Combinação do melhor dos dois mundos</li>
      </ol>

      <h2>Ferramentas do Ecossistema Moderno</h2>
      <p>O mercado oferece diversas soluções para cada necessidade:</p>
      <ul>
        <li><strong>Ingestão:</strong> Fivetran, Airbyte, Stitch</li>
        <li><strong>Transformação:</strong> dbt, Dataform</li>
        <li><strong>Orquestração:</strong> Airflow, Dagster, Prefect</li>
        <li><strong>Qualidade:</strong> Great Expectations, Soda</li>
      </ul>

      <h2>Como Escolher?</h2>
      <p>A escolha da arquitetura e ferramentas depende de diversos fatores:</p>
      <ul>
        <li>Volume e velocidade dos dados</li>
        <li>Complexidade das transformações</li>
        <li>Orçamento disponível</li>
        <li>Expertise da equipe</li>
        <li>Requisitos de governança</li>
      </ul>

      <h2>Conclusão</h2>
      <p>O ETL moderno oferece mais flexibilidade e poder do que nunca. A chave é entender suas necessidades específicas e escolher as ferramentas que melhor se adequam ao seu contexto.</p>
    `,
  },
};

const BlogPost = () => {
  const { id } = useParams();
  const post = id ? blogContent[id] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading mb-4">Post não encontrado</h1>
          <Link to="/blog" className="text-primary hover:underline">
            Voltar ao blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <article className="pt-32 pb-24 px-4">
        <div className="container max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao blog
          </Link>

          <header className="mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-medium mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time>
                {new Date(post.date).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          <div
            className="prose prose-neutral dark:prose-invert max-w-none
              prose-headings:font-heading prose-headings:font-medium
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-li:my-2
              prose-strong:text-foreground prose-strong:font-medium"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
