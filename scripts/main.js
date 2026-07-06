// Shared site behavior

document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setFooterDates();
});

function setupNavigation() {
    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("nav");

    if (!hamburger || !nav) return;

    const setMenuState = (isOpen) => {
        hamburger.classList.toggle("active", isOpen);
        nav.classList.toggle("active", isOpen);
        hamburger.setAttribute("aria-expanded", String(isOpen));
        hamburger.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    };

    hamburger.addEventListener("click", () => {
        setMenuState(!nav.classList.contains("active"));
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuState(false));
    });

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    nav.querySelectorAll("a").forEach((link) => {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            link.setAttribute("aria-current", "page");
            link.parentElement.classList.add("active");
        }
    });
}

function setFooterDates() {
    const currentYear = document.getElementById("currentyear");
    const lastModified = document.getElementById("lastModified");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (lastModified) {
        lastModified.textContent = `Last Modified: ${document.lastModified}`;
    }
}

function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, "");
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phoneNumber;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-CI", {
        style: "currency",
        currency: "XOF",
    }).format(amount);
}
