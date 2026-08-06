/**
 * GameVerse Hub - Game Details Page Script
 * Reads the game id from the URL via URLSearchParams and renders full details.
 */

import { fetchGames, getGameById, formatRating, formatReleaseDate } from "./data.mjs";
import {
  renderFooter,
  initNav,
  initBackToTop,
  showError,
} from "./ui.mjs";
import { toggleWishlist, isInWishlist } from "./wishlist.mjs";

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initBackToTop();
  renderFooter();

  const container = document.getElementById("details-content");

  // Read the game id from the URL query string
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  /**
   * Build a difficulty dots display (1-10).
   * @param {number} difficulty - Difficulty level 1-10
   * @returns {string} HTML for difficulty dots
   */
  const difficultyDots = (difficulty) => {
    const max = 10;
    let html = "";
    for (let i = 1; i <= max; i++) {
      html += `<span class="difficulty-dot ${i <= difficulty ? "filled" : ""}" aria-hidden="true"></span>`;
    }
    return html;
  };

  /**
   * Render the full game details page.
   * @param {Object} game - The game object
   */
  const renderDetails = (game) => {
    const inWishlist = isInWishlist(game.id);
    const screenshots = (game.screenshots || [game.cover])
      .map(
        (src, i) => `
        <img src="${src}" alt="${game.title} screenshot ${i + 1}" loading="lazy" width="800" height="450">
      `
      )
      .join("");

    container.innerHTML = `
      <div class="details-hero container">
        <div class="details-cover">
          <img src="${game.cover}" alt="${game.title} cover art" width="400" height="560">
        </div>
        <div class="details-info">
          <span class="details-genre">${game.genre}</span>
          <h1>${game.title}</h1>
          <div class="rating-big">${formatRating(game.rating)}</div>
          <div class="details-meta">
            <div class="meta-item">
              <span class="label">Developer</span>
              <span class="value">${game.developer}</span>
            </div>
            <div class="meta-item">
              <span class="label">Release Date</span>
              <span class="value">${formatReleaseDate(game.releaseDate)}</span>
            </div>
            <div class="meta-item">
              <span class="label">Platforms</span>
              <span class="value">${game.platforms.join(", ")}</span>
            </div>
            <div class="meta-item">
              <span class="label">Difficulty</span>
              <span class="value"><span class="difficulty-row">${difficultyDots(game.difficulty)}</span></span>
            </div>
          </div>
          <div class="details-description">
            <p>${game.longDescription || game.description}</p>
          </div>
          <div class="details-actions">
            <button class="btn btn-primary" id="details-wishlist-btn">
              ${inWishlist ? "★ In Wishlist" : "☆ Add to Wishlist"}
            </button>
            <a href="library.html" class="btn btn-secondary">Browse Library</a>
          </div>
        </div>
      </div>

      <section class="screenshots-section container">
        <h2 class="section-title">Screenshots</h2>
        <div class="screenshots-grid">${screenshots}</div>
      </section>
    `;

    // Wishlist toggle button
    const wishlistBtn = document.getElementById("details-wishlist-btn");
    wishlistBtn.addEventListener("click", () => {
      const added = toggleWishlist(game.id);
      wishlistBtn.textContent = added ? "★ In Wishlist" : "☆ Add to Wishlist";
    });
  };

  if (!id) {
    showError(container, "No game id provided in the URL. Please navigate here from the library or home page.");
    return;
  }

  fetchGames()
    .then((games) => {
      const game = getGameById(games, id);
      if (!game) {
        showError(container, `We couldn't find a game with id "${id}". It may have been removed.`);
        return;
      }
      renderDetails(game);
    })
    .catch((error) => showError(container, error.message));
});
