// Hamburger / nav toggle
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("main-nav");

    if (hamburger && nav) {
        hamburger.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            hamburger.classList.toggle("open", isOpen);
            hamburger.setAttribute("aria-expanded", String(isOpen));
            hamburger.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                hamburger.classList.remove("open");
                hamburger.setAttribute("aria-expanded", "false");
                hamburger.setAttribute("aria-label", "Open navigation");
            });
        });

        document.addEventListener("click", (event) => {
            if (!event.target.closest("header")) {
                nav.classList.remove("open");
                hamburger.classList.remove("open");
                hamburger.setAttribute("aria-expanded", "false");
                hamburger.setAttribute("aria-label", "Open navigation");
            }
        });
    }

    // Footer year
    const yearEl = document.getElementById("current-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
