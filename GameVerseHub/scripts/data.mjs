/**
 * GameVerse Hub - Data Module
 * Handles fetching game data from the JSON source using the Fetch API.
 * Includes error handling with try/catch.
 */

const DATA_URL = "data/games.json";

/**
 * Fetch all games from the JSON data source.
 * @returns {Promise<Array>} Array of game objects
 * @throws {Error} If the fetch fails or data is invalid
 */
export async function fetchGames() {
  try {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error(`Failed to load games: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("The game data source is empty or invalid.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching game data:", error);
    throw error;
  }
}

/**
 * Get a single game by its id.
 * @param {Array} games - Array of all games
 * @param {number} id - The game id to find
 * @returns {Object|undefined} The matching game or undefined
 */
export function getGameById(games, id) {
  return games.find((game) => game.id === Number(id));
}

/**
 * Get all unique genres from the games list.
 * @param {Array} games - Array of all games
 * @returns {Array<string>} Sorted list of unique genres
 */
export function getGenres(games) {
  const genres = games.map((game) => game.genre);
  return [...new Set(genres)].sort();
}

/**
 * Get all unique platforms from the games list.
 * @param {Array} games - Array of all games
 * @returns {Array<string>} Sorted list of unique platforms
 */
export function getPlatforms(games) {
  const platforms = games.flatMap((game) => game.platforms);
  return [...new Set(platforms)].sort();
}

/**
 * Format a rating as a number with one decimal place.
 * @param {number} rating - The rating value
 * @returns {string} Formatted rating
 */
export function formatRating(rating) {
  return rating.toFixed(1);
}

/**
 * Format a release date into a readable string.
 * @param {string} date - ISO date string (YYYY-MM-DD)
 * @returns {string} Formatted date e.g. "February 25, 2022"
 */
export function formatReleaseDate(date) {
  if (!date) return "Unknown";
  const d = new Date(date);
  if (isNaN(d)) return date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
