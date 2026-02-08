const langButtons = document.querySelectorAll("[data-lang]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

const pagePath = document.body.dataset.path;
const currentLang = document.body.classList.contains("lang-ru")
  ? "ru"
  : document.body.classList.contains("lang-en")
    ? "en"
    : "et";
setLang(currentLang);

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetLang = button.dataset.lang;
    if (!pagePath) {
      return;
    }
    if (targetLang === currentLang) {
      setLang(currentLang);
      return;
    }
    const targetUrl = buildTargetUrl(targetLang, pagePath);
    if (targetUrl) {
      window.location.href = targetUrl;
    }
  });
});

function setLang(lang) {
  document.body.classList.remove("lang-ru", "lang-et", "lang-en");
  document.body.classList.add(`lang-${lang}`);
  langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

function buildTargetUrl(lang, path) {
  if (!path) {
    return null;
  }
  if (window.location.protocol === "file:") {
    const currentPath = window.location.pathname.replace(/\\/g, "/");
    let base = currentPath;
    if (currentPath.includes(`/ru/${path}`)) {
      base = currentPath.replace(`/ru/${path}`, "/");
    } else if (currentPath.includes(`/en/${path}`)) {
      base = currentPath.replace(`/en/${path}`, "/");
    } else if (currentPath.endsWith(path)) {
      base = currentPath.slice(0, -path.length);
    }
    const prefix = lang === "ru" ? "ru/" : lang === "en" ? "en/" : "";
    return `file://${base}${prefix}${path}`;
  }
  const prefix = lang === "ru" ? "/ru/" : lang === "en" ? "/en/" : "/";
  return `${window.location.origin}${prefix}${path}`;
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));
