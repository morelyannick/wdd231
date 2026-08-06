/**
 * GameVerse Hub - Wishlist Module
 * Manages the user's wishlist using the Local Storage API.
 */

const STORAGE_KEY = "gameversehub_wishlist";

/**
 * Get the current wishlist from local storage.
 * @returns {Array<number>} Array of game ids
 */
export function getWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to read wishlist from localStorage:", error);
    return [];
  }
}

/**
 * Save the wishlist to local storage.
 * @param {Array<number>} wishlist - Array of game ids
 */
function saveWishlist(wishlist) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  } catch (error) {
    console.error("Failed to save wishlist to localStorage:", error);
  }
}

/**
 * Add a game to the wishlist.
 * @param {number} gameId - The game id to add
 */
export function addToWishlist(gameId) {
  const wishlist = getWishlist();
  if (!wishlist.includes(gameId)) {
    wishlist.push(gameId);
    saveWishlist(wishlist);
  }
}

/**
 * Remove a game from the wishlist.
 * @param {number} gameId - The game id to remove
 */
export function removeFromWishlist(gameId) {
  const wishlist = getWishlist().filter((id) => id !== gameId);
  saveWishlist(wishlist);
}

/**
 * Check if a game is in the wishlist.
 * @param {number} gameId - The game id to check
 * @returns {boolean} True if the game is in the wishlist
 */
export function isInWishlist(gameId) {
  return getWishlist().includes(gameId);
}

/**
 * Toggle a game in the wishlist.
 * @param {number} gameId - The game id to toggle
 * @returns {boolean} True if the game is now in the wishlist
 */
export function toggleWishlist(gameId) {
  if (isInWishlist(gameId)) {
    removeFromWishlist(gameId);
    return false;
  }
  addToWishlist(gameId);
  return true;
}

/**
 * Get the full wishlist game objects from a games array.
 * @param {Array} games - All games
 * @returns {Array} Games in the wishlist
 */
export function getWishlistGames(games) {
  const ids = getWishlist();
  return games.filter((game) => ids.includes(game.id));
}

/**
 * Clear the entire wishlist.
 */
export function clearWishlist() {
  saveWishlist([]);
}
