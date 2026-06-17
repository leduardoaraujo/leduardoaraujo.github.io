import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToContact = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-zinc-950/70 text-zinc-100 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        <Link to="/" className="text-sm font-medium uppercase">
          L.E.A.
        </Link>

        <div className="flex items-center gap-4 text-xs uppercase text-zinc-400 sm:gap-6">
          <a href="/#projects" className="hidden transition hover:text-lime-300 sm:inline">
            Projetos
          </a>
          <a href="/#skills" className="hidden transition hover:text-lime-300 sm:inline">
            Stack
          </a>
          <Link to="/blog" className="hidden transition hover:text-lime-300 sm:inline">
            Blog
          </Link>
          <button onClick={scrollToContact} className="transition hover:text-lime-300">
            Contato
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
