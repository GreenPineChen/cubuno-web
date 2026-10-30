(() => {
  const STORAGE_KEY = "cubuno_lang";
  const SUPPORTED = ["en", "zh"];

  function detectLangFromPath(pathname) {
    const path = pathname || "/";
    if (path === "/zh" || path.startsWith("/zh/")) return "zh";
    return "en";
  }

  function stripLangPrefix(pathname) {
    let path = pathname || "/";
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
    if (path === "/zh") return "/";
    if (path.startsWith("/zh/")) {
      const rest = path.slice(3);
      return rest ? rest : "/";
    }
    return path || "/";
  }

  function withLang(lang, pathname, hash) {
    const base = stripLangPrefix(pathname);
    let next;
    if (lang === "en") {
      next = base === "/" ? "/" : base;
    } else {
      next = base === "/" ? `/${lang}/` : `/${lang}${base.startsWith("/") ? base : `/${base}`}`;
    }
    if (!next.endsWith(".html") && !next.endsWith("/")) next += "/";
    if (next !== "/" && next.endsWith("//")) next = next.replace(/\/+$/, "/");
    return `${next}${hash || ""}`;
  }

  function currentLang() {
    return detectLangFromPath(window.location.pathname);
  }

  function remember(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {
      /* ignore */
    }
  }

  function savedLang() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.includes(v) ? v : null;
    } catch (_) {
      return null;
    }
  }

  function bindSelects() {
    const lang = currentLang();
    document.querySelectorAll("[data-lang-select]").forEach((el) => {
      el.value = lang;
      el.addEventListener("change", () => {
        const next = el.value;
        if (!SUPPORTED.includes(next)) return;
        remember(next);
        const url = withLang(next, window.location.pathname, window.location.hash);
        if (url !== `${window.location.pathname}${window.location.hash}`) {
          window.location.assign(url);
        }
      });
    });
  }

  // Returning visitors: only auto-jump on the English home root.
  function maybeFollowPreference() {
    const path = window.location.pathname;
    const isEnHome = path === "/" || path === "/index.html";
    if (!isEnHome) return;
    const preferred = savedLang();
    if (preferred && preferred !== "en") {
      window.location.replace(withLang(preferred, "/", window.location.hash));
    }
  }

  maybeFollowPreference();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindSelects);
  } else {
    bindSelects();
  }
})();
