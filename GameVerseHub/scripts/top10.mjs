/**
 * GameVerse Hub - Top 10 Ranking Page Script
 * Renders the top 10 games sorted by rating with rating comparison bars.
 */

import { fetchGames, formatRating, formatReleaseDate } from "./data.mjs";
import {
  renderFooter,
  initNav,
  initBackToTop,
  showLoading,
  showError,
} from "./ui.mjs";

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initBackToTop();
  renderFooter();

  const listContainer = document.getElementById("top10-list");
  const avgContainer = document.getElementById("avg-rating");

  /**
   * Get the rank medal class for a given position.
   * @param {number} rank - Rank position (1-based)
   * @returns {string} CSS class suffix
   */
  const rankClass = (rank) => {
    if (rank === 1) return "gold";
    if (rank === 2) return "silver";
    if (rank === 3) return "bronze";
    return "";
  };

  /**
   * Build a rating comparison bar for a game relative to the max rating.
   * @param {number} rating - Game rating
   * @param {number} maxRating - Highest rating in the top 10
   * @returns {string} HTML for the comparison bar
   */
  const ratingBar = (rating, maxRating) => {
    const pct = Math.round((rating / maxRating) * 100);
    return `<div class="top10-pct"><div class="top10-pct-bar" style="width:${pct}%"></div></div>`;
  };

  /**
   * Render the top 10 games list.
   * @param {Array} games - All games
   */
  const renderTop10 = (games) => {
    const top10 = games
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);

    const maxRating = top10[0]?.rating || 10;
    const avgRating =
      top10.reduce((sum, g) => sum + g.rating, 0) / top10.length;

    if (avgContainer) {
      avgContainer.textContent = `Average rating of top 10: ${avgRating.toFixed(2)}`;
    }

    listContainer.innerHTML = top10
      .map(
        (game, index) => `
        <article class="top10-item" data-rank="${index + 1}">
          <div class="top10-rank-wrap">
            <div class="top10-rank-num ${rankClass(index + 1)}">${index + 1}</div>
            <a href="details.html?id=${game.id}" class="game-card-image" style="width:120px; flex-shrink:0; border-radius:8px; overflow:hidden; display:block;">
              <img src="${game.cover}" alt="${game.title} cover art" loading="lazy" width="120" height="168">
            </a>
          </div>
          <div class="top10-body">
            <h3><a href="details.html?id=${game.id}">${game.title}</a></h3>
            <div class="top10-meta">
              <span>${game.genre}</span>
              <span>·</span>
              <span>${game.developer}</span>
              <span>·</span>
              <span>${formatReleaseDate(game.releaseDate)}</span>
            </div>
            <div class="rating-compare">
              <div class="rating-compare-row">
                <span class="rating-badge">${formatRating(game.rating)}</span>
                <div class="rating-compare-bar">
                  <div class="rating-compare-fill" style="width:${Math.round((game.rating / maxRating) * 100)}%"></div>
                </div>
                <span>${game.rating >= 9.5 ? "Legendary" : game.rating >= 9 ? "Excellent" : "Great"}</span>
              </div>
            </div>
            <p style="margin-top:0.75rem; color:var(--color-text-muted); font-size:0.9rem;">${game.review}</p>
          </div>
        </article>
      `
      )
      .join("");
  };

  showLoading(listContainer);
  fetchGames()
    .then((games) => renderTop10(games))
    .catch((error) => showError(listContainer, error.message));
});
