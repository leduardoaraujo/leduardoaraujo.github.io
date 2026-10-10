/* i18n — auto-detecta o idioma do navegador (pt/en/es) com seletor manual.
   Padrão idêntico ao toggle de tema: persiste a escolha em localStorage.
   - [data-i18n="chave"]        -> troca innerHTML (funciona com HTML embutido)
   - [data-i18n-attr="attr:chave;..."] -> troca atributos (title, aria-label, content)
   Nomes de projetos, stacks de tecnologia, e-mail e links sociais NÃO são traduzidos. */
(function () {
  "use strict";

  var LANGS = ["pt", "en", "es"];
  var HTML_LANG = { pt: "pt-BR", en: "en", es: "es" };
  var OG_LOCALE = { pt: "pt_BR", en: "en_US", es: "es_ES" };

  var dict = {
    pt: {
      "meta.title": "Luiz Eduardo Araujo | dados, análise e IA",
      "meta.description": "Desenvolvedor de dados e IA. Construo ferramentas internas, agentes e copilotos que trabalham sobre bancos de dados, Power BI e documentação.",
      "meta.ogdescription": "Produtos de dados, agentes e copilotos de IA sobre bancos de dados, Power BI e documentação.",

      "nav.work": "trabalho",
      "nav.about": "sobre",
      "nav.contact": "contato",
      "theme.aria": "Alternar tema claro/escuro",
      "theme.title": "Alternar tema",
      "lang.aria": "Idioma",

      "hero.h1": "Desenvolvo ferramentas de dados e IA.",
      "hero.p": "Comecei em analytics com Power BI, SQL e Python. Hoje também construo aplicações, agentes e visualizações em cima de bancos de dados, modelos semânticos e documentação, para que as pessoas consigam usar os dados sem depender de um relatório pronto.",

      "do.label": "o que faço",
      "do.1": "Produtos de dados e ferramentas internas sobre dados reais da empresa.",
      "do.2": "Agentes e copilotos de IA que consultam bancos de dados, Power BI e documentação.",
      "do.3": "Integrações, automações e pipelines entre sistemas.",
      "do.4": "BI, modelos semânticos e visualização de dados.",

      "work.label": "trabalho selecionado",
      "work.prev": "Projeto anterior",
      "work.next": "Próximo projeto",
      "work.gallery": "Projetos",
      "work.gav.cat": "copiloto corporativo",
      "work.gav.desc": "Copiloto que responde perguntas em linguagem natural sobre o ecossistema analítico da empresa: escolhe o relatório certo, consulta o Power BI e mostra o resultado. Antes de responder, verifica regras de negócio e permissões. O motor de retrieval é open-source: <a href=\"https://github.com/leduardoaraujo/OpenContext\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent);text-decoration:none;border-bottom:1px solid var(--line);\">OpenContext</a>.",
      "work.pipelinekit.cat": "framework de dados",
      "work.pipelinekit.desc": "Framework ETL para ingestão de APIs, com pipelines declarados em YAML: chamadas assíncronas, transformação de JSON e entrega simultânea para múltiplos destinos.",
      "work.ocr.cat": "visão computacional",
      "work.ocr.desc": "OCR local-first para documentos fiscais brasileiros. Preserva blocos, coordenadas e incerteza. A validação é determinística; o LLM entra só para estruturar trechos específicos.",
      "work.od.cat": "modelo de decisão",
      "work.od.desc": "Classificador que escolhe a próxima ação de um agente a partir de uma descrição do estado atual. Devolve a probabilidade de cada ação e pede revisão humana quando a mais alta fica abaixo de um limiar. O gráfico mostra a saída real do exemplo de passagens aéreas: a ação certa venceu, mas com pouca confiança, então o caso vai para revisão.",
      "work.gav.fig": "Fluxo: pergunta, OpenContext escolhe o relatório, checagem de permissões, consulta ao Power BI e resposta",
      "work.pk.fig": "Fluxo: arquivo YAML define conector de API, transformação de JSON e vários destinos, como PostgreSQL, DuckDB e S3",
      "work.ocr.fig": "Fluxo: página com blocos e caixas de coordenadas, validação determinística dos campos, LLM só para o campo incerto, saída em JSON",
      "work.od.fig": "Probabilidades reais do modelo de passagens para um estado com origem, destino e data, mas sem busca de voos: buscar_voos 0.437, abaixo do limiar de 0.70, então o modelo pede revisão",
      "fig.question": "pergunta",
      "fig.answer": "resposta",
      "fig.gav.pick": "escolhe o relatório",
      "fig.gav.perm": "permissões",
      "fig.gav.rules": "e regras de negócio",
      "fig.pk.norm": "normaliza",
      "fig.ocr.val": "validação determinística",
      "fig.ocr.date": "data",
      "fig.ocr.item": "descrição",
      "fig.od.state": "<tspan x=\"10\" y=\"24\">origem GRU, destino REC</tspan><tspan x=\"10\" y=\"40\">ida 12/11, 1 adulto</tspan><tspan x=\"10\" y=\"56\">sem busca de voos</tspan>",
      "fig.od.model": "regressão logística",
      "fig.od.thr": "limiar 0.70",

      "about.label": "sobre",
      "about.p1": "Gosto de problemas que juntam código, arquitetura e contexto de negócio numa coisa simples de usar. Me interessa usar IA como interface para sistemas e dados, levando a sério as regras e os riscos de cada caso.",
      "about.p2": "Fora do trabalho, fotografo, escrevo e mantenho projetos pessoais ligados a música.",

      "tools.label": "ferramentas",
      "tools.dev": "dev",
      "tools.data": "dados",
      "tools.analytics": "analytics",
      "tools.ai": "ia",

      "contact.p": "Se quiser conversar sobre um projeto, me mande um e-mail.",
      "contact.copy.aria": "Copiar endereço de e-mail",
      "contact.copy.title": "Copiar e-mail",
      "contact.copied": "Copiado!",
      "contact.resume": "Currículo",
      "contact.backtop.aria": "Luiz Eduardo Araujo, voltar ao topo"
    },

    en: {
      "meta.title": "Luiz Eduardo Araujo | data, analytics and AI",
      "meta.description": "Data and AI developer. I build internal tools, agents and copilots that work on top of databases, Power BI and documentation.",
      "meta.ogdescription": "Data products, AI agents and copilots over databases, Power BI and documentation.",

      "nav.work": "work",
      "nav.about": "about",
      "nav.contact": "contact",
      "theme.aria": "Toggle light/dark theme",
      "theme.title": "Toggle theme",
      "lang.aria": "Language",

      "hero.h1": "I build data and AI tools.",
      "hero.p": "I started in analytics with Power BI, SQL and Python. These days I also build applications, agents and visualizations on top of databases, semantic models and documentation, so people can use their data without waiting for someone to build a report.",

      "do.label": "what i do",
      "do.1": "Data products and internal tools built on the company's real data.",
      "do.2": "AI agents and copilots that query databases, Power BI and documentation.",
      "do.3": "Integrations, automations and pipelines between systems.",
      "do.4": "BI, semantic models and data visualization.",

      "work.label": "selected work",
      "work.prev": "Previous project",
      "work.next": "Next project",
      "work.gallery": "Projects",
      "work.gav.cat": "enterprise copilot",
      "work.gav.desc": "A copilot that answers natural-language questions about the company's analytics ecosystem: it picks the right report, queries Power BI and shows the result. Before answering, it checks business rules and permissions. The retrieval engine is open source: <a href=\"https://github.com/leduardoaraujo/OpenContext\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent);text-decoration:none;border-bottom:1px solid var(--line);\">OpenContext</a>.",
      "work.pipelinekit.cat": "data framework",
      "work.pipelinekit.desc": "An ETL framework for API ingestion, with pipelines declared in YAML: async calls, JSON transformation and simultaneous delivery to multiple destinations.",
      "work.ocr.cat": "computer vision",
      "work.ocr.desc": "Local-first OCR for Brazilian tax documents. It keeps blocks, coordinates and uncertainty. Validation is deterministic; the LLM is only used to structure specific fields.",
      "work.od.cat": "decision model",
      "work.od.desc": "A classifier that picks an agent's next action from a description of its current state. It returns a probability for each action and asks for human review when the top one falls below a threshold. The chart shows the real output for the flight-booking example: the right action won, but with low confidence, so the case goes to review.",
      "work.gav.fig": "Flow: question, OpenContext picks the report, permission check, Power BI query and answer",
      "work.pk.fig": "Flow: a YAML file defines an API connector, a JSON transform and several destinations, such as PostgreSQL, DuckDB and S3",
      "work.ocr.fig": "Flow: a page with blocks and coordinate boxes, deterministic field validation, an LLM only for the uncertain field, JSON output",
      "work.od.fig": "Real probabilities from the flight model for a state with origin, destination and date but no flight search: buscar_voos 0.437, below the 0.70 threshold, so the model asks for review",
      "fig.question": "question",
      "fig.answer": "answer",
      "fig.gav.pick": "picks the report",
      "fig.gav.perm": "permissions",
      "fig.gav.rules": "and business rules",
      "fig.pk.norm": "normalize",
      "fig.ocr.val": "deterministic validation",
      "fig.ocr.date": "date",
      "fig.ocr.item": "description",
      "fig.od.state": "<tspan x=\"10\" y=\"24\">from GRU to REC</tspan><tspan x=\"10\" y=\"40\">Nov 12, 1 adult</tspan><tspan x=\"10\" y=\"56\">no flight search yet</tspan>",
      "fig.od.model": "logistic regression",
      "fig.od.thr": "threshold 0.70",

      "about.label": "about",
      "about.p1": "I like problems that mix code, architecture and business context into something simple to use. I'm interested in AI as an interface to systems and data, taking each case's rules and risks seriously.",
      "about.p2": "Outside of work, I take photos, write and keep personal projects tied to music.",

      "tools.label": "tools",
      "tools.dev": "dev",
      "tools.data": "data",
      "tools.analytics": "analytics",
      "tools.ai": "ai",

      "contact.p": "If you want to talk about a project, send me an email.",
      "contact.copy.aria": "Copy email address",
      "contact.copy.title": "Copy email",
      "contact.copied": "Copied!",
      "contact.resume": "Résumé",
      "contact.backtop.aria": "Luiz Eduardo Araujo, back to top"
    },

    es: {
      "meta.title": "Luiz Eduardo Araujo | datos, análisis e IA",
      "meta.description": "Desarrollador de datos e IA. Construyo herramientas internas, agentes y copilotos que trabajan sobre bases de datos, Power BI y documentación.",
      "meta.ogdescription": "Productos de datos, agentes y copilotos de IA sobre bases de datos, Power BI y documentación.",

      "nav.work": "trabajo",
      "nav.about": "sobre",
      "nav.contact": "contacto",
      "theme.aria": "Alternar tema claro/oscuro",
      "theme.title": "Alternar tema",
      "lang.aria": "Idioma",

      "hero.h1": "Desarrollo herramientas de datos e IA.",
      "hero.p": "Empecé en analytics con Power BI, SQL y Python. Hoy también construyo aplicaciones, agentes y visualizaciones sobre bases de datos, modelos semánticos y documentación, para que la gente pueda usar los datos sin depender de un informe hecho.",

      "do.label": "lo que hago",
      "do.1": "Productos de datos y herramientas internas sobre datos reales de la empresa.",
      "do.2": "Agentes y copilotos de IA que consultan bases de datos, Power BI y documentación.",
      "do.3": "Integraciones, automatizaciones y pipelines entre sistemas.",
      "do.4": "BI, modelos semánticos y visualización de datos.",

      "work.label": "trabajo seleccionado",
      "work.prev": "Proyecto anterior",
      "work.next": "Proyecto siguiente",
      "work.gallery": "Proyectos",
      "work.gav.cat": "copiloto corporativo",
      "work.gav.desc": "Copiloto que responde preguntas en lenguaje natural sobre el ecosistema analítico de la empresa: elige el informe correcto, consulta Power BI y muestra el resultado. Antes de responder, verifica reglas de negocio y permisos. El motor de retrieval es open source: <a href=\"https://github.com/leduardoaraujo/OpenContext\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent);text-decoration:none;border-bottom:1px solid var(--line);\">OpenContext</a>.",
      "work.pipelinekit.cat": "framework de datos",
      "work.pipelinekit.desc": "Framework ETL para ingesta de APIs, con pipelines declarados en YAML: llamadas asíncronas, transformación de JSON y entrega simultánea a múltiples destinos.",
      "work.ocr.cat": "visión artificial",
      "work.ocr.desc": "OCR local-first para documentos fiscales brasileños. Conserva bloques, coordenadas e incertidumbre. La validación es determinista; el LLM solo se usa para estructurar campos específicos.",
      "work.od.cat": "modelo de decisión",
      "work.od.desc": "Clasificador que elige la próxima acción de un agente a partir de una descripción de su estado actual. Devuelve la probabilidad de cada acción y pide revisión humana cuando la más alta queda por debajo de un umbral. El gráfico muestra la salida real del ejemplo de pasajes aéreos: ganó la acción correcta, pero con poca confianza, así que el caso pasa a revisión.",
      "work.gav.fig": "Flujo: pregunta, OpenContext elige el informe, control de permisos, consulta a Power BI y respuesta",
      "work.pk.fig": "Flujo: un archivo YAML define un conector de API, una transformación de JSON y varios destinos, como PostgreSQL, DuckDB y S3",
      "work.ocr.fig": "Flujo: página con bloques y cajas de coordenadas, validación determinista de los campos, LLM solo para el campo incierto, salida en JSON",
      "work.od.fig": "Probabilidades reales del modelo de pasajes para un estado con origen, destino y fecha pero sin búsqueda de vuelos: buscar_voos 0.437, por debajo del umbral de 0.70, así que el modelo pide revisión",
      "fig.question": "pregunta",
      "fig.answer": "respuesta",
      "fig.gav.pick": "elige el informe",
      "fig.gav.perm": "permisos",
      "fig.gav.rules": "y reglas de negocio",
      "fig.pk.norm": "normaliza",
      "fig.ocr.val": "validación determinista",
      "fig.ocr.date": "fecha",
      "fig.ocr.item": "descripción",
      "fig.od.state": "<tspan x=\"10\" y=\"24\">de GRU a REC</tspan><tspan x=\"10\" y=\"40\">ida 12/11, 1 adulto</tspan><tspan x=\"10\" y=\"56\">sin buscar vuelos</tspan>",
      "fig.od.model": "regresión logística",
      "fig.od.thr": "umbral 0.70",

      "about.label": "sobre",
      "about.p1": "Me gustan los problemas que mezclan código, arquitectura y contexto de negocio en algo simple de usar. Me interesa la IA como interfaz para sistemas y datos, tomando en serio las reglas y los riesgos de cada caso.",
      "about.p2": "Fuera del trabajo, fotografío, escribo y mantengo proyectos personales ligados a la música.",

      "tools.label": "herramientas",
      "tools.dev": "dev",
      "tools.data": "datos",
      "tools.analytics": "analytics",
      "tools.ai": "ia",

      "contact.p": "Si quieres hablar de un proyecto, escríbeme un correo.",
      "contact.copy.aria": "Copiar dirección de correo",
      "contact.copy.title": "Copiar correo",
      "contact.copied": "¡Copiado!",
      "contact.resume": "Currículum",
      "contact.backtop.aria": "Luiz Eduardo Araujo, volver arriba"
    }
  };

  function detect() {
    try {
      var saved = localStorage.getItem("lang");
      if (LANGS.indexOf(saved) > -1) return saved;
    } catch (e) {}
    var n = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    if (n.indexOf("pt") === 0) return "pt";
    if (n.indexOf("es") === 0) return "es";
    return "en";
  }

  function apply(lang) {
    var d = dict[lang] || dict.pt;

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var k = nodes[i].getAttribute("data-i18n");
      if (d[k] != null) nodes[i].innerHTML = d[k];
    }

    var attrNodes = document.querySelectorAll("[data-i18n-attr]");
    for (var j = 0; j < attrNodes.length; j++) {
      var pairs = attrNodes[j].getAttribute("data-i18n-attr").split(";");
      for (var p = 0; p < pairs.length; p++) {
        var parts = pairs[p].split(":");
        if (parts.length < 2) continue;
        var attr = parts[0].trim();
        var key = parts[1].trim();
        if (d[key] != null) attrNodes[j].setAttribute(attr, d[key]);
      }
    }

    document.documentElement.setAttribute("lang", HTML_LANG[lang] || "pt-BR");
    var ogl = document.querySelector('meta[property="og:locale"]');
    if (ogl) ogl.setAttribute("content", OG_LOCALE[lang] || "pt_BR");
    if (d["meta.title"]) document.title = d["meta.title"];

    var btns = document.querySelectorAll("[data-lang-btn]");
    for (var b = 0; b < btns.length; b++) {
      btns[b].setAttribute("aria-pressed", btns[b].getAttribute("data-lang-btn") === lang ? "true" : "false");
    }

    var current = document.querySelector("[data-lang-current]");
    if (current) current.textContent = lang.toUpperCase();

    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  function init() {
    apply(detect());

    var toggle = document.getElementById("lang-toggle");
    var menu = document.getElementById("lang-menu");

    function openMenu() {
      if (!menu || !toggle) return;
      menu.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    }
    function closeMenu() {
      if (!menu || !toggle) return;
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }

    if (toggle && menu) {
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        if (menu.hidden) openMenu(); else closeMenu();
      });
      document.addEventListener("click", function (e) {
        if (!menu.hidden && !menu.contains(e.target) && e.target !== toggle) closeMenu();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !menu.hidden) { closeMenu(); toggle.focus(); }
      });
    }

    var btns = document.querySelectorAll("[data-lang-btn]");
    for (var b = 0; b < btns.length; b++) {
      (function (btn) {
        btn.addEventListener("click", function () {
          apply(btn.getAttribute("data-lang-btn"));
          closeMenu();
        });
      })(btns[b]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
