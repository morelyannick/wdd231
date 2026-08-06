/**
 * GameVerse Hub - Game Library Page Script
 * Provides search, genre/platform/rating filters, and dynamic game rendering.
 */

import { fetchGames, getGenres, getPlatforms, formatRating } from "./data.mjs";
import {
  gameCardTemplate,
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

  const grid = document.getElementById("library-grid");
  const resultsInfo = document.getElementById("results-info");
  const searchInput = document.getElementById("search-input");
  const genreFilter = document.getElementById("genre-filter");
  const platformFilter = document.getElementById("platform-filter");
  const ratingFilter = document.getElementById("rating-filter");
  const sortSelect = document.getElementById("sort-select");
  const resetBtn = document.getElementById("reset-filters");

  const modal = createModal();

  let games = [];
  const state = {
    search: "",
    genre: "all",
    platform: "all",
    minRating: 0,
    sort: "title",
  };

  /**
   * Populate the genre & platform filter dropdowns.
   */
  const populateFilters = () => {
    const genres = getGenres(games);
    const platforms = getPlatforms(games);

    genres.forEach((genre) => {
      const option = document.createElement("option");
      option.value = genre;
      option.textContent = genre;
      genreFilter.appendChild(option);
    });

    platforms.forEach((platform) => {
      const option = document.createElement("option");
      option.value = platform;
      option.textContent = platform;
      platformFilter.appendChild(option);
    });
  };

  /**
   * Apply all active filters and sorting to the games array.
   * @returns {Array} Filtered and sorted games
   */
  const applyFilters = () => {
    let results = [...games];

    // Text search on title, genre, developer
    if (state.search) {
      const term = state.search.toLowerCase();
      results = results.filter(
        (game) =>
          game.title.toLowerCase().includes(term) ||
          game.genre.toLowerCase().includes(term) ||
          game.developer.toLowerCase().includes(term)
      );
    }

    // Genre filter
    if (state.genre !== "all") {
      results = results.filter((game) => game.genre === state.genre);
    }

    // Platform filter (game has the platform)
    if (state.platform !== "all") {
      results = results.filter((game) => game.platforms.includes(state.platform));
    }

    // Minimum rating filter
    if (state.minRating > 0) {
      results = results.filter((game) => game.rating >= state.minRating);
    }

    // Sorting
    switch (state.sort) {
      case "rating-desc":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "rating-asc":
        results.sort((a, b) => a.rating - b.rating);
        break;
      case "newest":
        results.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
      case "oldest":
        results.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
        break;
      default: // title
        results.sort((a, b) => a.title.localeCompare(b.title));
    }

    return results;
  };

  /**
   * Render the filtered games into the grid.
   */
  const render = () => {
    const results = applyFilters();
    resultsInfo.innerHTML = `Showing <strong>${results.length}</strong> of ${games.length} games`;

    if (results.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <h3>No games found 🎮</h3>
          <p>Try adjusting your search or filters.</p>
          <button class="btn btn-primary" style="margin-top:1rem;" id="no-results-reset">Reset Filters</button>
        </div>
      `;
      const resetBtnNoResults = document.getElementById("no-results-reset");
      if (resetBtnNoResults) resetBtnNoResults.addEventListener("click", resetFilters);
      return;
    }

    grid.innerHTML = results.map((game) => gameCardTemplate(game)).join("");
    grid.dataset.count = results.length;
  };

  /**
   * Reset all filters to their default state.
   */
  const resetFilters = () => {
    state.search = "";
    state.genre = "all";
    state.platform = "all";
    state.minRating = 0;
    state.sort = "title";

    searchInput.value = "";
    genreFilter.value = "all";
    platformFilter.value = "all";
    ratingFilter.value = "0";
    sortSelect.value = "title";

    render();
  };

  // Read initial search query from the URL (e.g. ?q=zelda from header search)
  const urlParams = new URLSearchParams(location.search);
  const initialQuery = urlParams.get("q");
  if (initialQuery) {
    state.search = initialQuery.trim();
    searchInput.value = state.search;
  }

  // Event listeners
  searchInput.addEventListener("input", () => {
    state.search = searchInput.value.trim();
    render();
  });

  genreFilter.addEventListener("change", () => {
    state.genre = genreFilter.value;
    render();
  });

  platformFilter.addEventListener("change", () => {
    state.platform = platformFilter.value;
    render();
  });

  ratingFilter.addEventListener("change", () => {
    state.minRating = Number(ratingFilter.value);
    render();
  });

  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    render();
  });

  resetBtn.addEventListener("click", resetFilters);

  // Modal quick view + wishlist via event delegation
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
        toggleWishlist(id);
        render();
      });
    }
  });

  document.addEventListener("wishlist:changed", () => {
    render();
  });

  // Initial load
  showLoading(grid);
  fetchGames()
    .then((data) => {
      games = data;
      populateFilters();
      render();
    })
    .catch((error) => {
      showError(grid, error.message);
    });
});

