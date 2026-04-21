// ===== THEME (LIGHT / DARK) =====
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("cv_theme", theme);

  if (theme === "dark") {
    themeLabel.textContent = "Dark";
  } else {
    themeLabel.textContent = "Light";
  }
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
});

// ===== LANGUAGE =====
const translations = window.translations || {}; // mantiene compatibilidad
const translatableNodes = document.querySelectorAll("[data-i18n]");
const langButtons = document.querySelectorAll(".lang-btn");

function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;

  translatableNodes.forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!dict[key]) return;
    node.innerHTML = dict[key];
  });

  localStorage.setItem("cv_lang", lang);

  langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
});

// ===== NAV ACTIVE =====
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("section[id], aside[id]");

function setActiveNav() {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
}

// ===== SCROLL BUTTON =====
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  setActiveNav();
  topBtn.classList.toggle("show", window.scrollY > 500);
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== INIT =====
const savedTheme = localStorage.getItem("cv_theme") || "light";
const savedLang = localStorage.getItem("cv_lang") || "en";

applyTheme(savedTheme);
applyLanguage(savedLang);
setActiveNav();

// ===== YEAR =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();