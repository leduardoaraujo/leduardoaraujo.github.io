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
      "meta.title": "Luiz Eduardo Araujo — dados, análise e IA",
      "meta.description": "Desenvolvedor de dados e IA. Construo produtos de dados, agentes e copilotos que operam sobre bancos de dados, Power BI e documentação — do banco de dados até a ferramenta que as pessoas usam.",
      "meta.ogdescription": "Produtos de dados, agentes e copilotos de IA sobre bancos de dados, Power BI e documentação.",

      "nav.work": "trabalho",
      "nav.about": "sobre",
      "nav.contact": "contato",
      "theme.aria": "Alternar tema claro/escuro",
      "theme.title": "Alternar tema",
      "lang.aria": "Idioma",

      "hero.h1": "Dados, análise e IA — do banco de dados até a ferramenta que as pessoas usam.",
      "hero.p": 'Comecei em analytics com Power BI, SQL e Python. Hoje construo o que vem <em style="font-style:italic;">depois</em> da análise: aplicações, agentes e visualizações sobre bancos de dados, modelos semânticos e documentação. Não só o gráfico — a ferramenta inteira.',

      "do.label": "o que faço",
      "do.1": "Produtos de dados e ferramentas internas sobre dados reais da empresa.",
      "do.2": "Agentes e copilotos de IA que consultam bancos de dados, Power BI e documentação.",
      "do.3": "Integrações, automações e pipelines entre sistemas.",
      "do.4": "BI, modelos semânticos e visualização de dados.",

      "work.label": "trabalho selecionado",
      "work.gav.cat": "copiloto corporativo",
      "work.gav.desc": 'Copiloto que conversa em linguagem natural sobre o ecossistema analítico da empresa: seleciona relatórios, consulta o Power BI e mostra resultados — respeitando regras de negócio e permissões antes de responder. Seu motor de retrieval é open-source, o <a href="https://github.com/leduardoaraujo/OpenContext" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;border-bottom:1px solid var(--line);">OpenContext</a>.',
      "work.pipelinekit.cat": "framework de dados",
      "work.pipelinekit.desc": "Framework ETL para ingestão de APIs, com pipelines declarados em YAML: chamadas assíncronas, transformação de JSON e entrega simultânea para múltiplos destinos.",
      "work.ocr.cat": "visão computacional",
      "work.ocr.desc": "OCR local-first para documentos fiscais brasileiros. Preserva blocos, coordenadas e incerteza — validação determinística primeiro, LLM só para estruturação pontual.",
      "work.schema.cat": "documentação autônoma",
      "work.schema.desc": "Agente que gera documentação técnica a partir de esquemas PostgreSQL via MCP. Documentação viva em Markdown, sem manutenção manual.",

      "about.label": "sobre",
      "about.p1": "Gosto de problemas que juntam código, arquitetura e contexto de negócio numa experiência simples de usar. Meu interesse é IA como interface para sistemas e dados — sem ignorar regras e riscos.",
      "about.p2": "Fora do trabalho, fotografo, escrevo e mantenho projetos pessoais ligados a música.",

      "tools.label": "ferramentas",
      "tools.dev": "dev",
      "tools.data": "dados",
      "tools.analytics": "analytics",
      "tools.ai": "ia",

      "contact.p": "Tem dados, regras e processos que ainda não viraram produto? Escreva.",
      "contact.copy.aria": "Copiar endereço de e-mail",
      "contact.copy.title": "Copiar e-mail",
      "contact.copied": "Copiado!",
      "contact.resume": "Currículo",
      "contact.backtop.aria": "Luiz Eduardo Araujo — voltar ao topo"
    },

    en: {
      "meta.title": "Luiz Eduardo Araujo — data, analytics and AI",
      "meta.description": "Data and AI developer. I build data products, agents and copilots that operate over databases, Power BI and documentation — from the database to the tool people actually use.",
      "meta.ogdescription": "Data products, AI agents and copilots over databases, Power BI and documentation.",

      "nav.work": "work",
      "nav.about": "about",
      "nav.contact": "contact",
      "theme.aria": "Toggle light/dark theme",
      "theme.title": "Toggle theme",
      "lang.aria": "Language",

      "hero.h1": "Data, analytics and AI — from the database to the tool people actually use.",
      "hero.p": 'I started in analytics with Power BI, SQL and Python. Today I build what comes <em style="font-style:italic;">after</em> the analysis: applications, agents and visualizations over databases, semantic models and documentation. Not just the chart — the whole tool.',

      "do.label": "what i do",
      "do.1": "Data products and internal tools built on the company's real data.",
      "do.2": "AI agents and copilots that query databases, Power BI and documentation.",
      "do.3": "Integrations, automations and pipelines between systems.",
      "do.4": "BI, semantic models and data visualization.",

      "work.label": "selected work",
      "work.gav.cat": "enterprise copilot",
      "work.gav.desc": 'A copilot you talk to in natural language about the company\'s analytics ecosystem: it picks reports, queries Power BI and shows results — respecting business rules and permissions before answering. Its retrieval engine is open-source: <a href="https://github.com/leduardoaraujo/OpenContext" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;border-bottom:1px solid var(--line);">OpenContext</a>.',
      "work.pipelinekit.cat": "data framework",
      "work.pipelinekit.desc": "An ETL framework for API ingestion, with pipelines declared in YAML: async calls, JSON transformation and simultaneous delivery to multiple destinations.",
      "work.ocr.cat": "computer vision",
      "work.ocr.desc": "Local-first OCR for Brazilian tax documents. It preserves blocks, coordinates and uncertainty — deterministic validation first, LLM only for targeted structuring.",
      "work.schema.cat": "autonomous docs",
      "work.schema.desc": "An agent that generates technical documentation from PostgreSQL schemas via MCP. Living Markdown docs, no manual upkeep.",

      "about.label": "about",
      "about.p1": "I like problems that bring together code, architecture and business context into something simple to use. My interest is AI as an interface to systems and data — without ignoring rules and risks.",
      "about.p2": "Outside of work, I take photos, write and keep personal projects tied to music.",

      "tools.label": "tools",
      "tools.dev": "dev",
      "tools.data": "data",
      "tools.analytics": "analytics",
      "tools.ai": "ai",

      "contact.p": "Got data, rules and processes that haven't become a product yet? Get in touch.",
      "contact.copy.aria": "Copy email address",
      "contact.copy.title": "Copy email",
      "contact.copied": "Copied!",
      "contact.resume": "Résumé",
      "contact.backtop.aria": "Luiz Eduardo Araujo — back to top"
    },

    es: {
      "meta.title": "Luiz Eduardo Araujo — datos, análisis e IA",
      "meta.description": "Desarrollador de datos e IA. Construyo productos de datos, agentes y copilotos que operan sobre bases de datos, Power BI y documentación — de la base de datos a la herramienta que la gente usa.",
      "meta.ogdescription": "Productos de datos, agentes y copilotos de IA sobre bases de datos, Power BI y documentación.",

      "nav.work": "trabajo",
      "nav.about": "sobre",
      "nav.contact": "contacto",
      "theme.aria": "Alternar tema claro/oscuro",
      "theme.title": "Alternar tema",
      "lang.aria": "Idioma",

      "hero.h1": "Datos, análisis e IA — de la base de datos a la herramienta que la gente usa.",
      "hero.p": 'Empecé en analytics con Power BI, SQL y Python. Hoy construyo lo que viene <em style="font-style:italic;">después</em> del análisis: aplicaciones, agentes y visualizaciones sobre bases de datos, modelos semánticos y documentación. No solo el gráfico — la herramienta entera.',

      "do.label": "lo que hago",
      "do.1": "Productos de datos y herramientas internas sobre datos reales de la empresa.",
      "do.2": "Agentes y copilotos de IA que consultan bases de datos, Power BI y documentación.",
      "do.3": "Integraciones, automatizaciones y pipelines entre sistemas.",
      "do.4": "BI, modelos semánticos y visualización de datos.",

      "work.label": "trabajo seleccionado",
      "work.gav.cat": "copiloto corporativo",
      "work.gav.desc": 'Copiloto con el que hablas en lenguaje natural sobre el ecosistema analítico de la empresa: selecciona informes, consulta Power BI y muestra resultados — respetando reglas de negocio y permisos antes de responder. Su motor de retrieval es open-source: <a href="https://github.com/leduardoaraujo/OpenContext" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;border-bottom:1px solid var(--line);">OpenContext</a>.',
      "work.pipelinekit.cat": "framework de datos",
      "work.pipelinekit.desc": "Framework ETL para ingesta de APIs, con pipelines declarados en YAML: llamadas asíncronas, transformación de JSON y entrega simultánea a múltiples destinos.",
      "work.ocr.cat": "visión artificial",
      "work.ocr.desc": "OCR local-first para documentos fiscales brasileños. Preserva bloques, coordenadas e incertidumbre — validación determinista primero, LLM solo para estructuración puntual.",
      "work.schema.cat": "documentación autónoma",
      "work.schema.desc": "Agente que genera documentación técnica a partir de esquemas PostgreSQL vía MCP. Documentación viva en Markdown, sin mantenimiento manual.",

      "about.label": "sobre",
      "about.p1": "Me gustan los problemas que juntan código, arquitectura y contexto de negocio en una experiencia simple de usar. Mi interés es la IA como interfaz para sistemas y datos — sin ignorar reglas y riesgos.",
      "about.p2": "Fuera del trabajo, fotografío, escribo y mantengo proyectos personales ligados a la música.",

      "tools.label": "herramientas",
      "tools.dev": "dev",
      "tools.data": "datos",
      "tools.analytics": "analytics",
      "tools.ai": "ia",

      "contact.p": "¿Tienes datos, reglas y procesos que aún no se han vuelto producto? Escríbeme.",
      "contact.copy.aria": "Copiar dirección de correo",
      "contact.copy.title": "Copiar correo",
      "contact.copied": "¡Copiado!",
      "contact.resume": "Currículum",
      "contact.backtop.aria": "Luiz Eduardo Araujo — volver arriba"
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
