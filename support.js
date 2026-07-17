(function () {
  "use strict";

  var EMAILJS_CONFIG = {
    publicKey: "UGM02WXhqyyFQ8v5g",
    serviceId: "service_ovszbeh",
    templateId: "template_48exd6r"
  };

  var EMAILJS_SDK = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
  var STORAGE_KEY = "contact-chat-open";
  var RATE_LIMIT_KEY = "contact-chat-last-submit";

  var copy = {
    pt: {
      eyebrow: "contato guiado",
      collapsed: "Conte o que você quer construir.",
      collapsedMeta: "leva cerca de 1 minuto",
      close: "Fechar contato",
      progress: "etapa {current} de 4",
      name: "Como posso te chamar?",
      nameHint: "Primeiro, uma apresentação rápida.",
      email: "Por onde eu te respondo?",
      emailHint: "Seu e-mail será usado apenas para este contato.",
      topic: "O que trouxe você até aqui?",
      topicHint: "Escolha uma direção ou escreva do seu jeito.",
      message: "Agora me conta o contexto.",
      messageHint: "Problema, ideia, prazo ou qualquer detalhe que ajude.",
      review: "Tudo certo para enviar?",
      reviewHint: "Revise os detalhes antes de a mensagem seguir para o Luiz.",
      placeholderName: "Seu nome",
      placeholderEmail: "voce@empresa.com",
      placeholderTopic: "Assunto da conversa",
      placeholderMessage: "Escreva sua mensagem...",
      next: "Continuar",
      send: "Enviar mensagem",
      edit: "Editar",
      restart: "Recomeçar",
      sending: "Enviando...",
      successTitle: "Mensagem a caminho.",
      success: "Obrigado pelo contexto. O Luiz responde assim que puder.",
      newMessage: "Enviar outra",
      error: "Não consegui enviar agora. Tente novamente em alguns minutos ou use o e-mail direto.",
      invalidEmail: "Esse e-mail parece incompleto. Pode conferir?",
      shortMessage: "Me dê um pouco mais de contexto antes de continuar.",
      rateLimit: "Espere alguns segundos antes de enviar outra mensagem.",
      configMissing: "O contato está pronto, mas falta configurar o EmailJS.",
      summaryName: "nome",
      summaryEmail: "e-mail",
      summaryTopic: "assunto",
      summaryMessage: "mensagem",
      topics: ["Novo projeto", "Consultoria", "Parceria", "Só uma conversa"]
    },
    en: {
      eyebrow: "guided contact",
      collapsed: "Tell me what you want to build.",
      collapsedMeta: "takes about 1 minute",
      close: "Close contact",
      progress: "step {current} of 4",
      name: "What should I call you?",
      nameHint: "First, a quick introduction.",
      email: "Where should I reply?",
      emailHint: "Your email will only be used for this conversation.",
      topic: "What brought you here?",
      topicHint: "Pick a direction or write it in your own words.",
      message: "Now, give me the context.",
      messageHint: "The problem, idea, timeline, or any useful detail.",
      review: "Ready to send?",
      reviewHint: "Review the details before your message goes to Luiz.",
      placeholderName: "Your name",
      placeholderEmail: "you@company.com",
      placeholderTopic: "Conversation topic",
      placeholderMessage: "Write your message...",
      next: "Continue",
      send: "Send message",
      edit: "Edit",
      restart: "Start over",
      sending: "Sending...",
      successTitle: "Message on its way.",
      success: "Thanks for the context. Luiz will reply as soon as he can.",
      newMessage: "Send another",
      error: "I could not send it right now. Try again in a few minutes or use the direct email.",
      invalidEmail: "That email looks incomplete. Could you check it?",
      shortMessage: "Give me a little more context before continuing.",
      rateLimit: "Wait a few seconds before sending another message.",
      configMissing: "The contact is ready, but EmailJS still needs to be configured.",
      summaryName: "name",
      summaryEmail: "email",
      summaryTopic: "subject",
      summaryMessage: "message",
      topics: ["New project", "Consulting", "Partnership", "Just a conversation"]
    },
    es: {
      eyebrow: "contacto guiado",
      collapsed: "Cuéntame qué quieres construir.",
      collapsedMeta: "tarda cerca de 1 minuto",
      close: "Cerrar contacto",
      progress: "paso {current} de 4",
      name: "¿Cómo puedo llamarte?",
      nameHint: "Primero, una presentación rápida.",
      email: "¿Dónde te respondo?",
      emailHint: "Tu correo solo se usará para este contacto.",
      topic: "¿Qué te trajo hasta aquí?",
      topicHint: "Elige una dirección o escríbelo a tu manera.",
      message: "Ahora cuéntame el contexto.",
      messageHint: "El problema, la idea, el plazo o cualquier detalle útil.",
      review: "¿Todo listo para enviar?",
      reviewHint: "Revisa los detalles antes de enviar el mensaje a Luiz.",
      placeholderName: "Tu nombre",
      placeholderEmail: "tu@empresa.com",
      placeholderTopic: "Tema de la conversación",
      placeholderMessage: "Escribe tu mensaje...",
      next: "Continuar",
      send: "Enviar mensaje",
      edit: "Editar",
      restart: "Empezar de nuevo",
      sending: "Enviando...",
      successTitle: "Mensaje en camino.",
      success: "Gracias por el contexto. Luiz responderá en cuanto pueda.",
      newMessage: "Enviar otro",
      error: "No pude enviarlo ahora. Intenta de nuevo en unos minutos o usa el correo directo.",
      invalidEmail: "Ese correo parece incompleto. ¿Puedes revisarlo?",
      shortMessage: "Cuéntame un poco más antes de continuar.",
      rateLimit: "Espera unos segundos antes de enviar otro mensaje.",
      configMissing: "El contacto está listo, pero falta configurar EmailJS.",
      summaryName: "nombre",
      summaryEmail: "correo",
      summaryTopic: "asunto",
      summaryMessage: "mensaje",
      topics: ["Nuevo proyecto", "Consultoría", "Colaboración", "Solo conversar"]
    }
  };

  var steps = ["name", "email", "topic", "message", "review"];
  var state = { index: 0, data: {}, sending: false, done: false };
  var ui = {};

  function lang() {
    var value = (document.documentElement.getAttribute("lang") || "pt").toLowerCase();
    if (value.indexOf("en") === 0) return "en";
    if (value.indexOf("es") === 0) return "es";
    return "pt";
  }

  function t(key) {
    return (copy[lang()] || copy.pt)[key];
  }

  function configured() {
    return EMAILJS_CONFIG.publicKey.indexOf("YOUR_") !== 0 &&
      EMAILJS_CONFIG.serviceId.indexOf("YOUR_") !== 0 &&
      EMAILJS_CONFIG.templateId.indexOf("YOUR_") !== 0;
  }

  function emailValid(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char];
    });
  }

  function loadEmailJs() {
    return new Promise(function (resolve, reject) {
      if (window.emailjs) return resolve(window.emailjs);
      var script = document.createElement("script");
      script.src = EMAILJS_SDK;
      script.async = true;
      script.onload = function () { resolve(window.emailjs); };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function injectStyles() {
    var style = document.createElement("style");
    style.id = "guided-contact-styles";
    style.textContent = [
      ".guided-contact{width:100%;margin:32px 0 30px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif}",
      ".guided-contact button,.guided-contact input,.guided-contact textarea{font-family:inherit}",
      ".guided-contact__launcher{width:100%;display:grid;grid-template-columns:1fr auto;align-items:center;gap:24px;padding:22px 0;border:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:transparent;color:var(--ink);text-align:left;cursor:pointer}",
      ".guided-contact__launcher:hover .guided-contact__launcher-title{color:var(--accent)}",
      ".guided-contact__launcher:hover .guided-contact__arrow{transform:translateX(4px)}",
      ".guided-contact__eyebrow{display:block;margin-bottom:5px;color:var(--muted);font-size:11px;line-height:1.2;text-transform:lowercase}",
      ".guided-contact__launcher-title{display:block;color:var(--ink);font-size:20px;line-height:1.35;transition:color .2s ease}",
      ".guided-contact__launcher-side{display:flex;align-items:center;gap:14px;color:var(--muted);font-size:11px;white-space:nowrap}",
      ".guided-contact__arrow{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--ink);color:var(--bg);font-size:20px;line-height:1;transition:transform .2s ease,background-color .35s ease,color .35s ease}",
      ".guided-contact__panel{position:relative;border-top:1px solid var(--ink);border-bottom:1px solid var(--line);overflow:hidden}",
      ".guided-contact__panel[hidden],.guided-contact.is-open .guided-contact__launcher{display:none}",
      ".guided-contact__top{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:15px 0 13px}",
      ".guided-contact__top-left{display:flex;align-items:center;gap:12px;color:var(--muted);font-size:11px;line-height:1}",
      ".guided-contact__signal{width:7px;height:7px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 14%,transparent)}",
      ".guided-contact__close{width:30px;height:30px;display:grid;place-items:center;padding:0;border:0;background:transparent;color:var(--nav);font-size:22px;font-weight:300;line-height:1;cursor:pointer}",
      ".guided-contact__close:hover{color:var(--accent)}",
      ".guided-contact__progress{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;height:2px;margin-bottom:clamp(34px,6vw,54px)}",
      ".guided-contact__progress span{background:var(--line-soft);transition:background-color .25s ease}",
      ".guided-contact__progress span.is-active{background:var(--accent)}",
      ".guided-contact__stage{min-height:245px;padding:0 0 24px;animation:guided-in .28s ease both}",
      ".guided-contact__question{max-width:22ch;margin:0 0 8px;color:var(--ink);font-size:clamp(24px,4vw,32px);font-weight:400;line-height:1.18}",
      ".guided-contact__hint{margin:0 0 28px;color:var(--muted);font-size:13px;line-height:1.5}",
      ".guided-contact__form{display:grid;grid-template-columns:1fr auto;align-items:end;gap:18px}",
      ".guided-contact__field{width:100%;min-width:0;padding:9px 0 11px;border:0;border-bottom:1px solid var(--line);border-radius:0;background:transparent;color:var(--ink);font-size:18px;line-height:1.4;resize:none}",
      ".guided-contact__field:focus{outline:0;border-color:var(--accent)}",
      ".guided-contact__field::placeholder{color:var(--muted);opacity:.7}",
      ".guided-contact__field--message{min-height:88px;max-height:180px}",
      ".guided-contact__submit{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:42px;padding:0 16px;border:1px solid var(--ink);border-radius:4px;background:var(--ink);color:var(--bg);font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap}",
      ".guided-contact__submit:hover{background:var(--accent);border-color:var(--accent);color:var(--bg)}",
      ".guided-contact__submit:disabled{opacity:.5;cursor:not-allowed}",
      ".guided-contact__submit-arrow{font-size:17px;font-weight:400;line-height:1}",
      ".guided-contact__error{min-height:18px;margin:10px 0 0;color:var(--accent);font-size:12px;line-height:1.45}",
      ".guided-contact__topics{display:flex;flex-wrap:wrap;gap:7px;margin:-10px 0 22px}",
      ".guided-contact__topic{padding:7px 10px;border:1px solid var(--line);border-radius:4px;background:transparent;color:var(--nav);font-size:12px;line-height:1;cursor:pointer}",
      ".guided-contact__topic:hover,.guided-contact__topic.is-selected{border-color:var(--accent);color:var(--accent);background:color-mix(in srgb,var(--accent) 7%,transparent)}",
      ".guided-contact__trail{display:flex;flex-wrap:wrap;gap:7px 18px;margin:0 0 24px;padding:0;list-style:none}",
      ".guided-contact__trail li{max-width:100%;color:var(--muted);font-size:11px;line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".guided-contact__trail b{margin-right:6px;color:var(--accent);font-weight:500}",
      ".guided-contact__review{display:grid;grid-template-columns:110px 1fr;gap:0;margin:3px 0 26px;border-top:1px solid var(--line-soft)}",
      ".guided-contact__review dt,.guided-contact__review dd{margin:0;padding:12px 0;border-bottom:1px solid var(--line-soft);font-size:13px;line-height:1.45}",
      ".guided-contact__review dt{color:var(--muted)}",
      ".guided-contact__review dd{color:var(--ink);overflow-wrap:anywhere}",
      ".guided-contact__review-actions{display:flex;align-items:center;gap:18px}",
      ".guided-contact__text-button{padding:0;border:0;background:transparent;color:var(--nav);font-size:12px;cursor:pointer}",
      ".guided-contact__text-button:hover{color:var(--accent)}",
      ".guided-contact__success{min-height:245px;display:grid;grid-template-columns:auto 1fr;align-content:center;gap:18px;padding:8px 0 40px}",
      ".guided-contact__check{width:38px;height:38px;display:grid;place-items:center;border-radius:50%;background:var(--accent);color:var(--bg);font-size:18px}",
      ".guided-contact__success h2{margin:0 0 5px;font-size:25px;font-weight:400;line-height:1.2}",
      ".guided-contact__success p{margin:0 0 16px;color:var(--muted);font-size:13px;line-height:1.5}",
      "@keyframes guided-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}",
      "@media (max-width:560px){.guided-contact{margin-top:26px}.guided-contact__launcher{padding:18px 0}.guided-contact__launcher-title{font-size:18px}.guided-contact__launcher-side>span{display:none}.guided-contact__stage{min-height:270px}.guided-contact__form{grid-template-columns:1fr}.guided-contact__submit{justify-self:start}.guided-contact__review{grid-template-columns:82px 1fr}.guided-contact__trail{gap:5px 12px}.guided-contact__question{font-size:26px}}",
      "@media (prefers-reduced-motion:reduce){.guided-contact *{animation:none!important;transition:none!important}}"
    ].join("");
    document.head.appendChild(style);
  }

  function currentStep() {
    return steps[state.index];
  }

  function progressText() {
    return t("progress").replace("{current}", String(Math.min(state.index + 1, 4)));
  }

  function renderProgress() {
    var bars = ui.progress.children;
    for (var i = 0; i < bars.length; i++) {
      bars[i].classList.toggle("is-active", i <= Math.min(state.index, 3));
    }
    ui.progressLabel.textContent = progressText();
  }

  function trailHtml() {
    var labels = { name: "summaryName", email: "summaryEmail", topic: "summaryTopic" };
    var html = [];
    ["name", "email", "topic"].forEach(function (key) {
      if (state.data[key] && steps.indexOf(key) < state.index) {
        html.push("<li><b>" + escapeHtml(t(labels[key])) + "</b>" + escapeHtml(state.data[key]) + "</li>");
      }
    });
    return html.length ? "<ul class=\"guided-contact__trail\">" + html.join("") + "</ul>" : "";
  }

  function inputType(step) {
    if (step === "email") return "email";
    return "text";
  }

  function renderStep() {
    state.done = false;
    renderProgress();
    var step = currentStep();
    var placeholder = "placeholder" + step.charAt(0).toUpperCase() + step.slice(1);
    var topics = "";

    if (step === "topic") {
      topics = "<div class=\"guided-contact__topics\">" + t("topics").map(function (topic) {
        var selected = state.data.topic === topic ? " is-selected" : "";
        return "<button class=\"guided-contact__topic" + selected + "\" type=\"button\" data-topic=\"" + escapeHtml(topic) + "\">" + escapeHtml(topic) + "</button>";
      }).join("") + "</div>";
    }

    if (step === "review") {
      ui.stage.innerHTML = [
        "<h2 class=\"guided-contact__question\">" + escapeHtml(t("review")) + "</h2>",
        "<p class=\"guided-contact__hint\">" + escapeHtml(t("reviewHint")) + "</p>",
        "<dl class=\"guided-contact__review\">",
        "<dt>" + escapeHtml(t("summaryName")) + "</dt><dd>" + escapeHtml(state.data.name) + "</dd>",
        "<dt>" + escapeHtml(t("summaryEmail")) + "</dt><dd>" + escapeHtml(state.data.email) + "</dd>",
        "<dt>" + escapeHtml(t("summaryTopic")) + "</dt><dd>" + escapeHtml(state.data.topic) + "</dd>",
        "<dt>" + escapeHtml(t("summaryMessage")) + "</dt><dd>" + escapeHtml(state.data.message) + "</dd>",
        "</dl>",
        "<div class=\"guided-contact__review-actions\"><button class=\"guided-contact__submit\" type=\"button\" data-send>" + escapeHtml(t("send")) + " <span class=\"guided-contact__submit-arrow\" aria-hidden=\"true\">→</span></button><button class=\"guided-contact__text-button\" type=\"button\" data-edit>" + escapeHtml(t("edit")) + "</button></div>",
        "<p class=\"guided-contact__error\" aria-live=\"polite\"></p>"
      ].join("");
      ui.stage.querySelector("[data-send]").addEventListener("click", submit);
      ui.stage.querySelector("[data-edit]").addEventListener("click", function () {
        state.index = 0;
        renderStep();
      });
      return;
    }

    var field = step === "message"
      ? "<textarea class=\"guided-contact__field guided-contact__field--message\" rows=\"2\" maxlength=\"1600\" placeholder=\"" + escapeHtml(t(placeholder)) + "\">" + escapeHtml(state.data[step] || "") + "</textarea>"
      : "<input class=\"guided-contact__field\" type=\"" + inputType(step) + "\" autocomplete=\"" + (step === "name" ? "name" : step === "email" ? "email" : "off") + "\" value=\"" + escapeHtml(state.data[step] || "") + "\" placeholder=\"" + escapeHtml(t(placeholder)) + "\">";

    ui.stage.innerHTML = [
      trailHtml(),
      "<h2 class=\"guided-contact__question\">" + escapeHtml(t(step)) + "</h2>",
      "<p class=\"guided-contact__hint\">" + escapeHtml(t(step + "Hint")) + "</p>",
      topics,
      "<form class=\"guided-contact__form\">",
      field,
      "<button class=\"guided-contact__submit\" type=\"submit\">" + escapeHtml(t("next")) + " <span class=\"guided-contact__submit-arrow\" aria-hidden=\"true\">→</span></button>",
      "</form>",
      "<p class=\"guided-contact__error\" aria-live=\"polite\"></p>"
    ].join("");

    var form = ui.stage.querySelector("form");
    var fieldNode = ui.stage.querySelector(".guided-contact__field");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      advance(fieldNode.value.trim());
    });

    var topicButtons = ui.stage.querySelectorAll("[data-topic]");
    for (var i = 0; i < topicButtons.length; i++) {
      topicButtons[i].addEventListener("click", function () {
        fieldNode.value = this.getAttribute("data-topic");
        fieldNode.focus();
        var active = ui.stage.querySelectorAll("[data-topic]");
        for (var j = 0; j < active.length; j++) active[j].classList.remove("is-selected");
        this.classList.add("is-selected");
      });
    }

    window.setTimeout(function () { fieldNode.focus(); }, 60);
  }

  function showError(message) {
    var node = ui.stage.querySelector(".guided-contact__error");
    if (node) node.textContent = message;
  }

  function advance(value) {
    var step = currentStep();
    if (!value) return;
    if (step === "email" && !emailValid(value)) return showError(t("invalidEmail"));
    if (step === "message" && value.length < 16) return showError(t("shortMessage"));
    state.data[step] = value;
    state.index += 1;
    renderStep();
  }

  function canSubmitAgain() {
    try {
      return Date.now() - Number(localStorage.getItem(RATE_LIMIT_KEY) || "0") > 30000;
    } catch (e) {
      return true;
    }
  }

  function renderSuccess() {
    state.done = true;
    ui.progressLabel.textContent = t("successTitle");
    for (var i = 0; i < ui.progress.children.length; i++) ui.progress.children[i].classList.add("is-active");
    ui.stage.innerHTML = [
      "<div class=\"guided-contact__success\">",
      "<span class=\"guided-contact__check\" aria-hidden=\"true\">✓</span>",
      "<div><h2>" + escapeHtml(t("successTitle")) + "</h2><p>" + escapeHtml(t("success")) + "</p><button class=\"guided-contact__text-button\" type=\"button\" data-new>" + escapeHtml(t("newMessage")) + "</button></div>",
      "</div>"
    ].join("");
    ui.stage.querySelector("[data-new]").addEventListener("click", reset);
  }

  function submit() {
    if (state.sending) return;
    if (!configured()) return showError(t("configMissing"));
    if (!canSubmitAgain()) return showError(t("rateLimit"));

    var button = ui.stage.querySelector("[data-send]");
    state.sending = true;
    button.disabled = true;
    button.textContent = t("sending");

    loadEmailJs()
      .then(function (emailjs) {
        emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
        return emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
          from_name: state.data.name,
          reply_to: state.data.email,
          from_email: state.data.email,
          subject: state.data.topic,
          message: state.data.message,
          page_url: window.location.href,
          sent_at: new Date().toISOString()
        });
      })
      .then(function () {
        try { localStorage.setItem(RATE_LIMIT_KEY, String(Date.now())); } catch (e) {}
        renderSuccess();
      })
      .catch(function () {
        showError(t("error"));
        button.disabled = false;
        button.innerHTML = escapeHtml(t("send")) + " <span class=\"guided-contact__submit-arrow\" aria-hidden=\"true\">→</span>";
      })
      .finally(function () { state.sending = false; });
  }

  function reset() {
    state.index = 0;
    state.data = {};
    state.sending = false;
    state.done = false;
    renderStep();
  }

  function setOpen(open) {
    ui.wrap.classList.toggle("is-open", open);
    ui.panel.hidden = !open;
    ui.launcher.setAttribute("aria-expanded", open ? "true" : "false");
    try { localStorage.setItem(STORAGE_KEY, open ? "1" : "0"); } catch (e) {}
    if (open) renderStep();
    else ui.launcher.focus();
  }

  function refreshLanguage() {
    if (!ui.wrap) return;
    ui.eyebrow.textContent = t("eyebrow");
    ui.launcherTitle.textContent = t("collapsed");
    ui.launcherMeta.textContent = t("collapsedMeta");
    ui.close.setAttribute("aria-label", t("close"));
    ui.panel.setAttribute("aria-label", t("eyebrow"));
    if (!ui.panel.hidden) state.done ? renderSuccess() : renderStep();
  }

  function mount() {
    var footer = document.getElementById("contato");
    if (!footer || document.querySelector(".guided-contact")) return;
    injectStyles();

    var wrap = document.createElement("div");
    wrap.className = "guided-contact";
    wrap.innerHTML = [
      "<button class=\"guided-contact__launcher\" type=\"button\" aria-expanded=\"false\">",
      "<span><span class=\"guided-contact__eyebrow\"></span><span class=\"guided-contact__launcher-title\"></span></span>",
      "<span class=\"guided-contact__launcher-side\"><span class=\"guided-contact__launcher-meta\"></span><span class=\"guided-contact__arrow\" aria-hidden=\"true\">→</span></span>",
      "</button>",
      "<section class=\"guided-contact__panel\" hidden>",
      "<div class=\"guided-contact__top\"><div class=\"guided-contact__top-left\"><span class=\"guided-contact__signal\"></span><span class=\"guided-contact__progress-label\"></span></div><button class=\"guided-contact__close\" type=\"button\">×</button></div>",
      "<div class=\"guided-contact__progress\" aria-hidden=\"true\"><span></span><span></span><span></span><span></span></div>",
      "<div class=\"guided-contact__stage\"></div>",
      "</section>"
    ].join("");

    var links = footer.querySelector("div");
    footer.insertBefore(wrap, links || footer.firstChild);

    ui = {
      wrap: wrap,
      launcher: wrap.querySelector(".guided-contact__launcher"),
      eyebrow: wrap.querySelector(".guided-contact__eyebrow"),
      launcherTitle: wrap.querySelector(".guided-contact__launcher-title"),
      launcherMeta: wrap.querySelector(".guided-contact__launcher-meta"),
      panel: wrap.querySelector(".guided-contact__panel"),
      close: wrap.querySelector(".guided-contact__close"),
      progress: wrap.querySelector(".guided-contact__progress"),
      progressLabel: wrap.querySelector(".guided-contact__progress-label"),
      stage: wrap.querySelector(".guided-contact__stage")
    };

    refreshLanguage();
    ui.launcher.addEventListener("click", function () { setOpen(true); });
    ui.close.addEventListener("click", function () { setOpen(false); });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !ui.panel.hidden) setOpen(false);
    });

    new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].attributeName === "lang") refreshLanguage();
      }
    }).observe(document.documentElement, { attributes: true });

    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setOpen(true);
    } catch (e) {}
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
