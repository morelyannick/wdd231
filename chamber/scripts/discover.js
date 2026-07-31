import { places } from '../data/fun_place.mjs';

const discoverGrid = document.querySelector('[data-discover-grid]');
const visitMessage = document.getElementById('visit-message');
const fallbackImage = 'https://www.gstatic.com/webp/gallery/1.webp';
const storageKey = 'chamber-last-visit';

function showVisitMessage() {
    if (!visitMessage) return;

    const now = Date.now();
    const previousVisit = Number(localStorage.getItem(storageKey));

    if (!previousVisit) {
        visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const daysSinceVisit = Math.floor((now - previousVisit) / 86400000);

        if (daysSinceVisit < 1) {
            visitMessage.textContent = 'Back so soon! Awesome!';
        } else if (daysSinceVisit === 1) {
            visitMessage.textContent = 'You last visited 1 day ago.';
        } else {
            visitMessage.textContent = `You last visited ${daysSinceVisit} days ago.`;
        }
    }

    localStorage.setItem(storageKey, String(now));
}

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

function renderPlaces() {
    if (!discoverGrid) return;

    const featuredPlaces = places.slice(0, 8);

    discoverGrid.innerHTML = featuredPlaces
        .map((place, index) => `
      <article class="discover-card discover-card--${index + 1}">
        <h2>${place.name}</h2>
        <figure class="discover-figure">
          <img src="${place.imageUrl || fallbackImage}" alt="${place.name}" width="300" height="200" loading="lazy" onerror="this.src='${fallbackImage}'">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button type="button">Learn more</button>
      </article>
    `)
        .join('');
}

document.addEventListener('DOMContentLoaded', () => {
    showVisitMessage();
    renderPlaces();
    validateLocalLinks();
});
