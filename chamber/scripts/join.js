/**
 * Main JS Entry Point for Chamber Join Page
 * Imports modular functions for timestamp and modal dialog management
 */

import { setFormTimestamp } from './modules/timestamp.js';
import { initModals } from './modules/modal.js';

document.addEventListener("DOMContentLoaded", () => {
    setFormTimestamp("timestamp");
    initModals();
});
