/**
 * Main JS Entry Point for Thank You Page
 * Imports module to render submitted URL parameters
 */

import { displayFormData } from './modules/thankyou-display.js';

document.addEventListener("DOMContentLoaded", () => {
    displayFormData();
});
