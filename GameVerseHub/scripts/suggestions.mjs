/**
 * GameVerse Hub - Suggestions & Wishlist Page Script
 * Handles the suggestion form with validation and renders the wishlist.
 */

import { fetchGames, formatRating } from "./data.mjs";
import {
  renderFooter,
  initNav,
  initBackToTop,
  showError,
} from "./ui.mjs";
import { getWishlistGames, removeFromWishlist, clearWishlist } from "./wishlist.mjs";

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initBackToTop();
  renderFooter();

  const form = document.getElementById("suggestion-form");
  const wishlistContainer = document.getElementById("wishlist-items");
  const wishlistEmpty = document.getElementById("wishlist-empty");
  const wishlistCount = document.getElementById("wishlist-count");
  const clearBtn = document.getElementById("clear-wishlist");

  let games = [];

  /**
   * Render the wishlist on the page.
   */
  const renderWishlist = () => {
    const wishlistGames = getWishlistGames(games);

    if (wishlistCount) {
      wishlistCount.textContent = `${wishlistGames.length} item${wishlistGames.length !== 1 ? "s" : ""}`;
    }

    if (clearBtn) {
      clearBtn.style.display = wishlistGames.length ? "inline-block" : "none";
    }

    if (wishlistGames.length === 0) {
      wishlistContainer.innerHTML = "";
      wishlistEmpty.style.display = "block";
      return;
    }

    wishlistEmpty.style.display = "none";
    wishlistContainer.innerHTML = wishlistGames
      .map(
        (game) => `
        <div class="wishlist-item">
          <img src="${game.cover}" alt="${game.title} cover art" loading="lazy" width="52" height="52">
          <div class="wishlist-item-info">
            <strong>${game.title}</strong>
            <small>${game.genre} · ${formatRating(game.rating)}</small>
          </div>
          <a href="details.html?id=${game.id}" class="btn btn-secondary btn-small">View</a>
          <button class="remove-btn" data-id="${game.id}" aria-label="Remove ${game.title} from wishlist">&times;</button>
        </div>
      `
      )
      .join("");

    // Wire up remove buttons
    wishlistContainer.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        removeFromWishlist(Number(btn.dataset.id));
        renderWishlist();
      });
    });
  };

  // Clear wishlist button
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      clearWishlist();
      renderWishlist();
    });
  }

  // ---- Form Validation ----
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const ratingInput = document.getElementById("rating");
  const gameInput = document.getElementById("game-name");
  const genreInput = document.getElementById("genre");
  const messageInput = document.getElementById("message");

  const setError = (input, hasError) => {
    const group = input.closest(".form-group");
    if (!group) return;
    group.classList.toggle("has-error", hasError);
    return !hasError;
  };

  const validateName = () => {
    const valid = nameInput.value.trim().length >= 2;
    setError(nameInput, !valid);
    return valid;
  };

  const validateEmail = () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = pattern.test(emailInput.value.trim());
    setError(emailInput, !valid);
    return valid;
  };

  const validateRating = () => {
    const val = Number(ratingInput.value);
    const valid = val >= 1 && val <= 10;
    setError(ratingInput, !valid);
    return valid;
  };

  const validateGame = () => {
    const valid = gameInput.value.trim().length >= 2;
    setError(gameInput, !valid);
    return valid;
  };

  // Live validation on input/change
  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  messageInput.addEventListener("input", () => {
    const valid = messageInput.value.trim().length >= 10;
    setError(messageInput, !valid);
  });
  ratingInput.addEventListener("change", validateRating);
  gameInput.addEventListener("input", validateGame);
  genreInput.addEventListener("change", () => {
    const valid = genreInput.value !== "";
    setError(genreInput, !valid);
  });

  // Form submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameValid = validateName();
    const emailValid = validateEmail();
    const ratingValid = validateRating();
    const gameValid = validateGame();
    const genreValid = genreInput.value !== "";
    setError(genreInput, !genreValid);
    const messageValid = messageInput.value.trim().length >= 10;
    setError(messageInput, !messageValid);

    if (nameValid && emailValid && ratingValid && gameValid && genreValid && messageValid) {
      // Build query string for the thank-you page
      const params = new URLSearchParams({ name: nameInput.value.trim() });
      location.href = `thankyou.html?${params.toString()}`;
    } else {
      const firstInvalid = form.querySelector(".form-group.has-error");
      if (firstInvalid) {
        firstInvalid.querySelector("input, textarea, select")?.focus();
      }
    }
  });

  // Load games and render wishlist
  fetchGames()
    .then((data) => {
      games = data;
      renderWishlist();
    })
    .catch((error) => showError(wishlistContainer, error.message));
});
