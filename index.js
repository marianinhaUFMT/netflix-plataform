const THEME_KEY = "netflix-theme";
const ACTIVE_PROFILE_NAME_KEY = "perfilAtivoNome";
const ACTIVE_PROFILE_IMAGE_KEY = "perfilAtivoImagem";
const root = document.documentElement;
const toggleButton = document.getElementById("theme-toggle");

function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
}

function applyTheme(theme) {
    root.dataset.theme = theme;

    const isLight = theme === "light";
    toggleButton.textContent = isLight ? "Dark mode" : "Light mode";
    toggleButton.setAttribute("aria-pressed", String(isLight));
}

function toggleTheme() {
    const currentTheme = root.dataset.theme === "light" ? "light" : "dark";
    const nextTheme = currentTheme === "light" ? "dark" : "light";

    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
}

function saveActiveProfile(profileLink) {
    if (!profileLink) return;

    const profileName = profileLink.querySelector("figcaption")?.textContent?.trim();
    const profileImage = profileLink.querySelector("img")?.getAttribute("src");

    if (profileName && profileImage) {
        localStorage.setItem(ACTIVE_PROFILE_NAME_KEY, profileName);
        localStorage.setItem(ACTIVE_PROFILE_IMAGE_KEY, profileImage);
    }
}

function setupProfileSelection() {
    const profileLinks = document.querySelectorAll(".profile");

    profileLinks.forEach((profileLink) => {
        profileLink.addEventListener("click", () => {
            saveActiveProfile(profileLink);
        });
    });
}

applyTheme(getPreferredTheme());
toggleButton.addEventListener("click", toggleTheme);
setupProfileSelection();
