import { Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "luiz.dataeng@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in//",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/",
    },
  ];

  return (
    <footer id="contact" className="py-32 px-4 border-t border-border relative z-10">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">
          Contato
        </h2>

        <div className="space-y-8">
          <p className="text-2xl md:text-3xl font-heading font-medium max-w-2xl">
            Disponível para novos projetos e colaborações.
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <social.icon className="h-5 w-5" />
                <span className="text-sm">{social.name}</span>
              </a>
            ))}
            
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="text-sm">
                {copied ? "Email copiado!" : email}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Luiz Eduardo Araújo
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
