/**
 * GameVerse Hub - Thank You Page Script
 * Reads the submitted name from the URL and displays a personalized message.
 */

import { initNav, renderFooter } from "./ui.mjs";

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  renderFooter();

  const message = document.getElementById("thankyou-message");
  if (!message) return;

  const params = new URLSearchParams(location.search);
  const name = params.get("name");

  if (name) {
    message.textContent = `Thank you, ${name}! Your game suggestion has been submitted successfully. Our team will review it soon.`;
  }
});
