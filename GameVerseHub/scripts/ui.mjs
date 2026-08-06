/**
 * GameVerse Hub - UI Module
 * Shared UI helpers: modal dialog, game card templating, and common utilities.
 */

import { formatRating } from "./data.mjs";
import { toggleWishlist, isInWishlist } from "./wishlist.mjs";

/**
 * Create a game card HTML string.
 * @param {Object} game - Game object
 * @param {boolean} showQuickView - Whether to include the quick view button
 * @returns {string} HTML string for a game card
 */
export function gameCardTemplate(game, showQuickView = true) {
  const inWishlist = isInWishlist(game.id);
  const platforms = game.platforms
    .map((p) => `<span>${p}</span>`)
    .join("");

  return `
    <article class="game-card" data-id="${game.id}">
      <a href="details.html?id=${game.id}" class="game-card-image" aria-label="View details for ${game.title}">
        <img src="${game.cover}" alt="${game.title} cover art" loading="lazy" width="400" height="560">
      </a>
      <div class="game-card-body">
        <h3 class="game-card-title">
          <a href="details.html?id=${game.id}">${game.title}</a>
        </h3>
        <span class="game-card-genre">${game.genre}</span>
        <div class="game-card-platforms">${platforms}</div>
        <div class="game-card-rating">
          <span class="rating-badge">${formatRating(game.rating)}</span>
        </div>
        <div class="card-actions">
          <a href="details.html?id=${game.id}" class="btn btn-secondary btn-small">Details</a>
          <button class="btn btn-primary btn-small wishlist-btn" data-id="${game.id}" aria-label="${inWishlist ? "Remove" : "Add"} ${game.title} to wishlist">
            ${inWishlist ? "★ In Wishlist" : "☆ Add"}
          </button>
          ${showQuickView ? `<button class="btn btn-accent btn-small quick-view-btn" data-id="${game.id}">Quick View</button>` : ""}
        </div>
      </div>
    </article>
  `;
}

/**
 * Create a review card HTML string.
 * @param {Object} game - Game object (featured with review)
 * @returns {string} HTML string for a review card
 */
export function reviewCardTemplate(game) {
  return `
    <article class="review-card">
      <blockquote>${game.review}</blockquote>
      <div class="review-card-author">
        <img src="${game.cover}" alt="" loading="lazy" width="48" height="48">
        <div class="review-author-info">
          <strong>${game.title}</strong>
          <small>${game.genre} · ${game.developer}</small>
        </div>
        <span class="rating-badge">${formatRating(game.rating)}</span>
      </div>
    </article>
  `;
}

/**
 * Create a top game list item HTML string.
 * @param {Object} game - Game object
 * @param {number} rank - Rank position
 * @returns {string} HTML string for a top game item
 */
export function topGameItemTemplate(game, rank) {
  const rankClass = rank === 1 ? "gold" : "";
  return `
    <a href="details.html?id=${game.id}" class="top-game-item" data-rank="${rank}">
      <span class="top-game-rank ${rankClass}">${rank}</span>
      <div class="top-game-info">
        <strong>${game.title}</strong>
        <small>${game.genre} · ${game.developer}</small>
      </div>
      <span class="rating-badge">${formatRating(game.rating)}</span>
    </a>
  `;
}

/**
 * Create the modal dialog element and append it to the body.
 * @returns {Object} Modal element with open/close methods
 */
export function createModal() {
  // Remove existing modal if present
  const existing = document.getElementById("game-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "game-modal";
  modal.className = "modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "modal-title");
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="Close modal">&times;</button>
      <img id="modal-cover" class="modal-game-cover" src="" alt="Game cover">
      <h2 id="modal-title" class="modal-game-title"></h2>
      <p id="modal-meta" class="modal-game-meta"></p>
      <p id="modal-desc"></p>
      <div class="modal-actions" style="margin-top:1rem; display:flex; gap:0.75rem; flex-wrap:wrap;">
        <a id="modal-details-link" class="btn btn-primary" href="#">View Full Details</a>
        <button id="modal-wishlist-btn" class="btn btn-secondary">Add to Wishlist</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const closeModal = () => {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  const openModal = (game) => {
    if (!game) return;
    const cover = modal.querySelector("#modal-cover");
    const title = modal.querySelector("#modal-title");
    const meta = modal.querySelector("#modal-meta");
    const desc = modal.querySelector("#modal-desc");
    const detailsLink = modal.querySelector("#modal-details-link");
    const wishlistBtn = modal.querySelector("#modal-wishlist-btn");

    cover.src = game.cover;
    cover.alt = `${game.title} cover art`;
    title.textContent = game.title;
    meta.textContent = `${game.genre} · ${game.platforms.join(" / ")} · Rating ${formatRating(game.rating)}`;
    desc.textContent = game.review || game.description;
    detailsLink.href = `details.html?id=${game.id}`;

    const updateWishlistBtn = () => {
      const inWishlist = isInWishlist(game.id);
      wishlistBtn.textContent = inWishlist ? "★ In Wishlist" : "☆ Add to Wishlist";
    };
    updateWishlistBtn();

    wishlistBtn.onclick = (e) => {
      e.preventDefault();
      toggleWishlist(game.id);
      updateWishlistBtn();
      // Dispatch event so other parts of the page can react
      document.dispatchEvent(new CustomEvent("wishlist:changed", { detail: { gameId: game.id } }));
    };

    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close").focus();
  };

  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  return { openModal, closeModal, element: modal };
}

/**
 * Render the shared footer into the page.
 */
export function renderFooter() {
  const footer = document.querySelector("footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h3>Explore</h3>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="library.html">Game Library</a></li>
            <li><a href="top10.html">Top 10</a></li>
            <li><a href="details.html?id=1">Featured Game</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>Community</h3>
          <ul>
            <li><a href="suggestions.html">Suggestions</a></li>
            <li><a href="suggestions.html#wishlist">Your Wishlist</a></li>
            <li><a href="library.html">All Games</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>Social Media</h3>
          <div class="footer-social">
            <a href="#" aria-label="Twitter / X"><span aria-hidden="true">𝕏</span></a>
            <a href="#" aria-label="Discord"><span aria-hidden="true">🎮</span></a>
            <a href="#" aria-label="YouTube"><span aria-hidden="true">▶</span></a>
            <a href="#" aria-label="Instagram"><span aria-hidden="true">📷</span></a>
          </div>
        </div>
        <div class="footer-col">
          <h3>Newsletter</h3>
          <form class="newsletter-form" id="newsletter-form" novalidate>
            <label class="visually-hidden" for="newsletter-email">Email address</label>
            <input type="email" id="newsletter-email" placeholder="Your email" required>
            <button type="submit">Sign Up</button>
          </form>
          <p class="attributions">
            Game covers are placeholder SVGs created for this project.
            <br>© <span id="footer-year"></span> GameVerse Hub. All rights reserved.
          </p>
        </div>
      </div>
      <div class="footer-legal">
        <p>Built for WDD 231 · <a href="index.html">GameVerse Hub</a> · <a href="suggestions.html">Suggestions</a></p>
      </div>
    </div>
  `;

  // Set current year
  const yearEl = footer.querySelector("#footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Newsletter form handler
  const newsletterForm = footer.querySelector("#newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector("#newsletter-email");
      if (email && email.value.trim()) {
        alert("Thanks for subscribing to the GameVerse Hub newsletter! 🎮");
        newsletterForm.reset();
      }
    });
  }
}

/**
 * Initialize the mobile navigation toggle.
 */
export function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.querySelector(".nav-toggle-icon").textContent = isOpen ? "✕" : "☰";
  });

  // Close menu when a link is clicked (mobile)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * Initialize back-to-top button.
 */
export function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });
}

/**
 * Show a loading indicator inside a container.
 * @param {HTMLElement} container - Container element
 */
export function showLoading(container) {
  container.innerHTML = `
    <div class="loading-indicator">
      <div class="spinner" aria-hidden="true"></div>
      <p>Loading games...</p>
    </div>
  `;
}

/**
 * Show an error state inside a container.
 * @param {HTMLElement} container - Container element
 * @param {string} message - Error message
 */
export function showError(container, message) {
  container.innerHTML = `
    <div class="error-state">
      <h2>⚠️ Something went wrong</h2>
      <p>${message}</p>
      <button class="btn btn-primary" style="margin-top:1rem;" onclick="location.reload()">Try Again</button>
    </div>
  `;
}

/**
 * Utility to escape HTML special characters.
 * @param {string} str - Input string
 * @returns {string} Escaped string
 */
export function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '&#39;',
  })[c]);
}
