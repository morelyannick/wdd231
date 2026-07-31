// Hamburger / nav toggle
function validateLocalLinks() {
    document.querySelectorAll('a[href]').forEach((link) => {
        const href = link.getAttribute('href');

        if (!href || /^https?:\/\//i.test(href) || /^mailto:/i.test(href) || /^tel:/i.test(href) || href.startsWith('#')) {
            return;
        }

        const url = new URL(href, window.location.href);

        if (url.origin !== window.location.origin) {
            return;
        }

        fetch(url.pathname, { method: 'HEAD' }).catch(() => {
            link.classList.add('link-broken');
            link.setAttribute('title', 'This link could not be reached.');
        });
    });
}

function setCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;

        const hrefPath = href.split('/').pop() || 'index.html';
        if (hrefPath === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

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

    const yearEl = document.getElementById("current-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const lastModifiedEl = document.getElementById("last-modified");
    if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified;

    setCurrentPage();
    validateLocalLinks();
});
