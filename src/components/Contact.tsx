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

  return (
    <footer id="contact" className="bg-lime-300 px-4 py-12 text-zinc-950 md:py-14">
      <div className="mx-auto w-full max-w-7xl">
        <p className="mb-4 text-xs uppercase">004 / Contato</p>
        <h2 className="mb-7 max-w-4xl font-heading text-[clamp(2.1rem,6vw,5rem)] font-medium leading-[0.92]">
          Vamos construir a próxima interface dos seus dados?
        </h2>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm text-lime-200 transition hover:bg-zinc-800"
          >
            <Mail className="h-4 w-4" />
            {copied ? "Email copiado" : email}
          </button>
          <a
            href="https://www.linkedin.com/in/leduardoaraujo/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-950 px-5 py-3 text-sm transition hover:bg-zinc-950 hover:text-lime-200"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/leduardoaraujo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-950 px-5 py-3 text-sm transition hover:bg-zinc-950 hover:text-lime-200"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>

        <p className="mt-8 text-sm">© {new Date().getFullYear()} Luiz Eduardo Araújo</p>
      </div>
    </footer>
  );
};

export default Contact;
