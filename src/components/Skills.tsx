const skills = [
  {
    category: "Data Engineering",
    items: ["Apache Spark", "Airflow", "dbt", "ETL/ELT Pipelines", "Data Modeling"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Docker", "Terraform", "CI/CD"],
  },
  {
    category: "Análise & ML",
    items: ["Python", "SQL", "Statistical Modeling", "Scikit-learn", "MLOps"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "NoSQL", "Query Optimization"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-32 px-4 border-t border-border relative z-10 bg-background/90 backdrop-blur-sm">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">
          Competências
        </h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {skills.map((skill) => (
            <div key={skill.category}>
              <h3 className="font-heading text-xl font-medium mb-4">
                {skill.category}
              </h3>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li key={item} className="text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
