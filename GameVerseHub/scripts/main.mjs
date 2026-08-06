/*
 * GameVerse Hub - Home Page Script
 * Renders: Hero (Game of the Month), Latest Releases, Featured Reviews, Top Games.
 */

import { fetchGames, formatRating } from "./data.mjs";
import {
  gameCardTemplate,
  reviewCardTemplate,
  topGameItemTemplate,
  createModal,
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

  const latestContainer = document.getElementById("latest-releases");
  const reviewsContainer = document.getElementById("featured-reviews");
  const topContainer = document.getElementById("top-games");

  const modal = createModal();

  /**
   * Render the hero section with the featured game (Game of the Month).
   * @param {Object} game - Featured game
   */
  const renderHero = (game) => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    hero.style.backgroundImage = `url("${game.cover}")`;
    hero.querySelector(".hero-title").textContent = game.title;
    hero.querySelector(".hero-desc").textContent = game.description;
    hero.querySelector(".hero-badge").textContent = "GAME OF THE MONTH";
    hero.querySelector(".hero-link").href = `details.html?id=${game.id}`;
  };

  /**
   * Render latest releases (first 4 games).
   * @param {Array} games - All games
   */
  const renderLatestReleases = (games) => {
    const latest = games.slice(0, 4);
    latestContainer.innerHTML = latest.map((game) => gameCardTemplate(game)).join("");
  };

  /**
   * Render featured review cards.
   * @param {Array} games - All games
   */
  const renderFeaturedReviews = (games) => {
    const reviews = games
      .filter((game) => game.featured && game.review)
      .slice(0, 3);
    reviewsContainer.innerHTML = reviews.map((game) => reviewCardTemplate(game)).join("");
  };

  /**
   * Render top games sorted by rating (top 5) as a compact list.
   * @param {Array} games - All games
   */
  const renderTopGames = (games) => {
    const topGames = games
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
    topContainer.innerHTML = topGames
      .map((game, index) => topGameItemTemplate(game, index + 1))
      .join("");
  };

  /**
   * Wire up interactive elements on dynamically rendered game cards.
   */
  const setupInteractions = () => {
    // Event delegation for the whole document
    document.addEventListener("click", (e) => {
      const quickViewBtn = e.target.closest(".quick-view-btn");
      const wishlistBtn = e.target.closest(".wishlist-btn");

      if (quickViewBtn) {
        e.preventDefault();
        const id = Number(quickViewBtn.dataset.id);
        const game = games.find((g) => g.id === id);
        modal.openModal(game);
      }

      if (wishlistBtn) {
        e.preventDefault();
        const id = Number(wishlistBtn.dataset.id);
        import("./wishlist.mjs").then(({ toggleWishlist }) => {
          const added = toggleWishlist(id);
          const game = games.find((g) => g.id === id);
          wishlistBtn.textContent = added ? "★ In Wishlist" : "☆ Add";
          wishlistBtn.setAttribute(
            "aria-label",
            `${added ? "Remove" : "Add"} ${game?.title ?? "game"} to wishlist`
          );
        });
      }
    });

    // Listen for wishlist changes from modal to update card buttons
    document.addEventListener("wishlist:changed", (e) => {
      const { gameId } = e.detail;
      import("./wishlist.mjs").then(({ isInWishlist }) => {
        const added = isInWishlist(gameId);
        document.querySelectorAll(`.wishlist-btn[data-id="${gameId}"]`).forEach((btn) => {
          btn.textContent = added ? "★ In Wishlist" : "☆ Add";
        });
      });
    });
  };

  // Load and render all data
  showLoading(latestContainer);
  showLoading(reviewsContainer);
  showLoading(topContainer);

  let games = [];

  fetchGames()
    .then((data) => {
      games = data;

      // Hero uses the highest-rated featured game (Game of the Month)
      const gameOfMonth = data
        .filter((g) => g.featured)
        .sort((a, b) => b.rating - a.rating)[0];
      renderHero(gameOfMonth || data[0]);

      renderLatestReleases(data);
      renderFeaturedReviews(data);
      renderTopGames(data);
      setupInteractions();
    })
    .catch((error) => {
      showError(latestContainer, error.message);
      showError(reviewsContainer, error.message);
      showError(topContainer, error.message);
    });
});

